const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

/**
 * Extract text from various document formats
 * @param {string} filePath - Path to the document file
 * @returns {string} - Extracted text content
 */
const extractText = async (filePath) => {
  try {
    const fileExtension = path.extname(filePath).toLowerCase();
    
    switch (fileExtension) {
      case '.pdf':
        return await extractFromPdf(filePath);
      case '.txt':
        return await extractFromTxt(filePath);
      case '.md':
        return await extractFromTxt(filePath); // Markdown can be treated as text
      case '.docx':
        throw new Error('DOCX extraction not implemented yet');
      default:
        throw new Error(`Unsupported file format: ${fileExtension}`);
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
};

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {string} - Extracted text content
 */
const extractFromPdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

/**
 * Extract text from TXT file
 * @param {string} filePath - Path to the TXT file
 * @returns {string} - Extracted text content
 */
const extractFromTxt = async (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error extracting text from TXT:', error);
    throw new Error(`Failed to extract text from TXT: ${error.message}`);
  }
};

/**
 * Split text into chunks for processing
 * @param {string} text - Text to split
 * @param {number} chunkSize - Size of each chunk
 * @param {number} chunkOverlap - Overlap between chunks
 * @returns {Array} - Array of text chunks
 */
const splitIntoChunks = (text, chunkSize, chunkOverlap) => {
  if (!text) return [];
  
  const chunks = [];
  let i = 0;
  
  while (i < text.length) {
    // Calculate end position for this chunk
    let end = i + chunkSize;
    
    // If not at the end of the text, try to find a good break point
    if (end < text.length) {
      // Look for a period, question mark, or exclamation point followed by a space or newline
      const breakPoint = text.substring(end - 50, end + 50).search(/[.!?][\s\n]/);
      
      if (breakPoint !== -1) {
        end = end - 50 + breakPoint + 2; // +2 to include the punctuation and space
      }
    }
    
    // Add the chunk
    chunks.push({
      pageContent: text.substring(i, end),
      metadata: {
        chunk: chunks.length,
        start: i,
        end: end
      }
    });
    
    // Move to next chunk, accounting for overlap
    i = end - chunkOverlap;
  }
  
  return chunks;
};

module.exports = {
  extractText,
  splitIntoChunks
};
