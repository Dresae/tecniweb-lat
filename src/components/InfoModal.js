import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
    height: calc(80vh - 110px);
  }

  @media (max-width: 480px) {
    height: calc(100vh);
  }
`;

const ModalContainer = styled.div`
  width: 85%;
  max-width: 800px;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.4s ease-in-out;
  display: flex;
  flex-direction: row;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ModalImage = styled.div`
  width: 40%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ModalContent = styled.div`
  width: 60%;
  padding: 30px;
  position: relative;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
`;

const ModalTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ModalSubtitle = styled.h4`
  font-family: 'Rubik', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const ModalText = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`;

const AdvantagesList = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
`;

const AdvantageItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  
  svg {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    margin-right: 10px;
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 25px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
`;

const InfoModal = ({ onClose }) => {
  const { theme } = useTheme();
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={e => e.stopPropagation()}>
        <ModalImage>
          <img src={require('../assets/modal-info.gif')} alt="Tecniweb Latam Ventajas" />
        </ModalImage>
        <ModalContent theme={theme}>
          <CloseButton onClick={onClose} theme={theme}>
            <FaTimes />
          </CloseButton>
          <ModalTitle theme={theme}>¿Por qué elegirnos?</ModalTitle>
          <ModalText>
            En Tecniweb Latam nos destacamos por ofrecer soluciones tecnológicas que realmente marcan la diferencia para tu negocio.
          </ModalText>
          <AdvantagesList>
            <AdvantageItem theme={theme}>
              <FaCheckCircle /> <span>Equipo de expertos con amplia experiencia</span>
            </AdvantageItem>
            <AdvantageItem theme={theme}>
              <FaCheckCircle /> <span>Metodología ágil que garantiza entregas a tiempo</span>
            </AdvantageItem>
            <AdvantageItem theme={theme}>
              <FaCheckCircle /> <span>Soluciones adaptadas a tu negocio</span>
            </AdvantageItem>
            <AdvantageItem theme={theme}>
              <FaCheckCircle /> <span>Integración de IA para maximizar tu potencial</span>
            </AdvantageItem>
          </AdvantagesList>
          <CTAButton 
            href="/nosotros/porque-escogernos" 
            theme={theme}
          >
            Conoce más...
          </CTAButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InfoModal;
