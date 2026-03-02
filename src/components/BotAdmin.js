import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #0056b3;
  margin-bottom: 20px;
  border-bottom: 2px solid #0056b3;
  padding-bottom: 10px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.3);
  }
`;

const Button = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #003d82;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.h4`
  margin: 0 0 5px 0;
  color: #0056b3;
`;

const DocumentMeta = styled.div`
  font-size: 12px;
  color: #777;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const Message = styled.div`
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 14px;
  
  ${props => props.type === 'success' && `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.type === 'error' && `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

const BotAdmin = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);
  
  // Fetch documents from the API
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bot/documents');
      if (response.data.success) {
        setDocuments(response.data.documents);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setMessage({
        type: 'error',
        text: 'Error fetching documents. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({
        type: 'error',
        text: 'Please select a file to upload.'
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('document', file);
      formData.append('title', title);
      formData.append('description', description);
      
      const response = await axios.post('/api/bot/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Document uploaded and processed successfully.'
        });
        
        // Reset form
        setTitle('');
        setDescription('');
        setFile(null);
        
        // Refresh document list
        fetchDocuments();
      } else {
        setMessage({
          type: 'error',
          text: response.data.error || 'Error uploading document.'
        });
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      setMessage({
        type: 'error',
        text: 'Error uploading document. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle document deletion
  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await axios.delete(`/api/bot/documents/${documentId}`);
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Document deleted successfully.'
        });
        
        // Refresh document list
        fetchDocuments();
      } else {
        setMessage({
          type: 'error',
          text: response.data.error || 'Error deleting document.'
        });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage({
        type: 'error',
        text: 'Error deleting document. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminContainer>
      <Title>RAG Bot Admin Panel</Title>
      
      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}
      
      <Section>
        <SectionTitle>Upload Document</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Document Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Document Description</Label>
            <TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter document description"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="file">Document File (PDF, TXT, MD)</Label>
            <Input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf,.txt,.md,.docx"
              required
            />
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </Form>
      </Section>
      
      <Section>
        <SectionTitle>Knowledge Base Documents</SectionTitle>
        
        {loading && <p>Loading documents...</p>}
        
        {!loading && documents.length === 0 && (
          <p>No documents in the knowledge base yet.</p>
        )}
        
        <DocumentList>
          {documents.map((doc) => (
            <DocumentItem key={doc.id}>
              <DocumentInfo>
                <DocumentTitle>{doc.title}</DocumentTitle>
                <DocumentMeta>
                  Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                  {doc.description && ` | ${doc.description}`}
                </DocumentMeta>
              </DocumentInfo>
              <DeleteButton onClick={() => handleDeleteDocument(doc.id)}>
                Delete
              </DeleteButton>
            </DocumentItem>
          ))}
        </DocumentList>
      </Section>
    </AdminContainer>
  );
};

export default BotAdmin;
