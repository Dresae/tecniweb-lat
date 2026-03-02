import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Typewriter from 'typewriter-effect';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const BannerContainer = styled.div`
  top: -60px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 800px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const BannerSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: ${props => (props.active ? fadeIn : fadeOut)} 1s ease-in-out;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-align: center;
`;

const BannerTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerSubtitle = styled.div`
  font-family: 'Playpen Sans', sans-serif;
  font-size: 1.7rem;
  color: white;
  max-width: 800px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  .Typewriter__cursor {
    color: white;
    size: 2rem;
  }
`;

const BannerIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Indicator = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const HeroBanner = ({ images, title, subtitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <BannerContainer>
      {images.map((image, index) => (
        <BannerSlide 
          key={index} 
          image={image} 
          active={index === currentSlide}
        />
      ))}
      <BannerOverlay>
        <BannerTitle>{title}</BannerTitle>
        <BannerSubtitle>
          {subtitle && (
            <Typewriter
              options={{
                strings: ["Somos  Tu  Aliado  En  Transformación  Digital", "¿Tienes  Una  Idea  De  Negocio  Revolucionaria  Y  No  Sabes  Por  Donde  Empezar?", "Somos  Tu  Aliado  En  Transformación  Digital", "¿Tienes  Problemas  Para  Organizar  La  Información  Y  Tareas  Repetitivas?", "Somos  Tu  Aliado  En  Transformación  Digital", "¿Crees  Que  Tu  Empresa  Se  Está  Quedando  Atrás  Por  La  Inteligencia  Artificial?"],
                autoStart: true,
                loop: true,
                delay: 35,
                cursor: '          👀' 
              }}
            />
          )}
        </BannerSubtitle>
      </BannerOverlay>
      <BannerIndicators>
        {images.map((_, index) => (
          <Indicator 
            key={index} 
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </BannerIndicators>
    </BannerContainer>
  );
};

export default HeroBanner;
