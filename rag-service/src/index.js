const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('../config/config');

// Import routes
const botRoutes = require('./routes/botRoutes');

// Initialize express app
const app = express();

// Apply middleware with specific CORS configuration based on environment
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests) in development
    if (!origin) {
      return callback(null, !config.cors.strictValidation);
    }
    
    if (config.cors.origins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-From'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting in development mode
  skip: (req) => config.rateLimit.skipInDevelopment
});

// Apply rate limiter to all requests
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.server.env
  });
});

// Origin validation middleware for sensitive endpoints
const validateOrigin = (req, res, next) => {
  // Skip validation if not required by config
  if (!config.security.validateOrigin) {
    return next();
  }
  
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const xRequestedFrom = req.headers['x-requested-from'];
  
  // Validate origin against allowed domains
  const isValidOrigin = origin && config.security.allowedDomains.some(domain => 
    origin.includes(domain));
  
  // Validate referer against allowed domains
  const isValidReferer = referer && config.security.allowedDomains.some(domain => 
    referer.includes(domain));
    
  // Check for the custom header we set in the frontend
  const hasValidHeader = xRequestedFrom === 'tecniweb-frontend';
  
  if (isValidOrigin || isValidReferer || hasValidHeader) {
    return next();
  }
  
  console.log('Access denied: invalid origin', {
    origin,
    referer,
    xRequestedFrom
  });
  
  res.status(403).json({
    error: {
      message: 'Access denied: invalid origin',
      status: 403
    }
  });
};

// Apply routes
app.use('/api/bot', botRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start the server
app.listen(config.server.port, () => {
  console.log(`RAG Bot Service running on port ${config.server.port} in ${config.server.env} mode`);
  console.log(`Server host: ${config.server.host}`);
  console.log(`Base URL: ${config.server.baseUrl}`);
  console.log(`CORS origins: ${config.cors.origins.join(', ')}`);
  console.log(`Origin validation: ${config.security.validateOrigin ? 'Enabled' : 'Disabled'}`);
  console.log(`Rate limiting: ${config.security.rateLimitRequests ? 'Enabled' : 'Disabled'}`);
  console.log(`Google API Key loaded: ${config.google.apiKey ? 'Yes' : 'No'}`);
});

module.exports = app;
