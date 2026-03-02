const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../../config/config');

// Import controllers
const botController = require('../controllers/botController');

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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../data/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    // Accept only PDF, TXT, DOCX, and MD files
    const filetypes = /pdf|txt|docx|md/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, TXT, DOCX, and MD files are allowed'));
    }
  }
});

// Bot query endpoint - apply origin validation in production
router.post('/query', validateOrigin, botController.handleQuery);

// Document upload endpoint - apply origin validation in production
router.post('/upload', validateOrigin, upload.single('document'), botController.handleDocumentUpload);

// Knowledge base management endpoints - apply origin validation in production
router.get('/documents', validateOrigin, botController.listDocuments);
router.delete('/documents/:id', validateOrigin, botController.deleteDocument);

module.exports = router;
