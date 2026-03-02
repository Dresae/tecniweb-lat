import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tutorial from '../../../components/Tutorial';

const Tutorial7 = () => {
  const tutorial = {
    id: 7,
    title: "Desarrollo de aplicaciones web con TypeScript",
    date: "25 de Agosto, 2025",
    author: "Andy Amador",
    difficulty: "Intermediate",
    image: require('../../../assets/recursos-pics/tutoriales/tutorial7.jpg'),
    introduction: "TypeScript se ha convertido en una herramienta esencial para el desarrollo de aplicaciones web modernas, ofreciendo todas las ventajas de JavaScript con el beneficio adicional de un sistema de tipos estático.\n\nEn este tutorial, aprenderás los fundamentos de TypeScript y cómo utilizarlo para desarrollar aplicaciones web más robustas y mantenibles. Exploraremos la configuración de un proyecto, los conceptos básicos del lenguaje, y cómo integrarlo con frameworks populares como React."
  };
  
  const sections = [
    {
      title: "¿Qué es TypeScript y por qué usarlo?",
      content: "TypeScript es un superconjunto de JavaScript desarrollado por Microsoft que añade tipado estático opcional y otras características a JavaScript. Al ser un superconjunto, todo código JavaScript válido es también código TypeScript válido.\n\n**Ventajas de usar TypeScript:**\n\n- **Detección temprana de errores**: El sistema de tipos permite identificar errores durante el desarrollo, antes de ejecutar el código.\n- **Mejor documentación**: Los tipos sirven como documentación integrada en el código.\n- **Mejor soporte de herramientas**: Autocompletado, navegación de código y refactorización más potentes.\n- **Código más mantenible**: Facilita el trabajo en equipos grandes y en proyectos complejos.\n- **Adopción gradual**: Puedes migrar proyectos JavaScript existentes a TypeScript de forma incremental.",
      isStep: false
    },
    {
      title: "Requisitos previos",
      content: "Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:\n\n- Node.js (versión 14.x o superior)\n- npm o yarn\n- Un editor de código con buen soporte para TypeScript (recomendado: Visual Studio Code)\n- Conocimientos básicos de JavaScript",
      isStep: false
    },
    {
      title: "Instalación y configuración de TypeScript",
      content: "Comencemos instalando TypeScript y configurando un proyecto básico:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Crear un nuevo directorio para el proyecto\nmkdir typescript-web-app\ncd typescript-web-app\n\n# Inicializar un proyecto npm\nnpm init -y\n\n# Instalar TypeScript como dependencia de desarrollo\nnpm install --save-dev typescript\n\n# Inicializar la configuración de TypeScript\nnpx tsc --init"
        }
      ],
      note: "El comando `tsc --init` crea un archivo tsconfig.json con la configuración predeterminada de TypeScript."
    },
    {
      title: "Configuración del archivo tsconfig.json",
      content: "El archivo tsconfig.json controla cómo TypeScript compila tu código. Vamos a modificarlo para adaptarlo a nuestras necesidades:",
      isStep: true,
      code: [
        {
          language: "json",
          code: "{\n  \"compilerOptions\": {\n    \"target\": \"es6\",\n    \"module\": \"commonjs\",\n    \"lib\": [\"dom\", \"es6\", \"dom.iterable\", \"scripthost\"],\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true,\n    \"forceConsistentCasingInFileNames\": true\n  },\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\"node_modules\", \"**/*.spec.ts\"]\n}"
        }
      ],
      subsections: ["Explicación de las opciones principales"],
      subsectionContent: [
        "- **target**: Especifica la versión de ECMAScript a la que se compilará el código (es6 = ECMAScript 2015)\n- **module**: Sistema de módulos para el código generado (commonjs para Node.js)\n- **lib**: Bibliotecas de definición de tipos que se incluirán\n- **outDir**: Directorio donde se generarán los archivos JavaScript compilados\n- **rootDir**: Directorio raíz de los archivos TypeScript\n- **strict**: Habilita todas las comprobaciones de tipo estrictas\n- **include/exclude**: Patrones para incluir/excluir archivos de la compilación"
      ]
    },
    {
      title: "Estructura del proyecto",
      content: "Vamos a crear una estructura básica para nuestro proyecto:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "mkdir src\ntouch src/index.ts\ntouch src/types.ts"
        }
      ]
    },
    {
      title: "Conceptos básicos de TypeScript",
      content: "Ahora vamos a explorar los conceptos fundamentales de TypeScript:",
      isStep: true,
      subsections: ["Tipos básicos", "Interfaces", "Tipos personalizados", "Genéricos", "Decoradores"],
      subsectionContent: [
        "Los tipos básicos en TypeScript incluyen:\n```typescript\n// src/types.ts\n\n// Tipos primitivos\nlet isDone: boolean = false;\nlet decimal: number = 6;\nlet color: string = \"blue\";\n\n// Arrays\nlet list: number[] = [1, 2, 3];\nlet names: Array<string> = [\"John\", \"Jane\"];\n\n// Tupla\nlet person: [string, number] = [\"John\", 25];\n\n// Enum\nenum Color {Red, Green, Blue}\nlet c: Color = Color.Green;\n\n// Any (evitar usar cuando sea posible)\nlet notSure: any = 4;\n\n// Void (ausencia de tipo, común en funciones sin retorno)\nfunction logMessage(message: string): void {\n  console.log(message);\n}\n\n// Null y Undefined\nlet u: undefined = undefined;\nlet n: null = null;\n\n// Never (funciones que nunca retornan o siempre lanzan excepciones)\nfunction error(message: string): never {\n  throw new Error(message);\n}\n```",
        
        "Las interfaces definen la estructura que deben tener los objetos:\n```typescript\n// src/types.ts\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number; // Propiedad opcional\n  readonly createdAt: Date; // Propiedad de solo lectura\n}\n\nfunction createUser(user: User): User {\n  return {\n    ...user,\n    createdAt: new Date()\n  };\n}\n\nconst newUser = createUser({\n  id: 1,\n  name: \"John Doe\",\n  email: \"john@example.com\"\n});\n```",
        
        "Los tipos personalizados permiten crear definiciones de tipos más complejas:\n```typescript\n// src/types.ts\n\n// Type alias\ntype ID = string | number;\n\n// Union types\ntype Status = \"pending\" | \"approved\" | \"rejected\";\n\n// Intersection types\ntype Employee = User & {\n  department: string;\n  role: string;\n};\n\n// Mapped types\ntype Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\nconst readonlyUser: Readonly<User> = {\n  id: 2,\n  name: \"Jane Doe\",\n  email: \"jane@example.com\",\n  createdAt: new Date()\n};\n```",
        
        "Los genéricos permiten crear componentes reutilizables que pueden trabajar con diferentes tipos:\n```typescript\n// src/types.ts\n\n// Función genérica\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42);\nconst str = identity(\"hello\"); // Inferencia de tipo\n\n// Interfaz genérica\ninterface Repository<T> {\n  getAll(): T[];\n  getById(id: number): T | undefined;\n  create(item: T): T;\n  update(id: number, item: T): T;\n  delete(id: number): boolean;\n}\n\n// Implementación para User\nclass UserRepository implements Repository<User> {\n  private users: User[] = [];\n  \n  getAll(): User[] {\n    return this.users;\n  }\n  \n  getById(id: number): User | undefined {\n    return this.users.find(user => user.id === id);\n  }\n  \n  create(user: User): User {\n    this.users.push(user);\n    return user;\n  }\n  \n  update(id: number, user: User): User {\n    const index = this.users.findIndex(u => u.id === id);\n    if (index !== -1) {\n      this.users[index] = user;\n    }\n    return user;\n  }\n  \n  delete(id: number): boolean {\n    const index = this.users.findIndex(u => u.id === id);\n    if (index !== -1) {\n      this.users.splice(index, 1);\n      return true;\n    }\n    return false;\n  }\n}\n```",
        
        "Los decoradores son una característica experimental que permite añadir metadatos y comportamiento a clases y sus miembros:\n```typescript\n// src/types.ts\n\n// Habilitar experimentalDecorators en tsconfig.json\n\n// Decorador de clase\nfunction Logger(constructor: Function) {\n  console.log(`Clase creada: ${constructor.name}`);\n}\n\n// Decorador de método\nfunction Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function(...args: any[]) {\n    console.log(`Llamando a ${propertyKey} con:`, args);\n    const result = original.apply(this, args);\n    console.log(`Resultado:`, result);\n    return result;\n  };\n  return descriptor;\n}\n\n@Logger\nclass Example {\n  @Log\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n}\n\nconst example = new Example();\nexample.multiply(2, 3);\n```"
      ]
    },
    {
      title: "Creando una aplicación web con TypeScript",
      content: "Ahora vamos a crear una aplicación web simple utilizando TypeScript. Primero, instalemos las dependencias necesarias:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin\nnpm install --save-dev css-loader style-loader\nnpm install --save-dev @types/node"
        }
      ]
    },
    {
      title: "Configuración de Webpack",
      content: "Vamos a configurar Webpack para compilar nuestro proyecto TypeScript:",
      isStep: true,
      code: [
        {
          language: "javascript",
          code: "// webpack.config.js\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n\nmodule.exports = {\n  entry: './src/index.ts',\n  output: {\n    filename: 'bundle.js',\n    path: path.resolve(__dirname, 'dist')\n  },\n  devtool: 'inline-source-map',\n  module: {\n    rules: [\n      {\n        test: /\\.tsx?$/,\n        use: 'ts-loader',\n        exclude: /node_modules/\n      },\n      {\n        test: /\\.css$/,\n        use: ['style-loader', 'css-loader']\n      }\n    ]\n  },\n  resolve: {\n    extensions: ['.ts', '.tsx', '.js']\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      template: './src/index.html'\n    })\n  ],\n  devServer: {\n    static: path.join(__dirname, 'dist'),\n    compress: true,\n    port: 8080\n  }\n};"
        }
      ]
    },
    {
      title: "Creación de archivos HTML y CSS",
      content: "Vamos a crear los archivos HTML y CSS básicos para nuestra aplicación:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "touch src/index.html\ntouch src/styles.css"
        },
        {
          language: "html",
          code: "<!-- src/index.html -->\n<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>TypeScript Web App</title>\n</head>\n<body>\n  <div class=\"container\">\n    <h1>Gestor de Tareas</h1>\n    <form id=\"task-form\">\n      <input type=\"text\" id=\"task-input\" placeholder=\"Nueva tarea...\" required>\n      <button type=\"submit\">Añadir</button>\n    </form>\n    <ul id=\"task-list\"></ul>\n  </div>\n</body>\n</html>"
        },
        {
          language: "css",
          code: "/* src/styles.css */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n  background-color: #f4f4f4;\n  color: #333;\n}\n\n.container {\n  max-width: 600px;\n  margin: 2rem auto;\n  padding: 1rem;\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 1rem;\n}\n\nform {\n  display: flex;\n  margin-bottom: 1rem;\n}\n\ninput {\n  flex: 1;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 3px 0 0 3px;\n}\n\nbutton {\n  padding: 0.5rem 1rem;\n  background-color: #4caf50;\n  color: #fff;\n  border: none;\n  border-radius: 0 3px 3px 0;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background-color: #45a049;\n}\n\nul {\n  list-style: none;\n}\n\nli {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  margin-bottom: 0.5rem;\n  background-color: #f9f9f9;\n  border-left: 3px solid #4caf50;\n}\n\nli button {\n  background-color: #f44336;\n  border-radius: 3px;\n  padding: 0.25rem 0.5rem;\n}\n\nli button:hover {\n  background-color: #d32f2f;\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.7;\n  border-left-color: #999;\n}"
        }
      ]
    },
    {
      title: "Implementación de la aplicación",
      content: "Ahora vamos a implementar nuestra aplicación de gestión de tareas con TypeScript:",
      isStep: true,
      code: [
        {
          language: "typescript",
          code: "// src/index.ts\nimport './styles.css';\n\n// Definición de tipos\ninterface Task {\n  id: number;\n  text: string;\n  completed: boolean;\n}\n\n// Clase para gestionar las tareas\nclass TaskManager {\n  private tasks: Task[] = [];\n  private nextId: number = 1;\n  private taskList: HTMLUListElement;\n  private taskInput: HTMLInputElement;\n  private taskForm: HTMLFormElement;\n\n  constructor() {\n    this.taskList = document.getElementById('task-list') as HTMLUListElement;\n    this.taskInput = document.getElementById('task-input') as HTMLInputElement;\n    this.taskForm = document.getElementById('task-form') as HTMLFormElement;\n    \n    // Cargar tareas guardadas\n    this.loadTasks();\n    \n    // Configurar eventos\n    this.taskForm.addEventListener('submit', this.handleAddTask.bind(this));\n    this.renderTasks();\n  }\n\n  private handleAddTask(event: Event): void {\n    event.preventDefault();\n    const text = this.taskInput.value.trim();\n    \n    if (text) {\n      this.addTask(text);\n      this.taskInput.value = '';\n      this.taskInput.focus();\n    }\n  }\n\n  private addTask(text: string): void {\n    const newTask: Task = {\n      id: this.nextId++,\n      text,\n      completed: false\n    };\n    \n    this.tasks.push(newTask);\n    this.saveTasks();\n    this.renderTasks();\n  }\n\n  private toggleTask(id: number): void {\n    this.tasks = this.tasks.map(task => \n      task.id === id ? { ...task, completed: !task.completed } : task\n    );\n    \n    this.saveTasks();\n    this.renderTasks();\n  }\n\n  private deleteTask(id: number): void {\n    this.tasks = this.tasks.filter(task => task.id !== id);\n    this.saveTasks();\n    this.renderTasks();\n  }\n\n  private renderTasks(): void {\n    this.taskList.innerHTML = '';\n    \n    this.tasks.forEach(task => {\n      const li = document.createElement('li');\n      li.className = task.completed ? 'completed' : '';\n      \n      const span = document.createElement('span');\n      span.textContent = task.text;\n      span.addEventListener('click', () => this.toggleTask(task.id));\n      \n      const deleteBtn = document.createElement('button');\n      deleteBtn.textContent = 'Eliminar';\n      deleteBtn.addEventListener('click', () => this.deleteTask(task.id));\n      \n      li.appendChild(span);\n      li.appendChild(deleteBtn);\n      this.taskList.appendChild(li);\n    });\n  }\n\n  private saveTasks(): void {\n    localStorage.setItem('tasks', JSON.stringify(this.tasks));\n  }\n\n  private loadTasks(): void {\n    const savedTasks = localStorage.getItem('tasks');\n    if (savedTasks) {\n      this.tasks = JSON.parse(savedTasks);\n      if (this.tasks.length > 0) {\n        this.nextId = Math.max(...this.tasks.map(task => task.id)) + 1;\n      }\n    }\n  }\n}\n\n// Inicializar la aplicación cuando el DOM esté listo\ndocument.addEventListener('DOMContentLoaded', () => {\n  new TaskManager();\n});"
        }
      ]
    },
    {
      title: "Actualización del package.json",
      content: "Vamos a actualizar el archivo package.json para añadir scripts que nos ayuden a desarrollar y construir nuestra aplicación:",
      isStep: true,
      code: [
        {
          language: "json",
          code: "{\n  \"name\": \"typescript-web-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Aplicación web con TypeScript\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"start\": \"webpack serve --mode development\",\n    \"build\": \"webpack --mode production\",\n    \"tsc\": \"tsc\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"devDependencies\": {\n    \"@types/node\": \"^16.11.12\",\n    \"css-loader\": \"^6.5.1\",\n    \"html-webpack-plugin\": \"^5.5.0\",\n    \"style-loader\": \"^3.3.1\",\n    \"ts-loader\": \"^9.2.6\",\n    \"typescript\": \"^4.5.4\",\n    \"webpack\": \"^5.65.0\",\n    \"webpack-cli\": \"^4.9.1\",\n    \"webpack-dev-server\": \"^4.7.2\"\n  }\n}"
        }
      ]
    },
    {
      title: "Ejecutando la aplicación",
      content: "Ahora podemos ejecutar nuestra aplicación con el siguiente comando:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "npm start"
        }
      ],
      note: "Este comando iniciará el servidor de desarrollo de Webpack y abrirá la aplicación en tu navegador. Puedes acceder a ella en http://localhost:8080."
    },
    {
      title: "Integrando TypeScript con React",
      content: "TypeScript se integra muy bien con React. Vamos a ver cómo configurar un proyecto React con TypeScript:",
      isStep: true,
      code: [
        {
          language: "bash",
          code: "# Crear un nuevo proyecto React con TypeScript\nnpx create-react-app my-react-app --template typescript\ncd my-react-app\n\n# Iniciar la aplicación\nnpm start"
        }
      ],
      subsections: ["Componentes con TypeScript", "Props y estado tipados"],
      subsectionContent: [
        "Ejemplo de un componente funcional con TypeScript:\n```tsx\n// src/components/Button.tsx\nimport React from 'react';\n\ninterface ButtonProps {\n  text: string;\n  onClick: () => void;\n  color?: 'primary' | 'secondary' | 'danger';\n  disabled?: boolean;\n}\n\nconst Button: React.FC<ButtonProps> = ({ \n  text, \n  onClick, \n  color = 'primary', \n  disabled = false \n}) => {\n  const buttonStyle = {\n    backgroundColor: color === 'primary' ? '#4caf50' : \n                    color === 'secondary' ? '#2196f3' : \n                    '#f44336',\n    color: 'white',\n    padding: '10px 15px',\n    border: 'none',\n    borderRadius: '4px',\n    cursor: disabled ? 'not-allowed' : 'pointer',\n    opacity: disabled ? 0.7 : 1\n  };\n\n  return (\n    <button \n      style={buttonStyle} \n      onClick={onClick} \n      disabled={disabled}\n    >\n      {text}\n    </button>\n  );\n};\n\nexport default Button;\n```",
        
        "Ejemplo de un componente con estado tipado:\n```tsx\n// src/components/Counter.tsx\nimport React, { useState } from 'react';\nimport Button from './Button';\n\ninterface CounterProps {\n  initialValue?: number;\n  step?: number;\n}\n\nconst Counter: React.FC<CounterProps> = ({ \n  initialValue = 0, \n  step = 1 \n}) => {\n  const [count, setCount] = useState<number>(initialValue);\n\n  const increment = () => setCount(prevCount => prevCount + step);\n  const decrement = () => setCount(prevCount => prevCount - step);\n  const reset = () => setCount(initialValue);\n\n  return (\n    <div>\n      <h2>Contador: {count}</h2>\n      <div style={{ display: 'flex', gap: '10px' }}>\n        <Button text=\"Incrementar\" onClick={increment} color=\"primary\" />\n        <Button text=\"Decrementar\" onClick={decrement} color=\"secondary\" />\n        <Button text=\"Reiniciar\" onClick={reset} color=\"danger\" />\n      </div>\n    </div>\n  );\n};\n\nexport default Counter;\n```"
      ]
    },
    {
      title: "Buenas prácticas con TypeScript",
      content: "Para terminar, aquí hay algunas buenas prácticas que deberías seguir al trabajar con TypeScript:",
      isStep: false,
      subsections: ["Tipado estricto", "Evitar any", "Organización de tipos", "Linting y formateo"],
      subsectionContent: [
        "- Habilita el modo estricto en tsconfig.json (`\"strict\": true`)\n- Utiliza `noImplicitAny` para evitar tipos implícitos\n- Considera usar `strictNullChecks` para manejar null y undefined de forma segura\n- Utiliza `exactOptionalPropertyTypes` para un tipado más preciso de propiedades opcionales",
        
        "- Evita usar `any` siempre que sea posible\n- Si no conoces el tipo exacto, usa `unknown` en lugar de `any`\n- Utiliza type assertions con precaución (`as` o `<>` sintaxis)\n- Considera usar `never` para funciones que nunca retornan",
        
        "- Mantén tus definiciones de tipos en archivos separados o en un directorio `types`\n- Utiliza namespaces o módulos para organizar tipos relacionados\n- Exporta interfaces y tipos para reutilizarlos\n- Utiliza barrel files (index.ts) para exportar múltiples tipos desde un directorio",
        
        "- Utiliza ESLint con el plugin de TypeScript (@typescript-eslint/eslint-plugin)\n- Configura Prettier para formateo consistente\n- Considera usar husky para ejecutar linting y formateo antes de commits\n- Utiliza reglas específicas de TypeScript como `no-explicit-any`, `explicit-function-return-type`, etc."
      ]
    },
    {
      title: "Conclusión",
      content: "En este tutorial, has aprendido los fundamentos de TypeScript y cómo utilizarlo para desarrollar aplicaciones web más robustas y mantenibles. Hemos cubierto:\n\n- Instalación y configuración de TypeScript\n- Conceptos básicos como tipos, interfaces, genéricos y decoradores\n- Creación de una aplicación web simple con TypeScript\n- Integración de TypeScript con React\n- Buenas prácticas para el desarrollo con TypeScript\n\nTypeScript ofrece numerosas ventajas sobre JavaScript puro, especialmente en proyectos grandes o en equipos de desarrollo. La detección temprana de errores, el mejor soporte de herramientas y la documentación integrada hacen que valga la pena la curva de aprendizaje inicial.\n\nA medida que continúes trabajando con TypeScript, descubrirás más características avanzadas y patrones que te ayudarán a escribir código más seguro, mantenible y escalable.",
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
      id: 6,
      title: "Implementando GraphQL en una aplicación web moderna",
      difficulty: "Intermediate",
      image: "/media/tutorial-graphql.webp"
    },
    {
      id: 8,
      title: "Optimización de rendimiento en aplicaciones web",
      difficulty: "Advanced",
      image: "/media/tutorial-performance.webp"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Desarrollo de aplicaciones web con TypeScript | Tecniweb Latam</title>
        <meta name="description" content="Aprende a utilizar TypeScript para desarrollar aplicaciones web más robustas y mantenibles, con ejemplos prácticos e integración con frameworks populares." />
        <meta name="keywords" content="TypeScript, JavaScript, desarrollo web, tipado estático, React, interfaces, genéricos" />
      </Helmet>
      
      <Tutorial 
        tutorial={tutorial}
        sections={sections}
        relatedTutorials={relatedTutorials}
      />
    </>
  );
};

export default Tutorial7;
