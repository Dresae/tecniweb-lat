/**
 * Semantic chunking utilities for RAG service
 * Provides intelligent document chunking based on semantic boundaries
 */
const natural = require('natural');
const textProcessing = require('./textProcessing');

/**
 * Split text into semantic chunks based on topic boundaries
 * @param {string} text - Text to chunk
 * @param {Object} options - Chunking options
 * @returns {Array} - Array of text chunks
 */
const semanticChunking = (text, options = {}) => {
  const {
    minChunkSize = 100,     // Minimum characters per chunk
    maxChunkSize = 2000,    // Maximum characters per chunk
    overlapSize = 50,       // Number of characters to overlap between chunks
    chunkOnHeadings = true, // Whether to chunk on headings
    chunkOnParagraphs = true // Whether to chunk on paragraphs
  } = options;

  if (!text || text.trim().length === 0) {
    return [];
  }

  // Step 1: Identify potential chunk boundaries
  const boundaries = findChunkBoundaries(text, { chunkOnHeadings, chunkOnParagraphs });

  // Step 2: Create initial chunks based on boundaries
  let chunks = createChunksFromBoundaries(text, boundaries);

  // Step 3: Process chunks to ensure size constraints and add overlaps
  chunks = processChunkSizes(chunks, { minChunkSize, maxChunkSize, overlapSize });

  return chunks;
};

/**
 * Find potential chunk boundaries in text
 * @param {string} text - Text to analyze
 * @param {Object} options - Boundary detection options
 * @returns {Array} - Array of boundary indices
 */
const findChunkBoundaries = (text, options = {}) => {
  const { chunkOnHeadings = true, chunkOnParagraphs = true } = options;
  const boundaries = [0]; // Always include start of text

  // Find heading patterns (e.g., "# Heading", "## Subheading", "1. Title", etc.)
  if (chunkOnHeadings) {
    // Match markdown headings, numbered headings, and other common heading patterns
    const headingRegexes = [
      /\n#{1,6}\s+[^\n]+\n/g,                // Markdown headings
      /\n\d+\.\s+[A-Z][^\n]{3,50}\n/g,       // Numbered headings
      /\n[A-Z][A-Z\s]{2,50}[A-Z](?:\n|\:)/g, // ALL CAPS headings
      /\n[^\n]{1,60}\n[=\-]{3,}\n/g          // Underlined headings
    ];

    headingRegexes.forEach(regex => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        boundaries.push(match.index + 1); // +1 to start after the newline
      }
    });
  }

  // Find paragraph breaks (double newlines)
  if (chunkOnParagraphs) {
    const paragraphBreaks = [...text.matchAll(/\n\s*\n/g)];
    paragraphBreaks.forEach(match => {
      boundaries.push(match.index + match[0].length);
    });
  }

  // Add sentence boundaries for long paragraphs
  const sentenceTokenizer = new natural.SentenceTokenizer();
  const sentences = sentenceTokenizer.tokenize(text);
  
  let charCount = 0;
  sentences.forEach(sentence => {
    charCount += sentence.length;
    if (charCount > 1000) { // Only add sentence boundaries for long paragraphs
      const sentenceIndex = text.indexOf(sentence, Math.max(0, charCount - sentence.length * 2));
      if (sentenceIndex > 0) {
        boundaries.push(sentenceIndex + sentence.length);
        charCount = 0; // Reset counter
      }
    }
  });

  // Add end of text
  boundaries.push(text.length);

  // Sort and deduplicate boundaries
  return [...new Set(boundaries)].sort((a, b) => a - b);
};

/**
 * Create initial chunks from text using boundary indices
 * @param {string} text - Full text
 * @param {Array} boundaries - Array of boundary indices
 * @returns {Array} - Array of text chunks
 */
const createChunksFromBoundaries = (text, boundaries) => {
  const chunks = [];
  
  for (let i = 0; i < boundaries.length - 1; i++) {
    const start = boundaries[i];
    const end = boundaries[i + 1];
    const chunk = text.substring(start, end).trim();
    
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
  }
  
  return chunks;
};

/**
 * Process chunks to ensure size constraints and add overlaps
 * @param {Array} chunks - Initial text chunks
 * @param {Object} options - Size options
 * @returns {Array} - Processed chunks
 */
const processChunkSizes = (chunks, options = {}) => {
  const { minChunkSize = 100, maxChunkSize = 2000, overlapSize = 50 } = options;
  const processedChunks = [];
  
  // Merge small chunks
  let currentChunk = '';
  
  chunks.forEach(chunk => {
    if (currentChunk.length + chunk.length <= maxChunkSize) {
      // Add to current chunk
      currentChunk += (currentChunk ? '\n\n' : '') + chunk;
    } else {
      // Current chunk is full, save it if it's large enough
      if (currentChunk.length >= minChunkSize) {
        processedChunks.push(currentChunk);
      }
      
      // Start a new chunk
      currentChunk = chunk;
    }
  });
  
  // Add the last chunk if it exists
  if (currentChunk.length >= minChunkSize) {
    processedChunks.push(currentChunk);
  }
  
  // Add overlaps between chunks
  const finalChunks = [];
  
  for (let i = 0; i < processedChunks.length; i++) {
    let chunk = processedChunks[i];
    
    // Add overlap from previous chunk
    if (i > 0 && overlapSize > 0) {
      const prevChunk = processedChunks[i - 1];
      const overlap = prevChunk.substring(Math.max(0, prevChunk.length - overlapSize));
      chunk = overlap + '\n\n' + chunk;
    }
    
    // Add overlap from next chunk
    if (i < processedChunks.length - 1 && overlapSize > 0) {
      const nextChunk = processedChunks[i + 1];
      const overlap = nextChunk.substring(0, Math.min(overlapSize, nextChunk.length));
      chunk = chunk + '\n\n' + overlap;
    }
    
    finalChunks.push(chunk);
  }
  
  return finalChunks;
};

/**
 * Analyze semantic coherence of a chunk
 * @param {string} chunk - Text chunk
 * @returns {number} - Coherence score (0-1)
 */
const analyzeChunkCoherence = (chunk) => {
  if (!chunk || chunk.length < 50) return 0;
  
  // Extract keywords and calculate term density
  const { tokens, stems } = textProcessing.preprocessText(chunk);
  
  // Count term frequency
  const termFrequency = {};
  stems.forEach(stem => {
    termFrequency[stem] = (termFrequency[stem] || 0) + 1;
  });
  
  // Calculate term density (higher is more coherent)
  const uniqueTerms = Object.keys(termFrequency).length;
  const totalTerms = stems.length;
  
  if (totalTerms === 0) return 0;
  
  // Calculate coherence metrics
  const termRepetition = 1 - (uniqueTerms / totalTerms); // Higher when terms repeat (more coherent)
  const avgTermFrequency = totalTerms / Math.max(1, uniqueTerms);
  
  // Combine metrics into a coherence score (0-1)
  const coherenceScore = (termRepetition * 0.5) + (Math.min(1, avgTermFrequency / 5) * 0.5);
  
  return coherenceScore;
};

module.exports = {
  semanticChunking,
  analyzeChunkCoherence
};
