import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import HeroBanner from '../components/HeroBanner';
import ParallaxSection from '../components/ParallaxSection';
import ContactForm from '../components/ContactForm';
import GoogleCalendarButton from '../components/GoogleCalendarButton';
import FAQ from '../components/FAQ';
import GoogleMapsContainer from '../components/GoogleMapsContainer';

const PageContainer = styled.div`
  width: 100%;
`;

const PageSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  
  &.section-alternate {
    background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
  }
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeading = styled.h2`
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

const ServicesCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCardContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 80px 5px 80px 5px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceCardImageWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ServiceCardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

const ServiceCardBody = styled.div`
  padding: 20px;
`;

const ServiceCardHeading = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ServiceCardText = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 15px;
  line-height: 1.6;
`;

const ServiceCardLink = styled.a`
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

const StatsSection = styled.div`
  background-image: url(${require('../assets/home-pics/home-tecniweb-numeros.webp')});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 60px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(18, 18, 18, 0.5)'};
  }
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const StatsContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 40px 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(26, 26, 26, 0.8)'
  };
  border-radius: 100px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StatCardValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const StatCardLabel = styled.div`
  font-family: 'Rubik', sans-serif;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const Home = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../assets/banner-pics/banner-inicio1.webp'),
    require('../assets/banner-pics/banner-inicio2.png'),
    require('../assets/banner-pics/banner-inicio3.webp'),
    require('../assets/banner-pics/banner-inicio4.webp')
  ];
  
  // Services data
  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos sitios web y aplicaciones web personalizadas con diseño responsive y experiencia de usuario excepcional.',
      image: require('../assets/home-pics/home-desarrollo-web.webp'),
      link: '/servicios/desarrollo-web'
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android con interfaces intuitivas y alto rendimiento.',
      image: require('../assets/home-pics/home-app-moviles.webp'),
      link: '/servicios/aplicaciones-moviles'
    },
    {
      title: 'Software de Escritorio',
      description: 'Diseñamos soluciones de software a medida para optimizar los procesos internos de tu empresa.',
      image: require('../assets/home-pics/home-soft-escritorio.webp'),
      link: '/servicios/software-escritorio'
    },
    {
      title: 'Implementación y Customización',
      description: 'Adaptamos e implementamos soluciones existentes para satisfacer tus necesidades específicas.',
      image: require('../assets/home-pics/home-implementacion.jpg'),
      link: '/servicios/implementacion-customizacion'
    },
    {
      title: 'Migraciones',
      description: 'Realizamos migraciones seguras de sistemas legados a tecnologías modernas sin pérdida de datos.',
      image: require('../assets/home-pics/home-migraciones.jpg'),
      link: '/servicios/migraciones'
    },
    {
      title: 'Integración con IA',
      description: 'Incorporamos inteligencia artificial en tus aplicaciones para automatizar procesos y mejorar la toma de decisiones.',
      image: require('../assets/home-pics/home-integracion-ia.jpg'),
      link: '/servicios/integracion-ia'
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Tecniweb Latam | Tu Aliado en Transformación Digital</title>
        <meta name="description" content="Tecniweb Latam es tu aliado en transformación digital. Ofrecemos servicios de desarrollo web, aplicaciones móviles, software de escritorio y soluciones tecnológicas personalizadas." />
        <meta name="keywords" content="desarrollo web, aplicaciones móviles, software de escritorio, transformación digital, tecnología, Latinoamérica, Colombia, Funza" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}

        subtitle="Tu Aliado en Transformación Digital"
      />
      
      {/* Services Section */}
      <PageSection theme={theme}>
        <SectionContent>
          <SectionHeading theme={theme}>Nuestros Servicios</SectionHeading>
          <ServicesCardGrid>
            {services.map((service, index) => (
              <ServiceCardContainer key={index} theme={theme}>
                <ServiceCardImageWrapper>
                  <img src={service.image} alt={service.title} />
                </ServiceCardImageWrapper>
                <ServiceCardBody>
                  <ServiceCardHeading theme={theme}>{service.title}</ServiceCardHeading>
                  <ServiceCardText theme={theme}>{service.description}</ServiceCardText>
                  <ServiceCardLink href={service.link} theme={theme}>Ver más</ServiceCardLink>
                </ServiceCardBody>
              </ServiceCardContainer>
            ))}
          </ServicesCardGrid>
        </SectionContent>
      </PageSection>
      
      {/* About Us Parallax */}
      <ParallaxSection 
        title="Quiénes Somos"
        description="Tecniweb Latam es una empresa de desarrollo de software que desde 2023 se ha especializado en crear soluciones tecnológicas innovadoras que ayudan a empresas de todos los tamaños a transformar sus operaciones y mejorar su presencia digital. Nuestro equipo está formado por desarrolladores consultores apasionados por la tecnología y agentes de IA comprometidos con la excelencia."
        image={require('../assets/home-pics/home-quienes-somos.gif')}
        buttonText="Conoce más sobre nosotros"
        buttonLink="/nosotros"
      />
      
      {/* Stats Section */}
      <StatsSection theme={theme}>
        <StatsContent>
          <SectionHeading theme={theme}>Tecniweb Latam en Números</SectionHeading>
          <StatsGrid>
            <StatCard theme={theme}>
              <StatCardValue theme={theme}>50+</StatCardValue>
              <StatCardLabel theme={theme}>Proyectos Completados</StatCardLabel>
            </StatCard>
            <StatCard theme={theme}>
              <StatCardValue theme={theme}>95%</StatCardValue>
              <StatCardLabel theme={theme}>Clientes Satisfechos</StatCardLabel>
            </StatCard>
            <StatCard theme={theme}>
              <StatCardValue theme={theme}>4+</StatCardValue>
              <StatCardLabel theme={theme}>Años de Experiencia</StatCardLabel>
            </StatCard>
            <StatCard theme={theme}>
              <StatCardValue theme={theme}>10+</StatCardValue>
              <StatCardLabel theme={theme}>Profesionales</StatCardLabel>
            </StatCard>
          </StatsGrid>
        </StatsContent>
      </StatsSection>
      
      {/* Why Choose Us Parallax */}
      <ParallaxSection 
        title="¿Por qué elegirnos?"
        description="En Tecniweb Latam nos destacamos por nuestro enfoque personalizado, metodología ágil y compromiso con la calidad. Entendemos que cada negocio es único, por eso desarrollamos soluciones a medida que se adaptan perfectamente a tus necesidades. Nuestro equipo multidisciplinario trabaja en estrecha colaboración contigo para garantizar que cada proyecto cumpla y supere tus expectativas."
        image={require('../assets/home-pics/home-porque-elegirnos.jpg')}
        buttonText="Descubre nuestras ventajas"
        buttonLink="/nosotros/porque-escogernos"
        imageOnRight={true}
      />
      
      {/* FAQ Section */}
      <PageSection className="section-alternate" theme={theme}>
        <SectionContent>
          
          <FAQ />
        </SectionContent>
      </PageSection>
      
      {/* Contact Form */}
      <PageSection theme={theme}>
        <SectionContent>
          <SectionHeading theme={theme}>Contáctanos</SectionHeading>
          <ContactForm />
          <GoogleCalendarButton />
        </SectionContent>
      </PageSection>
      
      {/* Google Maps */}
      <PageSection className="section-alternate" theme={theme}>
        <SectionContent>
          <GoogleMapsContainer />
        </SectionContent>
      </PageSection>
    </PageContainer>
  );
};

export default Home;
