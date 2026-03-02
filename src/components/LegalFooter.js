import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const LegalFooterContainer = styled.div`
  padding: var(--padding-md) 0;
  background-color: ${props => props.theme === 'light' 
    ? 'var(--light-gray-2)' 
    : 'var(--dark-gray-2)'
  };
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-gray-1)' 
    : 'var(--light-gray-1)'
  };
`;

const LegalContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--padding-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    margin-bottom: var(--margin-sm);
  }
`;

const LegalLinks = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LegalLink = styled(Link)`
  font-size: 0.9rem;
  margin-left: var(--margin-md);
  color: inherit;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'light' 
      ? 'var(--dark-green-2)' 
      : 'var(--light-green-2)'
    };
  }
  
  @media (max-width: 768px) {
    margin: var(--margin-sm) 0;
    margin-left: 0;
  }
`;

const LegalFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <LegalFooterContainer theme={theme}>
      <LegalContent>
        <Copyright>
          © {currentYear} Tecniweb Latam. Todos los derechos reservados.
        </Copyright>
        <LegalLinks>
          <LegalLink to="/politica-cookies" theme={theme}>Política de cookies</LegalLink>
          <LegalLink to="/aviso-legal" theme={theme}>Aviso Legal</LegalLink>
          <LegalLink to="/politica-privacidad" theme={theme}>Política de Privacidad</LegalLink>
        </LegalLinks>
      </LegalContent>
    </LegalFooterContainer>
  );
};

export default LegalFooter;
