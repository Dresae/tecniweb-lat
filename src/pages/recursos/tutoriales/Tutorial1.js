import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial1 = () => {
  const tutorial = {
    id: 1,
    title: "Cómo Crear una API REST con Node.js y Express",
    date: "15 de Julio, 2025",
    author: "Andy Amador",
    difficulty: "Intermediate",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial1.jpg'),
    introduction: "Las APIs REST se han convertido en un componente fundamental para el desarrollo de aplicaciones web modernas. Permiten la comunicación entre diferentes sistemas de software de manera eficiente y estandarizada, facilitando la integración de servicios y la creación de arquitecturas escalables.\n\nEn este tutorial, aprenderás a crear una API REST completa utilizando Node.js y Express, uno de los frameworks más populares para el desarrollo de aplicaciones web en JavaScript. Cubriremos desde la configuración inicial del proyecto hasta la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar), autenticación básica y buenas prácticas para el diseño de APIs."
  };
  
  const sections = [
    {
      title: "Requisitos previos",
      content: "Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:\n\n- Node.js (versión 14.x o superior)\n- npm (normalmente se instala con Node.js)\n- Un editor de código como Visual Studio Code, Sublime Text o Atom\n- Conocimientos básicos de JavaScript y programación asíncrona\n- Familiaridad con los conceptos básicos de HTTP y APIs REST",
      isStep: false
    },
    {
      title: "Configuración del proyecto",
      content: "Comencemos creando la estructura básica de nuestro proyecto. Abre tu terminal y sigue estos pasos para crear un nuevo proyecto de Node.js:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "mkdir api-rest-tutorial\ncd api-rest-tutorial\nnpm init -y"
        }
      ],
      note: "El comando npm init -y crea un archivo package.json con valores predeterminados. Si prefieres personalizar la configuración, omite el flag -y."
    },
    {
      title: "Instalación de dependencias",
      content: "Ahora, instalaremos las dependencias necesarias para nuestro proyecto. Principalmente necesitaremos Express como framework web, pero también agregaremos otras bibliotecas útiles:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm install express body-parser cors dotenv mongoose\nnpm install --save-dev nodemon"
        }
      ],
      subsections: ["Explicación de las dependencias"],
      subsectionContent: ["- **express**: Framework web minimalista y flexible para Node.js\n- **body-parser**: Middleware para analizar los cuerpos de las solicitudes HTTP\n- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)\n- **dotenv**: Para cargar variables de entorno desde un archivo .env\n- **mongoose**: ODM (Object Data Modeling) para MongoDB\n- **nodemon**: Herramienta de desarrollo que reinicia automáticamente la aplicación cuando detecta cambios en los archivos"]
    },
    {
      title: "Estructura del proyecto",
      content: "Vamos a crear una estructura de directorios organizada para nuestro proyecto. Esta estructura nos ayudará a mantener nuestro código limpio y modular a medida que la aplicación crezca:",
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
      content: "Ahora configuraremos nuestra aplicación Express. Primero, vamos a crear el archivo principal de la aplicación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/app.js\nconst express = require('express');\nconst bodyParser = require('body-parser');\nconst cors = require('cors');\nrequire('dotenv').config();\n\nconst app = express();\n\n// Middleware\napp.use(cors());\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: true }));\n\n// Ruta de prueba\napp.get('/', (req, res) => {\n  res.json({ message: 'Bienvenido a nuestra API REST' });\n});\n\n// Exportar la app\nmodule.exports = app;"
        }
      ]
    },
    {
      title: "Configuración del servidor",
      content: "A continuación, configuraremos el archivo del servidor que iniciará nuestra aplicación:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/server.js\nconst app = require('./app');\n\nconst PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n  console.log(`Servidor corriendo en el puerto ${PORT}`);\n});"
        }
      ]
    },
    {
      title: "Configuración de MongoDB con Mongoose",
      content: "Para almacenar nuestros datos, utilizaremos MongoDB junto con Mongoose. Primero, creemos un archivo de configuración para la conexión a la base de datos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/config/database.js\nconst mongoose = require('mongoose');\n\nconst connectDB = async () => {\n  try {\n    const connection = await mongoose.connect(process.env.MONGO_URI, {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n    });\n    console.log(`MongoDB conectado: ${connection.connection.host}`);\n  } catch (error) {\n    console.error(`Error: ${error.message}`);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;"
        }
      ],
      tip: "Asegúrate de tener MongoDB instalado localmente o utiliza un servicio en la nube como MongoDB Atlas para tu base de datos."
    },
    {
      title: "Creación del modelo de datos",
      content: "Ahora definiremos un modelo para nuestros datos. En este ejemplo, crearemos un modelo simple para gestionar productos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/models/Product.js\nconst mongoose = require('mongoose');\n\nconst ProductSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: [true, 'Por favor ingrese el nombre del producto'],\n    trim: true,\n    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']\n  },\n  description: {\n    type: String,\n    required: [true, 'Por favor ingrese la descripción del producto'],\n    maxlength: [500, 'La descripción no puede tener más de 500 caracteres']\n  },\n  price: {\n    type: Number,\n    required: [true, 'Por favor ingrese el precio del producto'],\n    min: [0, 'El precio no puede ser negativo']\n  },\n  category: {\n    type: String,\n    required: [true, 'Por favor seleccione la categoría del producto'],\n    enum: {\n      values: ['Electrónica', 'Ropa', 'Hogar', 'Alimentos', 'Otros'],\n      message: '{VALUE} no es una categoría válida'\n    }\n  },\n  stock: {\n    type: Number,\n    required: [true, 'Por favor ingrese la cantidad en stock'],\n    min: [0, 'El stock no puede ser negativo'],\n    default: 0\n  },\n  createdAt: {\n    type: Date,\n    default: Date.now\n  }\n});\n\nmodule.exports = mongoose.model('Product', ProductSchema);"
        }
      ]
    },
    {
      title: "Implementación de controladores",
      content: "Los controladores manejarán la lógica de negocio de nuestra API. Vamos a crear un controlador para los productos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/controllers/productController.js\nconst Product = require('../models/Product');\n\n// Obtener todos los productos\nexports.getProducts = async (req, res) => {\n  try {\n    const products = await Product.find();\n    res.status(200).json({\n      success: true,\n      count: products.length,\n      data: products\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: 'Error del servidor'\n    });\n  }\n};\n\n// Obtener un producto por ID\nexports.getProduct = async (req, res) => {\n  try {\n    const product = await Product.findById(req.params.id);\n    \n    if (!product) {\n      return res.status(404).json({\n        success: false,\n        error: 'Producto no encontrado'\n      });\n    }\n    \n    res.status(200).json({\n      success: true,\n      data: product\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: 'Error del servidor'\n    });\n  }\n};\n\n// Crear un nuevo producto\nexports.createProduct = async (req, res) => {\n  try {\n    const product = await Product.create(req.body);\n    \n    res.status(201).json({\n      success: true,\n      data: product\n    });\n  } catch (error) {\n    if (error.name === 'ValidationError') {\n      const messages = Object.values(error.errors).map(val => val.message);\n      \n      return res.status(400).json({\n        success: false,\n        error: messages\n      });\n    } else {\n      res.status(500).json({\n        success: false,\n        error: 'Error del servidor'\n      });\n    }\n  }\n};\n\n// Actualizar un producto\nexports.updateProduct = async (req, res) => {\n  try {\n    const product = await Product.findByIdAndUpdate(\n      req.params.id,\n      req.body,\n      {\n        new: true,\n        runValidators: true\n      }\n    );\n    \n    if (!product) {\n      return res.status(404).json({\n        success: false,\n        error: 'Producto no encontrado'\n      });\n    }\n    \n    res.status(200).json({\n      success: true,\n      data: product\n    });\n  } catch (error) {\n    if (error.name === 'ValidationError') {\n      const messages = Object.values(error.errors).map(val => val.message);\n      \n      return res.status(400).json({\n        success: false,\n        error: messages\n      });\n    } else {\n      res.status(500).json({\n        success: false,\n        error: 'Error del servidor'\n      });\n    }\n  }\n};\n\n// Eliminar un producto\nexports.deleteProduct = async (req, res) => {\n  try {\n    const product = await Product.findByIdAndDelete(req.params.id);\n    \n    if (!product) {\n      return res.status(404).json({\n        success: false,\n        error: 'Producto no encontrado'\n      });\n    }\n    \n    res.status(200).json({\n      success: true,\n      data: {}\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: 'Error del servidor'\n    });\n  }\n};"
        }
      ]
    },
    {
      title: "Creación de rutas",
      content: "Ahora definiremos las rutas para nuestra API de productos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/routes/productRoutes.js\nconst express = require('express');\nconst router = express.Router();\nconst { \n  getProducts, \n  getProduct, \n  createProduct, \n  updateProduct, \n  deleteProduct \n} = require('../controllers/productController');\n\nrouter\n  .route('/')\n  .get(getProducts)\n  .post(createProduct);\n\nrouter\n  .route('/:id')\n  .get(getProduct)\n  .put(updateProduct)\n  .delete(deleteProduct);\n\nmodule.exports = router;"
        }
      ]
    },
    {
      title: "Integración de rutas en la aplicación",
      content: "Ahora integraremos nuestras rutas en la aplicación principal:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/app.js (actualizado)\nconst express = require('express');\nconst bodyParser = require('body-parser');\nconst cors = require('cors');\nrequire('dotenv').config();\nconst connectDB = require('./config/database');\n\n// Importar rutas\nconst productRoutes = require('./routes/productRoutes');\n\n// Conectar a la base de datos\nconnectDB();\n\nconst app = express();\n\n// Middleware\napp.use(cors());\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: true }));\n\n// Ruta de prueba\napp.get('/', (req, res) => {\n  res.json({ message: 'Bienvenido a nuestra API REST' });\n});\n\n// Montar rutas\napp.use('/api/products', productRoutes);\n\n// Middleware para manejo de errores 404\napp.use((req, res, next) => {\n  res.status(404).json({\n    success: false,\n    error: 'Ruta no encontrada'\n  });\n});\n\n// Exportar la app\nmodule.exports = app;"
        }
      ]
    },
    {
      title: "Configuración del archivo .env",
      content: "Ahora configuraremos nuestras variables de entorno en el archivo .env:",
      isStep: true,
      code: [
        {
          language: "plaintext",
          code: "PORT=3000\nMONGO_URI=mongodb://localhost:27017/api-tutorial\nNODE_ENV=development"
        }
      ],
      warning: "Nunca subas tu archivo .env a repositorios públicos. Asegúrate de incluirlo en tu .gitignore."
    },
    {
      title: "Configuración de scripts en package.json",
      content: "Finalmente, actualizaremos el archivo package.json para agregar scripts útiles:",
      isStep: true,
      code: [
        {
          language: "json",
          code: "{\n  \"name\": \"api-rest-tutorial\",\n  \"version\": \"1.0.0\",\n  \"description\": \"API REST con Node.js y Express\",\n  \"main\": \"src/server.js\",\n  \"scripts\": {\n    \"start\": \"node src/server.js\",\n    \"dev\": \"nodemon src/server.js\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [\n    \"api\",\n    \"rest\",\n    \"nodejs\",\n    \"express\"\n  ],\n  \"author\": \"Tu Nombre\",\n  \"license\": \"MIT\",\n  \"dependencies\": {\n    \"body-parser\": \"^1.20.2\",\n    \"cors\": \"^2.8.5\",\n    \"dotenv\": \"^16.0.3\",\n    \"express\": \"^4.18.2\",\n    \"mongoose\": \"^7.0.3\"\n  },\n  \"devDependencies\": {\n    \"nodemon\": \"^2.0.22\"\n  }\n}"
        }
      ]
    },
    {
      title: "Ejecutando la aplicación",
      content: "¡Ahora estamos listos para ejecutar nuestra API! Utiliza el siguiente comando para iniciar el servidor en modo de desarrollo:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm run dev"
        }
      ],
      note: "El servidor se ejecutará en http://localhost:3000 (o el puerto que hayas configurado en tu archivo .env)."
    },
    {
      title: "Probando la API",
      content: "Puedes probar tu API utilizando herramientas como Postman, Insomnia o curl. Aquí hay algunos ejemplos de cómo realizar solicitudes a tu API:",
      isStep: false,
      subsections: ["Obtener todos los productos", "Crear un nuevo producto", "Obtener un producto específico", "Actualizar un producto", "Eliminar un producto"],
      subsectionContent: [
        "GET http://localhost:3000/api/products",
        "POST http://localhost:3000/api/products\nContent-Type: application/json\n\n{\n  \"name\": \"Smartphone XYZ\",\n  \"description\": \"El último modelo con características avanzadas\",\n  \"price\": 599.99,\n  \"category\": \"Electrónica\",\n  \"stock\": 50\n}",
        "GET http://localhost:3000/api/products/[id]",
        "PUT http://localhost:3000/api/products/[id]\nContent-Type: application/json\n\n{\n  \"price\": 549.99,\n  \"stock\": 45\n}",
        "DELETE http://localhost:3000/api/products/[id]"
      ]
    },
    {
      title: "Conclusión",
      content: "¡Felicidades! Has creado con éxito una API REST completa utilizando Node.js y Express. Esta API incluye todas las operaciones CRUD para gestionar productos, con validación de datos y manejo de errores.\n\nEste tutorial te ha proporcionado una base sólida para el desarrollo de APIs REST. A partir de aquí, puedes expandir tu API agregando características como autenticación con JWT, paginación, filtrado y ordenamiento de resultados, documentación con Swagger, pruebas unitarias e integración con servicios en la nube.\n\nRecuerda que el desarrollo de APIs es un campo en constante evolución, así que te animamos a seguir aprendiendo y mejorando tus habilidades.",
      isStep: false
    }
  ];
  
  const relatedTutorials = [
    {
      id: 2,
      title: "Autenticación JWT para APIs REST con Node.js",
      date: "20 de Julio, 2025",
      difficulty: "Intermediate",
      image: "/media/tutorial-jwt.webp"
    },
    {
      id: 3,
      title: "Creando una aplicación React que consume una API REST",
      date: "25 de Julio, 2025",
      difficulty: "Intermediate",
      image: "/media/tutorial-react.webp"
    },
    {
      id: 4,
      title: "Desplegando una API Node.js en AWS",
      date: "30 de Julio, 2025",
      difficulty: "Advanced",
      image: "/media/tutorial-aws.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Cómo Crear una API REST con Node.js y Express | Tecniweb Latam</title>
        <meta name="description" content="Aprende a crear una API REST completa con Node.js y Express, incluyendo operaciones CRUD, validación de datos y conexión a MongoDB." />
        <meta name="keywords" content="API REST, Node.js, Express, MongoDB, Mongoose, tutorial, desarrollo web, backend" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial} 
        sections={sections} 
        relatedTutorials={relatedTutorials} 
      />
    </>
  );
};

export default Tutorial1;
