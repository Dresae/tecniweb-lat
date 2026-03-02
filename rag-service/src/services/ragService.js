const axios = require('axios');
const config = require('../../config/config');
const vectorStore = require('../utils/vectorStore');
const responseCache = require('../utils/responseCache');
const conversationManager = require('../utils/conversationManager');

/**
 * Process a user query using RAG approach
 * @param {string} query - The user's query
 * @param {string} conversationId - Optional conversation ID for context
 * @param {Array} messageHistory - Optional array of previous messages (deprecated, use conversationId instead)
 * @returns {Object} - The response object
 */
const processQuery = async (query, conversationId, messageHistory = []) => {
  try {
    console.log(`📝 Processing query: "${query}"`);
    
    // Get or create conversation context
    let conversation;
    if (conversationId) {
      conversation = conversationManager.getConversation(conversationId);
      if (!conversation) {
        conversation = conversationManager.createConversation(conversationId);
      }
    } else {
      conversation = conversationManager.createConversation();
      conversationId = conversation.id;
    }
    
    console.log(`🗣️ Processing in conversation: ${conversationId} (${conversation.messages.length} previous messages)`);
    
    // Add user message to conversation
    conversationManager.addMessage(conversationId, {
      text: query,
      isBot: false,
      timestamp: new Date().toISOString()
    });
    
    // Get conversation history
    const conversationHistory = conversationManager.getConversationHistory(conversationId);
    
    // Step 1: Check cache for existing response
    const cachedResponse = responseCache.getCachedResponse(query);
    if (cachedResponse && conversation.messages.length <= 1) { // Only use cache for first message in conversation
      console.log('✅ Using cached response');
      
      // Add bot response to conversation
      conversationManager.addMessage(conversationId, {
        text: cachedResponse.text,
        isBot: true,
        timestamp: new Date().toISOString(),
        fromCache: true
      });
      
      return {
        ...cachedResponse,
        conversationId: conversationId,
        fromCache: true
      };
    }
    
    // Step 2: Check for similar cached queries
    const similarQueries = responseCache.findSimilarCachedQueries(query, 0.85);
    if (similarQueries.length > 0) {
      console.log(`🔍 Found ${similarQueries.length} similar cached queries`);
      console.log(`   Best match: "${similarQueries[0].query}" (similarity: ${similarQueries[0].similarity.toFixed(2)})`);
      
      // If very similar query exists, use its cached response
      if (similarQueries[0].similarity > 0.9) {
        console.log('✅ Using response from very similar query');
        return {
          ...similarQueries[0].response,
          conversationId: conversationId || similarQueries[0].response.conversationId || generateConversationId(),
          fromCache: true,
          similarityScore: similarQueries[0].similarity
        };
      }
    }
    
    // Step 3: Retrieve relevant documents using hybrid search
    const searchOptions = {
      semanticWeight: 0.7,
      keywordWeight: 0.3,
      expandQuery: true,
      minScore: 0.1,
      language: 'es'
    };
    
    const relevantDocs = await vectorStore.hybridSearch(
      query, 
      config.rag.topK,
      searchOptions
    );
    
    // Step 4: Build context from relevant documents with relevance scores
    const context = buildContext(relevantDocs);
    
    // Step 5: Build prompt with context and conversation history
    const prompt = buildPrompt(query, context, conversationHistory);
    
    // Step 6: Generate response using Google's generative model
    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.google.model || 'gemini-pro'}:generateContent?key=${config.google.apiKey}`,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024
        }
      },
      {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Step 7: Format response
    const response = {
      text: result.data.candidates[0].content.parts[0].text,
      sources: extractSources(relevantDocs),
      conversationId: conversationId || generateConversationId(),
      relevantDocs: relevantDocs.map(doc => ({
        id: doc.id,
        source: doc.metadata.source,
        semanticScore: doc.metadata.semanticScore,
        keywordScore: doc.metadata.keywordScore,
        combinedScore: doc.metadata.combinedScore
      }))
    };
    
    // Step 8: Cache the response for future use (only if it's the first message in conversation)
    if (conversation.messages.length <= 1) {
      responseCache.cacheResponse(query, response, {
        ttl: 7 * 24 * 60 * 60 * 1000, // 7 days TTL
        minQueryLength: 10
      });
    }
    
    // Add bot response to conversation
    conversationManager.addMessage(conversationId, {
      text: response.text,
      isBot: true,
      timestamp: new Date().toISOString(),
      sources: response.sources
    });
    
    return response;
  } catch (error) {
    console.error('Error in RAG processing:', error);
    
    // Implement fallback mechanism for API failures
    if (error.response && (error.response.status === 503 || error.response.status === 429)) {
      return {
        text: "Lo siento, estoy experimentando problemas técnicos en este momento. Por favor, intenta nuevamente en unos minutos o contáctanos directamente a digital@tecniweb.lat(tecniweblat@gmail.com).",
        sources: [],
        conversationId: conversationId || generateConversationId(),
        error: error.message
      };
    }
    
    throw new Error(`Failed to process query: ${error.message}`);
  }
};

/**
 * Build context from relevant documents
 * @param {Array} docs - Array of relevant documents
 * @returns {string} - Formatted context string
 */
const buildContext = (docs) => {
  if (!docs || docs.length === 0) {
    return '';
  }
  
  // Sort documents by combined score if available
  const sortedDocs = [...docs].sort((a, b) => {
    const scoreA = parseFloat(a.metadata.combinedScore || 0);
    const scoreB = parseFloat(b.metadata.combinedScore || 0);
    return scoreB - scoreA;
  });
  
  return sortedDocs.map((doc, index) => {
    const source = doc.metadata.source || 'Unknown';
    const score = doc.metadata.combinedScore ? ` [Relevance: ${doc.metadata.combinedScore}]` : '';
    return `Document ${index + 1} (${source})${score}: ${doc.pageContent}`;
  }).join('\n\n');
};

/**
 * Build prompt with context and conversation history
 * @param {string} query - The user's query
 * @param {string} context - Context from relevant documents
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {string} - The prompt for the LLM
 */
const buildPrompt = (query, context, conversationHistory = []) => {
  // Format conversation history if available
  let conversationContext = '';
  if (conversationHistory && conversationHistory.length > 1) { // Skip if only the current query is in history
    // Use the conversation manager to format history
    const formattedHistory = conversationManager.formatConversationHistoryForPrompt(
      // Exclude the last message which is the current query
      conversationHistory.slice(0, -1)
    );
    
    if (formattedHistory) {
      conversationContext = '\n\nConversación previa:\n' + formattedHistory;
    }
  }
  // Build the prompt based on available context
  let prompt = '';
  
  if (context && context.trim().length > 0) {
    prompt += `Eres Andy, el asistente virtual de Tecniweb Latam. Soy parte del equipo y tengo una personalidad cálida, cercana y profesional. Hablo como un consultor experto que conoce perfectamente la empresa y sus servicios.

Usa ÚNICAMENTE la información proporcionada para crear respuestas personalizadas y conversacionales. Responde como si estuvieras hablando directamente con un cliente potencial, usando un tono humano y cercano:

${context}

INSTRUCCIONES PARA RESPUESTAS HUMANIZADAS Y ADAPTATIVAS:

PARA PREGUNTAS ESPECÍFICAS (precios, horarios, ubicación, paquetes, contacto):
- Sé CONCISO y DIRECTO: responde inmediatamente con los datos exactos del contexto
- Formato: saludo breve + información específica + cierre simple
- Ejemplo de estructura: "¡Hola! [dato específico]. ¿Te ayudo con algo más?"
- NO agregues explicaciones largas ni contexto innecesario
- Usa SOLO los datos reales del contexto, nunca placeholders como "[inserta...]"

PARA CONSULTAS VAGAS O EXPLORATORIAS (desarrollo en general, "qué ofrecen", "cómo funciona"):
- Haz preguntas estratégicas para entender mejor sus necesidades
- Sé conversacional y empático: "Me parece interesante tu idea, ¿me cuentas más sobre...?"
- Ofrece opciones específicas basadas en el contexto disponible
- Guía hacia información más específica

REGLAS GENERALES:
- Habla en primera persona como parte del equipo de Tecniweb Latam
- Usa "tú" y mantén calidez profesional
- NUNCA inventes información ni uses ejemplos genéricos
- Adapta el nivel de detalle según la especificidad de la pregunta
- Si falta información específica, sé honesto y ofrece alternativas concretas

MANEJO DE EXPRESIONES COLOQUIALES:
- Si el usuario usa expresiones como "parcero", "brother", "amigo", "parce", "hermano", "bro", etc., responde de manera igualmente cercana y natural
- Mantén el mismo nivel de informalidad que el usuario, pero siempre profesional
- Ejemplos de respuestas naturales: "¡Qué tal, parcero!", "¡Hola, amigo!", "¡Ey, hermano!", "¡Qué más, parce!"
- Adapta tu lenguaje al tono del usuario sin perder la esencia profesional de Tecniweb

`;
  } else {
    prompt += `Eres Andy, el asistente virtual de Tecniweb Latam. Soy parte del equipo y me encanta ayudar a las personas a encontrar las mejores soluciones tecnológicas para sus proyectos. Tengo una personalidad cálida, cercana y siempre busco entender realmente lo que necesitas.

Especialidades de Tecniweb Latam: desarrollo web, aplicaciones móviles, consultoría tecnológica, integración con IA, y soluciones digitales personalizadas.

INSTRUCCIONES PARA RESPUESTAS ADAPTATIVAS:

PARA PREGUNTAS ESPECÍFICAS (precios, horarios, ubicación, paquetes, contacto):
- Sé CONCISO: "Para darte información precisa sobre [tema específico], necesito acceder a nuestros datos actualizados. Te conecto con nuestro equipo: digital@tecniweb.lat(tecniweblat@gmail.com) o +57 322 983 3008"
- NO des explicaciones largas ni contexto innecesario
- Ofrece contacto directo inmediatamente

PARA CONSULTAS VAGAS O EXPLORATORIAS (desarrollo en general, "qué ofrecen", "cómo funciona"):
- Haz preguntas estratégicas para entender mejor: "Me parece súper interesante tu idea, ¿me cuentas más sobre qué tipo de proyecto tienes en mente?"
- Muestra las especialidades: desarrollo web, apps móviles, consultoría tecnológica, integración con IA
- Guía hacia información más específica

REGLAS GENERALES:
- Habla de manera conversacional y empática, como un consultor experto
- Usa "tú" y mantén un tono cercano pero profesional
- NUNCA generes información inventada, ejemplos genéricos, rangos de precios ficticios, o placeholders como "[inserta...]"
- Adapta el nivel de detalle según la especificidad de la pregunta
- Personaliza según el contexto y muestra que entiendes sus necesidades

MANEJO DE EXPRESIONES COLOQUIALES:
- Si el usuario usa expresiones como "parcero", "brother", "amigo", "parce", "hermano", "bro", etc., responde de manera igualmente cercana y natural
- Mantén el mismo nivel de informalidad que el usuario, pero siempre profesional
- Ejemplos de respuestas naturales: "¡Qué tal, parcero!", "¡Hola, amigo!", "¡Ey, hermano!", "¡Qué más, parce!"
- Adapta tu lenguaje al tono del usuario sin perder la esencia profesional de Tecniweb

`;
  }
  
  if (conversationContext) {
    prompt += conversationContext;
  }
  
  prompt += `User: ${query}\nAssistant:`;
  
  return prompt;
};

/**
 * Extract sources from relevant documents for citation
 * @param {Array} docs - Array of relevant documents
 * @returns {Array} - Array of source objects
 */
const extractSources = (docs) => {
  if (!docs || docs.length === 0) {
    return [];
  }
  
  return docs.map(doc => {
    // Generate a meaningful title from the content if not provided
    let title = doc.metadata.title;
    if (!title || title === 'Unknown') {
      const content = doc.pageContent || '';
      const firstLine = content.split('\n')[0].trim();
      
      // Extract title from common patterns
      if (firstLine.includes(':')) {
        title = firstLine.split(':')[0].trim();
      } else if (firstLine.length > 0 && firstLine.length < 100) {
        title = firstLine;
      } else {
        title = 'Información de Tecniweb Latam';
      }
    }
    
    return {
      title: title,
      source: doc.metadata.filename || doc.metadata.source || 'Tecniweb Latam',
      relevance: doc.metadata.score || 1.0
    };
  });
};

/**
 * Generate a conversation ID
 * @returns {string} - A unique conversation ID
 * @deprecated Use conversationManager.createConversation() instead
 */
const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Clean up old data (conversations and cache)
 * @param {number} maxConversationAgeDays - Maximum age for conversations in days
 * @returns {Object} - Cleanup statistics
 */
const cleanupOldData = async (maxConversationAgeDays = 30, force = false) => {
  try {
    // Clean up old conversations
    const conversationsDeleted = conversationManager.cleanupOldConversations(maxConversationAgeDays);
    
    // Clean up expired cache entries
    const cacheEntriesDeleted = responseCache.cleanupCache(force);
    
    return {
      success: true,
      conversationsDeleted,
      cacheEntriesDeleted,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error cleaning up old data:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  processQuery,
  cleanupOldData
};
