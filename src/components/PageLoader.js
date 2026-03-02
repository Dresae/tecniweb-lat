import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const blurIn = keyframes`
  0% { 
    opacity: 0;
    filter: blur(0px);
  }
  50% {
    opacity: 1;
    filter: blur(10px);
  }
  100% { 
    opacity: 0;
    filter: blur(0px);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(255, 255, 255, 0.7)' 
    : 'rgba(0, 0, 0, 0.7)'
  };
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: ${blurIn} 0.8s ease-in-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  border-top-color: ${props => props.theme === 'light' 
    ? 'var(--light-green-2)' 
    : 'var(--dark-green-2)'
  };
  border-right-color: ${props => props.theme === 'light' 
    ? 'var(--light-green-2)' 
    : 'var(--dark-green-2)'
  };
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const PageLoader = () => {
  const { theme } = useTheme();
  
  return (
    <LoaderContainer theme={theme}>
      <Spinner theme={theme} />
    </LoaderContainer>
  );
};

export default PageLoader;
