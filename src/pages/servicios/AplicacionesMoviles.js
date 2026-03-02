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
import { FaMobile, FaTabletAlt, FaCode, FaRocket, FaShieldAlt, FaSync } from 'react-icons/fa';

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

const AppTypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AppTypeCard = styled.div`
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

const AppTypeList = styled.ul`
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

const AplicacionesMoviles = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios1.webp'),
    require('../../assets/banner-pics/banner-servicios3.jpg'),
    require('../../assets/banner-pics/banner-servicios4.jpg')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaMobile />,
      title: 'Aplicaciones Nativas',
      description: 'Desarrollo de aplicaciones nativas para iOS y Android con rendimiento optimizado y experiencia de usuario excepcional.'
    },
    {
      icon: <FaTabletAlt />,
      title: 'Aplicaciones Híbridas',
      description: 'Soluciones multiplataforma que funcionan en iOS y Android con un único código base, reduciendo costos y tiempo de desarrollo.'
    },
    {
      icon: <FaCode />,
      title: 'UI/UX Móvil',
      description: 'Diseño de interfaces intuitivas y atractivas siguiendo las últimas tendencias y guías de diseño para aplicaciones móviles.'
    },
    {
      icon: <FaRocket />,
      title: 'Optimización de Rendimiento',
      description: 'Aplicaciones rápidas y eficientes con tiempos de carga mínimos y uso optimizado de recursos del dispositivo.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Seguridad Móvil',
      description: 'Implementación de las mejores prácticas de seguridad para proteger datos sensibles y prevenir vulnerabilidades.'
    },
    {
      icon: <FaSync />,
      title: 'Mantenimiento y Actualizaciones',
      description: 'Soporte continuo, actualizaciones periódicas y adaptación a nuevas versiones de sistemas operativos.'
    }
  ];
    
  return (
    <PageContainer>
      <Helmet>
        <title>Aplicaciones Móviles | Tecniweb Latam</title>
        <meta name="description" content="Desarrollo de aplicaciones móviles nativas e híbridas para iOS y Android. Creamos apps intuitivas, rápidas y seguras que impulsan tu negocio." />
        <meta name="keywords" content="aplicaciones móviles, desarrollo de apps, iOS, Android, React Native, Flutter, apps nativas, apps híbridas" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Aplicaciones Móviles"
        subtitle="Soluciones móviles innovadoras que conectan con tus usuarios y potencian tu negocio"
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
              label: 'Aplicaciones Móviles',
              path: '/servicios/aplicaciones-moviles'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Desarrollo Móvil</SectionTitle>
          <SectionDescription theme={theme}>
            Creamos aplicaciones móviles innovadoras que ofrecen experiencias excepcionales a los usuarios.
            Nuestras soluciones están diseñadas para ayudarte a conectar con tu audiencia y alcanzar tus objetivos de negocio.
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
      
      {/* App Types */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tipos de Aplicaciones</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos diferentes enfoques de desarrollo según tus necesidades específicas,
            presupuesto y objetivos de negocio.
          </SectionDescription>
          
          <AppTypesContainer>
            <AppTypeCard theme={theme}>
              <h3>
                <FaMobile />
                Aplicaciones Nativas
              </h3>
              <p>Desarrolladas específicamente para iOS (Swift) o Android (Kotlin), ofrecen:</p>
              <AppTypeList theme={theme}>
                <li>Máximo rendimiento y velocidad</li>
                <li>Acceso completo a las funcionalidades del dispositivo</li>
                <li>Mejor experiencia de usuario</li>
                <li>Integración perfecta con el sistema operativo</li>
                <li>Mayor seguridad y estabilidad</li>
              </AppTypeList>
              <p>Ideales para aplicaciones complejas que requieren alto rendimiento y acceso a características específicas del dispositivo.</p>
            </AppTypeCard>
            
            <AppTypeCard theme={theme}>
              <h3>
                <FaTabletAlt />
                Aplicaciones Híbridas
              </h3>
              <p>Desarrolladas con tecnologías como React Native o Flutter, ofrecen:</p>
              <AppTypeList theme={theme}>
                <li>Desarrollo más rápido y económico</li>
                <li>Un único código base para iOS y Android</li>
                <li>Actualizaciones más sencillas</li>
                <li>Buen rendimiento para la mayoría de casos de uso</li>
                <li>Experiencia similar a las apps nativas</li>
              </AppTypeList>
              <p>Ideales para startups, MVP (Producto Mínimo Viable) o aplicaciones que necesitan llegar rápidamente al mercado con presupuesto limitado.</p>
            </AppTypeCard>
          </AppTypesContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Technologies */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Tecnologías que Utilizamos</SectionTitle>
          <SectionDescription>
            Trabajamos con las tecnologías más modernas y robustas del mercado para garantizar aplicaciones móviles
            de alta calidad, escalables y mantenibles a largo plazo.
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
          description="Seguimos una metodología ágil que garantiza transparencia, comunicación constante y resultados de alta calidad. Comenzamos con un análisis detallado de tus necesidades y la definición de la experiencia de usuario. Luego, nuestro equipo de diseño y desarrollo implementa la solución con ciclos iterativos de feedback. Finalmente, realizamos pruebas exhaustivas antes del lanzamiento en las tiendas de aplicaciones y ofrecemos soporte continuo."
          backgroundImage={require('../../assets/servicios-pics/desarrollo-web/nuestro-proces-bg.jpg')}
          buttonText="Conoce nuestra metodología"
          buttonLink="/nosotros/metodologia"
        />
      </div>
            
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para crear tu aplicación móvil?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto y te ayudaremos a convertirlo en realidad. Nuestro equipo está listo para crear
            la solución móvil perfecta para tu negocio.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default AplicacionesMoviles;
