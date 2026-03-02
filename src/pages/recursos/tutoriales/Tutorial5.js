import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial5 = () => {
  const tutorial = {
    id: 5,
    title: "Introducción a Docker para desarrolladores web",
    date: "5 de Agosto, 2025",
    author: "Andy Amador",
    difficulty: "Beginner",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial5.jpg'),
    introduction: "Docker ha revolucionado la forma en que desarrollamos, desplegamos y ejecutamos aplicaciones. Esta tecnología de contenedores permite a los desarrolladores empaquetar una aplicación con todas sus dependencias en una unidad estandarizada, garantizando que funcione de manera consistente en cualquier entorno.\n\nEn este tutorial, aprenderás los conceptos básicos de Docker y cómo puede simplificar tu flujo de trabajo de desarrollo web. Veremos cómo crear contenedores, gestionar imágenes, y configurar entornos de desarrollo completos utilizando Docker Compose."
  };
  
  const sections = [
    {
      title: "¿Qué es Docker y por qué usarlo?",
      content: "Docker es una plataforma de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores. A diferencia de las máquinas virtuales tradicionales, los contenedores Docker no incluyen un sistema operativo completo, sino que comparten el kernel del sistema operativo host, lo que los hace más ligeros y eficientes.\n\n**Ventajas de usar Docker:**\n\n- **Consistencia**: \"Funciona en mi máquina\" ya no es un problema. Docker garantiza que tu aplicación funcionará igual en desarrollo, pruebas y producción.\n- **Aislamiento**: Cada contenedor funciona de forma aislada, lo que evita conflictos entre aplicaciones y sus dependencias.\n- **Eficiencia**: Los contenedores son ligeros y consumen menos recursos que las máquinas virtuales tradicionales.\n- **Escalabilidad**: Facilita la implementación de arquitecturas de microservicios y el escalado horizontal.\n- **Portabilidad**: Las aplicaciones dockerizadas pueden ejecutarse en cualquier sistema que tenga Docker instalado, independientemente del sistema operativo subyacente.",
      isStep: false
    },
    {
      title: "Instalación de Docker",
      content: "Antes de comenzar a trabajar con Docker, necesitamos instalarlo en nuestro sistema. Las instrucciones varían según el sistema operativo:",
      isStep: true,
      subsections: ["Windows", "macOS", "Linux"],
      subsectionContent: [
        "**Para Windows 10/11 Pro, Enterprise o Education:**\n1. Descarga Docker Desktop desde [el sitio oficial](https://www.docker.com/products/docker-desktop)\n2. Ejecuta el instalador y sigue las instrucciones\n3. Asegúrate de que la virtualización esté habilitada en la BIOS\n4. Docker Desktop incluye Docker Engine, Docker CLI, Docker Compose y otras herramientas\n\n**Para Windows Home:**\n1. Instala WSL 2 (Windows Subsystem for Linux)\n2. Descarga Docker Desktop para Windows\n3. Sigue las instrucciones de instalación específicas para WSL 2",
        
        "1. Descarga Docker Desktop para Mac desde [el sitio oficial](https://www.docker.com/products/docker-desktop)\n2. Arrastra la aplicación Docker a tu carpeta de Aplicaciones\n3. Inicia Docker Desktop\n4. Espera a que el ícono de Docker en la barra de menú indique que Docker está en ejecución",
        
        "Para Ubuntu:\n```bash\n# Actualizar el índice de paquetes\nsudo apt update\n\n# Instalar paquetes necesarios\nsudo apt install apt-transport-https ca-certificates curl software-properties-common\n\n# Añadir la clave GPG oficial de Docker\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\n\n# Añadir el repositorio de Docker\nsudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\"\n\n# Actualizar el índice de paquetes\nsudo apt update\n\n# Instalar Docker\nsudo apt install docker-ce\n\n# Verificar que Docker está instalado correctamente\nsudo docker run hello-world\n```\n\nPara otras distribuciones de Linux, consulta la [documentación oficial](https://docs.docker.com/engine/install/)."
      ]
    },
    {
      title: "Conceptos básicos de Docker",
      content: "Antes de sumergirnos en la práctica, es importante entender algunos conceptos clave de Docker:",
      isStep: false,
      subsections: ["Imágenes", "Contenedores", "Dockerfile", "Docker Hub", "Volúmenes", "Redes"],
      subsectionContent: [
        "Una **imagen** es una plantilla de solo lectura que contiene un conjunto de instrucciones para crear un contenedor. Piensa en ella como una instantánea de un sistema operativo con aplicaciones y configuraciones específicas.",
        
        "Un **contenedor** es una instancia en ejecución de una imagen. Puedes crear, iniciar, detener, mover o eliminar un contenedor utilizando la API de Docker o la interfaz de línea de comandos.",
        
        "Un **Dockerfile** es un archivo de texto que contiene todas las instrucciones necesarias para construir una imagen de Docker. Es como una receta para crear tu imagen personalizada.",
        
        "**Docker Hub** es un registro público de imágenes de Docker donde puedes encontrar y compartir imágenes. Funciona como un repositorio centralizado, similar a GitHub pero para imágenes de Docker.",
        
        "Los **volúmenes** son el mecanismo preferido para persistir los datos generados y utilizados por los contenedores de Docker. Son independientes del ciclo de vida del contenedor, lo que significa que los datos persisten incluso si el contenedor se elimina.",
        
        "Las **redes** de Docker permiten que los contenedores se comuniquen entre sí y con el mundo exterior. Docker proporciona diferentes tipos de redes (bridge, host, overlay, etc.) para diferentes casos de uso."
      ]
    },
    {
      title: "Tu primer contenedor Docker",
      content: "Vamos a crear y ejecutar nuestro primer contenedor Docker. Utilizaremos una imagen oficial de Nginx como ejemplo:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Descargar la imagen oficial de Nginx desde Docker Hub\ndocker pull nginx\n\n# Verificar que la imagen se ha descargado correctamente\ndocker images\n\n# Ejecutar un contenedor basado en la imagen de Nginx\ndocker run --name mi-nginx -p 8080:80 -d nginx\n\n# Verificar que el contenedor está en ejecución\ndocker ps"
        }
      ],
      note: "Ahora puedes abrir tu navegador y visitar http://localhost:8080 para ver la página de bienvenida de Nginx. ¡Felicidades! Has ejecutado tu primer contenedor Docker."
    },
    {
      title: "Comandos básicos de Docker",
      content: "Aquí hay algunos comandos básicos de Docker que te serán útiles:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Listar todos los contenedores en ejecución\ndocker ps\n\n# Listar todos los contenedores (incluyendo los detenidos)\ndocker ps -a\n\n# Listar todas las imágenes\ndocker images\n\n# Detener un contenedor\ndocker stop mi-nginx\n\n# Iniciar un contenedor detenido\ndocker start mi-nginx\n\n# Eliminar un contenedor (debe estar detenido)\ndocker rm mi-nginx\n\n# Eliminar una imagen\ndocker rmi nginx\n\n# Ver los logs de un contenedor\ndocker logs mi-nginx\n\n# Ejecutar un comando dentro de un contenedor en ejecución\ndocker exec -it mi-nginx bash"
        }
      ]
    },
    {
      title: "Creando tu propia imagen con Dockerfile",
      content: "Ahora vamos a crear nuestra propia imagen de Docker para una aplicación web simple. Crearemos una aplicación Node.js básica y la dockerizaremos:",
      isStep: true,
      subsections: ["Paso 1: Crear la aplicación Node.js", "Paso 2: Crear el Dockerfile", "Paso 3: Construir la imagen", "Paso 4: Ejecutar el contenedor"],
      subsectionContent: [
        "Primero, crea un nuevo directorio para tu proyecto y los archivos necesarios:\n```bash\nmkdir docker-node-app\ncd docker-node-app\n\n# Crear package.json\ncat > package.json << EOL\n{\n  \"name\": \"docker-node-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Una aplicación Node.js simple para Docker\",\n  \"main\": \"app.js\",\n  \"scripts\": {\n    \"start\": \"node app.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.17.1\"\n  }\n}\nEOL\n\n# Crear app.js\ncat > app.js << EOL\nconst express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('¡Hola desde Docker!');\n});\n\napp.listen(PORT, () => {\n  console.log(`Servidor corriendo en http://localhost:${PORT}`);\n});\nEOL\n```",
        
        "Crea un archivo Dockerfile en el mismo directorio:\n```bash\ncat > Dockerfile << EOL\n# Usar una imagen base de Node.js\nFROM node:14\n\n# Establecer el directorio de trabajo en el contenedor\nWORKDIR /usr/src/app\n\n# Copiar package.json y package-lock.json\nCOPY package*.json ./\n\n# Instalar dependencias\nRUN npm install\n\n# Copiar el código fuente\nCOPY . .\n\n# Exponer el puerto que usa la aplicación\nEXPOSE 3000\n\n# Comando para ejecutar la aplicación\nCMD [\"npm\", \"start\"]\nEOL\n```",
        
        "Construye la imagen de Docker:\n```bash\ndocker build -t mi-node-app .\n```\nEste comando construye una imagen de Docker basada en las instrucciones del Dockerfile y la etiqueta como 'mi-node-app'.",
        
        "Ejecuta un contenedor basado en tu imagen:\n```bash\ndocker run --name mi-app -p 3000:3000 -d mi-node-app\n```\nAhora puedes visitar http://localhost:3000 en tu navegador para ver tu aplicación en funcionamiento."
      ]
    },
    {
      title: "Docker Compose para entornos multi-contenedor",
      content: "Docker Compose es una herramienta para definir y ejecutar aplicaciones Docker multi-contenedor. Con Compose, utilizas un archivo YAML para configurar los servicios de tu aplicación y luego, con un solo comando, creas e inicias todos los servicios desde tu configuración.",
      isStep: true,
      subsections: ["Instalación de Docker Compose", "Creando un archivo docker-compose.yml", "Ejecutando Docker Compose"],
      subsectionContent: [
        "Docker Desktop para Windows y Mac ya incluye Docker Compose. Para Linux, puedes instalarlo con:\n```bash\nsudo curl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose\nsudo chmod +x /usr/local/bin/docker-compose\n\n# Verificar la instalación\ndocker-compose --version\n```",
        
        "Vamos a crear un entorno de desarrollo MERN (MongoDB, Express, React, Node.js) utilizando Docker Compose. Crea un archivo docker-compose.yml en tu proyecto:\n```yaml\nversion: '3'\n\nservices:\n  # Servicio de MongoDB\n  mongodb:\n    image: mongo:latest\n    container_name: mongodb\n    restart: always\n    ports:\n      - \"27017:27017\"\n    volumes:\n      - mongodb_data:/data/db\n    networks:\n      - app-network\n\n  # Servicio de Backend (Node.js/Express)\n  backend:\n    build: ./backend\n    container_name: backend\n    restart: always\n    ports:\n      - \"5000:5000\"\n    depends_on:\n      - mongodb\n    environment:\n      - MONGO_URI=mongodb://mongodb:27017/myapp\n      - PORT=5000\n    volumes:\n      - ./backend:/usr/src/app\n      - /usr/src/app/node_modules\n    networks:\n      - app-network\n\n  # Servicio de Frontend (React)\n  frontend:\n    build: ./frontend\n    container_name: frontend\n    restart: always\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - backend\n    volumes:\n      - ./frontend:/usr/src/app\n      - /usr/src/app/node_modules\n    networks:\n      - app-network\n\nnetworks:\n  app-network:\n    driver: bridge\n\nvolumes:\n  mongodb_data:\n```",
        
        "Para iniciar todos los servicios definidos en tu archivo docker-compose.yml:\n```bash\ndocker-compose up -d\n```\n\nPara detener todos los servicios:\n```bash\ndocker-compose down\n```\n\nPara ver los logs de todos los servicios:\n```bash\ndocker-compose logs\n```\n\nPara ver los logs de un servicio específico:\n```bash\ndocker-compose logs backend\n```"
      ]
    },
    {
      title: "Buenas prácticas para Docker en desarrollo web",
      content: "Aquí hay algunas buenas prácticas que deberías seguir al trabajar con Docker en tus proyectos de desarrollo web:",
      isStep: false,
      subsections: ["Optimización de imágenes", "Gestión de secretos", "Persistencia de datos", "Desarrollo local con Docker"],
      subsectionContent: [
        "- Usa imágenes oficiales como base siempre que sea posible\n- Utiliza imágenes específicas de versión en lugar de 'latest'\n- Minimiza el número de capas en tu Dockerfile combinando comandos RUN relacionados\n- Usa .dockerignore para excluir archivos innecesarios\n- Considera usar imágenes multi-etapa para reducir el tamaño final\n- Ordena las instrucciones del Dockerfile de menos a más frecuentemente cambiantes",
        
        "- Nunca incluyas secretos (contraseñas, tokens, claves API) directamente en tu Dockerfile o imagen\n- Usa variables de entorno o archivos de entorno (.env) para configuración\n- Considera usar Docker Secrets para entornos de producción\n- Para desarrollo local, puedes usar archivos .env con docker-compose",
        
        "- Usa volúmenes de Docker para datos que necesiten persistir\n- Monta directorios del host para desarrollo local para ver cambios en tiempo real\n- Considera usar volúmenes nombrados para datos de bases de datos\n- Asegúrate de incluir volúmenes en tus copias de seguridad",
        
        "- Usa Docker Compose para gestionar entornos de desarrollo complejos\n- Configura hot-reloading para ver cambios en tiempo real\n- Considera usar herramientas como nodemon para Node.js\n- Monta el código fuente como un volumen para desarrollo\n- Usa diferentes archivos docker-compose para desarrollo y producción"
      ]
    },
    {
      title: "Dockerizando aplicaciones web comunes",
      content: "Veamos cómo dockerizar algunos tipos comunes de aplicaciones web:",
      isStep: true,
      subsections: ["Aplicación React", "Aplicación Node.js/Express", "Aplicación Django"],
      subsectionContent: [
        "**Dockerfile para una aplicación React:**\n```dockerfile\n# Etapa de construcción\nFROM node:14 as build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\n# Etapa de producción\nFROM nginx:alpine\nCOPY --from=build /app/build /usr/share/nginx/html\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]\n```\n\n**docker-compose.yml para desarrollo:**\n```yaml\nversion: '3'\nservices:\n  react-app:\n    build:\n      context: .\n      dockerfile: Dockerfile.dev\n    volumes:\n      - ./:/app\n      - /app/node_modules\n    ports:\n      - \"3000:3000\"\n    environment:\n      - CHOKIDAR_USEPOLLING=true\n```\n\n**Dockerfile.dev para desarrollo:**\n```dockerfile\nFROM node:14\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\n```",
        
        "**Dockerfile para una API Node.js/Express:**\n```dockerfile\nFROM node:14\nWORKDIR /usr/src/app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 5000\nCMD [\"node\", \"server.js\"]\n```\n\n**docker-compose.yml con MongoDB:**\n```yaml\nversion: '3'\nservices:\n  api:\n    build: .\n    ports:\n      - \"5000:5000\"\n    depends_on:\n      - mongo\n    environment:\n      - MONGO_URI=mongodb://mongo:27017/myapp\n  mongo:\n    image: mongo\n    ports:\n      - \"27017:27017\"\n    volumes:\n      - mongo-data:/data/db\nvolumes:\n  mongo-data:\n```",
        
        "**Dockerfile para una aplicación Django:**\n```dockerfile\nFROM python:3.9\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD [\"python\", \"manage.py\", \"runserver\", \"0.0.0.0:8000\"]\n```\n\n**docker-compose.yml con PostgreSQL:**\n```yaml\nversion: '3'\nservices:\n  web:\n    build: .\n    ports:\n      - \"8000:8000\"\n    depends_on:\n      - db\n    environment:\n      - DATABASE_URL=postgres://postgres:postgres@db:5432/postgres\n  db:\n    image: postgres\n    environment:\n      - POSTGRES_PASSWORD=postgres\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\nvolumes:\n  postgres-data:\n```"
      ]
    },
    {
      title: "Despliegue de contenedores Docker",
      content: "Una vez que hayas dockerizado tu aplicación, hay varias opciones para desplegarla en producción:",
      isStep: false,
      subsections: ["Opciones de despliegue", "Consideraciones para producción"],
      subsectionContent: [
        "- **Servidores propios**: Puedes ejecutar Docker en tus propios servidores\n- **Servicios en la nube**:\n  - AWS ECS (Elastic Container Service)\n  - AWS EKS (Elastic Kubernetes Service)\n  - Google Cloud Run\n  - Azure Container Instances\n  - DigitalOcean App Platform\n- **Plataformas especializadas**:\n  - Heroku (con buildpack de Docker)\n  - Netlify (para frontend estático)\n  - Vercel (para frontend estático)\n- **Orquestadores de contenedores**:\n  - Kubernetes\n  - Docker Swarm",
        
        "- Usa imágenes específicas de versión, nunca 'latest'\n- Implementa health checks para tus contenedores\n- Configura límites de recursos (CPU, memoria)\n- Usa redes privadas cuando sea posible\n- Implementa monitoreo y logging\n- Considera usar un registro de contenedores privado\n- Automatiza el despliegue con CI/CD\n- Implementa copias de seguridad regulares\n- Planifica estrategias de escalado\n- Considera la seguridad (escaneo de vulnerabilidades, principio de mínimo privilegio)"
      ]
    },
    {
      title: "Conclusión",
      content: "Docker ha transformado la forma en que desarrollamos y desplegamos aplicaciones web. Con Docker, puedes:\n\n- Crear entornos de desarrollo consistentes y reproducibles\n- Eliminar el problema de \"funciona en mi máquina\"\n- Simplificar la configuración de entornos complejos\n- Facilitar la integración continua y el despliegue continuo\n- Mejorar la portabilidad de tus aplicaciones\n\nEn este tutorial, has aprendido los conceptos básicos de Docker, cómo crear y gestionar contenedores, cómo crear tus propias imágenes con Dockerfile, y cómo orquestar múltiples contenedores con Docker Compose. También has visto ejemplos prácticos de cómo dockerizar diferentes tipos de aplicaciones web y algunas buenas prácticas para trabajar con Docker.\n\nAhora estás listo para incorporar Docker en tu flujo de trabajo de desarrollo web y aprovechar todos sus beneficios. ¡Feliz dockerización!",
      isStep: false
    }
  ];
  
  const relatedTutorials = [
    {
      id: 4,
      title: "Desplegando una API Node.js en AWS",
      difficulty: "Advanced",
      image: "/media/tutorial-aws.webp"
    },
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
    }
  ];

  return (
    <>
      <Helmet>
        <title>Introducción a Docker para desarrolladores web | Tecniweb Latam</title>
        <meta name="description" content="Descubre cómo Docker puede simplificar tu flujo de trabajo de desarrollo web, creando entornos consistentes y reproducibles para tus aplicaciones." />
        <meta name="keywords" content="Docker, contenedores, desarrollo web, DevOps, Docker Compose, Dockerfile, imágenes Docker" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial5;
