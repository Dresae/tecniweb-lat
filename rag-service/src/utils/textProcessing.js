/**
 * Text processing utilities for RAG service
 */
const natural = require('natural');
const stopword = require('stopword');

// Define Spanish stopwords manually since the module structure is different
const spanishStopwords = [
  'a', 'al', 'algo', 'algunas', 'algunos', 'ante', 'antes', 'como', 'con', 'contra',
  'cual', 'cuando', 'de', 'del', 'desde', 'donde', 'durante', 'e', 'el', 'ella',
  'ellas', 'ellos', 'en', 'entre', 'era', 'erais', 'eran', 'eras', 'eres', 'es',
  'esa', 'esas', 'ese', 'eso', 'esos', 'esta', 'estaba', 'estabais', 'estaban',
  'estabas', 'estad', 'estada', 'estadas', 'estado', 'estados', 'estamos', 'estando',
  'estar', 'estaremos', 'estará', 'estarán', 'estarás', 'estaré', 'estaréis',
  'estaría', 'estaríais', 'estaríamos', 'estarían', 'estarías', 'estas', 'este',
  'estemos', 'esto', 'estos', 'estoy', 'estuve', 'estuviera', 'estuvierais',
  'estuvieran', 'estuvieras', 'estuvieron', 'estuviese', 'estuvieseis', 'estuviesen',
  'estuvieses', 'estuvimos', 'estuviste', 'estuvisteis', 'estuviéramos',
  'estuviésemos', 'estuvo', 'está', 'estábamos', 'estáis', 'están', 'estás', 'esté',
  'estéis', 'estén', 'estés', 'fue', 'fuera', 'fuerais', 'fueran', 'fueras',
  'fueron', 'fuese', 'fueseis', 'fuesen', 'fueses', 'fui', 'fuimos', 'fuiste',
  'fuisteis', 'fuéramos', 'fuésemos', 'ha', 'habida', 'habidas', 'habido', 'habidos',
  'habiendo', 'habremos', 'habrá', 'habrán', 'habrás', 'habré', 'habréis', 'habría',
  'habríais', 'habríamos', 'habrían', 'habrías', 'habéis', 'había', 'habíais',
  'habíamos', 'habían', 'habías', 'han', 'has', 'hasta', 'hay', 'haya', 'hayamos',
  'hayan', 'hayas', 'hayáis', 'he', 'hemos', 'hube', 'hubiera', 'hubierais',
  'hubieran', 'hubieras', 'hubieron', 'hubiese', 'hubieseis', 'hubiesen', 'hubieses',
  'hubimos', 'hubiste', 'hubisteis', 'hubiéramos', 'hubiésemos', 'hubo', 'la', 'las',
  'le', 'les', 'lo', 'los', 'me', 'mi', 'mis', 'mucho', 'muchos', 'muy', 'más',
  'mí', 'mía', 'mías', 'mío', 'míos', 'nada', 'ni', 'no', 'nos', 'nosotras',
  'nosotros', 'nuestra', 'nuestras', 'nuestro', 'nuestros', 'o', 'os', 'otra',
  'otras', 'otro', 'otros', 'para', 'pero', 'poco', 'por', 'porque', 'que',
  'quien', 'quienes', 'qué', 'se', 'sea', 'seamos', 'sean', 'seas', 'seremos',
  'será', 'serán', 'serás', 'seré', 'seréis', 'sería', 'seríais', 'seríamos',
  'serían', 'serías', 'seáis', 'si', 'sido', 'siendo', 'sin', 'sobre', 'sois',
  'somos', 'son', 'soy', 'su', 'sus', 'suya', 'suyas', 'suyo', 'suyos', 'sí', 'también',
  'tanto', 'te', 'tendremos', 'tendrá', 'tendrán', 'tendrás', 'tendré', 'tendréis',
  'tendría', 'tendríais', 'tendríamos', 'tendrían', 'tendrías', 'tened', 'tenemos',
  'tenga', 'tengamos', 'tengan', 'tengas', 'tengo', 'tengáis', 'tenida', 'tenidas',
  'tenido', 'tenidos', 'teniendo', 'tenéis', 'tenía', 'teníais', 'teníamos', 'tenían',
  'tenías', 'ti', 'tiene', 'tienen', 'tienes', 'todo', 'todos', 'tu', 'tus', 'tuve',
  'tuviera', 'tuvierais', 'tuvieran', 'tuvieras', 'tuvieron', 'tuviese', 'tuvieseis',
  'tuviesen', 'tuvieses', 'tuvimos', 'tuviste', 'tuvisteis', 'tuviéramos',
  'tuviésemos', 'tuvo', 'tuya', 'tuyas', 'tuyo', 'tuyos', 'tú', 'un', 'una', 'uno',
  'unos', 'vosotras', 'vosotros', 'vuestra', 'vuestras', 'vuestro', 'vuestros', 'y',
  'ya', 'yo', 'él', 'éramos'
];

// Initialize tokenizer and stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

/**
 * Preprocess text for search
 * @param {string} text - Text to preprocess
 * @param {string} language - Language code ('en' or 'es')
 * @returns {Object} - Processed text data
 */
