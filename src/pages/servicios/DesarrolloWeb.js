import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import HeroBanner from '../../components/HeroBanner';
import Breadcrumbs from '../../components/Breadcrumb';
import ParallaxSection from '../../components/ParallaxSection';
import ProcessSection from '../../components/ProcessSection';
import ContactForm from '../../components/ContactForm';
import GoogleCalendarButton from '../../components/GoogleCalendarButton';
import StandardTechStack from '../../components/StandardTechStack';
import FloatingImage from '../../components/FloatingImage';
import { FaCode, FaDesktop, FaMobile, FaShoppingCart, FaSearch, FaChartLine } from 'react-icons/fa';

const PageContainer = styled.div`
  width: 100%;
`;

const SectionContainer = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  
  &.alt-bg {
    background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
  }
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 80px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme === 'light' ? 'rgba(33, 158, 188, 0.1)' : 'rgba(0, 119, 182, 0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    font-size: 2rem;
    color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
`;

const FeatureTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  line-height: 1.6;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TechImage = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TechName = styled.p`
  font-weight: 500;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#333' : '#eee'};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 15px;
  line-height: 1.6;
`;

const ProjectLink = styled(Link)`
  display: inline-block;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  &::after {
    content: ' →';
  }
`;

const DesarrolloWeb = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios1.webp'),
    require('../../assets/banner-pics/banner-servicios2.webp'),
    require('../../assets/banner-pics/banner-servicios3.jpg')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaDesktop />,
      title: 'Diseño Responsive',
      description: 'Sitios web que se adaptan perfectamente a todos los dispositivos, desde móviles hasta pantallas de escritorio.'
    },
    {
      icon: <FaCode />,
      title: 'Desarrollo Frontend',
      description: 'Interfaces de usuario modernas y atractivas utilizando las últimas tecnologías como React, Angular o Vue.'
    },
    {
      icon: <FaCode />,
      title: 'Desarrollo Backend',
      description: 'Sistemas robustos y escalables con Node.js, PHP, Python o .NET según tus necesidades específicas.'
    },
    {
      icon: <FaShoppingCart />,
      title: 'E-commerce',
      description: 'Tiendas online completas con gestión de productos, pagos, envíos y seguimiento de pedidos.'
    },
    {
      icon: <FaSearch />,
      title: 'SEO Optimizado',
      description: 'Implementación de mejores prácticas de SEO para mejorar la visibilidad en los motores de búsqueda.'
    },
    {
      icon: <FaChartLine />,
      title: 'Analítica Web',
      description: 'Integración de herramientas de análisis para monitorear el rendimiento y comportamiento de los usuarios.'
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Desarrollo Web | Tecniweb Latam</title>
        <meta name="description" content="Servicios de desarrollo web profesional. Creamos sitios y aplicaciones web a medida, responsive y optimizados para SEO con las últimas tecnologías." />
        <meta name="keywords" content="desarrollo web, diseño responsive, frontend, backend, e-commerce, SEO, React, Angular, Node.js" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Desarrollo Web"
        subtitle="Soluciones web a medida con las últimas tecnologías para impulsar tu presencia digital"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Servicios', path: '/servicios' },
          { label: 'Desarrollo Web', path: '/servicios/desarrollo-web' }
        ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Desarrollo Web</SectionTitle>
          <SectionDescription theme={theme}>
            Creamos experiencias web excepcionales que combinan diseño atractivo, funcionalidad robusta y rendimiento optimizado.
            Nuestras soluciones están diseñadas para ayudarte a alcanzar tus objetivos de negocio en el mundo digital.
          </SectionDescription>
          
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index} theme={theme}>
                <FeatureIcon theme={theme}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Technologies */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tecnologías que Utilizamos</SectionTitle>
          <SectionDescription theme={theme}>
            Trabajamos con las tecnologías más modernas y robustas del mercado para garantizar soluciones de alta calidad,
            escalables y mantenibles a largo plazo.
          </SectionDescription>
          <StandardTechStack />
        </ContentWrapper>
      </SectionContainer>
      
      {/* Process Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <FloatingImage 
          imageSrc={require('../../assets/servicios-pics/desarrollo-web/nuestro-proceso.webp')} 
          interval={12000} 
          duration="2s" 
          width="500px" 
          top="30%" 
        />
        <ProcessSection 
          title="Nuestro Proceso de Desarrollo"
          description="Seguimos una metodología ágil que garantiza transparencia, comunicación constante y resultados de alta calidad. Comenzamos con un análisis detallado de tus necesidades, seguido por el diseño de la arquitectura y la interfaz. Luego, nuestro equipo de desarrollo implementa la solución con ciclos iterativos de feedback. Finalmente, realizamos pruebas exhaustivas antes del lanzamiento y ofrecemos soporte continuo."
          backgroundImage={require('../../assets/servicios-pics/desarrollo-web/nuestro-proces-bg.jpg')}
          buttonText="Conoce nuestra metodología"
          buttonLink="/nosotros/metodologia"
        />
      </div>
            
      {/* Contact Form */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para impulsar tu presencia web?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto y te ayudaremos a convertirlo en realidad. Nuestro equipo está listo para crear
            la solución web perfecta para tu negocio.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default DesarrolloWeb;
