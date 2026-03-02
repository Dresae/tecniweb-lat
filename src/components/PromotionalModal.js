import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaTimes, FaWhatsapp, FaEnvelope, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  width: 80%;
  max-width: 800px;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.4s ease-in-out;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  transform: translateX(-${props => props.currentslide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const ModalTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ConfirmationMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: ${props => props.theme === 'light' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(46, 204, 113, 0.2)'};
  border: 1px solid #2ecc71;
  color: ${props => props.theme === 'light' ? '#27ae60' : '#2ecc71'};
  animation: ${fadeIn} 0.3s ease-in-out;
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const CTAButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 15px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${props => props.bgColor};
  color: white;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PromotionalModal = ({ onClose }) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  const slides = [
    require('../assets/modal-promo1.webp'),
    require('../assets/modal-promo2.webp'),
    require('../assets/modal-promo3.webp')
  ];
  
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const handleCTAClick = (e, message, url) => {
    e.preventDefault();
    setConfirmationMessage(message);
    setShowConfirmation(true);
    
    // Hide confirmation after 1.5 seconds, then close modal and redirect
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
      
      // If URL is provided, redirect to it
      if (url) {
        window.location.href = url;
      }
    }, 1500);
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          <SliderContainer>
            <SliderTrack currentslide={currentSlide}>
              {slides.map((slide, index) => (
                <Slide key={index}>
                  <img src={slide} alt={`Promoción ${index + 1}`} />
                </Slide>
              ))}
            </SliderTrack>
          </SliderContainer>
        </ModalHeader>
        <ModalContent theme={theme}>
          <ModalTitle theme={theme}>¡Impulsa tu negocio con Tecniweb Latam!</ModalTitle>
          
          {showConfirmation && (
            <ConfirmationMessage theme={theme}>
              <FaCheckCircle /> {confirmationMessage}
            </ConfirmationMessage>
          )}
          
          <ModalText>
            Descubre cómo nuestras soluciones de software pueden transformar tu empresa y potenciar tu presencia digital.
          </ModalText>
          <CTAContainer>
            <CTAButton 
              href="https://wa.me/+573229833008?text=Buen%20día%2C%0A%0Aestoy%20interesado%20en%20los%20servicios%20de%20Tecniweb%20Latam%2C%0A%0Apodrían%20contactarme%3f" 
              onClick={(e) => handleCTAClick(e, '¡Te redirigiremos a WhatsApp!', 'https://wa.me/+573229833008?text=Buen%20día%2C%0A%0Aestoy%20interesado%20en%20los%20servicios%20de%20Tecniweb%20Latam%2C%0A%0Apodrían%20contactarme%3f')}
              bgColor="#25D366"
            >
              <FaWhatsapp /> Contactar por WhatsApp
            </CTAButton>
            <CTAButton 
              href="mailto:digital@tecniweb.lat(tecniweblat@gmail.com)?subject=Solicitud%20de%20cotización" 
              onClick={(e) => handleCTAClick(e, '¡Te redirigiremos a tu cliente de correo!', 'mailto:digital@tecniweb.lat(tecniweblat@gmail.com)?subject=Solicitud%20de%20cotización')}
              bgColor="#219EBC"
            >
              <FaEnvelope /> Solicitar cotización
            </CTAButton>
            <CTAButton 
              href="https://calendar.app.google/JPXy3u1d2ghtHEw5A" 
              onClick={(e) => handleCTAClick(e, '¡Te redirigiremos a nuestro calendario!', 'https://calendar.app.google/JPXy3u1d2ghtHEw5A')}
              bgColor="#6C63FF"
            >
              <FaCalendarAlt /> Agenda una llamada
            </CTAButton>
          </CTAContainer>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PromotionalModal;