const preprocessText = (text, language = 'es') => {
  if (!text) return { original: '', processed: '', tokens: [], stems: [] };
  
  // Normalize text: lowercase, remove extra spaces, etc.
  const normalized = text.toLowerCase()
    .replace(/[^\w\s\u00C0-\u00FF]/g, ' ') // Keep Spanish accented chars
    .replace(/\s+/g, ' ')
    .trim();
  
  // Tokenize
  const tokens = tokenizer.tokenize(normalized);
  
  // Remove stopwords
  const filteredTokens = language === 'es' 
    ? tokens.filter(token => !spanishStopwords.includes(token))
    : stopword.removeStopwords(tokens);
  
  // Stem words
  const stems = filteredTokens.map(token => stemmer.stem(token));
  
  // Join processed text
  const processed = stems.join(' ');
  
  return {
    original: text,
    processed,
    tokens: filteredTokens,
    stems
  };
};

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @param {string} language - Language code ('en' or 'es')
 * @returns {Array} - Array of keywords with scores
 */
const extractKeywords = (text, language = 'es') => {
  if (!text) return [];
  
  const { tokens, stems } = preprocessText(text, language);
  
  // Count term frequency
  const termFrequency = {};
  stems.forEach(stem => {
    termFrequency[stem] = (termFrequency[stem] || 0) + 1;
  });
  
  // Calculate scores (simple TF for now)
  const keywords = Object.entries(termFrequency)
    .map(([stem, count]) => ({
      keyword: tokens.find(token => stemmer.stem(token) === stem) || stem,
      stem,
      score: count / stems.length
    }))
    .sort((a, b) => b.score - a.score);
  
  return keywords;
};

/**
 * Expand query with synonyms and related terms
 * @param {string} query - Original query
 * @param {string} language - Language code ('en' or 'es')
 * @returns {string} - Expanded query
 */
const expandQuery = (query, language = 'es') => {
  if (!query) return '';
  
  // Extract keywords
  const keywords = extractKeywords(query, language);
  
  // Spanish tech industry synonyms and related terms
  const synonymMap = {
    // Web development terms
    'web': ['sitio', 'página', 'website', 'portal', 'plataforma'],
    'desarrollo': ['programación', 'creación', 'diseño', 'construcción', 'implementación'],
    'app': ['aplicación', 'aplicativo', 'programa', 'software'],
    'móvil': ['celular', 'smartphone', 'teléfono', 'android', 'ios'],
    'diseño': ['maquetación', 'interfaz', 'ui', 'ux', 'experiencia'],
    
    // Business terms
    'precio': ['costo', 'tarifa', 'valor', 'inversión', 'presupuesto'],
    'empresa': ['compañía', 'negocio', 'organización', 'firma'],
    'servicio': ['solución', 'asistencia', 'soporte', 'ayuda'],
    
    // Tech terms
    'inteligencia artificial': ['ia', 'ai', 'machine learning', 'aprendizaje automático'],
    'datos': ['información', 'analytics', 'estadísticas', 'métricas'],
    'nube': ['cloud', 'servidor', 'hosting', 'alojamiento'],
    
    // Contact terms
    'contacto': ['comunicación', 'mensaje', 'email', 'teléfono', 'whatsapp']
  };
  
  // Expand with synonyms
  let expanded = query;
  
  // Add top keywords' synonyms to the query
  keywords.slice(0, 3).forEach(({ keyword }) => {
    const keywordLower = keyword.toLowerCase();
    const synonyms = synonymMap[keywordLower];
    
    if (synonyms && synonyms.length > 0) {
      // Add 2 random synonyms to avoid query explosion
      const selectedSynonyms = synonyms
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .filter(syn => !query.toLowerCase().includes(syn.toLowerCase()));
      
      if (selectedSynonyms.length > 0) {
        expanded += ' ' + selectedSynonyms.join(' ');
      }
    }
  });
  
  return expanded;
};

/**
 * Calculate BM25 score for keyword matching
 * @param {string} query - Search query
 * @param {Array} documents - Array of documents
 * @param {string} contentField - Field name containing document content
 * @returns {Array} - Documents with BM25 scores
 */
const calculateBM25Scores = (query, documents, contentField = 'content') => {
  if (!query || !documents || documents.length === 0) {
    return [];
  }
  
  // Preprocess query
  const { stems: queryTerms } = preprocessText(query);
  
  // Constants for BM25 algorithm
  const k1 = 1.2;  // Term frequency saturation
  const b = 0.75;  // Length normalization
  
  // Calculate average document length
  const docLengths = documents.map(doc => {
    const content = doc[contentField] || '';
    const { stems } = preprocessText(content);
    return stems.length;
  });
  
  const avgDocLength = docLengths.reduce((sum, len) => sum + len, 0) / documents.length;
  
  // Calculate IDF for each query term
  const termIDF = {};
  queryTerms.forEach(term => {
    // Count documents containing the term
    const docsWithTerm = documents.filter(doc => {
      const content = doc[contentField] || '';
      const { stems } = preprocessText(content);
      return stems.includes(term);
    }).length;
    
    // Calculate IDF using the standard formula
    termIDF[term] = Math.log(1 + (documents.length - docsWithTerm + 0.5) / (docsWithTerm + 0.5));
  });
  
  // Calculate BM25 score for each document
  return documents.map((doc, docIndex) => {
    const content = doc[contentField] || '';
    const { stems: docTerms } = preprocessText(content);
    const docLength = docLengths[docIndex];
    
    // Calculate score for this document
    let score = 0;
    queryTerms.forEach(term => {
      // Count term frequency in document
      const termFreq = docTerms.filter(t => t === term).length;
      
      if (termFreq > 0) {
        // BM25 formula
        const numerator = termFreq * (k1 + 1);
        const denominator = termFreq + k1 * (1 - b + b * (docLength / avgDocLength));
        score += termIDF[term] * (numerator / denominator);
      }
    });
    
    return {
      ...doc,
      bm25Score: score
    };
  });
};

module.exports = {
  preprocessText,
  extractKeywords,
  expandQuery,
  calculateBM25Scores
};
