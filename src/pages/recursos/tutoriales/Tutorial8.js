import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial8 = () => {
  const tutorial = {
    id: 8,
    title: "Optimización de rendimiento en aplicaciones web",
    date: "10 de Septiembre, 2025",
    author: "Andy Amador",
    difficulty: "Advanced",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial8.jpg'),
    introduction: "El rendimiento es un aspecto crucial en el desarrollo de aplicaciones web modernas. Los usuarios esperan que las páginas carguen rápidamente y que las interacciones sean fluidas, independientemente del dispositivo o la conexión que estén utilizando.\n\nEn este tutorial, exploraremos diversas técnicas y mejores prácticas para optimizar el rendimiento de aplicaciones web, desde la carga inicial hasta la experiencia de usuario durante la interacción. Aprenderás a identificar cuellos de botella, implementar soluciones efectivas y medir el impacto de tus optimizaciones."
  };
  
  const sections = [
    {
      title: "Importancia del rendimiento web",
      content: "El rendimiento de una aplicación web tiene un impacto directo en la experiencia del usuario y, por ende, en el éxito de tu proyecto. Algunos datos importantes a considerar:\n\n- El 53% de los usuarios abandonan un sitio si tarda más de 3 segundos en cargar\n- Por cada segundo de mejora en la velocidad de carga, Amazon reportó un aumento del 1% en sus ingresos\n- Google utiliza la velocidad de carga como factor de posicionamiento SEO\n- La retención de usuarios es significativamente mayor en sitios con tiempos de carga rápidos\n\nOptimizar el rendimiento no solo mejora la experiencia del usuario, sino que también puede tener un impacto positivo en la conversión, el SEO y la accesibilidad de tu aplicación.",
      isStep: false
    },
    {
      title: "Métricas clave de rendimiento",
      content: "Antes de comenzar a optimizar, es importante entender qué métricas debemos medir y mejorar:",
      isStep: false,
      subsections: ["Métricas de carga", "Métricas de interactividad", "Métricas de estabilidad visual"],
      subsectionContent: [
        "- **First Contentful Paint (FCP)**: Tiempo que tarda en mostrarse el primer contenido (texto, imagen, etc.)\n- **Largest Contentful Paint (LCP)**: Tiempo que tarda en renderizarse el elemento más grande visible en la ventana\n- **Time to First Byte (TTFB)**: Tiempo que tarda el navegador en recibir el primer byte de respuesta del servidor",
        
        "- **First Input Delay (FID)**: Tiempo que tarda la página en responder a la primera interacción del usuario\n- **Total Blocking Time (TBT)**: Suma del tiempo en que el hilo principal está bloqueado\n- **Time to Interactive (TTI)**: Tiempo que tarda la página en ser completamente interactiva",
        
        "- **Cumulative Layout Shift (CLS)**: Mide la estabilidad visual y los cambios inesperados en el layout\n- **Speed Index**: Mide qué tan rápido se muestra el contenido visualmente durante la carga"
      ]
    },
    {
      title: "Herramientas de medición y diagnóstico",
      content: "Para optimizar el rendimiento, primero necesitamos medir y diagnosticar los problemas. Estas son algunas herramientas útiles:",
      isStep: true,
      subsections: ["Herramientas de Google", "Otras herramientas", "Monitoreo en producción"],
      subsectionContent: [
        "- **Lighthouse**: Herramienta automatizada de auditoría para rendimiento, accesibilidad, SEO y más\n- **Chrome DevTools**: Panel Performance para análisis detallado del rendimiento\n- **PageSpeed Insights**: Combina datos de laboratorio y campo para analizar el rendimiento\n- **Web Vitals**: Extensión de Chrome para medir las Core Web Vitals en tiempo real",
        
        "- **WebPageTest**: Permite probar el rendimiento desde diferentes ubicaciones y dispositivos\n- **GTmetrix**: Proporciona informes detallados y recomendaciones de optimización\n- **Pingdom**: Monitoreo de tiempo de carga y disponibilidad\n- **Bundle analyzers**: Herramientas como webpack-bundle-analyzer para analizar el tamaño de los bundles",
        
        "- **Google Analytics**: Puede configurarse para rastrear métricas de rendimiento\n- **New Relic**: Monitoreo de aplicaciones con análisis detallado de rendimiento\n- **Datadog**: Monitoreo y análisis de rendimiento en tiempo real\n- **Sentry**: Seguimiento de errores y problemas de rendimiento"
      ]
    },
    {
      title: "Optimización de recursos estáticos",
      content: "Los recursos estáticos (JavaScript, CSS, imágenes) suelen ser los principales contribuyentes al tiempo de carga. Veamos cómo optimizarlos:",
      isStep: true,
      subsections: ["Optimización de JavaScript", "Optimización de CSS", "Optimización de imágenes"],
      subsectionContent: [
        "- **Minificación**: Reduce el tamaño eliminando espacios, comentarios y caracteres innecesarios\n```bash\n# Usando Terser para minificar JavaScript\nnpm install terser -g\nterser script.js -o script.min.js -c -m\n```\n- **Code splitting**: Divide tu código en chunks más pequeños que se cargan según sea necesario\n```javascript\n// Usando dynamic imports en React\nimport React, { lazy, Suspense } from 'react';\n\nconst HeavyComponent = lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <HeavyComponent />\n    </Suspense>\n  );\n}\n```\n- **Tree shaking**: Elimina código no utilizado\n- **Compresión**: Utiliza gzip o brotli para comprimir los archivos\n- **Carga diferida**: Usa `defer` o `async` para scripts no críticos",
        
        "- **Minificación**: Similar a JavaScript, reduce el tamaño del archivo\n```bash\n# Usando cssnano\nnpm install cssnano -g\ncssnano styles.css styles.min.css\n```\n- **Critical CSS**: Extrae y carga inline el CSS crítico para el contenido visible\n```html\n<head>\n  <style>\n    /* CSS crítico inline */\n    body { margin: 0; font-family: sans-serif; }\n    header { background: #333; color: white; }\n  </style>\n  <link rel=\"preload\" href=\"styles.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n</head>\n```\n- **Elimina CSS no utilizado**: Herramientas como PurgeCSS\n- **Optimiza selectores**: Evita selectores anidados profundamente",
        
        "- **Formatos modernos**: Utiliza WebP o AVIF en lugar de JPEG/PNG\n```html\n<picture>\n  <source srcset=\"image.avif\" type=\"image/avif\">\n  <source srcset=\"image.webp\" type=\"image/webp\">\n  <img src=\"image.jpg\" alt=\"Descripción\">\n</picture>\n```\n- **Compresión**: Optimiza las imágenes sin perder calidad perceptible\n```bash\n# Usando imagemin\nnpm install -g imagemin-cli\nimagemin images/* --out-dir=compressed\n```\n- **Dimensiones adecuadas**: No cargues imágenes más grandes de lo necesario\n- **Lazy loading**: Carga imágenes solo cuando están cerca de entrar en la ventana visible\n```html\n<img src=\"image.jpg\" loading=\"lazy\" alt=\"Descripción\">\n```\n- **Responsive images**: Usa `srcset` para servir diferentes tamaños según el dispositivo"
      ]
    },
    {
      title: "Optimización del renderizado",
      content: "El renderizado eficiente es crucial para una experiencia de usuario fluida, especialmente en aplicaciones con mucha interactividad:",
      isStep: true,
      subsections: ["Optimización del DOM", "Optimización de CSS", "Optimización de frameworks"],
      subsectionContent: [
        "- **Minimiza manipulaciones del DOM**: Agrupa cambios y usa DocumentFragment\n```javascript\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 1000; i++) {\n  const el = document.createElement('div');\n  el.textContent = `Item ${i}`;\n  fragment.appendChild(el);\n}\ndocument.getElementById('container').appendChild(fragment);\n```\n- **Evita layout thrashing**: No mezcles lecturas y escrituras del DOM\n- **Usa requestAnimationFrame**: Para animaciones y actualizaciones visuales\n```javascript\nfunction updateUI() {\n  // Leer propiedades del DOM\n  const width = element.offsetWidth;\n  \n  requestAnimationFrame(() => {\n    // Escribir propiedades del DOM\n    element.style.width = (width + 10) + 'px';\n  });\n}\n```",
        
        "- **Evita selectores complejos**: Pueden ralentizar el renderizado\n- **Minimiza recalculos de layout**: Propiedades como `top`, `width`, `height` causan recalculos\n- **Usa `will-change`**: Para elementos que cambiarán frecuentemente\n```css\n.animated-element {\n  will-change: transform, opacity;\n}\n```\n- **Prioriza propiedades que solo afectan a compositing**: `transform` y `opacity` son más eficientes",
        
        "- **React**: Usa `React.memo`, `useMemo` y `useCallback` para evitar renderizados innecesarios\n```javascript\nimport React, { useMemo, useCallback } from 'react';\n\nfunction ExpensiveComponent({ data, onItemClick }) {\n  // Memoriza cálculos costosos\n  const processedData = useMemo(() => {\n    return data.map(item => expensiveCalculation(item));\n  }, [data]);\n  \n  // Memoriza funciones\n  const handleClick = useCallback((id) => {\n    onItemClick(id);\n  }, [onItemClick]);\n  \n  return (\n    <div>\n      {processedData.map(item => (\n        <div key={item.id} onClick={() => handleClick(item.id)}>\n          {item.name}\n        </div>\n      ))}\n    </div>\n  );\n}\n\n// Evita re-renderizados innecesarios\nexport default React.memo(ExpensiveComponent);\n```\n- **Vue**: Usa `v-once` para elementos estáticos y `v-memo` para listas\n- **Angular**: Usa `ChangeDetectionStrategy.OnPush` y `trackBy` para listas"
      ]
    },
    {
      title: "Optimización de red",
      content: "La optimización de red puede tener un impacto significativo en el tiempo de carga de tu aplicación:",
      isStep: true,
      subsections: ["Reducción de solicitudes", "HTTP/2 y HTTP/3", "Estrategias de caché"],
      subsectionContent: [
        "- **Consolidación de archivos**: Combina múltiples archivos en uno solo cuando sea apropiado\n- **Sprites CSS**: Combina múltiples imágenes en una sola\n- **Inlining**: Incluye recursos pequeños directamente en HTML\n- **Domain sharding**: Distribuye recursos en múltiples dominios (menos relevante con HTTP/2)",
        
        "- **Habilita HTTP/2**: Permite múltiples solicitudes paralelas en una sola conexión\n```nginx\n# Configuración de Nginx para HTTP/2\nserver {\n  listen 443 ssl http2;\n  server_name example.com;\n  \n  ssl_certificate /path/to/certificate.crt;\n  ssl_certificate_key /path/to/private.key;\n  \n  # Resto de la configuración\n}\n```\n- **Server Push**: Envía recursos críticos antes de que el navegador los solicite\n- **Multiplexing**: Aprovecha la capacidad de HTTP/2 para manejar múltiples solicitudes/respuestas simultáneamente",
        
        "- **Cache-Control**: Configura encabezados HTTP adecuados\n```nginx\n# Configuración de caché en Nginx\nlocation ~* \\.(?:css|js)$ {\n  expires 1y;\n  add_header Cache-Control \"public, immutable\";\n}\n```\n- **Service Workers**: Implementa estrategias de caché avanzadas\n```javascript\n// Ejemplo básico de Service Worker\nself.addEventListener('install', (event) => {\n  event.waitUntil(\n    caches.open('v1').then((cache) => {\n      return cache.addAll([\n        '/',\n        '/styles.css',\n        '/script.js',\n        '/images/logo.png'\n      ]);\n    })\n  );\n});\n\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then((response) => {\n      return response || fetch(event.request);\n    })\n  );\n});\n```\n- **ETag y Last-Modified**: Permite validaciones eficientes de caché"
      ]
    },
    {
      title: "Optimización del servidor",
      content: "El rendimiento del servidor es crucial para métricas como TTFB (Time to First Byte):",
      isStep: true,
      subsections: ["Optimización de bases de datos", "Caching en servidor", "CDN"],
      subsectionContent: [
        "- **Indexación adecuada**: Asegúrate de que tus consultas usen índices\n```sql\n-- Añadir un índice a una columna frecuentemente consultada\nCREATE INDEX idx_user_email ON users(email);\n```\n- **Consultas eficientes**: Evita N+1 queries y optimiza JOINs\n- **Connection pooling**: Reutiliza conexiones a la base de datos\n- **Sharding**: Divide bases de datos grandes en fragmentos más pequeños",
        
        "- **Caché de página completa**: Para contenido que no cambia frecuentemente\n- **Caché de fragmentos**: Para partes específicas de la página\n- **Caché de consultas**: Almacena resultados de consultas frecuentes\n```javascript\n// Ejemplo con Redis en Node.js\nconst redis = require('redis');\nconst client = redis.createClient();\n\nasync function getUserData(userId) {\n  // Intentar obtener del caché\n  const cachedData = await client.get(`user:${userId}`);\n  if (cachedData) {\n    return JSON.parse(cachedData);\n  }\n  \n  // Si no está en caché, obtener de la base de datos\n  const userData = await database.getUserById(userId);\n  \n  // Guardar en caché para futuras solicitudes\n  await client.set(`user:${userId}`, JSON.stringify(userData), 'EX', 3600);\n  \n  return userData;\n}\n```",
        
        "- **Distribuye contenido estático**: Usa CDNs como Cloudflare, Akamai o AWS CloudFront\n- **Edge computing**: Ejecuta código cerca del usuario final\n- **Configuración de CDN**:\n```nginx\n# Configuración de Nginx para trabajar con CDN\nserver {\n  listen 80;\n  server_name example.com;\n  \n  location ~* \\.(?:jpg|jpeg|gif|png|ico|woff2|js|css)$ {\n    expires 1y;\n    add_header Cache-Control \"public, immutable\";\n    add_header X-Cache-Status $upstream_cache_status;\n    \n    # Permitir CORS para recursos desde CDN\n    add_header Access-Control-Allow-Origin *;\n  }\n}\n```"
      ]
    },
    {
      title: "Optimización para dispositivos móviles",
      content: "Con más del 50% del tráfico web proveniente de dispositivos móviles, la optimización para estos dispositivos es crucial:",
      isStep: true,
      subsections: ["Diseño responsive", "Optimización de touch", "Ahorro de datos"],
      subsectionContent: [
        "- **Media queries**: Adapta el diseño a diferentes tamaños de pantalla\n```css\n/* Ejemplo básico de media query */\n@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n  \n  .sidebar {\n    width: 100%;\n    margin-bottom: 20px;\n  }\n}\n```\n- **Viewport meta tag**: Configura correctamente para dispositivos móviles\n```html\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n```\n- **Imágenes responsive**: Usa `srcset` y `sizes` para servir imágenes apropiadas",
        
        "- **Tamaño de elementos táctiles**: Asegúrate de que los botones y enlaces sean lo suficientemente grandes (mínimo 44x44px)\n- **Feedback táctil**: Proporciona retroalimentación visual al tocar elementos\n```css\n.button {\n  transition: transform 0.1s;\n}\n\n.button:active {\n  transform: scale(0.95);\n}\n```\n- **Elimina el delay de 300ms**: Usa `touch-action` o bibliotecas como FastClick",
        
        "- **Save-Data header**: Detecta cuando el usuario tiene habilitado el ahorro de datos\n```javascript\nconst saveData = navigator.connection && navigator.connection.saveData;\nif (saveData) {\n  // Cargar versión ligera del sitio\n  loadLightVersion();\n} else {\n  // Cargar versión normal\n  loadFullVersion();\n}\n```\n- **Compresión de imágenes agresiva**: Para conexiones lentas\n- **Elimina recursos no esenciales**: En modo de ahorro de datos"
      ]
    },
    {
      title: "Técnicas avanzadas de optimización",
      content: "Para llevar el rendimiento al siguiente nivel, considera estas técnicas avanzadas:",
      isStep: true,
      subsections: ["Renderizado en servidor (SSR)", "Generación estática", "Web Workers"],
      subsectionContent: [
        "- **Next.js para React**: Framework con SSR integrado\n```javascript\n// Ejemplo de página con getServerSideProps en Next.js\nexport async function getServerSideProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  \n  return {\n    props: { data }\n  };\n}\n\nfunction Page({ data }) {\n  return <div>{data.title}</div>;\n}\n\nexport default Page;\n```\n- **Nuxt.js para Vue**: Similar a Next.js pero para Vue\n- **Angular Universal**: SSR para Angular",
        
        "- **Jamstack**: Arquitectura basada en JavaScript, APIs y Markup\n- **Gatsby**: Generador de sitios estáticos para React\n- **Next.js con generación estática**:\n```javascript\n// Ejemplo de página con getStaticProps en Next.js\nexport async function getStaticProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  \n  return {\n    props: { data },\n    revalidate: 60 // Regenerar página cada 60 segundos si hay solicitudes\n  };\n}\n\nfunction Page({ data }) {\n  return <div>{data.title}</div>;\n}\n\nexport default Page;\n```",
        
        "- **Operaciones intensivas**: Mueve cálculos pesados a Web Workers\n```javascript\n// Crear un Web Worker\nconst worker = new Worker('worker.js');\n\n// Enviar datos al worker\nworker.postMessage({ data: complexData });\n\n// Recibir resultados del worker\nworker.onmessage = function(e) {\n  console.log('Resultado:', e.data.result);\n};\n```\n- **Workbox**: Biblioteca para implementar Service Workers\n- **Shared Workers**: Compartir un worker entre múltiples tabs/frames"
      ]
    },
    {
      title: "Monitoreo continuo y cultura de rendimiento",
      content: "La optimización de rendimiento no es una tarea puntual, sino un proceso continuo:",
      isStep: false,
      subsections: ["Monitoreo en producción", "Presupuestos de rendimiento", "Automatización"],
      subsectionContent: [
        "- **RUM (Real User Monitoring)**: Mide el rendimiento real de los usuarios\n- **Alertas**: Configura alertas para degradaciones de rendimiento\n- **Segmentación**: Analiza el rendimiento por dispositivo, ubicación, etc.",
        
        "- **Establece límites**: Define presupuestos para tamaño de bundle, tiempo de carga, etc.\n- **Integra en CI/CD**: Verifica que los cambios no excedan los presupuestos\n```json\n// budget.json para Lighthouse CI\n{\n  \"ci\": {\n    \"collect\": {\n      \"numberOfRuns\": 3\n    },\n    \"assert\": {\n      \"assertions\": {\n        \"first-contentful-paint\": [\"warn\", {\"minScore\": 0.8}],\n        \"interactive\": [\"error\", {\"maxNumericValue\": 3000}],\n        \"largest-contentful-paint\": [\"error\", {\"maxNumericValue\": 2500}]\n      }\n    }\n  }\n}\n```",
        
        "- **Lighthouse CI**: Integra auditorías de rendimiento en tu pipeline\n- **Pruebas de regresión**: Compara el rendimiento antes y después de cambios\n- **Revisiones de código**: Incluye el rendimiento como criterio de revisión"
      ]
    },
    {
      title: "Conclusión",
      content: "La optimización del rendimiento web es un proceso continuo que requiere un enfoque holístico. En este tutorial, hemos cubierto:\n\n- La importancia del rendimiento web y las métricas clave\n- Herramientas para medir y diagnosticar problemas de rendimiento\n- Técnicas para optimizar recursos estáticos, renderizado y red\n- Optimizaciones del lado del servidor\n- Consideraciones especiales para dispositivos móviles\n- Técnicas avanzadas como SSR, generación estática y Web Workers\n- La importancia del monitoreo continuo y la cultura de rendimiento\n\nRecuerda que la optimización del rendimiento debe ser un equilibrio entre velocidad, experiencia de usuario y mantenibilidad del código. No todas las técnicas son apropiadas para todos los proyectos, así que evalúa cuidadosamente qué optimizaciones tienen más sentido para tu caso específico.\n\nAl implementar estas técnicas de manera estratégica, podrás crear aplicaciones web que no solo sean rápidas, sino también accesibles, escalables y fáciles de mantener.",
      isStep: false
    }
  ];
  
  const relatedTutorials = [
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
    },
    {
      id: 4,
      title: "Desplegando una API Node.js en AWS",
      difficulty: "Advanced",
      image: "/media/tutorial-aws.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Optimización de rendimiento en aplicaciones web | Tecniweb Latam</title>
        <meta name="description" content="Aprende técnicas avanzadas para optimizar el rendimiento de tus aplicaciones web, desde la carga inicial hasta la experiencia de usuario durante la interacción." />
        <meta name="keywords" content="rendimiento web, optimización, Core Web Vitals, carga rápida, SEO, UX, JavaScript, CSS, imágenes" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial8;
