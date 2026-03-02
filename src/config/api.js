/**
 * API configuration for the Tecniweb Latam website
 * This file provides environment-specific API endpoints and configuration
 */

// Detect the current environment based on hostname
// Local development hostnames include localhost and 127.0.0.1
const hostname = window.location.hostname;
const isDevelopment = hostname === 'localhost' || hostname === '127.0.0.1';

// Detect if we're running in the preproduction environment
const isPreproduction = hostname === 'sitio3-prueba.tecniweb.lat';

// API configuration based on environment
const apiConfig = {
  // RAG Bot service endpoints
  ragBot: {
    baseUrl: isDevelopment 
      ? 'http://localhost:5020/api/bot' 
      : isPreproduction
        ? 'https://ragbot.tecniweb.lat/api/bot'
        : 'https://ragbot.tecniweb.lat/api/bot',
    endpoints: {
      query: '/query',
      upload: '/upload',
      documents: '/documents',
      deleteDocument: '/documents'
    },
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-From': 'tecniweb-frontend'
    }
  }
};

export default apiConfig;
