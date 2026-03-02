import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
`;

const FloatingImageContainer = styled.div`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: 0;
  width: 100%;
  height: 0;
  overflow: visible;
  z-index: 10;
  pointer-events: none;
`;

const ImageWrapper = styled.div`
  position: absolute;
  animation: ${floatAnimation} ${props => props.duration || '10s'} linear;
  animation-fill-mode: forwards;
  transform: translateX(-100%);
  opacity: 0;
  
  img {
    width: ${props => props.width || '100px'};
    height: auto;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
  }
`;

const FloatingImage = ({ 
  imageSrc, 
  interval = 2000, 
  duration = '10s', 
  width = '100px',
  top = '50%'
}) => {
  const [images, setImages] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Create a new image every interval
    const timer = setInterval(() => {
      const newImage = {
        id: counter,
        style: {
          animationDuration: duration
        }
      };
      
      setImages(prevImages => [...prevImages, newImage]);
      setCounter(prevCounter => prevCounter + 1);
      
      // Remove the image after animation completes
      setTimeout(() => {
        setImages(prevImages => prevImages.filter(img => img.id !== newImage.id));
      }, parseFloat(duration) * 1000);
      
    }, interval);

    return () => clearInterval(timer);
  }, [counter, duration, interval]);

  return (
    <FloatingImageContainer top={top}>
      {images.map(image => (
        <ImageWrapper 
          key={image.id} 
          duration={duration}
          width={width}
        >
          <img src={imageSrc} alt="Floating element" />
        </ImageWrapper>
      ))}
    </FloatingImageContainer>
  );
};

export default FloatingImage;
