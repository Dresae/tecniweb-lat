/**
 * Conversation context management for RAG service
 * Maintains dialogue coherence across multiple interactions
 */
const fs = require('fs');
const path = require('path');

// Conversation storage path
const conversationsDir = path.join(__dirname, '../../data/conversations');
const maxHistoryLength = 15; // Maximum number of messages to keep in history

// Ensure conversations directory exists
if (!fs.existsSync(conversationsDir)) {
  fs.mkdirSync(conversationsDir, { recursive: true });
}

/**
 * Create a new conversation
 * @param {string} conversationId - Optional conversation ID
 * @returns {Object} - Conversation object
 */
const createConversation = (conversationId = null) => {
  const id = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  const conversation = {
    id,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    messages: [],
    metadata: {
      userInfo: {},
      topics: [],
      summary: ''
    }
  };
  
  // Save conversation
  saveConversation(conversation);
  
  return conversation;
};

/**
 * Get conversation by ID
 * @param {string} conversationId - Conversation ID
 * @returns {Object|null} - Conversation object or null if not found
 */
const getConversation = (conversationId) => {
  if (!conversationId) return null;
  
  const filePath = path.join(conversationsDir, `${conversationId}.json`);
  
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading conversation ${conversationId}:`, error);
      return null;
    }
  }
  
  return null;
};

/**
 * Save conversation
 * @param {Object} conversation - Conversation object
 * @returns {boolean} - Success status
 */
const saveConversation = (conversation) => {
  if (!conversation || !conversation.id) return false;
  
  const filePath = path.join(conversationsDir, `${conversation.id}.json`);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(conversation, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving conversation ${conversation.id}:`, error);
    return false;
  }
};

/**
 * Add message to conversation
 * @param {string} conversationId - Conversation ID
 * @param {Object} message - Message object
 * @returns {Object|null} - Updated conversation or null if failed
 */
const addMessage = (conversationId, message) => {
  // Get or create conversation
  let conversation = getConversation(conversationId);
  if (!conversation) {
    conversation = createConversation(conversationId);
  }
  
  // Add timestamp if not provided
  if (!message.timestamp) {
    message.timestamp = new Date().toISOString();
  }
  
  // Add message to conversation
  conversation.messages.push(message);
  
  // Limit history length
  if (conversation.messages.length > maxHistoryLength) {
    conversation.messages = conversation.messages.slice(-maxHistoryLength);
  }
  
  // Update last updated timestamp
  conversation.lastUpdated = new Date().toISOString();
  
  // Update conversation metadata
  updateConversationMetadata(conversation);
  
  // Save conversation
  saveConversation(conversation);
  
  return conversation;
};

/**
 * Get conversation history
 * @param {string} conversationId - Conversation ID
 * @param {number} limit - Maximum number of messages to return
 * @returns {Array} - Array of messages
 */
const getConversationHistory = (conversationId, limit = maxHistoryLength) => {
  const conversation = getConversation(conversationId);
  
  if (!conversation) {
    return [];
  }
  
  // Return the most recent messages up to the limit
  return conversation.messages.slice(-limit);
};

/**
 * Update conversation metadata
 * @param {Object} conversation - Conversation object
 * @returns {Object} - Updated conversation
 */
const updateConversationMetadata = (conversation) => {
  if (!conversation || !conversation.messages || conversation.messages.length === 0) {
    return conversation;
  }
  
  // Extract topics from messages (simple approach)
  const allText = conversation.messages
    .map(msg => msg.text || '')
    .join(' ')
    .toLowerCase();
  
  // Define common topics to detect
  const topicKeywords = {
    'desarrollo_web': ['web', 'sitio', 'página', 'website', 'desarrollo web'],
    'aplicaciones_moviles': ['app', 'móvil', 'android', 'ios', 'aplicación'],
    'precios': ['precio', 'costo', 'tarifa', 'pago', 'presupuesto'],
    'servicios': ['servicio', 'ofrecen', 'hacen', 'trabajo'],
    'contacto': ['contacto', 'email', 'teléfono', 'ubicación', 'dirección'],
    'tecnologias': ['tecnología', 'stack', 'framework', 'lenguaje', 'programación']
  };
  
  // Detect topics
  const detectedTopics = [];
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => allText.includes(keyword))) {
      detectedTopics.push(topic);
    }
  }
  
  // Update metadata
  conversation.metadata.topics = detectedTopics;
  
  // Generate simple summary from the first user message
  const firstUserMessage = conversation.messages.find(msg => !msg.isBot);
  if (firstUserMessage && firstUserMessage.text) {
    const summary = firstUserMessage.text.substring(0, 100) + (firstUserMessage.text.length > 100 ? '...' : '');
    conversation.metadata.summary = summary;
  }
  
  return conversation;
};

/**
 * Format conversation history for prompt context
 * @param {Array} messages - Array of messages
 * @returns {string} - Formatted conversation history
 */
const formatConversationHistoryForPrompt = (messages) => {
  if (!messages || messages.length === 0) {
    return '';
  }
  
  return messages.map(msg => {
    const role = msg.isBot ? 'Assistant' : 'User';
    return `${role}: ${msg.text}`;
  }).join('\n\n');
};

/**
 * Delete conversation
 * @param {string} conversationId - Conversation ID
 * @returns {boolean} - Success status
 */
const deleteConversation = (conversationId) => {
  if (!conversationId) return false;
  
  const filePath = path.join(conversationsDir, `${conversationId}.json`);
  
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      console.error(`Error deleting conversation ${conversationId}:`, error);
      return false;
    }
  }
  
  return false;
};

/**
 * Clean up old conversations
 * @param {number} maxAgeDays - Maximum age in days
 * @returns {number} - Number of conversations deleted
 */
const cleanupOldConversations = (maxAgeDays = 30) => {
  try {
    const files = fs.readdirSync(conversationsDir);
    let deletedCount = 0;
    
    const now = new Date();
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const filePath = path.join(conversationsDir, file);
      
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        const conversation = JSON.parse(data);
        
        const lastUpdated = new Date(conversation.lastUpdated);
        const ageMs = now - lastUpdated;
        
        if (ageMs > maxAgeMs) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
    
    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old conversations:', error);
    return 0;
  }
};

module.exports = {
  createConversation,
  getConversation,
  addMessage,
  getConversationHistory,
  formatConversationHistoryForPrompt,
  deleteConversation,
  cleanupOldConversations
};
