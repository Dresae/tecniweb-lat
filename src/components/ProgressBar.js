import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fillAnimation = keyframes`
  from { width: 0; }
  to { width: var(--target-width); }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin: 30px 0;
`;

const ProgressBarTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(to right, var(--light-green-2), var(--dark-green-1))' 
    : 'linear-gradient(to right, var(--dark-green-2), var(--light-green-1))'
  };
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  --target-width: ${props => props.percentage}%;
  animation: ${fillAnimation} 1.5s ease-out forwards;
`;

const ProgressBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#666' : '#aaa'};
`;

const ProgressBarPercentage = styled.span`
  font-weight: 600;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const ProgressBar = ({ title, percentage, startLabel, endLabel }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`progress-bar-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [title]);
  
  return (
    <ProgressBarContainer id={`progress-bar-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <ProgressBarTitle theme={theme}>{title}</ProgressBarTitle>
      <ProgressBarTrack theme={theme}>
        {isVisible && (
          <ProgressBarFill theme={theme} percentage={percentage} />
        )}
      </ProgressBarTrack>
      <ProgressBarLabel theme={theme}>
        <span>{startLabel || '0%'}</span>
        <ProgressBarPercentage theme={theme}>{percentage}%</ProgressBarPercentage>
        <span>{endLabel || '100%'}</span>
      </ProgressBarLabel>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
