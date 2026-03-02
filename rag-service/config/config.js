require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

// Determine environment
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// Environment-specific configurations
const envConfig = {
  development: {
    server: {
      port: process.env.RAG_BOT_PORT || 5005,
      host: 'localhost',
      baseUrl: 'http://localhost:5005',
    },
    cors: {
      origins: [
        'http://localhost:3000',    // React dev server
        'http://localhost:5010',    // Main server (preferred port)
        'http://localhost:5011',    // Main server (auto-detected port)
        'http://localhost:5012',    // Main server (backup port)
        'http://localhost:5013',    // Main server (backup port)
        'http://localhost:5014',    // Main server (backup port)
        'http://localhost:5015',    // Main server (backup port)
        'https://sitio3-prueba.tecniweb.lat', // Preproduction URL
      ],
      strictValidation: false,
    },
    security: {
      validateOrigin: false,
      rateLimitRequests: false,
    }
  },
  production: {
    server: {
      port: process.env.RAG_BOT_PORT || 5005,
      host: 'ragbot.tecniweb.lat',
      baseUrl: 'https://ragbot.tecniweb.lat',
    },
    cors: {
      origins: [
        'https://tecniweb.lat',
        'https://www.tecniweb.lat',
        'https://sitio3-prueba.tecniweb.lat' // Preproduction URL
      ],
      strictValidation: true,
    },
    security: {
      validateOrigin: true,
      rateLimitRequests: true,
      allowedDomains: ['tecniweb.lat', 'www.tecniweb.lat', 'sitio3-prueba.tecniweb.lat'],
    }
  }
};

// Configuration object
const config = {
  // Server configuration
  server: {
    port: envConfig[nodeEnv].server.port,
    host: envConfig[nodeEnv].server.host,
    baseUrl: envConfig[nodeEnv].server.baseUrl,
    env: nodeEnv,
  },
  
  // CORS configuration
  cors: {
    origins: envConfig[nodeEnv].cors.origins,
    strictValidation: envConfig[nodeEnv].cors.strictValidation,
  },
  
  // Security configuration
  security: envConfig[nodeEnv].security,
  
  // Google API configuration
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.0-flash', // Default model
  },
  
  // RAG configuration
  rag: {
    chunkSize: 1000,
    chunkOverlap: 200,
    topK: 5, // Number of documents to retrieve
  },
  
  // API rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production, more in development
    skipInDevelopment: !isProd,
  },
};

module.exports = config;
