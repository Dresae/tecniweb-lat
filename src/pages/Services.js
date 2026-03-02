import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import HeroBanner from '../components/HeroBanner';
import ParallaxSection from '../components/ParallaxSection';
import Breadcrumbs from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';
import GoogleCalendarButton from '../components/GoogleCalendarButton';
import TechCircleAnimation from '../components/TechCircleAnimation';

const ServicesContainer = styled.div`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(Link)`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ServiceCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ServiceContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const ServiceFeatures = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  list-style-type: disc;
  
  li {
    margin-bottom: 8px;
    color: ${props => props.theme === 'light' ? '#666' : '#bbb'};
  }
`;

const ServiceButton = styled.span`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  ${ServiceCard}:hover & {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    &::before {
      display: none;
    }
  }
`;

const ProcessStep = styled.div`
  flex: 1;
  min-width: 150px;
  max-width: 200px;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    text-align: left;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 auto 15px;
  
  @media (max-width: 768px) {
    margin: 0 20px 0 0;
    min-width: 80px;
  }
`;

const StepContent = styled.div``;

const StepTitle = styled.h4`
  font-family: 'Rubik', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#666' : '#bbb'};
`;

const Services = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../assets/banner-pics/banner-servicios1.webp'),
    require('../assets/banner-pics/banner-servicios2.webp'),
    require('../assets/banner-pics/banner-servicios3.jpg'),
    require('../assets/banner-pics/banner-servicios4.jpg'),
    require('../assets/banner-pics/banner-servicios5.webp')
  ];
  
  // Services data
  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos sitios web y aplicaciones web personalizadas con diseño responsive y experiencia de usuario excepcional.',
      image: require('../assets/servicios-pics/desarrollo-web.jpg'),
      link: '/servicios/desarrollo-web',
      features: [
        'Sitios web corporativos',
        'Tiendas en línea (e-commerce)',
        'Aplicaciones web progresivas (PWA)',
        'Sistemas de gestión de contenidos (CMS)'
      ]
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android con interfaces intuitivas y alto rendimiento.',
      image: require('../assets/servicios-pics/app-movil.jpg'),
      link: '/servicios/aplicaciones-moviles',
      features: [
        'Aplicaciones nativas para iOS y Android',
        'Aplicaciones híbridas multiplataforma',
        'Integración con APIs y servicios externos',
        'Notificaciones push y funcionalidad offline'
      ]
    },
    {
      title: 'Software de Escritorio',
      description: 'Diseñamos soluciones de software a medida para optimizar los procesos internos de tu empresa.',
      image: require('../assets/servicios-pics/app-escritorio.jpg'),
      link: '/servicios/software-escritorio',
      features: [
        'Aplicaciones multiplataforma',
        'Sistemas de gestión empresarial',
        'Automatización de procesos',
        'Integración con hardware específico'
      ]
    },
    {
      title: 'Implementación y Customización',
      description: 'Adaptamos e implementamos soluciones existentes para satisfacer tus necesidades específicas.',
      image: require('../assets/servicios-pics/implementacion.jpg'),
      link: '/servicios/implementacion-customizacion',
      features: [
        'Personalización de CRM y ERP',
        'Integración de sistemas',
        'Configuración de plataformas',
        'Capacitación y soporte'
      ]
    },
    {
      title: 'Migraciones',
      description: 'Realizamos migraciones seguras de sistemas legados a tecnologías modernas sin pérdida de datos.',
      image: require('../assets/servicios-pics/migraciones.jpg'),
      link: '/servicios/migraciones',
      features: [
        'Migración de bases de datos',
        'Actualización de sistemas legados',
        'Transferencia de datos',
        'Optimización de rendimiento'
      ]
    },
    {
      title: 'Integración con IA',
      description: 'Incorporamos inteligencia artificial en tus aplicaciones para automatizar procesos y mejorar la toma de decisiones.',
      image: require('../assets/servicios-pics/integracion-ia.jpg'),
      link: '/servicios/integracion-ia',
      features: [
        'Chatbots y asistentes virtuales',
        'Análisis predictivo',
        'Procesamiento de lenguaje natural',
        'Visión por computadora'
      ]
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      number: 1,
      title: 'Consulta',
      description: 'Analizamos tus necesidades y objetivos de negocio.'
    },
    {
      number: 2,
      title: 'Propuesta',
      description: 'Diseñamos una solución personalizada y presentamos un presupuesto.'
    },
    {
      number: 3,
      title: 'Desarrollo',
      description: 'Implementamos la solución con metodologías ágiles.'
    },
    {
      number: 4,
      title: 'Pruebas',
      description: 'Realizamos pruebas exhaustivas para garantizar la calidad.'
    },
    {
      number: 5,
      title: 'Entrega',
      description: 'Implementamos la solución y proporcionamos capacitación.'
    }
  ];
  
  return (
    <ServicesContainer>
      <Helmet>
        <title>Servicios | Tecniweb Latam</title>
        <meta name="description" content="Descubre los servicios de desarrollo tecnológico que ofrece Tecniweb Latam: desarrollo web, aplicaciones móviles, software de escritorio, implementación, migraciones e integración con IA." />
        <meta name="keywords" content="servicios tecnológicos, desarrollo web, aplicaciones móviles, software de escritorio, implementación, migraciones, inteligencia artificial, Colombia, Funza" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Nuestros Servicios"
        subtitle="Soluciones tecnológicas a medida para impulsar tu negocio en la era digital"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Servicios', path: '/servicios' }
        ]} />
      </ContentWrapper>
      
      {/* Services Overview */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Servicios Tecnológicos</SectionTitle>
          <SectionDescription theme={theme}>
            En Tecniweb Latam ofrecemos una amplia gama de servicios tecnológicos diseñados para ayudar a tu empresa a crecer y adaptarse al mundo digital. 
            Nuestras soluciones son personalizadas y se adaptan a las necesidades específicas de cada cliente.
          </SectionDescription>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index} to={service.link} theme={theme}>
                <ServiceImage>
                  <img src={service.image} alt={service.title} />
                </ServiceImage>
                <ServiceContent>
                  <ServiceTitle theme={theme}>{service.title}</ServiceTitle>
                  <ServiceDescription theme={theme}>{service.description}</ServiceDescription>
                  <ServiceFeatures theme={theme}>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ServiceFeatures>
                  <ServiceButton theme={theme}>Ver detalles</ServiceButton>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Our Process */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestro Proceso</SectionTitle>
          <SectionDescription theme={theme}>
            Seguimos un proceso estructurado que garantiza el éxito de cada proyecto. 
            Desde la consulta inicial hasta la entrega final, trabajamos en estrecha colaboración con nuestros clientes.
          </SectionDescription>
          
          <ProcessSteps theme={theme}>
            {processSteps.map((step, index) => (
              <ProcessStep key={index}>
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
      
      {/* Technologies Section */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tecnologías que utilizamos</SectionTitle>
          <SectionDescription theme={theme}>
            En Tecniweb Latam nos mantenemos actualizados con las últimas tecnologías y frameworks para ofrecer soluciones modernas y eficientes. 
            Trabajamos con una amplia variedad de lenguajes de programación, bases de datos y herramientas de desarrollo, 
            lo que nos permite elegir la tecnología más adecuada para cada proyecto específico.
          </SectionDescription>
          
          {/* Tech Circle Animation */}
          <TechCircleAnimation />

        </ContentWrapper>
      </SectionContainer>
      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para comenzar tu proyecto?</SectionTitle>
          <SectionDescription theme={theme}>
            Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </ServicesContainer>
  );
};

export default Services;
