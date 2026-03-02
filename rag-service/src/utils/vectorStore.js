const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../../config/config');
const textProcessing = require('./textProcessing');

// Path to store vector embeddings
const vectorsDir = path.join(__dirname, '../../data/vectors');
const indexPath = path.join(vectorsDir, 'index.json');
const allVectorsPath = path.join(vectorsDir, 'all-vectors.json');

// Ensure directories exist
if (!fs.existsSync(vectorsDir)) {
  fs.mkdirSync(vectorsDir, { recursive: true });
}

// Initialize index.json if it doesn't exist
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, JSON.stringify({
    files: {},
    totalDocuments: 0,
    lastUpdated: new Date().toISOString()
  }, null, 2));
}

// Initialize all-vectors.json if it doesn't exist
if (!fs.existsSync(allVectorsPath)) {
  fs.writeFileSync(allVectorsPath, JSON.stringify([], null, 2));
}

/**
 * Generate embedding for a text
 * @param {string} text - Text to generate embedding for
 * @returns {Array} - Embedding vector
 */
const generateEmbedding = async (text) => {
  try {
    if (!config.google.apiKey) {
      throw new Error('Google API key is not configured');
    }

    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    // Truncate text if too long (Google has limits)
    const maxLength = 20000;
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) : text;

    console.log(`🔤 Generating embedding for text (${truncatedText.length} chars)...`);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${config.google.apiKey}`,
      {
        model: "models/text-embedding-004",
        content: {
          parts: [{ text: truncatedText }]
        }
      },
      {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data || !response.data.embedding || !response.data.embedding.values) {
      throw new Error('Invalid response format from embedding API');
    }

    console.log(`✅ Generated embedding with ${response.data.embedding.values.length} dimensions`);
    return response.data.embedding.values;
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      if (error.response.status === 503) {
        throw new Error('Google API is temporarily unavailable (503). Please try again later.');
      } else if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before making more requests.');
      } else if (error.response.status === 400) {
        throw new Error('Invalid request to embedding API. Check text content.');
      } else if (error.response.status === 401 || error.response.status === 403) {
        throw new Error('Invalid or unauthorized API key.');
      }
    }
    
    console.error('Error generating embedding:', error.message);
    throw new Error(`Failed to generate embedding: ${error.message}`);
  }
};

/**
 * Add documents to the vector store (legacy function - use addDocument instead)
 * @param {Array} documents - Array of document chunks
 * @param {Object} metadata - Additional metadata
 * @returns {boolean} - Success status
 */
const addDocuments = async (documents, metadata) => {
  try {
    // Load existing vectors from consolidated file
    const vectors = loadAllVectorsFromSingleFile();
    
    // Process each document chunk
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      
      // Generate embedding for the document
      const embedding = await generateEmbedding(doc.pageContent);
      
      // Create vector entry
      const vectorEntry = {
        id: `${metadata.documentId}_chunk_${i}`,
        documentId: metadata.documentId,
        embedding,
        pageContent: doc.pageContent,
        metadata: {
          ...metadata,
          ...doc.metadata,
          chunkIndex: i
        }
      };
      
      // Add to vectors array
      vectors.push(vectorEntry);
    }
    
    // Save updated vectors to consolidated file
    saveAllVectorsToSingleFile(vectors);
    
    return true;
  } catch (error) {
    console.error('Error adding documents:', error);
    throw new Error(`Failed to add documents: ${error.message}`);
  }
};

/**
 * Delete documents from the vector store
 * @param {string} documentId - Document ID to delete
 * @returns {boolean} - Success status
 */
const deleteDocuments = async (documentId) => {
  try {
    // Load existing vectors from consolidated file
    const vectors = loadAllVectorsFromSingleFile();
    
    // Filter out vectors for the document
    const updatedVectors = vectors.filter(vector => vector.documentId !== documentId);
    
    // Save updated vectors to consolidated file
    saveAllVectorsToSingleFile(updatedVectors);
    
    return true;
  } catch (error) {
    console.error('Error deleting documents:', error);
    throw new Error(`Failed to delete documents: ${error.message}`);
  }
};

/**
 * Determine relevant files based on query keywords
 * @param {string} query - Query text
 * @param {Object} index - Index object
 * @returns {Array} - Array of relevant filenames
 */
const getRelevantFiles = (query, index) => {
  const queryLower = query.toLowerCase();
  const relevantFiles = [];
  
  // Define keyword mappings for better file targeting
  const fileKeywords = {
    'pricing.txt': ['precio', 'costo', 'tarifa', 'pago', 'financiamiento', 'descuento', 'cuanto cuesta'],
    'faqs.txt': ['pregunta', 'faq', 'como', 'que es', 'por que', 'cuando', 'donde'],
    'product&services.txt': ['servicio', 'producto', 'desarrollo', 'web', 'app', 'movil', 'consultoria'],
    'company.txt': ['empresa', 'tecniweb', 'equipo', 'nosotros', 'historia', 'mision', 'vision'],
    'contacts.txt': ['contacto', 'telefono', 'email', 'direccion', 'ubicacion', 'horario'],
    'founder.txt': ['fundador', 'ceo', 'lider', 'director', 'experiencia'],
    'operations.txt': ['proceso', 'metodologia', 'trabajo', 'operacion', 'flujo'],
    'data.txt': ['informacion', 'datos', 'estadistica', 'numero'],
    'tecniweb-info.txt': ['general', 'informacion', 'tecniweb', 'latam']
  };
  
  // Check each file for keyword matches
  for (const [filename, keywords] of Object.entries(fileKeywords)) {
    if (index.files[filename]) {
      const hasMatch = keywords.some(keyword => queryLower.includes(keyword));
      if (hasMatch) {
        relevantFiles.push(filename);
      }
    }
  }
  
  // If no specific matches, include all files but prioritize general ones
  if (relevantFiles.length === 0) {
    const priorityFiles = ['tecniweb-info.txt', 'faqs.txt', 'company.txt'];
    for (const file of priorityFiles) {
      if (index.files[file]) {
        relevantFiles.push(file);
      }
    }
    
    // Add remaining files
    for (const filename of Object.keys(index.files)) {
      if (!relevantFiles.includes(filename)) {
        relevantFiles.push(filename);
      }
    }
  }
  
  return relevantFiles;
};

/**
 * Perform hybrid search combining semantic and keyword-based search
 * @param {string} query - Query text
 * @param {number} k - Number of results to return
 * @param {Object} options - Search options
 * @returns {Array} - Array of similar documents
 */
const hybridSearch = async (query, k = 3, options = {}) => {
  try {
    const {
      semanticWeight = 0.7,  // Weight for semantic search (0-1)
      keywordWeight = 0.3,   // Weight for keyword search (0-1)
      expandQuery = true,    // Whether to expand the query
      minScore = 0.1,        // Minimum combined score to include in results
      language = 'es'        // Default language
    } = options;
    
    // Expand query if enabled
    const searchQuery = expandQuery ? textProcessing.expandQuery(query, language) : query;
    console.log(`🔍 Searching for: "${query}"${expandQuery ? ` (expanded: "${searchQuery}")` : ''}`);
    
    // Load all vectors from consolidated file
    const allVectors = loadAllVectorsFromSingleFile();
    
    if (allVectors.length === 0) {
      return [];
    }
    
    console.log(`🔍 Searching through ${allVectors.length} vectors from all documents`);
    
    // Step 1: Semantic search using embeddings
    const queryEmbedding = await generateEmbedding(searchQuery);
    
    // Calculate semantic similarity scores
    const semanticResults = allVectors.map(vector => ({
      ...vector,
      semanticScore: cosineSimilarity(queryEmbedding, vector.embedding)
    }));
    
    // Step 2: Keyword-based search using BM25
    const documents = allVectors.map(vector => ({
      id: vector.id,
      content: vector.content || vector.pageContent,
      metadata: vector.metadata
    }));
    
    const keywordResults = textProcessing.calculateBM25Scores(searchQuery, documents, 'content');
    
    // Normalize BM25 scores to 0-1 range
    const maxBM25Score = Math.max(...keywordResults.map(doc => doc.bm25Score || 0), 0.001);
    const normalizedKeywordResults = keywordResults.map(doc => ({
      ...doc,
      keywordScore: (doc.bm25Score || 0) / maxBM25Score
    }));
    
    // Step 3: Combine results with weighted scores
    const combinedResults = semanticResults.map(semResult => {
      const keywordResult = normalizedKeywordResults.find(kwResult => kwResult.id === semResult.id) || { keywordScore: 0 };
      
      // Calculate combined score
      const combinedScore = (
        semanticWeight * semResult.semanticScore + 
        keywordWeight * keywordResult.keywordScore
      );
      
      return {
        ...semResult,
        keywordScore: keywordResult.keywordScore,
        combinedScore
      };
    });
    
    // Filter by minimum score and sort by combined score
    const results = combinedResults
      .filter(result => result.combinedScore >= minScore)
      .sort((a, b) => b.combinedScore - a.combinedScore)
      .slice(0, k)
      .map(result => ({
        id: result.id,
        pageContent: result.content || result.pageContent,
        metadata: {
          ...result.metadata,
          semanticScore: result.semanticScore.toFixed(3),
          keywordScore: result.keywordScore.toFixed(3),
          combinedScore: result.combinedScore.toFixed(3),
          source: result.filename || result.metadata?.source || 'unknown'
        }
      }));
    
    console.log(`📊 Found ${results.length} relevant results with combined scores: ${results.map(r => r.metadata.combinedScore).join(', ')}`);
    
    return results;
  } catch (error) {
    console.error('Error performing hybrid search:', error);
    throw new Error(`Failed to perform hybrid search: ${error.message}`);
  }
};

/**
 * Legacy similarity search using only semantic embeddings
 * @param {string} query - Query text
 * @param {number} k - Number of results to return
 * @returns {Array} - Array of similar documents
 */
const similaritySearch = async (query, k = 3) => {
  try {
    // For backward compatibility, use the new hybrid search with semantic weight = 1
    return hybridSearch(query, k, { semanticWeight: 1, keywordWeight: 0, expandQuery: false });
  } catch (error) {
    console.error('Error performing similarity search:', error);
    throw new Error(`Failed to perform similarity search: ${error.message}`);
  }
};

/**
 * Calculate cosine similarity between two vectors
 * @param {Array} vecA - First vector
 * @param {Array} vecB - Second vector
 * @returns {number} - Similarity score
 */
const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (normA * normB);
};

/**
 * Load index file
 * @returns {Object} - Index object
 */
const loadIndex = () => {
  try {
    if (fs.existsSync(indexPath)) {
      const data = fs.readFileSync(indexPath, 'utf8');
      return JSON.parse(data);
    }
    return { files: {}, totalDocuments: 0, lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('Error loading index:', error);
    return { files: {}, totalDocuments: 0, lastUpdated: new Date().toISOString() };
  }
};

/**
 * Save index file
 * @param {Object} index - Index object
 */
const saveIndex = (index) => {
  try {
    index.lastUpdated = new Date().toISOString();
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  } catch (error) {
    console.error('Error saving index:', error);
    throw error;
  }
};

/**
 * Load vectors from a specific file
 * @param {string} filename - Source filename
 * @returns {Array} - Array of vectors for that file
 */
const loadVectorsFromFile = (filename) => {
  try {
    const fileKey = filename.replace('.txt', '');
    const filePath = path.join(vectorsDir, `${fileKey}.json`);
    
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error loading vectors from ${filename}:`, error);
    return [];
  }
};

