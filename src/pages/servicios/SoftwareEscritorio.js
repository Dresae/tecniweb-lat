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
import { FaDesktop, FaCode, FaDatabase, FaChartLine, FaChartBar, FaShieldAlt, FaSync, FaUserCog, FaNetworkWired } from 'react-icons/fa';

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
  border-radius: 8px;
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

const SolutionTypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SolutionTypeCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 15px;
    }
  }
`;

const SolutionTypeList = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
    line-height: 1.6;
    
    &::marker {
      color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    }
  }
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

const SoftwareEscritorio = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios2.webp'),
    require('../../assets/banner-pics/banner-servicios4.jpg'),
    require('../../assets/banner-pics/banner-servicios5.webp')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaDesktop />,
      title: 'Interfaces Intuitivas',
      description: 'Diseño de interfaces de usuario intuitivas y eficientes que mejoran la productividad y reducen la curva de aprendizaje.'
    },
    {
      icon: <FaDatabase />,
      title: 'Gestión de Datos',
      description: 'Soluciones robustas para almacenamiento, procesamiento y análisis de datos con bases de datos optimizadas.'
    },
    {
      icon: <FaUserCog />,
      title: 'Automatización de Procesos',
      description: 'Automatización de tareas repetitivas y flujos de trabajo para aumentar la eficiencia operativa.'
    },
    {
      icon: <FaChartBar />,
      title: 'Reportes y Analítica',
      description: 'Generación de informes personalizados y paneles de control para visualización de datos y toma de decisiones.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Seguridad Avanzada',
      description: 'Implementación de protocolos de seguridad para proteger datos sensibles y garantizar la integridad del sistema.'
    },
    {
      icon: <FaNetworkWired />,
      title: 'Integración con Sistemas',
      description: 'Conexión con otros sistemas y aplicaciones empresariales para un flujo de información unificado.'
    }
  ];
    
  return (
    <PageContainer>
      <Helmet>
        <title>Software de Escritorio | Tecniweb Latam</title>
        <meta name="description" content="Desarrollo de software de escritorio a medida para empresas. Creamos aplicaciones robustas, eficientes y seguras que optimizan tus procesos de negocio." />
        <meta name="keywords" content="software de escritorio, aplicaciones de escritorio, desarrollo de software, automatización, gestión empresarial, .NET, Java, Python" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Software de Escritorio"
        subtitle="Soluciones de software a medida para optimizar los procesos internos de tu empresa"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
            {
              label: 'Inicio',
              path: '/'
            },
            {
              label: 'Servicios',
              path: '/servicios'
            },
            {
              label: 'Software de Escritorio',
              path: '/servicios/software-escritorio'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Desarrollo de Software</SectionTitle>
          <SectionDescription theme={theme}>
            Creamos soluciones de software personalizadas que se adaptan perfectamente a los procesos y necesidades específicas de tu empresa,
            mejorando la eficiencia operativa y facilitando la toma de decisiones.
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
      
      {/* Solution Types */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tipos de Soluciones</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos diferentes tipos de soluciones de software según las necesidades específicas de tu empresa,
            desde aplicaciones independientes hasta sistemas empresariales complejos.
          </SectionDescription>
          
          <SolutionTypesContainer>
            <SolutionTypeCard theme={theme}>
              <h3>
                <FaDesktop />
                Aplicaciones Standalone
              </h3>
              <p>Software independiente para necesidades específicas:</p>
              <SolutionTypeList theme={theme}>
                <li>Herramientas de productividad</li>
                <li>Aplicaciones de procesamiento de datos</li>
                <li>Software de gestión departamental</li>
                <li>Utilidades especializadas</li>
                <li>Aplicaciones de diseño y edición</li>
              </SolutionTypeList>
              <p>Ideales para resolver problemas específicos o mejorar procesos concretos dentro de la organización.</p>
            </SolutionTypeCard>
            
            <SolutionTypeCard theme={theme}>
              <h3>
                <FaNetworkWired />
                Sistemas Empresariales
              </h3>
              <p>Soluciones integrales para toda la empresa:</p>
              <SolutionTypeList theme={theme}>
                <li>Sistemas ERP (Planificación de Recursos Empresariales)</li>
                <li>Sistemas CRM (Gestión de Relaciones con Clientes)</li>
                <li>Software de gestión de inventario y logística</li>
                <li>Sistemas de gestión documental</li>
                <li>Plataformas de Business Intelligence</li>
              </SolutionTypeList>
              <p>Ideales para empresas que buscan unificar y optimizar todos sus procesos de negocio en una única plataforma.</p>
            </SolutionTypeCard>
          </SolutionTypesContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Technologies */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tecnologías que Utilizamos</SectionTitle>
          <SectionDescription theme={theme}>
            Trabajamos con las tecnologías más robustas y confiables del mercado para garantizar soluciones de software
            estables, seguras y con excelente rendimiento.
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
          description="Seguimos una metodología estructurada que garantiza soluciones de alta calidad. Comenzamos con un análisis detallado de tus procesos y requerimientos. Luego diseñamos la arquitectura del sistema y las interfaces de usuario. Durante el desarrollo, mantenemos ciclos iterativos de feedback. Finalmente, realizamos pruebas exhaustivas, implementamos la solución en tu entorno y proporcionamos capacitación y soporte continuo."
          backgroundImage={require('../../assets/servicios-pics/desarrollo-web/nuestro-proces-bg.jpg')}
          buttonText="Conoce nuestra metodología"
          buttonLink="/nosotros/metodologia"
        />
      </div>
            
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para optimizar tus procesos?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto y te ayudaremos a convertirlo en realidad. Nuestro equipo está listo para crear
            la solución de software perfecta para tu empresa.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default SoftwareEscritorio;
