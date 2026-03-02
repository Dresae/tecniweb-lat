import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaInstagram, FaWhatsapp, FaTelegram, FaPhone } from 'react-icons/fa';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const IconsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 99;
  
  /* Enhanced mobile responsiveness for all screen sizes */
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    gap: 6px;
  }
  
  /* For very narrow screens (non-standard phones) */
  @media (max-width: 360px) {
    bottom: 20px;
    right: 20px;
    gap: 5px;
  }
  
  /* For very wide but short screens (landscape phones) */
  @media (max-height: 500px) and (orientation: landscape) {
    bottom: 20px;
    right: 20px;
    gap: 4px;
  }
`;

const IconWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  &.pulse {
    animation: ${pulse} 2s infinite;
  }
  
  /* Enhanced mobile responsiveness for all screen sizes */
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
  
  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
  }
  
  /* For very narrow screens (non-standard phones) */
  @media (max-width: 360px) {
    width: 38px;
    height: 38px;
  }
  
  /* For very wide but short screens (landscape phones) */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 35px;
    height: 35px;
  }
`;

const SocialMediaIcons = () => {
  const { theme } = useTheme();
  
  const socialIcons = [

    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={24} />,
      onClick: () => window.open('https://wa.me/send/?phone=573229833008&text=Buen%20día%2C%0A%0Aestoy%20interesado%20en%20los%20servicios%20de%20Tecniweb%20Latam%2C%0A%0Apodrían%20contactarme%3f', '_blank'),
      bgColor: '#25D366',
      pulse: true
    }
  ];
  
  return (
    <IconsContainer>
      {socialIcons.map((icon) => (
        <IconWrapper 
          key={icon.name}
          onClick={icon.onClick}
          target="_blank"
          rel="noopener noreferrer"
          bgColor={icon.bgColor}
          className={icon.pulse ? 'pulse' : ''}
          aria-label={icon.name}
        >
          {icon.icon}
        </IconWrapper>
      ))}
    </IconsContainer>
  );
};

export default SocialMediaIcons;