/**
 * Save vectors to a specific file
 * @param {string} filename - Source filename
 * @param {Array} vectors - Array of vectors
 */
const saveVectorsToFile = (filename, vectors) => {
  try {
    const fileKey = filename.replace('.txt', '');
    const filePath = path.join(vectorsDir, `${fileKey}.json`);
    fs.writeFileSync(filePath, JSON.stringify(vectors, null, 2));
  } catch (error) {
    console.error(`Error saving vectors to ${filename}:`, error);
    throw error;
  }
};

/**
 * Load all vectors from consolidated single file
 * @returns {Array} - Array of all vectors
 */
const loadAllVectorsFromSingleFile = () => {
  try {
    if (fs.existsSync(allVectorsPath)) {
      const data = fs.readFileSync(allVectorsPath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading all vectors from single file:', error);
    return [];
  }
};

/**
 * Save all vectors to consolidated single file
 * @param {Array} vectors - Array of all vectors
 */
const saveAllVectorsToSingleFile = (vectors) => {
  try {
    fs.writeFileSync(allVectorsPath, JSON.stringify(vectors, null, 2));
  } catch (error) {
    console.error('Error saving all vectors to single file:', error);
    throw error;
  }
};

/**
 * Load all vectors from all indexed files (legacy support)
 * @returns {Array} - Array of all vectors
 */
const loadAllVectors = () => {
  try {
    const index = loadIndex();
    const allVectors = [];
    
    for (const filename of Object.keys(index.files)) {
      const vectors = loadVectorsFromFile(filename);
      allVectors.push(...vectors);
    }
    
    return allVectors;
  } catch (error) {
    console.error('Error loading all vectors:', error);
    return [];
  }
};

/**
 * Add a single document to the consolidated vector store
 * @param {Object} document - Document object with id, filename, content, and metadata
 * @returns {boolean} - Success status
 */
const addDocument = async (document) => {
  try {
    console.log(`Adding document: ${document.filename} (${document.content.length} chars)`);
    
    // Generate embedding for the document content
    const embedding = await generateEmbedding(document.content);
    
    // Create vector document
    const vectorDoc = {
      id: document.id,
      filename: document.filename,
      content: document.content,
      embedding: embedding,
      metadata: document.metadata || {}
    };
    
    // Load all existing vectors from consolidated file
    const allVectors = loadAllVectorsFromSingleFile();
    
    // Add new vector to the consolidated collection
    allVectors.push(vectorDoc);
    
    // Save all vectors back to consolidated file
    saveAllVectorsToSingleFile(allVectors);
    
    // Update index
    const index = loadIndex();
    if (!index.files[document.filename]) {
      index.files[document.filename] = {
        documentCount: 0,
        lastUpdated: new Date().toISOString(),
        fileKey: document.filename.replace('.txt', '')
      };
    }
    
    // Count documents for this specific file in the consolidated vector store
    const fileVectorCount = allVectors.filter(v => v.filename === document.filename).length;
    index.files[document.filename].documentCount = fileVectorCount;
    index.files[document.filename].lastUpdated = new Date().toISOString();
    index.totalDocuments = allVectors.length;
    
    saveIndex(index);
    
    console.log(`✅ Added document chunk: ${document.filename} (${document.content.length} chars)`);
    return true;
    
  } catch (error) {
    console.error('Error adding document:', error);
    return false;
  }
};

module.exports = {
  generateEmbedding,
  addDocument,
  addDocuments,
  deleteDocuments,
  similaritySearch,
  hybridSearch,
  cosineSimilarity,
  loadIndex,
  saveIndex,
  loadVectorsFromFile,
  saveVectorsToFile,
  loadAllVectors,
  loadAllVectorsFromSingleFile,
  saveAllVectorsToSingleFile,
  getRelevantFiles
};
