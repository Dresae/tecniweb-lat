import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import botAiGif from '../assets/bot-ai.gif';
import axios from 'axios';
import apiConfig from '../config/api';

// Animation for the bot to slide in from the right
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animation for the bot to slide out to the right
const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Animation for the bot to pulse slightly to attract attention
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Animation for the bot to expand vertically
const expandVertically = keyframes`
  from {
    height: 90px;
    width: 90px;
  }
  to {
    height: 500px;
    width: 500px;
  }
`;

// Animation for the bot to shrink vertically
const shrinkVertically = keyframes`
  from {
    height: 500px;
    width: 500px;
  }
  to {
    height: 90px;
    width: 90px;
  }
`;

// Animation for content to fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Container for the entire bot component
const BotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 4px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  
  /* Enhanced responsive adjustments for all mobile devices */
  @media (max-width: 768px) {
    bottom: 80px;
    right: 10px;
  }
  
  @media (max-width: 480px) {
    bottom: 80px;
    right: 8px;
  }
  
  /* For very narrow screens (non-standard phones) */
  @media (max-width: 360px) {
    bottom: 80px;
    right: 5px;
  }
  
  /* For very wide but short screens (landscape phones) */
  @media (max-height: 500px) and (orientation: landscape) {
    bottom: 80px;
    right: 8px;
  }
  
  /* For extra small screens */
  @media (max-width: 320px) {
    bottom: 80px;
    right: 3px;
  }
`;

// The bot element that transforms between icon and expanded state
const BotElement = styled.div`
  width: ${props => props.isOpen ? '500px' : '100px'};
  height: ${props => props.isOpen ? '500px' : '100px'};
  cursor: pointer;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  position: relative;
  padding: ${props => props.isOpen ? '0' : '0'};
  animation: ${props => {
    if (props.isOpen && props.wasJustOpened) {
      return css`${expandVertically} 0.5s ease forwards`;
    } else if (!props.isOpen && props.wasJustClosed) {
      return css`${shrinkVertically} 0.5s ease forwards`;
    } else if (props.isVisible && !props.isOpen) {
      return css`${slideIn} 0.5s ease forwards, ${pulse} 2s infinite`;
    } else if (!props.isVisible) {
      return css`${slideOut} 0.5s ease forwards`;
    }
    return 'none';
  }};
  transition: all 0.3s ease;
  
  /* Enhanced responsive adjustments for all mobile devices */
  @media (max-width: 768px) {
    width: ${props => props.isOpen ? 'calc(100vw - 40px)' : '90px'};
    height: ${props => props.isOpen ? '450px' : '90px'};
  }
  
  @media (max-width: 480px) {
    width: ${props => props.isOpen ? 'calc(100vw - 25px)' : '80px'};
    height: ${props => props.isOpen ? '400px' : '80px'};
  }
  
  /* For very narrow screens (non-standard phones) */
  @media (max-width: 360px) {
    width: ${props => props.isOpen ? 'calc(100vw - 15px)' : '75px'};
    height: ${props => props.isOpen ? '380px' : '75px'};
  }
  
  /* For very wide but short screens (landscape phones) */
  @media (max-height: 500px) and (orientation: landscape) {
    width: ${props => props.isOpen ? 'calc(100vw - 30px)' : '70px'};
    height: ${props => props.isOpen ? '300px' : '70px'};
  }
  
  /* For extra small screens */
  @media (max-width: 320px) {
    width: ${props => props.isOpen ? 'calc(100vw - 10px)' : '70px'};
    height: ${props => props.isOpen ? '350px' : '70px'};
  }
  
  ${props => props.isOpen && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(173, 216, 230, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      z-index: -1;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
  `}
`;

// Bot avatar image
const BotAvatar = styled.img`
  width: ${props => props.isOpen ? '80px' : '70px'};
  height: ${props => props.isOpen ? '80px' : '70px'};
  object-fit: contain;
  margin-top: ${props => props.isOpen ? '20px' : '0'};
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(0, 86, 179, 0.7));
`;

// Messages container
const MessagesContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  opacity: ${props => props.isOpen ? '1' : '0'};
  animation: ${props => props.isOpen ? css`${fadeIn} 0.5s ease forwards` : 'none'};
  animation-delay: 0.4s;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 86, 179, 0.5);
    border-radius: 10px;
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    gap: 8px;
  }
