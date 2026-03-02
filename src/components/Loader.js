import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const skeletonAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, var(--light-green-1), var(--light-green-2), var(--white));
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-in-out, ${fadeOut} 0.3s ease-in-out 1.7s;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const LogoText = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: transparent;
  position: relative;
  
  &::before {
    content: "Tecniweb Latam";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: ${skeletonAnimation} 1.5s infinite;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const Slogan = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  color: var(--dark-green-1);
  margin-top: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out 0.5s forwards;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LogoContainer>
        <LogoText>Tecniweb Latam</LogoText>
        <Slogan>Tu Aliado en Transformación Digital</Slogan>
      </LogoContainer>
    </LoaderContainer>
  );
};

export default Loader;
