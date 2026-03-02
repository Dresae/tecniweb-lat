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
import { FaExchangeAlt, FaDatabase, FaServer, FaCloudUploadAlt, FaShieldAlt, FaChartLine } from 'react-icons/fa';

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
  border-radius: 20px;
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

const ComparisonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
`;

const ComparisonList = styled.ul`
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

const Migraciones = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios2.webp'),
    require('../../assets/banner-pics/banner-servicios3.jpg'),
    require('../../assets/banner-pics/banner-servicios5.webp')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaExchangeAlt />,
      title: 'Migración de Sistemas',
      description: 'Transición segura de sistemas legados a plataformas modernas, preservando funcionalidades críticas y mejorando el rendimiento.'
    },
    {
      icon: <FaDatabase />,
      title: 'Migración de Datos',
      description: 'Transferencia de datos entre diferentes sistemas y plataformas con validación, limpieza y transformación según sea necesario.'
    },
    {
      icon: <FaServer />,
      title: 'Migración a la Nube',
      description: 'Traslado de aplicaciones y datos a entornos cloud como AWS, Azure o Google Cloud para mayor escalabilidad y flexibilidad.'
    },
    {
      icon: <FaCloudUploadAlt />,
      title: 'Modernización de Aplicaciones',
      description: 'Actualización de aplicaciones antiguas con tecnologías modernas, mejorando la experiencia de usuario y el rendimiento.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Seguridad en la Migración',
      description: 'Implementación de protocolos de seguridad durante todo el proceso de migración para proteger datos sensibles.'
    },
    {
      icon: <FaChartLine />,
      title: 'Optimización Post-Migración',
      description: 'Ajustes y mejoras continuas después de la migración para maximizar el rendimiento y la eficiencia del nuevo sistema.'
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      number: 1,
      title: 'Evaluación y Planificación',
      description: 'Analizamos tu sistema actual, identificamos dependencias, riesgos y requisitos para crear un plan de migración detallado y realista.'
    },
    {
      number: 2,
      title: 'Preparación del Entorno',
      description: 'Configuramos el nuevo entorno de destino, establecemos conexiones seguras y preparamos las herramientas necesarias para la migración.'
    },
    {
      number: 3,
      title: 'Migración de Datos',
      description: 'Transferimos los datos con procesos de extracción, transformación y carga (ETL), asegurando la integridad y consistencia de la información.'
    },
    {
      number: 4,
      title: 'Migración de Aplicaciones',
      description: 'Trasladamos las aplicaciones al nuevo entorno, adaptando el código cuando sea necesario y configurando las integraciones requeridas.'
    },
    {
      number: 5,
      title: 'Pruebas Exhaustivas',
      description: 'Realizamos pruebas funcionales, de rendimiento y de seguridad para verificar que todo funciona correctamente en el nuevo entorno.'
    },
    {
      number: 6,
      title: 'Puesta en Producción',
      description: 'Implementamos la migración en producción siguiendo un plan cuidadosamente diseñado para minimizar el tiempo de inactividad.'
    },
    {
      number: 7,
      title: 'Soporte Post-Migración',
      description: 'Proporcionamos asistencia después de la migración para resolver cualquier problema y optimizar el rendimiento del nuevo sistema.'
    }
  ];
  
  // Projects data
  const projects = [
    {
      title: 'Migración a la Nube para Empresa Financiera',
      description: 'Migración de infraestructura on-premise a AWS para empresa del sector financiero, incluyendo aplicaciones críticas y bases de datos.',
      image: '/media/project-cloud-migration.jpg',
      link: '/recursos/proyectos/migracion-nube-financiera'
    },
    {
      title: 'Actualización de Sistema ERP',
      description: 'Migración de ERP legado a versión moderna con preservación de datos históricos y personalización de funcionalidades clave.',
      image: '/media/project-erp-migration.jpg',
      link: '/recursos/proyectos/actualizacion-erp'
    },
    {
      title: 'Migración de Base de Datos Corporativa',
      description: 'Migración de base de datos Oracle a PostgreSQL para empresa de logística, incluyendo optimización de esquemas y consultas.',
      image: '/media/project-database-migration.jpg',
      link: '/recursos/proyectos/migracion-base-datos'
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Migraciones | Tecniweb Latam</title>
        <meta name="description" content="Servicios de migración de sistemas y datos. Realizamos transiciones seguras de sistemas legados a tecnologías modernas sin pérdida de información." />
        <meta name="keywords" content="migración de sistemas, migración de datos, migración a la nube, modernización de aplicaciones, sistemas legados" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Migraciones"
        subtitle="Transiciones seguras de sistemas legados a tecnologías modernas sin pérdida de datos"
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
              label: 'Migraciones',
              path: '/servicios/migraciones'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Migración</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos servicios integrales de migración para ayudarte a modernizar tu infraestructura tecnológica
            de forma segura y eficiente, minimizando riesgos y tiempo de inactividad.
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
          <SectionTitle theme={theme}>Nuestro Proceso de Migración</SectionTitle>
          <SectionDescription theme={theme}>
            Seguimos una metodología estructurada y probada para garantizar migraciones exitosas
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
      
      {/* Comparison */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Por qué Modernizar?</SectionTitle>
          <SectionDescription theme={theme}>
            Comparativa entre mantener sistemas legados y migrar a tecnologías modernas
          </SectionDescription>
          
          <ComparisonContainer>
            <ComparisonCard theme={theme}>
              <h3>Sistemas Legados</h3>
              <ComparisonList theme={theme}>
                <li>Altos costos de mantenimiento</li>
                <li>Dificultad para encontrar personal calificado</li>
                <li>Limitaciones de escalabilidad</li>
                <li>Problemas de compatibilidad con sistemas modernos</li>
                <li>Mayor riesgo de seguridad</li>
                <li>Menor agilidad para adaptarse a cambios del mercado</li>
                <li>Experiencia de usuario obsoleta</li>
              </ComparisonList>
            </ComparisonCard>
            
            <ComparisonCard theme={theme}>
              <h3>Sistemas Modernos</h3>
              <ComparisonList theme={theme}>
                <li>Reducción de costos operativos</li>
                <li>Acceso a un mayor pool de talento</li>
                <li>Escalabilidad según demanda</li>
                <li>Integración sencilla con otras plataformas</li>
                <li>Mejores prácticas de seguridad</li>
                <li>Mayor agilidad y adaptabilidad</li>
                <li>Experiencia de usuario mejorada</li>
              </ComparisonList>
            </ComparisonCard>
          </ComparisonContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Benefits Section */}
      <ProcessSection 
        title="Beneficios de una Migración Profesional"
        description="Una migración bien planificada y ejecutada permite a tu organización aprovechar las ventajas de las tecnologías modernas sin los riesgos asociados a un cambio mal gestionado. Nuestro enfoque meticuloso garantiza la preservación de tus datos críticos, minimiza el tiempo de inactividad y asegura una transición suave para tus usuarios."
        backgroundImage={require('../../assets/servicios-pics/migraciones/migracion-profesional.jpg')}
        buttonText="Conoce más sobre nuestro enfoque"
        buttonLink="/nosotros/metodologia"
      />
      

      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para modernizar tus sistemas?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto de migración y te ayudaremos a planificar y ejecutar una transición exitosa.
            Nuestro equipo está listo para guiarte en cada paso del proceso.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default Migraciones;