`;

// Close button
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 86, 179, 0.3);
  color: #0056b3;
  font-size: 18px;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 50%;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isOpen ? '1' : '0'};
  animation: ${props => props.isOpen ? css`${fadeIn} 0.5s ease forwards` : 'none'};
  z-index: 10;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 86, 179, 0.3);
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    font-size: 16px;
    padding: 2px 6px;
  }
`;

// Individual message bubble with futuristic design
const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  backdrop-filter: blur(5px);
  
  ${props => props.isBot 
    ? css`
        background-color: rgba(255, 255, 255, 0.7);
        color: #333;
        align-self: flex-start;
        border-bottom-left-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-left: 2px solid rgba(0, 86, 179, 0.8);
        
        &::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 50%;
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.7);
          transform: rotate(45deg) translateY(-50%);
          border-left: 2px solid rgba(0, 86, 179, 0.8);
          border-bottom: 2px solid rgba(0, 86, 179, 0.8);
        }
      `
    : css`
        background-color: rgba(0, 86, 179, 0.8);
        color: #ffffff;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        align-self: flex-end;
        border-bottom-right-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        border-right: 2px solid rgba(255, 255, 255, 0.9);
        
        &::before {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          width: 10px;
          height: 10px;
          background: rgba(0, 86, 179, 0.8);
          transform: rotate(45deg) translateY(-50%);
          border-right: 2px solid rgba(255, 255, 255, 0.9);
          border-top: 2px solid rgba(255, 255, 255, 0.9);
        }
      `
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 480px) {
    max-width: 85%;
    padding: 8px 12px;
    font-size: 13px;
  }
`;

// Input area at the bottom
const InputArea = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  padding: 10px 15px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 15px;
  opacity: ${props => props.isOpen ? '1' : '0'};
  animation: ${props => props.isOpen ? css`${fadeIn} 0.5s ease forwards` : 'none'};
  animation-delay: 0.5s;
  position: relative;
  z-index: 5;
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    padding: 8px 12px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    margin-bottom: 10px;
  }
`;

// Text input field with futuristic design
const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid rgba(0, 86, 179, 0.3);
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  background-color: white;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  
  &:focus {
    border-color: rgba(0, 86, 179, 0.8);
    box-shadow: 0 0 15px rgba(0, 86, 179, 0.3);
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

// Send button with futuristic design
const SendButton = styled.button`
  background-color: rgba(0, 86, 179, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 86, 179, 0.3);
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 86, 179, 0.5);
    background-color: rgba(0, 86, 179, 0.9);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    margin-left: 8px;
  }
`;

// Loading indicator container
const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 5px 0;
  align-self: flex-start;
`;

// Loading dot animation
const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
`;

// Individual loading dot
const LoadingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: rgba(0, 86, 179, 0.7);
  border-radius: 50%;
  display: inline-block;
  margin: 0 3px;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.delay};
`;

// Container for sources
const SourcesContainer = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(0, 86, 179, 0.2);
  padding-top: 5px;
`;

// Title for sources section
const SourcesTitle = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
`;

// Individual source item
const SourceItem = styled.div`
  padding: 2px 0;
  font-style: italic;
