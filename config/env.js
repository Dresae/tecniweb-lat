/**
 * Environment configuration for the Tecniweb Latam website
 * This file provides environment-specific configuration for both development and production
 */

// Determine the current environment
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// Environment-specific configurations
const envConfig = {
  development: {
    server: {
      port: parseInt(process.env.PORT) || 5010,
      host: 'localhost',
      baseUrl: 'http://localhost:5010',
    },
    ragService: {
      port: parseInt(process.env.RAG_BOT_PORT) || 5020,
      host: 'localhost',
      baseUrl: 'http://localhost:5020',
      apiPath: '/api/bot',
    },
    cors: {
      origins: [
        'http://localhost:3000',
        'http://localhost:5010',
        'http://localhost:5020',
        'https://sitio3-prueba.tecniweb.lat',
      ],
    },
    security: {
      validateOrigin: false,
      rateLimitRequests: false,
    }
  },
  production: {
    server: {
      port: parseInt(process.env.PORT) || 5010,
      host: 'tecniweb.lat',
      baseUrl: 'https://tecniweb.lat',
    },
    ragService: {
      port: parseInt(process.env.RAG_BOT_PORT) || 5020,
      host: 'ragbot.tecniweb.lat',
      baseUrl: 'https://ragbot.tecniweb.lat',
      apiPath: '/api/bot',
    },
    cors: {
      origins: [
        'https://tecniweb.lat',
        'https://www.tecniweb.lat',
        'https://ragbot.tecniweb.lat',
        'https://sitio3-prueba.tecniweb.lat',
      ],
    },
    security: {
      validateOrigin: true,
      rateLimitRequests: true,
      allowedDomains: ['tecniweb.lat', 'www.tecniweb.lat', 'ragbot.tecniweb.lat', 'sitio3-prueba.tecniweb.lat'],
    }
  }
};

// Export the configuration
module.exports = {
  // Current environment
  env: nodeEnv,
  isProd,
  
  // Server configuration
  server: envConfig[nodeEnv].server,
  
  // RAG Service configuration
  ragService: envConfig[nodeEnv].ragService,
  
  // CORS configuration
  cors: envConfig[nodeEnv].cors,
  
  // Security configuration
  security: envConfig[nodeEnv].security,
  
  // Full environment config (for debugging)
  fullConfig: envConfig[nodeEnv]
};
