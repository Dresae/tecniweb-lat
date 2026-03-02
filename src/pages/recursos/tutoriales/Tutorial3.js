import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial3 = () => {
  const tutorial = {
    id: 3,
    title: "Creando una aplicación React que consume una API REST",
    date: "25 de Julio, 2025",
    author: "Andy Amador",
    difficulty: "Intermediate",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial3.png'),
    introduction: "React se ha convertido en una de las bibliotecas más populares para el desarrollo de interfaces de usuario. Su enfoque basado en componentes y su eficiente algoritmo de reconciliación lo hacen ideal para crear aplicaciones web modernas y dinámicas.\n\nEn este tutorial, aprenderás a construir una aplicación frontend con React que se conecta a una API REST. Cubriremos la configuración del proyecto, la creación de componentes, la gestión del estado con hooks, el manejo de formularios y la comunicación con una API backend."
  };
  
  const sections = [
    {
      title: "Requisitos previos",
      content: "Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:\n\n- Node.js (versión 14.x o superior)\n- npm o yarn\n- Conocimientos básicos de JavaScript y HTML/CSS\n- Familiaridad con los conceptos básicos de React (componentes, props, estado)\n- Una API REST para consumir (puedes usar la API que creamos en tutoriales anteriores o cualquier API pública)",
      isStep: false
    },
    {
      title: "Configuración del proyecto",
      content: "Comenzaremos creando un nuevo proyecto de React utilizando Create React App, una herramienta oficial que configura un entorno de desarrollo moderno con un solo comando:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npx create-react-app react-api-client\ncd react-api-client\nnpm start"
        }
      ],
      note: "Esto creará una nueva aplicación React y la iniciará en modo de desarrollo. Puedes acceder a ella en http://localhost:3000."
    },
    {
      title: "Instalación de dependencias adicionales",
      content: "Para facilitar el desarrollo de nuestra aplicación, instalaremos algunas bibliotecas útiles:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm install axios react-router-dom styled-components"
        }
      ],
      subsections: ["Explicación de las dependencias"],
      subsectionContent: ["- **axios**: Cliente HTTP basado en promesas para realizar solicitudes a nuestra API\n- **react-router-dom**: Para la navegación entre diferentes vistas de nuestra aplicación\n- **styled-components**: Biblioteca para estilizar componentes utilizando CSS-in-JS"]
    },
    {
      title: "Estructura del proyecto",
      content: "Organizaremos nuestro proyecto con la siguiente estructura de directorios:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "mkdir -p src/components\nmkdir -p src/pages\nmkdir -p src/services\nmkdir -p src/hooks\nmkdir -p src/context\nmkdir -p src/utils"
        }
      ]
    },
    {
      title: "Configuración del cliente HTTP",
      content: "Crearemos un servicio para manejar las solicitudes HTTP a nuestra API:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/services/api.js\nimport axios from 'axios';\n\nconst API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';\n\nconst api = axios.create({\n  baseURL: API_URL,\n  headers: {\n    'Content-Type': 'application/json',\n  },\n});\n\n// Interceptor para añadir el token de autenticación a las solicitudes\napi.interceptors.request.use(\n  (config) => {\n    const token = localStorage.getItem('token');\n    if (token) {\n      config.headers.Authorization = `Bearer ${token}`;\n    }\n    return config;\n  },\n  (error) => Promise.reject(error)\n);\n\nexport default api;"
        }
      ]
    },
    {
      title: "Creación de servicios para la API",
      content: "Ahora crearemos servicios específicos para interactuar con los diferentes endpoints de nuestra API. En este ejemplo, crearemos un servicio para productos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/services/productService.js\nimport api from './api';\n\nexport const getProducts = async () => {\n  try {\n    const response = await api.get('/products');\n    return response.data;\n  } catch (error) {\n    throw error;\n  }\n};\n\nexport const getProductById = async (id) => {\n  try {\n    const response = await api.get(`/products/${id}`);\n    return response.data;\n  } catch (error) {\n    throw error;\n  }\n};\n\nexport const createProduct = async (productData) => {\n  try {\n    const response = await api.post('/products', productData);\n    return response.data;\n  } catch (error) {\n    throw error;\n  }\n};\n\nexport const updateProduct = async (id, productData) => {\n  try {\n    const response = await api.put(`/products/${id}`, productData);\n    return response.data;\n  } catch (error) {\n    throw error;\n  }\n};\n\nexport const deleteProduct = async (id) => {\n  try {\n    const response = await api.delete(`/products/${id}`);\n    return response.data;\n  } catch (error) {\n    throw error;\n  }\n};"
        }
      ]
    },
    {
      title: "Creación de un hook personalizado",
      content: "Para simplificar la gestión del estado y las solicitudes a la API, crearemos un hook personalizado:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/hooks/useProducts.js\nimport { useState, useEffect } from 'react';\nimport { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';\n\nexport const useProducts = () => {\n  const [products, setProducts] = useState([]);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState(null);\n\n  const fetchProducts = async () => {\n    setLoading(true);\n    try {\n      const data = await getProducts();\n      setProducts(data.products || data);\n      setError(null);\n    } catch (err) {\n      setError(err.response?.data?.message || 'Error al cargar los productos');\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  const addProduct = async (productData) => {\n    setLoading(true);\n    try {\n      const data = await createProduct(productData);\n      setProducts([...products, data.product]);\n      return data.product;\n    } catch (err) {\n      setError(err.response?.data?.message || 'Error al crear el producto');\n      throw err;\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  const editProduct = async (id, productData) => {\n    setLoading(true);\n    try {\n      const data = await updateProduct(id, productData);\n      setProducts(products.map(product => \n        product._id === id ? data.product : product\n      ));\n      return data.product;\n    } catch (err) {\n      setError(err.response?.data?.message || 'Error al actualizar el producto');\n      throw err;\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  const removeProduct = async (id) => {\n    setLoading(true);\n    try {\n      await deleteProduct(id);\n      setProducts(products.filter(product => product._id !== id));\n    } catch (err) {\n      setError(err.response?.data?.message || 'Error al eliminar el producto');\n      throw err;\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  useEffect(() => {\n    fetchProducts();\n  }, []);\n\n  return { \n    products, \n    loading, \n    error, \n    fetchProducts, \n    addProduct, \n    editProduct, \n    removeProduct \n  };\n};"
        }
      ]
    },
    {
      title: "Creación de componentes",
      content: "Ahora crearemos los componentes necesarios para nuestra aplicación. Comenzaremos con un componente para mostrar un producto individual:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/components/ProductCard.js\nimport React from 'react';\nimport styled from 'styled-components';\nimport { Link } from 'react-router-dom';\n\nconst Card = styled.div`\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: transform 0.3s ease;\n  \n  &:hover {\n    transform: translateY(-5px);\n  }\n`;\n\nconst CardImage = styled.img`\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n`;\n\nconst CardContent = styled.div`\n  padding: 16px;\n`;\n\nconst CardTitle = styled.h3`\n  margin: 0 0 8px;\n  font-size: 1.2rem;\n  color: #333;\n`;\n\nconst CardPrice = styled.p`\n  font-weight: bold;\n  color: #2e7d32;\n  margin: 0 0 8px;\n`;\n\nconst CardDescription = styled.p`\n  color: #666;\n  margin: 0 0 16px;\n  font-size: 0.9rem;\n`;\n\nconst CardActions = styled.div`\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n`;\n\nconst ViewButton = styled(Link)`\n  background-color: #1976d2;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n  text-decoration: none;\n  font-size: 0.9rem;\n  transition: background-color 0.3s ease;\n  \n  &:hover {\n    background-color: #1565c0;\n  }\n`;\n\nconst ProductCard = ({ product }) => {\n  return (\n    <Card>\n      <CardImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />\n      <CardContent>\n        <CardTitle>{product.name}</CardTitle>\n        <CardPrice>${product.price.toFixed(2)}</CardPrice>\n        <CardDescription>\n          {product.description.length > 100\n            ? `${product.description.substring(0, 100)}...`\n            : product.description}\n        </CardDescription>\n        <CardActions>\n          <ViewButton to={`/products/${product._id}`}>Ver detalles</ViewButton>\n        </CardActions>\n      </CardContent>\n    </Card>\n  );\n};\n\nexport default ProductCard;"
        }
      ]
    },
    {
      title: "Creación de la página de listado de productos",
      content: "Ahora crearemos una página para mostrar todos los productos:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/pages/ProductsPage.js\nimport React from 'react';\nimport styled from 'styled-components';\nimport ProductCard from '../components/ProductCard';\nimport { useProducts } from '../hooks/useProducts';\n\nconst PageContainer = styled.div`\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n`;\n\nconst PageTitle = styled.h1`\n  color: #333;\n  margin-bottom: 20px;\n`;\n\nconst ProductsGrid = styled.div`\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n`;\n\nconst LoadingMessage = styled.p`\n  font-size: 1.2rem;\n  color: #666;\n  text-align: center;\n  margin: 40px 0;\n`;\n\nconst ErrorMessage = styled.p`\n  font-size: 1.2rem;\n  color: #d32f2f;\n  text-align: center;\n  margin: 40px 0;\n`;\n\nconst ProductsPage = () => {\n  const { products, loading, error } = useProducts();\n\n  if (loading) {\n    return <LoadingMessage>Cargando productos...</LoadingMessage>;\n  }\n\n  if (error) {\n    return <ErrorMessage>{error}</ErrorMessage>;\n  }\n\n  return (\n    <PageContainer>\n      <PageTitle>Nuestros Productos</PageTitle>\n      {products.length === 0 ? (\n        <p>No hay productos disponibles.</p>\n      ) : (\n        <ProductsGrid>\n          {products.map(product => (\n            <ProductCard key={product._id} product={product} />\n          ))}\n        </ProductsGrid>\n      )}\n    </PageContainer>\n  );\n};\n\nexport default ProductsPage;"
        }
      ]
    },
    {
      title: "Creación de la página de detalle de producto",
      content: "Ahora crearemos una página para mostrar los detalles de un producto específico:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/pages/ProductDetailPage.js\nimport React, { useState, useEffect } from 'react';\nimport { useParams, useNavigate } from 'react-router-dom';\nimport styled from 'styled-components';\nimport { getProductById } from '../services/productService';\n\nconst PageContainer = styled.div`\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n`;\n\nconst ProductContainer = styled.div`\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 30px;\n  \n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n`;\n\nconst ProductImage = styled.img`\n  width: 100%;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n`;\n\nconst ProductInfo = styled.div`\n  padding: 20px;\n`;\n\nconst ProductTitle = styled.h1`\n  color: #333;\n  margin-bottom: 10px;\n`;\n\nconst ProductPrice = styled.p`\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #2e7d32;\n  margin-bottom: 20px;\n`;\n\nconst ProductDescription = styled.p`\n  color: #666;\n  line-height: 1.6;\n  margin-bottom: 20px;\n`;\n\nconst ProductCategory = styled.p`\n  background-color: #e0e0e0;\n  display: inline-block;\n  padding: 5px 10px;\n  border-radius: 4px;\n  margin-bottom: 20px;\n`;\n\nconst BackButton = styled.button`\n  background-color: #f5f5f5;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-top: 20px;\n  \n  &:hover {\n    background-color: #e0e0e0;\n  }\n`;\n\nconst LoadingMessage = styled.p`\n  font-size: 1.2rem;\n  color: #666;\n  text-align: center;\n  margin: 40px 0;\n`;\n\nconst ErrorMessage = styled.p`\n  font-size: 1.2rem;\n  color: #d32f2f;\n  text-align: center;\n  margin: 40px 0;\n`;\n\nconst ProductDetailPage = () => {\n  const { id } = useParams();\n  const navigate = useNavigate();\n  const [product, setProduct] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchProduct = async () => {\n      try {\n        const data = await getProductById(id);\n        setProduct(data.product || data);\n      } catch (err) {\n        setError(err.response?.data?.message || 'Error al cargar el producto');\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchProduct();\n  }, [id]);\n\n  if (loading) {\n    return <LoadingMessage>Cargando producto...</LoadingMessage>;\n  }\n\n  if (error) {\n    return <ErrorMessage>{error}</ErrorMessage>;\n  }\n\n  if (!product) {\n    return <ErrorMessage>Producto no encontrado</ErrorMessage>;\n  }\n\n  return (\n    <PageContainer>\n      <ProductContainer>\n        <ProductImage src={product.image || 'https://via.placeholder.com/600x400'} alt={product.name} />\n        <ProductInfo>\n          <ProductTitle>{product.name}</ProductTitle>\n          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>\n          <ProductCategory>{product.category}</ProductCategory>\n          <ProductDescription>{product.description}</ProductDescription>\n          <p><strong>Stock:</strong> {product.stock} unidades</p>\n          <BackButton onClick={() => navigate(-1)}>Volver</BackButton>\n        </ProductInfo>\n      </ProductContainer>\n    </PageContainer>\n  );\n};\n\nexport default ProductDetailPage;"
        }
      ]
    },
    {
      title: "Configuración de rutas",
      content: "Ahora configuraremos las rutas de nuestra aplicación utilizando React Router:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// src/App.js\nimport React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport ProductsPage from './pages/ProductsPage';\nimport ProductDetailPage from './pages/ProductDetailPage';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<ProductsPage />} />\n        <Route path=\"/products/:id\" element={<ProductDetailPage />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;"
        }
      ]
    },
    {
      title: "Conclusión",
      content: "¡Felicidades! Has creado una aplicación React que consume una API REST. Esta aplicación incluye:\n\n- Configuración de un cliente HTTP con Axios\n- Servicios para interactuar con la API\n- Un hook personalizado para gestionar el estado y las solicitudes\n- Componentes reutilizables\n- Páginas para listar y mostrar detalles de productos\n- Navegación entre páginas con React Router\n\nEste es solo el punto de partida. Puedes expandir esta aplicación añadiendo más funcionalidades como:\n\n- Formularios para crear y editar productos\n- Autenticación de usuarios\n- Filtrado y búsqueda de productos\n- Paginación\n- Carrito de compras\n\nRecuerda que el desarrollo frontend es un proceso iterativo. Continúa mejorando tu aplicación, refactorizando el código y añadiendo nuevas características según sea necesario.",
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
      id: 2,
      title: "Autenticación JWT para APIs REST con Node.js",
      difficulty: "Intermediate",
      image: "/media/tutorial-jwt.webp"
    },
    {
      id: 7,
      title: "Optimización de rendimiento en aplicaciones React",
      difficulty: "Advanced",
      image: "/media/tutorial-react-performance.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Creando una aplicación React que consume una API REST | Tecniweb Latam</title>
        <meta name="description" content="Aprende a construir una aplicación frontend con React que se conecta a una API REST, gestionando estados, efectos y formularios." />
        <meta name="keywords" content="React, API REST, frontend, hooks, axios, componentes, JavaScript" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial3;
