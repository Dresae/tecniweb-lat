const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const vectorStore = require('../src/utils/vectorStore');
const semanticChunker = require('../src/utils/semanticChunker');

/**
 * Initialize the RAG bot with sample data
 */
async function initializeData() {
  try {
    console.log('Initializing RAG bot with all document data...');
    
    // Path to the documents directory
    const documentsDir = path.join(__dirname, '../data/documents');
    
    if (!fs.existsSync(documentsDir)) {
      console.error('Documents directory not found:', documentsDir);
      return;
    }
    
    // Get all text files in the documents directory
    const files = fs.readdirSync(documentsDir).filter(file => file.endsWith('.txt'));
    
    if (files.length === 0) {
      console.error('No text files found in documents directory');
      return;
    }
    
    console.log(`Found ${files.length} text files to process:`, files);
    
    let totalChunks = 0;
    
    // Process each file
    for (const filename of files) {
      console.log(`\n📄 Processing file: ${filename}`);
      const filePath = path.join(documentsDir, filename);
      
      // Read the document
      const content = fs.readFileSync(filePath, 'utf8');
    
      // Split content into chunks using semantic chunking
      const chunks = semanticChunker.semanticChunking(content, {
        minChunkSize: 100,
        maxChunkSize: 2000,
        overlapSize: 50,
        chunkOnHeadings: true,
        chunkOnParagraphs: true
      });
      
      console.log(`   Found ${chunks.length} semantic chunks in ${filename}`);
      
      // Process each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (chunk.length < 50) continue; // Skip very short chunks
        
        console.log(`   Processing chunk ${i + 1}/${chunks.length}...`);
        
        try {
          // Generate a meaningful title from the chunk content
          const firstLine = chunk.split('\n')[0].trim();
          let title = `Información de Tecniweb Latam - ${filename.replace('.txt', '')}`;
          
          if (firstLine.includes(':')) {
            title = firstLine.split(':')[0].trim();
          } else if (firstLine.length > 0 && firstLine.length < 100) {
            title = firstLine;
          } else if (chunk.includes('Servicios')) {
            title = 'Servicios de Tecniweb Latam';
          } else if (chunk.includes('Tecnologías')) {
            title = 'Tecnologías que utilizamos';
          } else if (chunk.includes('equipo')) {
            title = 'Nuestro equipo';
          } else if (chunk.includes('Clientes')) {
            title = 'Clientes destacados';
          } else if (chunk.includes('Proceso')) {
            title = 'Proceso de trabajo';
          } else if (chunk.includes('Contacto')) {
            title = 'Información de contacto';
          } else if (chunk.includes('Preguntas frecuentes')) {
            title = 'Preguntas frecuentes';
          }
          
          // Calculate coherence score for the chunk
          const coherenceScore = semanticChunker.analyzeChunkCoherence(chunk);
          
          // Add document to vector store
          await vectorStore.addDocument({
            id: uuidv4(),
            filename: filename,
            content: chunk,
            metadata: {
              title: title,
              source: filename,
              filename: filename,
              chunkIndex: i,
              coherenceScore: coherenceScore.toFixed(2),
              chunkType: 'semantic',
              uploadDate: new Date().toISOString()
            }
          });
          
          totalChunks++;
          
          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`   Error processing chunk ${i + 1}:`, error.message);
          // Continue with next chunk
        }
      }
    }
    
    console.log(`\n✅ Data initialization completed successfully!`);
    console.log(`📊 Total chunks processed: ${totalChunks} from ${files.length} files`);
    
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeData().then(() => {
    console.log('Initialization script finished.');
    process.exit(0);
  }).catch(error => {
    console.error('Initialization script failed:', error);
    process.exit(1);
  });
}

module.exports = { initializeData };
