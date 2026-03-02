const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../../config/config');
const ragService = require('../services/ragService');
const documentService = require('../services/documentService');

/**
 * Handle user queries to the bot
 */
const handleQuery = async (req, res) => {
  try {
    const { query, conversationId, messageHistory = [] } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: 'Query is required' 
      });
    }
    
    // Process the query through the RAG service
    const response = await ragService.processQuery(query, conversationId, messageHistory);
    
    return res.status(200).json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('Error processing query:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process query',
      details: error.message
    });
  }
};

/**
 * Handle document uploads to the knowledge base
 */
const handleDocumentUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }
    
    const { title, description } = req.body;
    const filePath = req.file.path;
    
    // Process and index the document
    const documentId = await documentService.processAndIndexDocument(
      filePath,
      title || req.file.originalname,
      description || ''
    );
    
    return res.status(200).json({
      success: true,
      message: 'Document uploaded and processed successfully',
      documentId
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to upload and process document',
      details: error.message
    });
  }
};

/**
 * List all documents in the knowledge base
 */
const listDocuments = async (req, res) => {
  try {
    const documents = await documentService.listDocuments();
    
    return res.status(200).json({
      success: true,
      documents
    });
  } catch (error) {
    console.error('Error listing documents:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to list documents',
      details: error.message
    });
  }
};

/**
 * Delete a document from the knowledge base
 */
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Document ID is required' 
      });
    }
    
    await documentService.deleteDocument(id);
    
    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete document',
      details: error.message
    });
  }
};

module.exports = {
  handleQuery,
  handleDocumentUpload,
  listDocuments,
  deleteDocument
};
