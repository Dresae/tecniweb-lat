import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial4 = () => {
  const tutorial = {
    id: 4,
    title: "Desplegando una API Node.js en AWS",
    date: "30 de Julio, 2025",
    author: "Andy Amador",
    difficulty: "Advanced",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial4.png'),
    introduction: "Desplegar una aplicación en un entorno de producción es un paso crucial en el ciclo de desarrollo de software. Amazon Web Services (AWS) ofrece una amplia gama de servicios que facilitan el despliegue, escalado y mantenimiento de aplicaciones web.\n\nEn este tutorial, aprenderás a desplegar una API Node.js en AWS utilizando servicios como EC2 para la computación, RDS para la base de datos y otros servicios complementarios para crear un entorno de producción robusto y escalable."
  };
  
  const sections = [
    {
      title: "Requisitos previos",
      content: "Antes de comenzar, asegúrate de tener lo siguiente:\n\n- Una cuenta de AWS (puedes crear una cuenta gratuita si no tienes una)\n- Una API Node.js lista para desplegar (puedes usar la API que creamos en tutoriales anteriores)\n- Node.js y npm instalados en tu máquina local\n- AWS CLI instalado y configurado\n- Conocimientos básicos de línea de comandos y SSH",
      isStep: false
    },
    {
      title: "Preparación de la API para producción",
      content: "Antes de desplegar nuestra API en AWS, debemos asegurarnos de que esté lista para un entorno de producción:",
      isStep: true,
      subsections: ["Configuración de variables de entorno", "Manejo de errores", "Logging"],
      subsectionContent: [
        "Asegúrate de que tu aplicación utilice variables de entorno para configuraciones como la cadena de conexión a la base de datos, puertos, secretos JWT, etc. Puedes usar la biblioteca dotenv para esto:\n```javascript\n// config.js\nrequire('dotenv').config();\n\nmodule.exports = {\n  port: process.env.PORT || 3000,\n  nodeEnv: process.env.NODE_ENV || 'development',\n  mongoUri: process.env.MONGO_URI,\n  jwtSecret: process.env.JWT_SECRET,\n  jwtExpire: process.env.JWT_EXPIRE || '30d'\n};\n```",
        
        "Implementa un manejo de errores adecuado en toda tu aplicación. Crea un middleware para capturar errores:\n```javascript\n// middleware/errorHandler.js\nconst errorHandler = (err, req, res, next) => {\n  console.error(err.stack);\n\n  res.status(err.statusCode || 500).json({\n    success: false,\n    error: err.message || 'Error del servidor'\n  });\n};\n\nmodule.exports = errorHandler;\n```",
        
        "Considera implementar un sistema de logging más robusto que console.log. Puedes usar bibliotecas como Winston o Morgan:\n```javascript\n// utils/logger.js\nconst winston = require('winston');\n\nconst logger = winston.createLogger({\n  level: 'info',\n  format: winston.format.combine(\n    winston.format.timestamp(),\n    winston.format.json()\n  ),\n  transports: [\n    new winston.transports.File({ filename: 'error.log', level: 'error' }),\n    new winston.transports.File({ filename: 'combined.log' })\n  ]\n});\n\nif (process.env.NODE_ENV !== 'production') {\n  logger.add(new winston.transports.Console({\n    format: winston.format.simple()\n  }));\n}\n\nmodule.exports = logger;\n```"
      ]
    },
    {
      title: "Creación de una instancia EC2",
      content: "Amazon EC2 (Elastic Compute Cloud) proporciona capacidad de computación escalable en la nube. Vamos a crear una instancia EC2 para alojar nuestra API:",
      isStep: true,
      subsections: ["Paso 1: Iniciar una instancia EC2", "Paso 2: Configurar grupos de seguridad", "Paso 3: Conectarse a la instancia"],
      subsectionContent: [
        "1. Inicia sesión en la consola de AWS y navega a EC2\n2. Haz clic en 'Launch Instance'\n3. Selecciona una Amazon Machine Image (AMI) - recomendamos Amazon Linux 2 o Ubuntu Server\n4. Elige un tipo de instancia (t2.micro está disponible en la capa gratuita)\n5. Configura los detalles de la instancia según tus necesidades\n6. Añade almacenamiento (el valor predeterminado suele ser suficiente para comenzar)\n7. Añade etiquetas para organizar tus recursos (opcional)\n8. Procede a configurar el grupo de seguridad",
        
        "Los grupos de seguridad actúan como un firewall virtual. Configura el tuyo para permitir:\n- SSH (puerto 22) desde tu dirección IP\n- HTTP (puerto 80) desde cualquier lugar\n- HTTPS (puerto 443) desde cualquier lugar\n- El puerto de tu API (por ejemplo, 3000) desde cualquier lugar o desde direcciones IP específicas",
        
        "Una vez que la instancia esté en ejecución, conéctate a ella usando SSH:\n```bash\nssh -i /ruta/a/tu-clave.pem ec2-user@tu-instancia-ip\n```\nPara instancias de Amazon Linux, el usuario es 'ec2-user'. Para Ubuntu, es 'ubuntu'."
      ]
    },
    {
      title: "Configuración del entorno en EC2",
      content: "Ahora configuraremos el entorno en nuestra instancia EC2 para ejecutar nuestra API Node.js:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Actualizar el sistema\nsudo yum update -y  # Para Amazon Linux\n# o\nsudo apt update && sudo apt upgrade -y  # Para Ubuntu\n\n# Instalar Node.js\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash\nsource ~/.bashrc\nnvm install 14  # O la versión que necesites\n\n# Instalar PM2 para gestionar procesos de Node.js\nnpm install -g pm2\n\n# Instalar Git\nsudo yum install git -y  # Para Amazon Linux\n# o\nsudo apt install git -y  # Para Ubuntu"
        }
      ]
    },
    {
      title: "Despliegue de la API en EC2",
      content: "Existen varias formas de desplegar tu API en la instancia EC2. Aquí veremos dos enfoques comunes:",
      isStep: true,
      subsections: ["Opción 1: Clonar desde un repositorio Git", "Opción 2: Transferir archivos directamente"],
      subsectionContent: [
        "Si tu código está en un repositorio Git (recomendado):\n```bash\n# Clonar el repositorio\ngit clone https://github.com/tu-usuario/tu-repo.git\ncd tu-repo\n\n# Instalar dependencias\nnpm install --production\n\n# Crear archivo .env\ncat > .env << EOL\nPORT=3000\nNODE_ENV=production\nMONGO_URI=tu-cadena-de-conexion-mongodb\nJWT_SECRET=tu-secreto-jwt\nJWT_EXPIRE=30d\nEOL\n\n# Iniciar la aplicación con PM2\npm2 start npm -- start\n```",
        
        "Si prefieres transferir los archivos directamente:\n```bash\n# En tu máquina local\nscp -i /ruta/a/tu-clave.pem -r /ruta/local/a/tu-api ec2-user@tu-instancia-ip:~/api\n\n# En la instancia EC2\ncd ~/api\nnpm install --production\n\n# Crear archivo .env y configurar variables\n\n# Iniciar la aplicación con PM2\npm2 start npm -- start\n```"
      ]
    },
    {
      title: "Configuración de una base de datos con Amazon RDS",
      content: "Para una aplicación en producción, es recomendable utilizar un servicio de base de datos gestionado como Amazon RDS en lugar de ejecutar MongoDB directamente en la instancia EC2:",
      isStep: true,
      subsections: ["Paso 1: Crear una instancia de RDS", "Paso 2: Configurar la seguridad", "Paso 3: Conectar la API a RDS"],
      subsectionContent: [
        "1. Ve a la consola de AWS y navega a RDS\n2. Haz clic en 'Create database'\n3. Selecciona el motor de base de datos (MySQL, PostgreSQL, etc.)\n4. Elige la edición y versión\n5. Configura las opciones de la instancia (para pruebas, la capa gratuita es suficiente)\n6. Configura el almacenamiento\n7. Establece un nombre de usuario y contraseña\n8. Configura opciones adicionales según tus necesidades\n9. Crea la base de datos",
        
        "Configura el grupo de seguridad de la base de datos para permitir conexiones desde tu instancia EC2:\n1. Ve a la pestaña 'Security Groups' en EC2\n2. Selecciona el grupo de seguridad de tu base de datos\n3. Añade una regla de entrada que permita el tráfico desde el grupo de seguridad de tu instancia EC2 al puerto de la base de datos",
        
        "Actualiza la variable de entorno MONGO_URI en tu aplicación para que apunte a tu nueva base de datos RDS:\n```bash\n# Editar el archivo .env\nvi .env\n\n# Actualizar la cadena de conexión\nMONGO_URI=mongodb://usuario:contraseña@tu-instancia-rds.region.rds.amazonaws.com:27017/tu-base-de-datos\n\n# Reiniciar la aplicación\npm2 restart all\n```"
      ]
    },
    {
      title: "Configuración de un dominio y HTTPS",
      content: "Para hacer que tu API sea más accesible y segura, puedes configurar un nombre de dominio y HTTPS:",
      isStep: true,
      subsections: ["Paso 1: Registrar un dominio con Route 53", "Paso 2: Configurar Elastic IP", "Paso 3: Configurar HTTPS con Certbot"],
      subsectionContent: [
        "1. Ve a la consola de AWS y navega a Route 53\n2. Haz clic en 'Registered domains' y luego en 'Register domain'\n3. Sigue el proceso para registrar un nuevo dominio o transferir uno existente\n4. Una vez registrado, crea un registro A que apunte a la IP de tu instancia EC2",
        
        "Para evitar que la IP de tu instancia cambie al reiniciarla:\n1. Ve a la consola de EC2\n2. Haz clic en 'Elastic IPs'\n3. Haz clic en 'Allocate new address'\n4. Selecciona la nueva IP elástica y haz clic en 'Actions' > 'Associate address'\n5. Selecciona tu instancia EC2 y haz clic en 'Associate'\n6. Actualiza tu registro DNS en Route 53 para que apunte a esta nueva IP",
        
        "Para configurar HTTPS con Let's Encrypt y Certbot:\n```bash\n# Instalar Certbot\nsudo yum install -y certbot  # Para Amazon Linux\n# o\nsudo apt install -y certbot  # Para Ubuntu\n\n# Obtener certificado\nsudo certbot certonly --standalone -d tu-dominio.com\n\n# Configurar renovación automática\necho \"0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew\" | sudo tee -a /etc/crontab > /dev/null\n```"
      ]
    },
    {
      title: "Configuración de Nginx como proxy inverso",
      content: "Nginx es un servidor web de alto rendimiento que puede actuar como proxy inverso para tu API Node.js:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Instalar Nginx\nsudo yum install nginx -y  # Para Amazon Linux\n# o\nsudo apt install nginx -y  # Para Ubuntu\n\n# Iniciar Nginx\nsudo systemctl start nginx\nsudo systemctl enable nginx"
        },
        {
          language: "nginx",
          code: "# Configurar Nginx como proxy inverso\n# /etc/nginx/conf.d/api.conf\nserver {\n    listen 80;\n    server_name tu-dominio.com;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n}\n"
        },
        {
          language: "bash",
          code: "# Verificar la configuración y reiniciar Nginx\nsudo nginx -t\nsudo systemctl restart nginx"
        }
      ]
    },
    {
      title: "Configuración de HTTPS en Nginx",
      content: "Ahora configuraremos Nginx para utilizar los certificados SSL que obtuvimos con Certbot:",
      isStep: true,
      code: [
        {
          language: "nginx",
          code: "# /etc/nginx/conf.d/api.conf\nserver {\n    listen 80;\n    server_name tu-dominio.com;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl;\n    server_name tu-dominio.com;\n\n    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_prefer_server_ciphers on;\n    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n}\n"
        },
        {
          language: "bash",
          code: "# Verificar la configuración y reiniciar Nginx\nsudo nginx -t\nsudo systemctl restart nginx"
        }
      ]
    },
    {
      title: "Monitoreo y mantenimiento",
      content: "Para garantizar que tu API funcione correctamente en producción, es importante configurar monitoreo y mantenimiento:",
      isStep: true,
      subsections: ["Monitoreo con PM2", "Logs y alertas", "Copias de seguridad"],
      subsectionContent: [
        "PM2 proporciona herramientas básicas de monitoreo:\n```bash\n# Ver estado de las aplicaciones\npm2 status\n\n# Monitoreo en tiempo real\npm2 monit\n\n# Configurar reinicio automático\npm2 startup\n```",
        
        "Configura CloudWatch para monitorear tu instancia EC2 y recibir alertas:\n1. Ve a la consola de CloudWatch\n2. Crea una alarma basada en métricas como CPU, memoria o disco\n3. Configura notificaciones por email o SMS cuando se activen las alarmas",
        
        "Configura copias de seguridad automáticas de tu base de datos:\n1. Para RDS, puedes configurar snapshots automáticos en la consola de RDS\n2. Para datos en la instancia EC2, considera usar Amazon S3 para almacenar copias de seguridad:\n```bash\n# Instalar AWS CLI si no está instalado\npip install awscli\n\n# Configurar AWS CLI\naws configure\n\n# Script para hacer backup y subirlo a S3\n#!/bin/bash\nBACKUP_FILE=\"api-backup-$(date +%Y%m%d).tar.gz\"\ntar -czf $BACKUP_FILE /ruta/a/tu/api\naws s3 cp $BACKUP_FILE s3://tu-bucket/$BACKUP_FILE\nrm $BACKUP_FILE\n```"
      ]
    },
    {
      title: "Escalado de la aplicación",
      content: "A medida que tu API crezca, es posible que necesites escalar para manejar más tráfico:",
      isStep: true,
      subsections: ["Escalado vertical", "Escalado horizontal", "Balanceo de carga"],
      subsectionContent: [
        "El escalado vertical implica aumentar los recursos de tu instancia EC2:\n1. Detén tu instancia EC2\n2. Cambia el tipo de instancia a uno con más CPU, memoria o ambos\n3. Inicia la instancia nuevamente",
        
        "El escalado horizontal implica añadir más instancias EC2:\n1. Crea una AMI (Amazon Machine Image) de tu instancia actual\n2. Lanza nuevas instancias a partir de esa AMI\n3. Configura un balanceador de carga para distribuir el tráfico",
        
        "Configura un balanceador de carga con Elastic Load Balancing (ELB):\n1. Ve a la consola de EC2 y navega a 'Load Balancers'\n2. Crea un nuevo balanceador de carga (Application Load Balancer es recomendado para APIs HTTP)\n3. Configura los grupos de seguridad y subredes\n4. Crea un grupo objetivo y añade tus instancias EC2\n5. Configura el health check para verificar que tus instancias estén funcionando correctamente"
      ]
    },
    {
      title: "Automatización con CI/CD",
      content: "Para simplificar el proceso de despliegue, puedes configurar un pipeline de integración continua y despliegue continuo (CI/CD):",
      isStep: true,
      subsections: ["Configuración de GitHub Actions", "Despliegue automático"],
      subsectionContent: [
        "Crea un archivo de flujo de trabajo de GitHub Actions en tu repositorio:\n```yaml\n# .github/workflows/deploy.yml\nname: Deploy to AWS\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v2\n    \n    - name: Setup Node.js\n      uses: actions/setup-node@v2\n      with:\n        node-version: '14'\n        \n    - name: Install dependencies\n      run: npm ci\n      \n    - name: Run tests\n      run: npm test\n      \n    - name: Configure AWS credentials\n      uses: aws-actions/configure-aws-credentials@v1\n      with:\n        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n        aws-region: us-east-1\n```",
        
        "Añade pasos para el despliegue automático:\n```yaml\n    - name: Deploy to EC2\n      run: |\n        echo \"${{ secrets.SSH_PRIVATE_KEY }}\" > private_key.pem\n        chmod 600 private_key.pem\n        ssh -o StrictHostKeyChecking=no -i private_key.pem ec2-user@tu-instancia-ip << 'EOF'\n          cd ~/api\n          git pull\n          npm ci --production\n          pm2 restart all\n        EOF\n```\n\nNo olvides añadir los secretos necesarios (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SSH_PRIVATE_KEY) en la configuración de tu repositorio de GitHub."
      ]
    },
    {
      title: "Conclusión",
      content: "¡Felicidades! Has desplegado con éxito una API Node.js en AWS. Este tutorial cubrió:\n\n- Preparación de tu API para producción\n- Creación y configuración de una instancia EC2\n- Despliegue de tu API en EC2\n- Configuración de una base de datos con Amazon RDS\n- Configuración de un dominio y HTTPS\n- Uso de Nginx como proxy inverso\n- Monitoreo y mantenimiento\n- Estrategias de escalado\n- Automatización con CI/CD\n\nRecuerda que este es solo el comienzo. AWS ofrece muchos más servicios que pueden mejorar tu infraestructura, como Amazon ECS/EKS para contenedores, AWS Lambda para funciones sin servidor, y Amazon API Gateway para gestión de APIs.\n\nA medida que tu aplicación crezca, considera adoptar una arquitectura más modular y utilizar servicios gestionados siempre que sea posible para reducir la carga operativa.",
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
      id: 5,
      title: "Introducción a Docker para desarrolladores web",
      difficulty: "Beginner",
      image: "/media/tutorial-docker.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Desplegando una API Node.js en AWS | Tecniweb Latam</title>
        <meta name="description" content="Guía paso a paso para desplegar una API Node.js en Amazon Web Services (AWS) utilizando EC2, RDS y otros servicios para un entorno de producción robusto." />
        <meta name="keywords" content="AWS, EC2, RDS, Node.js, API, despliegue, producción, DevOps, Nginx, HTTPS" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial4;
