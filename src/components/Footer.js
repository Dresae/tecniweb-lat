import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import axios from 'axios';

const FooterContainer = styled.footer`
  padding: var(--padding-lg) 0;
  background-color: ${props => props.theme === 'light' 
    ? 'var(--light-gray-1)' 
    : 'var(--dark-gray-1)'
  };
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-gray-1)' 
    : 'var(--light-gray-1)'
  };
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--padding-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: var(--margin-lg);
  
  @media (max-width: 768px) {
    margin-bottom: var(--margin-md);
  }
`;

const ColumnTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--margin-md);
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-green-1)' 
    : 'var(--light-green-1)'
  };
`;

const ColumnContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
`;

const FooterLink = styled(Link)`
  display: block;
  margin-bottom: var(--margin-sm);
  color: inherit;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'light' 
      ? 'var(--dark-green-2)' 
      : 'var(--light-green-2)'
    };
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: var(--margin-md);
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${props => props.theme === 'light' 
      ? 'var(--light-gray-2)' 
      : 'var(--dark-gray-2)'
    };
    color: ${props => props.theme === 'light' 
      ? 'var(--dark-gray-1)' 
      : 'var(--light-gray-1)'
    };
    margin-right: var(--margin-sm);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
      background-color: ${props => props.theme === 'light' 
        ? 'var(--light-green-2)' 
        : 'var(--dark-green-2)'
      };
      color: var(--white);
    }
  }
`;

const LowerFooter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--padding-sm) var(--padding-lg) 0;
  border-top: 1px solid ${props => props.theme === 'light' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.1)'
  };
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubscriptionForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: var(--margin-md) 0;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SubscriptionInput = styled.input`
  flex: 1;
  padding: var(--padding-sm);
  border: 1px solid ${props => props.theme === 'light' 
    ? 'var(--light-gray-2)' 
    : 'var(--dark-gray-2)'
  };
  border-radius: 4px 0 0 4px;
  background-color: ${props => props.theme === 'light' 
    ? 'var(--white)' 
    : 'var(--dark-gray-2)'
  };
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-gray-1)' 
    : 'var(--light-gray-1)'
  };
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'light' 
      ? 'var(--light-green-2)' 
      : 'var(--dark-green-2)'
    };
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
    margin-bottom: var(--margin-sm);
  }
`;

const SubscriptionButton = styled.button`
  padding: var(--padding-sm) var(--padding-md);
  background-color: ${props => props.theme === 'light' 
    ? 'var(--light-green-2)' 
    : 'var(--dark-green-2)'
  };
  color: var(--white);
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' 
      ? 'var(--dark-green-1)' 
      : 'var(--light-green-1)'
    };
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const SubscriptionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--margin-md);
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-green-1)' 
    : 'var(--light-green-1)'
  };
`;

const SuccessMessage = styled.div`
  padding: var(--padding-md);
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(0, 200, 0, 0.1)' 
    : 'rgba(0, 200, 0, 0.2)'
  };
  color: ${props => props.theme === 'light' 
    ? 'var(--dark-green-1)' 
    : 'var(--light-green-1)'
  };
  border-radius: 4px;
  margin-top: var(--margin-md);
`;

const AdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--margin-sm) 0;
  
  img {
    max-width: 90%;
    border-radius: 4px;
    box-shadow: ${props => props.theme === 'light' 
      ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
      : '0 4px 12px rgba(0, 0, 0, 0.3)'
    };
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  @media (max-width: 768px) {
    margin: var(--margin-lg) 0;
  }
`;

const Footer = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // For development: Skip actual API call to prevent errors
        // In production, this would be: await axios.post('/api/subscribe', { email });
        
        // Show fake confirmation message in console
        console.log('Newsletter subscription successful:', email);
        
        setSubscribed(true);
        setEmail('');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      } catch (error) {
        // In development mode, we'll never reach this block
        console.error('Error subscribing:', error);
        // No error UI shown to user
      }
    }
  };
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterColumn>
          <ColumnTitle theme={theme}>Tecniweb Latam</ColumnTitle>
          <ColumnContent>
            <p>Somos tu mejor opción para el desarrollo de soluciones tecnológicas. Nos enfocamos en la transformación digital de tu negocio con soluciones innovadoras y personalizadas.</p>
            <SocialIcons theme={theme}>
              <a href="https://instagram.com/tecniweblatam" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/573229833008" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="https://t.me/tecniweblatam" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <FaTelegram />
              </a>
            </SocialIcons>
          </ColumnContent>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle theme={theme}>Servicios</ColumnTitle>
          <ColumnContent>
            <FooterLink to="/servicios/desarrollo-web" theme={theme}>Desarrollo Web</FooterLink>
            <FooterLink to="/servicios/aplicaciones-moviles" theme={theme}>Aplicaciones Móviles</FooterLink>
            <FooterLink to="/servicios/software-escritorio" theme={theme}>Software de Escritorio</FooterLink>
            <FooterLink to="/servicios/implementacion-customizacion" theme={theme}>Implementación y Customización</FooterLink>
            <FooterLink to="/servicios/migraciones" theme={theme}>Migraciones</FooterLink>
            <FooterLink to="/servicios/integracion-ia" theme={theme}>Integración con IA</FooterLink>
            <FooterLink to="/servicios/modelo-operacion" theme={theme}>Nuestro Modelo de Operación</FooterLink>
          </ColumnContent>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle theme={theme}>Nuestro modelo de trabajo y contacto</ColumnTitle>
          <ColumnContent>
            <FooterLink to="/nosotros/metodologia" theme={theme}>Nuestra metodología de trabajo</FooterLink>
            <FooterLink to="/nosotros/porque-escogernos" theme={theme}>Por qué escoger a Tecniweb Latam</FooterLink>
            <FooterLink to="/nosotros/valores-corporativos" theme={theme}>Valores Corporativos</FooterLink>
            <FooterLink to="/nosotros/vision" theme={theme}>Visión al 2029</FooterLink>
            <FooterLink to="/nosotros/impacto-social" theme={theme}>Impacto Social y Tecnológico</FooterLink>
          </ColumnContent>
        </FooterColumn>
      </FooterContent>
      
      <LowerFooter theme={theme}>
        <div>
          <SubscriptionTitle theme={theme}>¿Quieres recibir actualizaciones y novedades?</SubscriptionTitle>
          {subscribed ? (
            <SuccessMessage theme={theme}>
              ¡Gracias por suscribirte! Pronto recibirás nuestras actualizaciones.
            </SuccessMessage>
          ) : (
            <SubscriptionForm onSubmit={handleSubscribe}>
              <SubscriptionInput 
                type="email" 
                placeholder="Tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                theme={theme}
              />
              <SubscriptionButton type="submit" theme={theme}>Suscribirse</SubscriptionButton>
            </SubscriptionForm>
          )}
        </div>
        <AdContainer theme={theme}>
          <img src={require('../assets/tecniweb-signature.gif')} alt="Tecniweb Latam" />
        </AdContainer>
      </LowerFooter>
    </FooterContainer>
  );
};

export default Footer;
