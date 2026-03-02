import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CenterLogo = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.9)'};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  
  img {
    width: 120px;
    height: auto;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    
    img {
      width: 90px;
    }
  }
`;

const TechIcon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const TechCircleAnimation = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const iconsRef = useRef([]);
  
  // Tech icons to display
  const techIcons = [
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'PowerShell', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg' },
    { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Dart', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    { name: 'Flutter', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' }
  ];
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    // Position icons in a circle
    const positionIcons = () => {
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return;
        
        const angle = (index / techIcons.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - icon.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - icon.offsetHeight / 2;
        
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
      });
    };
    
    // Animate icons in a circle
    let animationFrame;
    let angle = 0;
    
    const animateIcons = () => {
      angle += 0.002; // Speed of rotation
      
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return;
        
        const iconAngle = angle + (index / techIcons.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(iconAngle) - icon.offsetWidth / 2;
        const y = centerY + radius * Math.sin(iconAngle) - icon.offsetHeight / 2;
        
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
      });
      
      animationFrame = requestAnimationFrame(animateIcons);
    };
    
    // Initial positioning
    positionIcons();
    
    // Start animation
    animateIcons();
    
    // Handle window resize
    const handleResize = () => {
      const newCenterX = container.offsetWidth / 2;
      const newCenterY = container.offsetHeight / 2;
      const newRadius = Math.min(newCenterX, newCenterY) * 0.7;
      
      // Update values
      Object.assign({ centerX: newCenterX, centerY: newCenterY, radius: newRadius });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <AnimationContainer ref={containerRef}>
      <CenterLogo theme={theme}>
        <img src={require('../assets/tecniweb-logo.png')} alt="Tecniweb Logo" />
      </CenterLogo>
      
      {techIcons.map((icon, index) => (
        <TechIcon
          key={index}
          ref={el => iconsRef.current[index] = el}
        >
          <img src={icon.src} alt={icon.name} title={icon.name} />
        </TechIcon>
      ))}
    </AnimationContainer>
  );
};

export default TechCircleAnimation;