`;

const AiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [wasJustOpened, setWasJustOpened] = useState(false);
  const [wasJustClosed, setWasJustClosed] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Soy Andy de Tecniweb Latam. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  
  // API endpoint for the RAG bot service based on environment
  const RAG_API_ENDPOINT = `${apiConfig.ragBot.baseUrl}${apiConfig.ragBot.endpoints.query}`;
  
  // Log the current environment and API endpoint for debugging
  useEffect(() => {
    const hostname = window.location.hostname;
    const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
    console.log(`Current environment: ${isDev ? 'Development' : 'Production'}`); 
    console.log(`Using RAG API endpoint: ${RAG_API_ENDPOINT}`);
  }, [RAG_API_ENDPOINT]);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle the chat interface
  const toggleChat = () => {
    if (!isOpen) {
      setWasJustOpened(true);
      setWasJustClosed(false);
      setTimeout(() => setWasJustOpened(false), 500);
    } else {
      setWasJustClosed(true);
      setWasJustOpened(false);
      setTimeout(() => setWasJustClosed(false), 500);
    }
    setIsOpen(!isOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Prepare message history for context
      const messageHistory = messages.map(msg => ({
        text: msg.text,
        isBot: msg.isBot
      }));
      
      // Call the RAG bot API
      console.log('Calling RAG bot API:', RAG_API_ENDPOINT);
      console.log('Request payload:', { query: inputText, conversationId, messageHistory });
      
      // Add origin information for security validation
      const response = await axios.post(RAG_API_ENDPOINT, {
        query: inputText,
        conversationId,
        messageHistory
      }, {
        headers: {
          ...apiConfig.ragBot.headers,
          'Origin': window.location.origin
        }
      });
      
      console.log('RAG bot response:', response.data);
      
      // Process the response
      if (response.data && response.data.success) {
        // Save the conversation ID if it's the first message
        if (!conversationId && response.data.response.conversationId) {
          setConversationId(response.data.response.conversationId);
        }
        
        // Add bot response
        const botResponse = {
          id: messages.length + 2,
          text: response.data.response.text,
          isBot: true
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      } else {
        // Handle error in response
        const errorResponse = {
          id: messages.length + 2,
          text: "Lo siento, tuve un problema al procesar tu consulta. ¿Podrías intentarlo de nuevo?",
          isBot: true
        };
        
        setMessages(prevMessages => [...prevMessages, errorResponse]);
      }
    } catch (error) {
      console.error('Error calling RAG bot API:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      // Add error message with more specific information
      let errorText = "Gracias por tu mensaje. Actualmente estoy en desarrollo y pronto podré responder a tus consultas de manera más inteligente.";
      
      if (error.response) {
        // Server responded with error status
        errorText = "Gracias por tu mensaje. Actualmente estoy en desarrollo y pronto podré responder a tus consultas de manera más inteligente.";
      } else if (error.request) {
        // Request was made but no response received
        errorText = "Gracias por tu mensaje. Actualmente estoy en desarrollo y pronto podré responder a tus consultas de manera más inteligente.";
      }
      
      const errorResponse = {
        id: messages.length + 2,
        text: errorText,
        isBot: true
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter key in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <BotContainer>
      <BotElement 
        onClick={!isOpen ? toggleChat : undefined}
        isOpen={isOpen}
        isVisible={isVisible}
        wasJustOpened={wasJustOpened}
        wasJustClosed={wasJustClosed}
      >
        {/* Close button only visible when open */}
        <CloseButton 
          onClick={toggleChat} 
          isOpen={isOpen}
        >
          &times;
        </CloseButton>
        
        {/* Bot avatar - always visible but changes size */}
        <BotAvatar 
          src={botAiGif} 
          alt="AI Assistant" 
          isOpen={isOpen}
        />
        
        
        {/* Messages - only visible when open */}
        <MessagesContainer isOpen={isOpen}>
          {messages.map(message => (
            <Message key={message.id} isBot={message.isBot}>
              {message.text}

            </Message>
          ))}
          {isLoading && (
            <LoadingIndicator>
              <LoadingDot delay="0s" />
              <LoadingDot delay="0.2s" />
              <LoadingDot delay="0.4s" />
            </LoadingIndicator>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        
        {/* Input area - only visible when open */}
        <InputArea isOpen={isOpen}>
          <Input 
            type="text" 
            placeholder="Escribe tu mensaje..." 
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
          >
            ➤
          </SendButton>
        </InputArea>
      </BotElement>
    </BotContainer>
  );
};

export default AiBot;

