# Tecniweb RAG Bot Service

This service provides a Retrieval-Augmented Generation (RAG) chatbot for the Tecniweb Latam website. It uses Google's Generative AI API to provide intelligent responses based on a knowledge base of documents.

## Features

- **Document Processing**: Upload and process PDF, TXT, and MD files to build a knowledge base
- **Vector Embeddings**: Generate and store vector embeddings for efficient similarity search
- **RAG Implementation**: Retrieve relevant context and augment AI responses
- **API Endpoints**: RESTful API for bot interactions and knowledge base management
- **Admin Interface**: Web interface for managing the knowledge base

## Setup

### Prerequisites

- Node.js (v14+)
- Google API Key (stored in `google-api-kei.txt`)

### Installation

1. The RAG bot service is integrated with the main Tecniweb application. All dependencies are included in the main `package.json` file.

2. Install dependencies:
   ```
   npm install
   ```

3. The service will automatically initialize when the main server starts.

## API Endpoints

### Bot Interaction

- **POST /api/bot/query**
  - Process user queries and generate responses
  - Request body:
    ```json
    {
      "query": "User's question",
      "conversationId": "optional-conversation-id",
      "messageHistory": [
        {
          "text": "Previous message",
          "isBot": true|false
        }
      ]
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "response": {
        "text": "Bot's response",
        "sources": [
          {
            "title": "Document title",
            "source": "Document source",
            "relevance": 0.95
          }
        ],
        "conversationId": "conversation-id"
      }
    }
    ```

### Knowledge Base Management

- **POST /api/bot/upload**
  - Upload a document to the knowledge base
  - Form data:
    - `document`: File (PDF, TXT, MD)
    - `title`: Document title
    - `description`: Document description (optional)

- **GET /api/bot/documents**
  - List all documents in the knowledge base

- **DELETE /api/bot/documents/:id**
  - Delete a document from the knowledge base

## Admin Interface

The admin interface is available at `/admin/bot` and provides a user-friendly way to:

- Upload new documents to the knowledge base
- View existing documents
- Delete documents from the knowledge base

## Architecture

The RAG bot service follows a modular architecture:

- **Controllers**: Handle API requests and responses
- **Services**: Implement business logic
- **Utils**: Provide utility functions for document processing and vector operations
- **Models**: Define data structures
- **Routes**: Define API endpoints

## Data Storage

The service uses file-based storage for simplicity:

- **Document Metadata**: Stored in `data/documents/documents.json`
- **Vector Embeddings**: Stored in `data/vectors/vectors.json`
- **Uploaded Files**: Stored in `data/uploads/`

## Integration with Website

The RAG bot service is integrated with the existing AiBot component in the website. The AiBot component has been updated to:

1. Send user messages to the RAG bot API
2. Display responses from the RAG bot
3. Show loading indicators during API calls
4. Handle errors gracefully

## License

This project is proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents is strictly prohibited.

© 2025 Tecniweb Latam. All rights reserved.
