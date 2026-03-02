import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial2 = () => {
  const tutorial = {
    id: 2,
    title: "Autenticación JWT para APIs REST con Node.js",
    date: "20 de Julio, 2025",
    author: "Andy Amador",
    difficulty: "Intermediate",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial2.jpg'),
    introduction: "La seguridad es un aspecto fundamental en el desarrollo de APIs REST. JSON Web Tokens (JWT) se ha convertido en uno de los estándares más populares para implementar autenticación y autorización en aplicaciones web modernas, especialmente en arquitecturas sin estado (stateless).\n\nEn este tutorial, aprenderás a implementar un sistema de autenticación completo utilizando JWT en una API REST desarrollada con Node.js y Express. Cubriremos el registro de usuarios, inicio de sesión, protección de rutas y renovación de tokens, todo siguiendo las mejores prácticas de seguridad."
  };
  
  const sections = [
    {
      title: "Requisitos previos",
      content: "Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:\n\n- Node.js (versión 14.x o superior)\n- npm (normalmente se instala con Node.js)\n- MongoDB (local o en la nube)\n- Conocimientos básicos de APIs REST y Express\n- Familiaridad con los conceptos de autenticación y autorización",
      isStep: false
    },
    {
      title: "Configuración del proyecto",
      content: "Comenzaremos creando un nuevo proyecto de Node.js o utilizando uno existente. Si estás partiendo desde cero, sigue estos pasos:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "mkdir jwt-auth-api\ncd jwt-auth-api\nnpm init -y\nnpm install express mongoose bcryptjs jsonwebtoken dotenv cors\nnpm install --save-dev nodemon"
        }
      ],
      note: "Estamos instalando bcryptjs para el hash de contraseñas y jsonwebtoken para manejar los tokens JWT."
    },
    {
      title: "Estructura del proyecto",
      content: "Organizaremos nuestro proyecto con la siguiente estructura de directorios:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "mkdir src\nmkdir src/controllers\nmkdir src/models\nmkdir src/routes\nmkdir src/middleware\nmkdir src/config\ntouch .env\ntouch src/app.js\ntouch src/server.js"
        }
      ]
    },
    {
      title: "Configuración básica de Express",
      content: "Configuremos nuestra aplicación Express en el archivo app.js:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/app.js\nconst express = require('express');\nconst cors = require('cors');\nrequire('dotenv').config();\n\nconst app = express();\n\n// Middleware\napp.use(cors());\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\n// Ruta de prueba\napp.get('/', (req, res) => {\n  res.json({ message: 'API de autenticación JWT' });\n});\n\n// Exportar la app\nmodule.exports = app;"
        }
      ]
    },
    {
      title: "Configuración del servidor",
      content: "Ahora configuremos el archivo server.js para iniciar nuestra aplicación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/server.js\nconst app = require('./app');\nconst connectDB = require('./config/database');\n\n// Conectar a la base de datos\nconnectDB();\n\nconst PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n  console.log(`Servidor corriendo en el puerto ${PORT}`);\n});"
        }
      ]
    },
    {
      title: "Configuración de la base de datos",
      content: "Crearemos un archivo de configuración para conectarnos a MongoDB:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/config/database.js\nconst mongoose = require('mongoose');\n\nconst connectDB = async () => {\n  try {\n    const connection = await mongoose.connect(process.env.MONGO_URI, {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n    });\n    console.log(`MongoDB conectado: ${connection.connection.host}`);\n  } catch (error) {\n    console.error(`Error: ${error.message}`);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;"
        }
      ],
      tip: "Crea un archivo .env en la raíz del proyecto y añade tu cadena de conexión a MongoDB: MONGO_URI=mongodb://localhost:27017/jwt-auth-api"
    },
    {
      title: "Modelo de usuario",
      content: "Ahora definiremos el modelo de usuario que utilizaremos para la autenticación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/models/User.js\nconst mongoose = require('mongoose');\nconst bcrypt = require('bcryptjs');\n\nconst UserSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: [true, 'Por favor ingrese su nombre'],\n    trim: true,\n    maxlength: [50, 'El nombre no puede tener más de 50 caracteres']\n  },\n  email: {\n    type: String,\n    required: [true, 'Por favor ingrese su email'],\n    unique: true,\n    match: [\n      /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\n      'Por favor ingrese un email válido'\n    ]\n  },\n  password: {\n    type: String,\n    required: [true, 'Por favor ingrese una contraseña'],\n    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],\n    select: false // No devolver la contraseña en las consultas\n  },\n  role: {\n    type: String,\n    enum: ['user', 'admin'],\n    default: 'user'\n  },\n  createdAt: {\n    type: Date,\n    default: Date.now\n  }\n});\n\n// Encriptar contraseña antes de guardar\nUserSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) {\n    next();\n  }\n  \n  const salt = await bcrypt.genSalt(10);\n  this.password = await bcrypt.hash(this.password, salt);\n});\n\n// Método para comparar contraseñas\nUserSchema.methods.matchPassword = async function(enteredPassword) {\n  return await bcrypt.compare(enteredPassword, this.password);\n};\n\nmodule.exports = mongoose.model('User', UserSchema);"
        }
      ]
    },
    {
      title: "Middleware de autenticación",
      content: "Crearemos un middleware para proteger rutas que requieran autenticación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/middleware/auth.js\nconst jwt = require('jsonwebtoken');\nconst User = require('../models/User');\n\nexports.protect = async (req, res, next) => {\n  let token;\n  \n  // Verificar si el token está en los headers\n  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {\n    token = req.headers.authorization.split(' ')[1];\n  }\n  \n  // Verificar si el token existe\n  if (!token) {\n    return res.status(401).json({\n      success: false,\n      message: 'No autorizado para acceder a esta ruta'\n    });\n  }\n  \n  try {\n    // Verificar el token\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    \n    // Añadir el usuario al request\n    req.user = await User.findById(decoded.id);\n    \n    next();\n  } catch (error) {\n    return res.status(401).json({\n      success: false,\n      message: 'No autorizado para acceder a esta ruta'\n    });\n  }\n};\n\n// Middleware para roles\nexports.authorize = (...roles) => {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({\n        success: false,\n        message: `El rol ${req.user.role} no está autorizado para acceder a esta ruta`\n      });\n    }\n    next();\n  };\n};"
        }
      ]
    },
    {
      title: "Controlador de autenticación",
      content: "Ahora implementaremos el controlador para manejar el registro e inicio de sesión de usuarios:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/controllers/authController.js\nconst User = require('../models/User');\nconst jwt = require('jsonwebtoken');\n\n// Generar token JWT\nconst generateToken = (id) => {\n  return jwt.sign({ id }, process.env.JWT_SECRET, {\n    expiresIn: process.env.JWT_EXPIRE\n  });\n};\n\n// Registrar usuario\nexports.register = async (req, res) => {\n  try {\n    const { name, email, password } = req.body;\n    \n    // Verificar si el usuario ya existe\n    const userExists = await User.findOne({ email });\n    \n    if (userExists) {\n      return res.status(400).json({\n        success: false,\n        message: 'El email ya está registrado'\n      });\n    }\n    \n    // Crear nuevo usuario\n    const user = await User.create({\n      name,\n      email,\n      password\n    });\n    \n    // Generar token\n    const token = generateToken(user._id);\n    \n    res.status(201).json({\n      success: true,\n      token,\n      user: {\n        id: user._id,\n        name: user.name,\n        email: user.email,\n        role: user.role\n      }\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      message: 'Error al registrar usuario',\n      error: error.message\n    });\n  }\n};\n\n// Iniciar sesión\nexports.login = async (req, res) => {\n  try {\n    const { email, password } = req.body;\n    \n    // Validar email y password\n    if (!email || !password) {\n      return res.status(400).json({\n        success: false,\n        message: 'Por favor proporcione email y contraseña'\n      });\n    }\n    \n    // Verificar si el usuario existe\n    const user = await User.findOne({ email }).select('+password');\n    \n    if (!user) {\n      return res.status(401).json({\n        success: false,\n        message: 'Credenciales inválidas'\n      });\n    }\n    \n    // Verificar si la contraseña coincide\n    const isMatch = await user.matchPassword(password);\n    \n    if (!isMatch) {\n      return res.status(401).json({\n        success: false,\n        message: 'Credenciales inválidas'\n      });\n    }\n    \n    // Generar token\n    const token = generateToken(user._id);\n    \n    res.status(200).json({\n      success: true,\n      token,\n      user: {\n        id: user._id,\n        name: user.name,\n        email: user.email,\n        role: user.role\n      }\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      message: 'Error al iniciar sesión',\n      error: error.message\n    });\n  }\n};\n\n// Obtener usuario actual\nexports.getMe = async (req, res) => {\n  try {\n    const user = await User.findById(req.user.id);\n    \n    res.status(200).json({\n      success: true,\n      user: {\n        id: user._id,\n        name: user.name,\n        email: user.email,\n        role: user.role\n      }\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      message: 'Error al obtener información del usuario',\n      error: error.message\n    });\n  }\n};"
        }
      ]
    },
    {
      title: "Rutas de autenticación",
      content: "Ahora definiremos las rutas para nuestros endpoints de autenticación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/routes/authRoutes.js\nconst express = require('express');\nconst { register, login, getMe } = require('../controllers/authController');\nconst { protect } = require('../middleware/auth');\n\nconst router = express.Router();\n\nrouter.post('/register', register);\nrouter.post('/login', login);\nrouter.get('/me', protect, getMe);\n\nmodule.exports = router;"
        }
      ]
    },
    {
      title: "Integración de las rutas en la aplicación",
      content: "Finalmente, integremos las rutas de autenticación en nuestra aplicación principal:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/app.js (actualizado)\nconst express = require('express');\nconst cors = require('cors');\nrequire('dotenv').config();\n\n// Importar rutas\nconst authRoutes = require('./routes/authRoutes');\n\nconst app = express();\n\n// Middleware\napp.use(cors());\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\n// Ruta de prueba\napp.get('/', (req, res) => {\n  res.json({ message: 'API de autenticación JWT' });\n});\n\n// Montar rutas\napp.use('/api/auth', authRoutes);\n\n// Exportar la app\nmodule.exports = app;"
        }
      ]
    },
    {
      title: "Configuración de variables de entorno",
      content: "Crea un archivo .env en la raíz del proyecto con las siguientes variables:",
      isStep: true,
      code: [
        {
          language: "plaintext",
          code: "PORT=3000\nMONGO_URI=mongodb://localhost:27017/jwt-auth-api\nJWT_SECRET=tu_secreto_super_seguro\nJWT_EXPIRE=30d"
        }
      ],
      warning: "En un entorno de producción, asegúrate de usar un JWT_SECRET fuerte y único, y considera almacenar estas variables de forma segura."
    },
    {
      title: "Probando la API",
      content: "Ahora podemos probar nuestra API de autenticación. Inicia el servidor con:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm run dev"
        }
      ],
      subsections: ["Registro de usuario", "Inicio de sesión", "Acceso a ruta protegida"],
      subsectionContent: [
        "Envía una solicitud POST a http://localhost:3000/api/auth/register con el siguiente cuerpo JSON:\n```json\n{\n  \"name\": \"Usuario Prueba\",\n  \"email\": \"usuario@ejemplo.com\",\n  \"password\": \"123456\"\n}\n```",
        "Envía una solicitud POST a http://localhost:3000/api/auth/login con el siguiente cuerpo JSON:\n```json\n{\n  \"email\": \"usuario@ejemplo.com\",\n  \"password\": \"123456\"\n}\n```\nEsto te devolverá un token JWT.",
        "Envía una solicitud GET a http://localhost:3000/api/auth/me incluyendo el token en el header:\n```\nAuthorization: Bearer tu_token_jwt\n```"
      ]
    },
    {
      title: "Conclusión",
      content: "¡Felicidades! Has implementado un sistema de autenticación completo utilizando JWT en tu API REST con Node.js y Express. Este sistema proporciona una base sólida para la seguridad de tu aplicación, permitiendo el registro de usuarios, inicio de sesión y protección de rutas.\n\nRecuerda que este es solo el punto de partida. En un entorno de producción, deberías considerar características adicionales como:\n\n- Renovación de tokens\n- Revocación de tokens\n- Recuperación de contraseñas\n- Verificación de email\n- Implementación de HTTPS\n- Protección contra ataques comunes (CSRF, XSS, etc.)\n\nLa seguridad es un proceso continuo, así que mantente actualizado sobre las mejores prácticas y vulnerabilidades emergentes.",
      isStep: false
    }
  ];
  
  const relatedTutorials = [
    {
      id: 1,
      title: "Cómo Crear una API REST con Node.js y Express",
      difficulty: "Intermediate",
      image: "/media/tutorial-api.webp"
    },
    {
      id: 4,
      title: "Desplegando una API Node.js en AWS",
      difficulty: "Advanced",
      image: "/media/tutorial-aws.webp"
    },
    {
      id: 3,
      title: "Creando una aplicación React que consume una API REST",
      difficulty: "Intermediate",
      image: "/media/tutorial-react.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Autenticación JWT para APIs REST con Node.js | Tecniweb Latam</title>
        <meta name="description" content="Aprende a implementar un sistema de autenticación seguro utilizando JSON Web Tokens (JWT) en tu API REST de Node.js para proteger rutas y recursos." />
        <meta name="keywords" content="JWT, autenticación, Node.js, Express, API REST, seguridad, tokens, JSON Web Tokens" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial2;
