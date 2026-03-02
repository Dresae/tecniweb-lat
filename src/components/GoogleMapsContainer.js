import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 40px 0;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
    : '0 10px 30px rgba(0, 0, 0, 0.3)'
  };
  position: relative;
`;

const MapTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
`;

const MapDescription = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
`;

const GoogleMapsContainer = () => {
  const { theme } = useTheme();
  
  // Coordinates for Funza, Colombia
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31810.680542225797!2d-74.22416501149904!3d4.71173423318496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f82a935a650d5%3A0x7bcbcfe2307bb094!2sFunza%2C%20Cundinamarca!5e0!3m2!1sen!2sco!4v1772149230114!5m2!1sen!2sco"
  
  return (
    <>
      <MapTitle theme={theme}>Nuestra ubicación</MapTitle>
      <MapDescription theme={theme}>
        Estamos ubicados en el corazón de Funza, Colombia. Visítanos o contáctanos para conocer más sobre nuestros servicios y cómo podemos ayudar a tu empresa a crecer en el mundo digital.
      </MapDescription>
      <MapContainer theme={theme}>
        <MapFrame 
          src={mapSrc} 
          title="Tecniweb Latam ubicación" 
          allowFullScreen="" 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <MapOverlay />
      </MapContainer>
    </>
  );
};

export default GoogleMapsContainer;
