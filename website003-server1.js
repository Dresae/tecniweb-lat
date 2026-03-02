require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const net = require('net');

// Import environment configuration
const envConfig = require('./config/env');

// Server variables
const app = express();
const PREFERRED_PORT = envConfig.server.port;

// Simple function to find next available port
const findAvailablePort = async (startPort) => {
  for (let port = startPort; port < startPort + 10; port++) {
    try {
      await new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(port, () => {
          server.close(resolve);
        });
        server.on('error', reject);
      });
      return port;
    } catch (err) {
      continue;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
};

// Middleware with specific CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin in development mode
    if (!origin) {
      return callback(null, !envConfig.isProd);
    }
    
    if (envConfig.cors.origins.indexOf(origin) === -1) {
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

// Log environment information
console.log(`Starting server in ${envConfig.env} mode`);
console.log(`Server host: ${envConfig.server.host}`);
console.log(`RAG service: ${envConfig.ragService.baseUrl}`);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Origin validation middleware for sensitive endpoints
const validateOrigin = (req, res, next) => {
  // Skip validation if not required by config
  if (!envConfig.security.validateOrigin) {
    return next();
  }
  
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // In production, validate the origin
  const isValidOrigin = origin && envConfig.security.allowedDomains.some(domain => 
    origin.includes(domain));
  
  const isValidReferer = referer && envConfig.security.allowedDomains.some(domain => 
    referer.includes(domain));
  
  if (isValidOrigin || isValidReferer) {
    return next();
  }
  
  res.status(403).json({
    error: {
      message: 'Access denied: invalid origin',
      status: 403
    }
  });
};

// Import RAG bot service routes
const ragBotRoutes = require('./rag-service/src/routes/botRoutes');

// Mount RAG bot service routes with origin validation
app.use('/api/bot', validateOrigin, ragBotRoutes);

// API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, contactHours, serviceType, message } = req.body;
  
  try {
    // Configure nodemailer (in production, use environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo contacto de ${name} - Tecniweb Latam`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Horario de contacto:</strong> ${contactHours}</p>
        <p><strong>Tipo de servicio:</strong> ${serviceType}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
  }
});

// API route for cost calculator
app.post('/api/calculate', async (req, res) => {
  const { industry, businessSize, technology, appType, clientInfo } = req.body;
  
  // Simple calculation logic (in a real app, this would be more complex)
  let basePrice = 5000000; // Base price in Colombian pesos
  
  // Adjust based on industry
  const industryMultipliers = {
    'retail': 1.0,
    'healthcare': 1.2,
    'finance': 1.3,
    'education': 0.9,
    'manufacturing': 1.1,
    'other': 1.0
  };
  
  // Adjust based on business size
  const sizeMultipliers = {
    'small': 0.8,
    'medium': 1.0,
    'large': 1.3
  };
  
  // Adjust based on technology complexity
  const techMultipliers = {
    'basic': 0.7,
    'standard': 1.0,
    'advanced': 1.4,
    'ai': 1.8
  };
  
  // Adjust based on app type
  const appTypeMultipliers = {
    'web': 1.0,
    'mobile': 1.2,
    'desktop': 1.1,
    'fullstack': 1.5
  };
  
  // Calculate final price
  const finalPrice = basePrice * 
    (industryMultipliers[industry] || 1.0) * 
    (sizeMultipliers[businessSize] || 1.0) * 
    (techMultipliers[technology] || 1.0) * 
    (appTypeMultipliers[appType] || 1.0);
  
  // Send email with calculation if client info provided
  if (clientInfo && clientInfo.email) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: clientInfo.email,
        subject: 'Tu estimación de costos - Tecniweb Latam',
        html: `
          <h2>Estimación de costos para tu proyecto</h2>
          <p><strong>Industria:</strong> ${industry}</p>
          <p><strong>Tamaño de empresa:</strong> ${businessSize}</p>
          <p><strong>Tecnología:</strong> ${technology}</p>
          <p><strong>Tipo de aplicación:</strong> ${appType}</p>
          <p><strong>Precio estimado:</strong> COP ${finalPrice.toLocaleString('es-CO')}</p>
          <p>Un representante de Tecniweb Latam se pondrá en contacto contigo pronto para discutir los detalles de tu proyecto.</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  res.status(200).json({ 
    success: true, 
    price: finalPrice,
    formattedPrice: finalPrice.toLocaleString('es-CO')
  });
});

// Newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  
  try {
    // In a real app, you would save this to a database
    // For now, just send a confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Gracias por suscribirte - Tecniweb Latam',
      html: `
        <h2>¡Gracias por suscribirte!</h2>
        <p>Ahora recibirás actualizaciones y novedades de Tecniweb Latam.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Suscripción exitosa' });
  } catch (error) {
    console.error('Error in subscription:', error);
    res.status(500).json({ success: false, message: 'Error en la suscripción' });
  }
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Create uploads directory for RAG bot service if it doesn't exist
const uploadsDir = path.join(__dirname, 'rag-service/data/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create vectors directory for RAG bot service if it doesn't exist
const vectorsDir = path.join(__dirname, 'rag-service/data/vectors');
if (!fs.existsSync(vectorsDir)) {
  fs.mkdirSync(vectorsDir, { recursive: true });
}

// Create documents directory for RAG bot service if it doesn't exist
const documentsDir = path.join(__dirname, 'rag-service/data/documents');
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true });
}

// Initialize vectors.json if it doesn't exist
const vectorsJsonPath = path.join(vectorsDir, 'vectors.json');
if (!fs.existsSync(vectorsJsonPath)) {
  fs.writeFileSync(vectorsJsonPath, JSON.stringify([], null, 2));
}

// Initialize documents.json if it doesn't exist
const documentsJsonPath = path.join(documentsDir, 'documents.json');
if (!fs.existsSync(documentsJsonPath)) {
  fs.writeFileSync(documentsJsonPath, JSON.stringify([], null, 2));
}

// Start server with simple port resolution
(async () => {
  try {
    const availablePort = await findAvailablePort(PREFERRED_PORT);
    
    app.listen(availablePort, () => {
      console.log(`Server running on port ${availablePort} in ${process.env.NODE_ENV || 'development'} mode`);
      if (availablePort !== PREFERRED_PORT) {
        console.log(`Note: Preferred port ${PREFERRED_PORT} was busy, using ${availablePort} instead`);
      }
      console.log(`Serving static files from: ${path.join(__dirname, 'build')}`);
      console.log(`RAG Bot Service initialized and ready`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();
