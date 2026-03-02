import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial6 = () => {
  const tutorial = {
    id: 6,
    title: "Implementando GraphQL en una aplicación web moderna",
    date: "15 de Agosto, 2025",
    author: "Andy Amador",
    difficulty: "Intermediate",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial6.png'),
    introduction: "GraphQL se ha convertido en una alternativa popular a REST para el desarrollo de APIs. Creado por Facebook en 2015 y ahora mantenido por una gran comunidad, GraphQL ofrece una forma más eficiente y flexible de obtener y manipular datos.\n\nEn este tutorial, exploraremos los conceptos fundamentales de GraphQL y aprenderemos a implementarlo en una aplicación web moderna. Veremos cómo configurar un servidor GraphQL, definir esquemas y resolvers, y cómo consumir una API GraphQL desde el frontend."
  };
  
  const sections = [
    {
      title: "¿Qué es GraphQL?",
      content: "GraphQL es un lenguaje de consulta para APIs y un entorno de ejecución para cumplir esas consultas con los datos existentes. A diferencia de REST, donde cada endpoint devuelve una estructura de datos fija, GraphQL permite a los clientes solicitar exactamente los datos que necesitan, ni más ni menos.\n\n**Ventajas de GraphQL:**\n\n- **Solicitudes precisas**: Los clientes pueden solicitar exactamente lo que necesitan, evitando el exceso o la falta de datos.\n- **Una sola solicitud**: Puedes obtener datos de múltiples recursos en una sola solicitud, reduciendo el número de viajes al servidor.\n- **Tipado fuerte**: GraphQL utiliza un sistema de tipos que garantiza que las aplicaciones solo soliciten lo que es posible y proporciona mensajes de error claros.\n- **Evolución de la API**: Puedes añadir campos y tipos a tu API sin afectar a las consultas existentes.\n- **Introspección**: Las APIs GraphQL pueden ser consultadas por sus propios tipos, lo que permite herramientas potentes como GraphiQL.",
      isStep: false
    },
    {
      title: "Conceptos básicos de GraphQL",
      content: "Antes de sumergirnos en la implementación, es importante entender algunos conceptos clave de GraphQL:",
      isStep: false,
      subsections: ["Esquema y tipos", "Consultas (Queries)", "Mutaciones", "Resolvers", "Suscripciones"],
      subsectionContent: [
        "El **esquema** define la estructura de los datos disponibles en tu API. Está compuesto por **tipos** que describen los objetos que pueden ser solicitados y las relaciones entre ellos. Por ejemplo:\n```graphql\ntype User {\n  id: ID!\n  name: String!\n  email: String!\n  posts: [Post!]\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  author: User!\n}\n```\nEl signo de exclamación (!) indica que un campo es no nulo, y los corchetes ([]) indican una lista.",
        
        "Las **consultas** permiten a los clientes solicitar datos específicos. Por ejemplo:\n```graphql\nquery {\n  user(id: \"123\") {\n    name\n    email\n    posts {\n      title\n    }\n  }\n}\n```\nEsta consulta obtendría el nombre y email del usuario con ID \"123\", así como los títulos de sus posts.",
        
        "Las **mutaciones** son operaciones que modifican datos en el servidor. Por ejemplo:\n```graphql\nmutation {\n  createUser(name: \"Juan\", email: \"juan@ejemplo.com\") {\n    id\n    name\n    email\n  }\n}\n```\nEsta mutación crearía un nuevo usuario y devolvería su ID, nombre y email.",
        
        "Los **resolvers** son funciones que determinan cómo se obtienen los datos para cada campo en un esquema GraphQL. Cada campo en tus tipos tiene un resolver correspondiente que se encarga de obtener los datos para ese campo.",
        
        "Las **suscripciones** permiten a los clientes recibir actualizaciones en tiempo real cuando ocurren eventos específicos en el servidor. Son útiles para características como chats, notificaciones o actualizaciones en tiempo real."
      ]
    },
    {
      title: "Configuración del entorno de desarrollo",
      content: "Vamos a configurar un proyecto Node.js con GraphQL. Utilizaremos Apollo Server, una biblioteca popular para crear servidores GraphQL en JavaScript:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Crear un nuevo directorio para el proyecto\nmkdir graphql-tutorial\ncd graphql-tutorial\n\n# Inicializar un proyecto Node.js\nnpm init -y\n\n# Instalar dependencias\nnpm install apollo-server graphql mongoose"
        }
      ],
      note: "También instalaremos mongoose para conectarnos a una base de datos MongoDB, pero puedes usar cualquier base de datos que prefieras."
    },
    {
      title: "Definiendo el esquema GraphQL",
      content: "El primer paso para crear una API GraphQL es definir el esquema. Crearemos un esquema simple para una aplicación de blog con usuarios y posts:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// schema.js\nconst { gql } = require('apollo-server');\n\nconst typeDefs = gql`\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    posts: [Post!]\n  }\n\n  type Post {\n    id: ID!\n    title: String!\n    content: String!\n    author: User!\n    createdAt: String!\n  }\n\n  type Query {\n    users: [User!]!\n    user(id: ID!): User\n    posts: [Post!]!\n    post(id: ID!): Post\n  }\n\n  type Mutation {\n    createUser(name: String!, email: String!): User!\n    createPost(title: String!, content: String!, authorId: ID!): Post!\n  }\n`;\n\nmodule.exports = typeDefs;"
        }
      ],
      note: "Este esquema define dos tipos principales (User y Post), consultas para obtener usuarios y posts, y mutaciones para crear nuevos usuarios y posts."
    },
    {
      title: "Configurando la base de datos",
      content: "Vamos a configurar una conexión a MongoDB usando Mongoose y definir nuestros modelos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// models/User.js\nconst mongoose = require('mongoose');\n\nconst userSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true\n  }\n});\n\nmodule.exports = mongoose.model('User', userSchema);"
        },
        {
          language: "javascript",
          code: "// models/Post.js\nconst mongoose = require('mongoose');\n\nconst postSchema = new mongoose.Schema({\n  title: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  author: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'User',\n    required: true\n  }\n}, {\n  timestamps: true\n});\n\nmodule.exports = mongoose.model('Post', postSchema);"
        },
        {
          language: "javascript",
          code: "// db.js\nconst mongoose = require('mongoose');\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect('mongodb://localhost:27017/graphql-tutorial', {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n      useCreateIndex: true\n    });\n    console.log('MongoDB conectado');\n  } catch (error) {\n    console.error('Error al conectar a MongoDB:', error.message);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;"
        }
      ]
    },
    {
      title: "Implementando los resolvers",
      content: "Los resolvers son funciones que resuelven los valores para los campos en tu esquema. Vamos a implementar los resolvers para nuestras consultas y mutaciones:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// resolvers.js\nconst User = require('./models/User');\nconst Post = require('./models/Post');\n\nconst resolvers = {\n  Query: {\n    users: async () => {\n      return await User.find({});\n    },\n    user: async (_, { id }) => {\n      return await User.findById(id);\n    },\n    posts: async () => {\n      return await Post.find({});\n    },\n    post: async (_, { id }) => {\n      return await Post.findById(id);\n    }\n  },\n  Mutation: {\n    createUser: async (_, { name, email }) => {\n      const user = new User({ name, email });\n      await user.save();\n      return user;\n    },\n    createPost: async (_, { title, content, authorId }) => {\n      const post = new Post({\n        title,\n        content,\n        author: authorId\n      });\n      await post.save();\n      return post;\n    }\n  },\n  User: {\n    posts: async (parent) => {\n      return await Post.find({ author: parent.id });\n    }\n  },\n  Post: {\n    author: async (parent) => {\n      return await User.findById(parent.author);\n    },\n    createdAt: (parent) => {\n      return parent.createdAt.toISOString();\n    }\n  }\n};\n\nmodule.exports = resolvers;"
        }
      ],
      note: "Observa cómo hemos definido resolvers para los campos relacionados (User.posts y Post.author). Estos resolvers se ejecutan solo cuando estos campos son solicitados en una consulta."
    },
    {
      title: "Creando el servidor Apollo",
      content: "Ahora vamos a juntar todo para crear nuestro servidor GraphQL con Apollo Server:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// server.js\nconst { ApolloServer } = require('apollo-server');\nconst typeDefs = require('./schema');\nconst resolvers = require('./resolvers');\nconst connectDB = require('./db');\n\n// Conectar a la base de datos\nconnectDB();\n\n// Crear el servidor Apollo\nconst server = new ApolloServer({\n  typeDefs,\n  resolvers\n});\n\n// Iniciar el servidor\nserver.listen().then(({ url }) => {\n  console.log(`🚀 Servidor listo en ${url}`);\n});"
        }
      ],
      note: "Para iniciar el servidor, ejecuta `node server.js`. Luego, puedes acceder al playground de GraphQL en http://localhost:4000 para probar tus consultas y mutaciones."
    },
    {
      title: "Probando la API GraphQL",
      content: "Una vez que el servidor esté en funcionamiento, puedes probar tu API GraphQL utilizando el playground que proporciona Apollo Server:",
      isStep: true,
      subsections: ["Crear un usuario", "Crear un post", "Consultar usuarios y posts"],
      subsectionContent: [
        "```graphql\nmutation {\n  createUser(name: \"Juan Pérez\", email: \"juan@ejemplo.com\") {\n    id\n    name\n    email\n  }\n}\n```\nEsta mutación creará un nuevo usuario y devolverá su ID, nombre y email.",
        
        "```graphql\nmutation {\n  createPost(\n    title: \"Introducción a GraphQL\"\n    content: \"GraphQL es un lenguaje de consulta para APIs...\"\n    authorId: \"ID_DEL_USUARIO_CREADO\"\n  ) {\n    id\n    title\n    content\n    createdAt\n  }\n}\n```\nReemplaza `ID_DEL_USUARIO_CREADO` con el ID que obtuviste al crear el usuario.",
        
        "```graphql\nquery {\n  users {\n    id\n    name\n    email\n    posts {\n      id\n      title\n    }\n  }\n}\n```\nEsta consulta obtendrá todos los usuarios junto con los títulos de sus posts.\n\n```graphql\nquery {\n  posts {\n    id\n    title\n    content\n    createdAt\n    author {\n      name\n      email\n    }\n  }\n}\n```\nEsta consulta obtendrá todos los posts junto con la información de sus autores."
      ]
    },
    {
      title: "Consumiendo GraphQL desde el frontend",
      content: "Ahora vamos a ver cómo consumir nuestra API GraphQL desde una aplicación React utilizando Apollo Client:",
      isStep: true,
      subsections: ["Configuración de Apollo Client", "Consultas con useQuery", "Mutaciones con useMutation"],
      subsectionContent: [
        "Primero, crea una nueva aplicación React e instala las dependencias necesarias:\n```bash\nnpx create-react-app graphql-client\ncd graphql-client\nnpm install @apollo/client graphql\n```\n\nLuego, configura Apollo Client en tu aplicación:\n```javascript\n// src/index.js\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';\nimport App from './App';\n\n// Crear el cliente Apollo\nconst client = new ApolloClient({\n  uri: 'http://localhost:4000',\n  cache: new InMemoryCache()\n});\n\nReactDOM.render(\n  <ApolloProvider client={client}>\n    <App />\n  </ApolloProvider>,\n  document.getElementById('root')\n);\n```",
        
        "Ahora puedes usar el hook `useQuery` para realizar consultas GraphQL:\n```javascript\n// src/components/UserList.js\nimport React from 'react';\nimport { useQuery, gql } from '@apollo/client';\n\nconst GET_USERS = gql`\n  query {\n    users {\n      id\n      name\n      email\n      posts {\n        id\n        title\n      }\n    }\n  }\n`;\n\nfunction UserList() {\n  const { loading, error, data } = useQuery(GET_USERS);\n\n  if (loading) return <p>Cargando...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n\n  return (\n    <div>\n      <h2>Usuarios</h2>\n      <ul>\n        {data.users.map(user => (\n          <li key={user.id}>\n            <h3>{user.name}</h3>\n            <p>{user.email}</p>\n            <h4>Posts:</h4>\n            <ul>\n              {user.posts.map(post => (\n                <li key={post.id}>{post.title}</li>\n              ))}\n            </ul>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default UserList;\n```",
        
        "Para realizar mutaciones, puedes usar el hook `useMutation`:\n```javascript\n// src/components/CreateUser.js\nimport React, { useState } from 'react';\nimport { useMutation, gql } from '@apollo/client';\n\nconst CREATE_USER = gql`\n  mutation CreateUser($name: String!, $email: String!) {\n    createUser(name: $name, email: $email) {\n      id\n      name\n      email\n    }\n  }\n`;\n\nfunction CreateUser() {\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    createUser({ variables: { name, email } });\n    setName('');\n    setEmail('');\n  };\n\n  return (\n    <div>\n      <h2>Crear Usuario</h2>\n      <form onSubmit={handleSubmit}>\n        <div>\n          <label>Nombre:</label>\n          <input\n            type=\"text\"\n            value={name}\n            onChange={(e) => setName(e.target.value)}\n            required\n          />\n        </div>\n        <div>\n          <label>Email:</label>\n          <input\n            type=\"email\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            required\n          />\n        </div>\n        <button type=\"submit\" disabled={loading}>Crear</button>\n      </form>\n      {loading && <p>Enviando...</p>}\n      {error && <p>Error: {error.message}</p>}\n      {data && <p>Usuario creado con éxito: {data.createUser.name}</p>}\n    </div>\n  );\n}\n\nexport default CreateUser;\n```"
      ]
    },
    {
      title: "Mejores prácticas para GraphQL",
      content: "Para terminar, aquí hay algunas mejores prácticas que deberías seguir al trabajar con GraphQL:",
      isStep: false,
      subsections: ["Diseño de esquemas", "Optimización de rendimiento", "Seguridad", "Versionado"],
      subsectionContent: [
        "- Diseña tu esquema desde la perspectiva del cliente, no de la base de datos\n- Utiliza nombres descriptivos para tipos y campos\n- Mantén tus tipos enfocados y cohesivos\n- Utiliza interfaces y uniones para tipos relacionados\n- Considera la paginación para listas grandes\n- Documenta tu esquema con comentarios",
        
        "- Implementa DataLoader para evitar el problema N+1\n- Utiliza fragmentos para reutilizar partes de consultas\n- Considera implementar caching\n- Limita la profundidad y complejidad de las consultas\n- Utiliza consultas persistentes en producción",
        
        "- Implementa autenticación y autorización\n- Valida y sanitiza las entradas del usuario\n- Limita la tasa de consultas\n- Protege contra consultas maliciosas\n- Considera usar herramientas como graphql-shield para reglas de autorización",
        
        "- GraphQL no necesita versionado explícito como REST\n- Añade nuevos campos y tipos sin romper consultas existentes\n- Marca campos obsoletos con @deprecated\n- Nunca elimines campos sin un período de deprecación\n- Utiliza herramientas como Apollo Studio para rastrear el uso de campos"
      ]
    },
    {
      title: "Conclusión",
      content: "En este tutorial, has aprendido los conceptos fundamentales de GraphQL y cómo implementarlo tanto en el backend como en el frontend. Hemos visto cómo:\n\n- Definir un esquema GraphQL con tipos, consultas y mutaciones\n- Implementar resolvers para obtener y modificar datos\n- Configurar un servidor Apollo\n- Conectar GraphQL con una base de datos MongoDB\n- Consumir una API GraphQL desde una aplicación React\n\nGraphQL ofrece una forma más eficiente y flexible de trabajar con APIs, permitiendo a los clientes solicitar exactamente los datos que necesitan. Aunque tiene una curva de aprendizaje inicial, los beneficios en términos de rendimiento, flexibilidad y experiencia de desarrollo hacen que valga la pena.\n\nA medida que continúes trabajando con GraphQL, considera explorar características más avanzadas como suscripciones para actualizaciones en tiempo real, directivas para modificar el comportamiento de las consultas, y herramientas como Apollo Federation para crear un grafo de datos unificado a partir de múltiples servicios.",
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
      id: 3,
      title: "Creando una aplicación React que consume una API REST",
      difficulty: "Intermediate",
      image: "/media/tutorial-react.webp"
    },
    {
      id: 7,
      title: "Desarrollo de aplicaciones web con TypeScript",
      difficulty: "Intermediate",
      image: "/media/tutorial-typescript.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Implementando GraphQL en una aplicación web moderna | Tecniweb Latam</title>
        <meta name="description" content="Aprende a implementar GraphQL en tu aplicación web, desde la configuración del servidor hasta el consumo de la API desde el frontend." />
        <meta name="keywords" content="GraphQL, API, Apollo Server, Apollo Client, React, Node.js, MongoDB, desarrollo web" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial6;
