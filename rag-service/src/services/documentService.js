const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../../config/config');
const vectorStore = require('../utils/vectorStore');
const documentProcessor = require('../utils/documentProcessor');

// Path to store document metadata
const documentsDir = path.join(__dirname, '../../data/documents');
const documentsJsonPath = path.join(documentsDir, 'documents.json');

// Ensure directories exist
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true });
}

// Initialize documents.json if it doesn't exist
if (!fs.existsSync(documentsJsonPath)) {
  fs.writeFileSync(documentsJsonPath, JSON.stringify([], null, 2));
}

/**
 * Process and index a document
 * @param {string} filePath - Path to the uploaded file
 * @param {string} title - Document title
 * @param {string} description - Document description
 * @returns {string} - Document ID
 */
const processAndIndexDocument = async (filePath, title, description) => {
  try {
    // Generate a unique ID for the document
    const documentId = uuidv4();
    
    // Extract text from the document
    const text = await documentProcessor.extractText(filePath);
    
    // Split text into chunks
    const chunks = documentProcessor.splitIntoChunks(
      text, 
      config.rag.chunkSize, 
      config.rag.chunkOverlap
    );
    
    // Create document metadata
    const documentMetadata = {
      id: documentId,
      title,
      description,
      originalFilename: path.basename(filePath),
      uploadDate: new Date().toISOString(),
      chunkCount: chunks.length
    };
    
    // Save document metadata
    saveDocumentMetadata(documentMetadata);
    
    // Index chunks in vector store
    await vectorStore.addDocuments(chunks, {
      documentId,
      title,
      source: documentMetadata.originalFilename
    });
    
    return documentId;
  } catch (error) {
    console.error('Error processing document:', error);
    throw new Error(`Failed to process document: ${error.message}`);
  }
};

/**
 * List all documents in the knowledge base
 * @returns {Array} - Array of document metadata
 */
const listDocuments = async () => {
  try {
    const documentsJson = fs.readFileSync(documentsJsonPath, 'utf8');
    return JSON.parse(documentsJson);
  } catch (error) {
    console.error('Error listing documents:', error);
    throw new Error(`Failed to list documents: ${error.message}`);
  }
};

/**
 * Delete a document from the knowledge base
 * @param {string} documentId - Document ID to delete
 */
const deleteDocument = async (documentId) => {
  try {
    // Get current documents
    const documents = await listDocuments();
    
    // Filter out the document to delete
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    
    // Save updated document list
    fs.writeFileSync(documentsJsonPath, JSON.stringify(updatedDocuments, null, 2));
    
    // Remove document from vector store
    await vectorStore.deleteDocuments(documentId);
    
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error(`Failed to delete document: ${error.message}`);
  }
};

/**
 * Save document metadata to documents.json
 * @param {Object} documentMetadata - Document metadata
 */
const saveDocumentMetadata = (documentMetadata) => {
  try {
    // Read current documents
    const documentsJson = fs.readFileSync(documentsJsonPath, 'utf8');
    const documents = JSON.parse(documentsJson);
    
    // Add new document
    documents.push(documentMetadata);
    
    // Write updated documents
    fs.writeFileSync(documentsJsonPath, JSON.stringify(documents, null, 2));
  } catch (error) {
    console.error('Error saving document metadata:', error);
    throw new Error(`Failed to save document metadata: ${error.message}`);
  }
};

module.exports = {
  processAndIndexDocument,
  listDocuments,
  deleteDocument
};
