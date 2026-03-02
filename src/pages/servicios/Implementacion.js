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
import { FaCogs, FaTools, FaUsersCog, FaClipboardCheck, FaGraduationCap, FaHeadset } from 'react-icons/fa';

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

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 40px 0;
`;

const ProcessStep = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex-grow: 1;
`;

const StepTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const StepDescription = styled.p`
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

const Implementacion = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios1.webp'),
    require('../../assets/banner-pics/banner-servicios4.jpg'),
    require('../../assets/banner-pics/banner-servicios5.webp')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaCogs />,
      title: 'Implementación de Sistemas',
      description: 'Instalación y configuración de sistemas de software empresarial adaptados a tus necesidades específicas.'
    },
    {
      icon: <FaTools />,
      title: 'Personalización de Software',
      description: 'Adaptación de soluciones existentes para satisfacer los requerimientos particulares de tu negocio.'
    },
    {
      icon: <FaUsersCog />,
      title: 'Gestión del Cambio',
      description: 'Estrategias para facilitar la adopción de nuevas tecnologías y procesos dentro de tu organización.'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Aseguramiento de Calidad',
      description: 'Pruebas exhaustivas para garantizar que la implementación cumple con todos los requisitos y estándares.'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Capacitación de Usuarios',
      description: 'Programas de formación personalizados para asegurar que tu equipo aprovecha al máximo las nuevas soluciones.'
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte Post-Implementación',
      description: 'Asistencia continua para resolver dudas y problemas después de la puesta en marcha.'
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      number: 1,
      title: 'Análisis y Planificación',
      description: 'Evaluamos tus necesidades actuales, procesos de negocio y objetivos para crear un plan de implementación detallado que minimice riesgos y disrupciones.'
    },
    {
      number: 2,
      title: 'Configuración y Personalización',
      description: 'Adaptamos la solución a tus requerimientos específicos, configurando parámetros, personalizando interfaces y desarrollando funcionalidades adicionales cuando sea necesario.'
    },
    {
      number: 3,
      title: 'Migración de Datos',
      description: 'Transferimos tus datos existentes al nuevo sistema, asegurando la integridad y consistencia de la información durante todo el proceso.'
    },
    {
      number: 4,
      title: 'Pruebas y Validación',
      description: 'Realizamos pruebas exhaustivas para verificar que todas las funcionalidades operan correctamente y que el sistema cumple con los requerimientos establecidos.'
    },
    {
      number: 5,
      title: 'Capacitación',
      description: 'Formamos a tu equipo para que pueda utilizar eficientemente el nuevo sistema, con sesiones prácticas y materiales de apoyo personalizados.'
    },
    {
      number: 6,
      title: 'Puesta en Producción',
      description: 'Lanzamos el sistema en tu entorno de producción con un plan cuidadosamente diseñado para minimizar interrupciones en tus operaciones.'
    },
    {
      number: 7,
      title: 'Soporte y Mejora Continua',
      description: 'Proporcionamos soporte técnico y acompañamiento durante las primeras semanas de uso, y establecemos un plan de mejora continua para optimizar el sistema con el tiempo.'
    }
  ];
    
  return (
    <PageContainer>
      <Helmet>
        <title>Implementación y Customización | Tecniweb Latam</title>
        <meta name="description" content="Servicios de implementación y personalización de software empresarial. Adaptamos soluciones existentes a tus necesidades específicas con mínima disrupción." />
        <meta name="keywords" content="implementación de software, customización, personalización, ERP, CRM, sistemas empresariales, migración de datos" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Implementación y Customización"
        subtitle="Adaptamos e implementamos soluciones tecnológicas existentes para satisfacer tus necesidades específicas"
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
              label: 'Implementación y Customización',
              path: '/servicios/implementacion-customizacion'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Implementación</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos servicios integrales de implementación y personalización de sistemas de software empresarial,
            asegurando una transición suave y una adopción exitosa en tu organización.
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
      
      {/* Process */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestro Proceso de Implementación</SectionTitle>
          <SectionDescription theme={theme}>
            Seguimos una metodología estructurada y probada para garantizar implementaciones exitosas
            con mínima disrupción en tus operaciones diarias.
          </SectionDescription>
          
          <ProcessSteps>
            {processSteps.map((step) => (
              <ProcessStep key={step.number}>
                <StepNumber theme={theme}>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle theme={theme}>{step.title}</StepTitle>
                  <StepDescription theme={theme}>{step.description}</StepDescription>
                </StepContent>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Technologies */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Plataformas que Implementamos</SectionTitle>
          <SectionDescription theme={theme}>
            Tenemos amplia experiencia en la implementación y personalización de diversas plataformas
            y sistemas empresariales líderes en el mercado.
          </SectionDescription>
          
          <StandardTechStack />
        </ContentWrapper>
      </SectionContainer>
      
      {/* Benefits Section */}
      <ProcessSection 
        title="Beneficios de una Implementación Profesional"
        description="Una implementación adecuada maximiza el retorno de tu inversión en tecnología. Nuestro enfoque profesional reduce los riesgos, minimiza el tiempo de inactividad y asegura que obtengas todos los beneficios de tu nueva solución desde el primer día."
        backgroundImage={require('../../assets/servicios-pics/implementacion-customizacion/implementacion-profesional.jpg')}
        buttonText="Conoce más sobre nuestro enfoque"
        buttonLink="/nosotros/metodologia"
      />
            
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para implementar tu solución?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto y te ayudaremos a implementar la solución perfecta para tu negocio.
            Nuestro equipo está listo para guiarte en cada paso del proceso.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default Implementacion;
