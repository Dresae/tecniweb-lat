import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const CalendarButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  padding: 20px;
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#222'};
  border-radius: 30px;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
    : '0 10px 30px rgba(0, 0, 0, 0.3)'
  };
`;

const CalendarTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
`;

const CalendarDescription = styled.p`
  margin-bottom: 25px;
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  text-align: center;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  min-height: 50px;
  margin: 10px 0;
`;

const CalendarButton = styled.a`
  display: inline-block;
  background-color: #33B679;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #2a9c66;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const GoogleCalendarButton = () => {
  const { theme } = useTheme();
  
  return (
    <CalendarButtonContainer theme={theme}>
      <CalendarTitle theme={theme}>¿Prefieres agendar una llamada?</CalendarTitle>
      <CalendarDescription theme={theme}>
        Nuestro equipo está disponible para atenderte personalmente. 
        Agenda una llamada en el horario que mejor te convenga y te contactaremos puntualmente.
      </CalendarDescription>
      <ButtonContainer>
        <CalendarButton 
          href="https://calendar.app.google/JPXy3u1d2ghtHEw5A" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Agendamos tu consulta gratis
        </CalendarButton>
      </ButtonContainer>
    </CalendarButtonContainer>
  );
};

export default GoogleCalendarButton;