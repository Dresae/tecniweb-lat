import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import HeroBanner from '../components/HeroBanner';
import Breadcrumbs from '../components/Breadcrumb';
import ProgressBar from '../components/ProgressBar';
import ParallaxSection from '../components/ParallaxSection';
import ContactForm from '../components/ContactForm';
import GoogleCalendarButton from '../components/GoogleCalendarButton';
import { FaUsers, FaLightbulb, FaRocket, FaHandshake, FaAward } from 'react-icons/fa';

const AboutUsContainer = styled.div`
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

const AboutContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin: 40px 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const AboutImage = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const AboutText = styled.div`
  flex: 1;
`;

const AboutTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const AboutParagraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const ValueCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme === 'light' ? 'rgba(33, 158, 188, 0.1)' : 'rgba(0, 119, 182, 0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  svg {
    font-size: 2rem;
    color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
`;

const ValueTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ValueDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#666' : '#bbb'};
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const TeamCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 80px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TeamImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  
  &.ai-agent-image {
    border-radius: 50%;
    width: 180px;
    height: 180px;
    margin: 10px auto;
    border: 3px solid #4a90e2;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TeamContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const TeamName = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const TeamPosition = styled.p`
  color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  font-weight: 500;
  margin-bottom: 15px;
`;

const TeamBio = styled.p`
  color: ${props => props.theme === 'light' ? '#666' : '#bbb'};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SkillsContainer = styled.div`
  margin: 40px 0;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &::before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin-bottom: 50px;
  width: 50%;
  
  &:nth-child(even) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
    left: 50%;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
    border-radius: 50%;
    top: 15px;
    right: -10px;
  }
  
  &:nth-child(even)::before {
    left: -10px;
    right: auto;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 60px;
    padding-right: 0;
    
    &:nth-child(even) {
      left: 0;
      padding-left: 60px;
    }
    
    &::before,
    &:nth-child(even)::before {
      left: 20px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const TimelineYear = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const TimelineTitle = styled.h4`
  font-family: 'Rubik', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? '#333' : '#eee'};
`;

const TimelineText = styled.p`
  color: ${props => props.theme === 'light' ? '#666' : '#bbb'};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const AboutUs = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../assets/banner-pics/banner-nosotros1.jpg'),
    require('../assets/banner-pics/banner-nosotros2.jpg'),
    require('../assets/banner-pics/banner-nosotros3.jpg'),
    require('../assets/banner-pics/banner-nosotros4.jpg'),
    require('../assets/banner-pics/banner-nosotros5.jpg')
  ];
  
  // Values data
  const values = [
    {
      icon: <FaUsers />,
      title: 'Enfoque en el Cliente',
      description: 'Priorizamos las necesidades de nuestros clientes, trabajando en estrecha colaboración para entender sus objetivos y ofrecer soluciones que superen sus expectativas.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovación',
      description: 'Nos mantenemos a la vanguardia de las tendencias tecnológicas, implementando soluciones innovadoras que impulsan el crecimiento y la eficiencia.'
    },
    {
      icon: <FaRocket />,
      title: 'Transparencia',
      description: 'Creemos firmemente que la honestidad y la claridad son fundamentales para construir relaciones duraderas y generar confianza tanto en nuestros clientes, socios y empleados.'
    },
    {
      icon: <FaHandshake />,
      title: 'Integridad',
      description: 'Actuamos con honestidad y transparencia en todas nuestras interacciones, construyendo relaciones de confianza duraderas con nuestros clientes y socios.'
    }
  ];
  
  // Team data
  const team = [
    {
      name: 'AIgent1',
      position: 'Coordinator AIgent',
      bio: 'Supervisa, gestiona, activa y desactiva los "AIgents" según las necesidades de la operación.',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIgent2',
      position: 'Creative AIgent',
      bio: 'Aprovecha los modelos entrenados de ML con contenidos multimedia creativos',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIgent3',
      position: 'Interactions AIgent',
      bio: 'Gestiona las actividades relacionadas con la atención al cliente',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIgent4',
      position: 'Marketing & Sales AIgent',
      bio: 'Crea contenido y realiza tareas relacionadas con las operaciones de ventas y marketing',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIEng0',
      position: 'Product Owner AIgent',
      bio: 'Agente de IA trabajando como Product Owner/Administrador de Proyectos en el equipo de ingeniería de software',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIEng1',
      position: 'Quality Assurance AIgent',
      bio: 'Agente de IA que trabaja en el control de calidad del equipo de ingeniería de software',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIEng2',
      position: 'User Interface/Experience AIgent',
      bio: 'Agente de IA trabajando como Diseñador de Interfaz de Usuario/Experiencia en el equipo de ingeniería de software',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIEng3',
      position: 'Database AIgent',
      bio: 'Agente de IA trabajando como Arquitecto e Ingeniero de Bases de Datos en el equipo de ingeniería de software',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'AIEng4',
      position: 'Software Engineering AIgent',
      bio: 'Agente de IA trabajando como Ingeniero de Software y Arquitecto en el equipo de ingeniería de software',
      image: require('../assets/nosotros-pics/nuestro-equipo/aigent-team.gif')
    },
    {
      name: 'Andy Amador',
      position: 'HARE - Human Ambassador of Relationships & CEO',
      bio: 'Representa la parte visible de la compañia, gestiona las relaciones con clientes y socios.',
      image: require('../assets/nosotros-pics/nuestro-equipo/andy-ceo.jpg')
    },
    {
      name: 'Vacante',
      position: 'HEVO - Human Experience Validation Officer',
      bio: 'Valida viabilidad y compatibilidad de los productos y servicios con la experiencia del usuario final',
      image: require('../assets/nosotros-pics/nuestro-equipo/vacancy-HEVO.jpg')
    },
    {
      name: 'Vacante',
      position: 'DAFO - Data Farming Officer',
      bio: 'Opera como granjero de datos para mejorar los productos y servicios de la compañia',
      image: require('../assets/nosotros-pics/nuestro-equipo/vacancy-DAFO.jpg')
    }
  ];
  
  // Skills data
  const skills = [
    { title: 'Desarrollo Web', percentage: 95 },
    { title: 'Aplicaciones Móviles', percentage: 90 },
    { title: 'Inteligencia Artificial', percentage: 85 },
    { title: 'Diseño UX/UI', percentage: 92 },
    { title: 'DevOps', percentage: 88 }
  ];
  
  // Timeline data
  const timeline = [
    {
      year: '2023',
      title: 'Fundación de Tecniweb Latam',
      text: 'Comenzamos como una pequeña consultora de desarrollo web'
    },
    {
      year: '2024',
      title: 'Expansión de Servicios',
      text: 'Incorporamos desarrollo de aplicaciones móviles y software de escritorio a nuestra oferta de servicios.'
    },
    {
      year: '2025',
      title: 'Integración de IA',
      text: 'Comenzamos a ofrecer soluciones con inteligencia artificial y aprendizaje automático.'
    }
  ];
  
  return (
    <AboutUsContainer>
      <Helmet>
        <title>Nosotros | Tecniweb Latam</title>
        <meta name="description" content="Conoce a Tecniweb Latam: nuestra historia, valores, equipo y trayectoria en el desarrollo de soluciones tecnológicas innovadoras desde 2015." />
        <meta name="keywords" content="Tecniweb Latam, equipo desarrollo, historia empresa tecnológica, valores corporativos, tecnología Colombia, Funza" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Nosotros"
        subtitle="Conoce quiénes somos, nuestra historia y el equipo detrás de Tecniweb Latam"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' }
        ]} />
      </ContentWrapper>
      
      {/* About Us Section */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Quiénes Somos</SectionTitle>
          <AboutContent>
            <AboutImage>
              <img src={require('../assets/nosotros-pics/nosotros.jpg')} theme={theme} alt="Equipo Tecniweb Latam" />
            </AboutImage>
            <AboutText>
              <AboutTitle theme={theme}>Nuestra Historia</AboutTitle>
              <AboutParagraph theme={theme}>
                Tecniweb Latam nació en 2023 con la visión de transformar la manera en que las empresas 
                latinoamericanas aprovechan la tecnología.
              </AboutParagraph>
              <AboutParagraph theme={theme}>
                Con el paso del tiempo hemos crecido hasta tener madurez en la industria, 
                expandiendo nuestros servicios para incluir desarrollo de aplicaciones móviles, software de escritorio, implementaciones 
                personalizadas y, más recientemente, soluciones con inteligencia artificial.
              </AboutParagraph>
              <AboutParagraph theme={theme}>
                Hoy contamos con un equipo hibrido de profesionales y agentes de IA que hacen posible nuestra misión de transformar 
                negocios a través de la tecnología de vanguardia.
              </AboutParagraph>
            </AboutText>
          </AboutContent>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Our Values */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Valores</SectionTitle>
          <SectionDescription theme={theme}>
            Estos son los principios que guían nuestro trabajo diario y definen nuestra cultura empresarial.
          </SectionDescription>
          
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index} theme={theme}>
                <ValueIcon theme={theme}>
                  {value.icon}
                </ValueIcon>
                <ValueTitle theme={theme}>{value.title}</ValueTitle>
                <ValueDescription theme={theme}>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Our Team */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestro Equipo</SectionTitle>
          <SectionDescription theme={theme}>
            Conoce a los profesionales y agentes de IA que hacen posible nuestra misión de transformar 
            negocios a través de la tecnología de vanguardia.
          </SectionDescription>
          
          <TeamGrid>
            {team.map((member, index) => (
              <TeamCard key={index} theme={theme}>
                <TeamImage className={member.name.includes('AIGent') || member.name.includes('AIGeng') ? 'ai-agent-image' : ''}>
                  <img src={member.image} alt={member.name} />
                </TeamImage>
                <TeamContent>
                  <TeamName theme={theme}>{member.name}</TeamName>
                  <TeamPosition theme={theme}>{member.position}</TeamPosition>
                  <TeamBio theme={theme}>{member.bio}</TeamBio>
                </TeamContent>
              </TeamCard>
            ))}
          </TeamGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Our Skills */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestras Competencias</SectionTitle>
          <SectionDescription theme={theme}>
            Estas son las áreas en las que nos especializamos, respaldadas por años de experiencia 
            y constante actualización.
          </SectionDescription>
          
          <SkillsContainer>
            {skills.map((skill, index) => (
              <ProgressBar 
                key={index}
                title={skill.title}
                percentage={skill.percentage}
                startLabel="Básico"
                endLabel="Experto"
              />
            ))}
          </SkillsContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Mission & Vision Parallax */}
      <ParallaxSection 
        title="Misión y Visión"
        description="Nuestra misión es transformar ideas en soluciones tecnológicas innovadoras que impulsen el crecimiento y la eficiencia de nuestros clientes. Nuestra visión es ser reconocidos como líderes en el desarrollo de software en Latinoamérica, destacándonos por nuestra excelencia técnica, enfoque centrado en el cliente y contribución al avance tecnológico de la región."
        image={require('../assets/nosotros-pics/vision-horizon.gif')}
        theme={theme}
        alt="Nuestra Visión"
        buttonText="Por qué elegirnos"
        buttonLink="/nosotros/porque-escogernos"
        useBackgroundImage={true}
      />
      
      {/* Our History Timeline */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestra Trayectoria</SectionTitle>
          <SectionDescription theme={theme}>
            Un vistazo a los momentos clave que han definido nuestra historia y crecimiento.
          </SectionDescription>
          
          <TimelineContainer theme={theme}>
            {timeline.map((item, index) => (
              <TimelineItem key={index} theme={theme}>
                <TimelineContent theme={theme}>
                  <TimelineYear theme={theme}>{item.year}</TimelineYear>
                  <TimelineTitle theme={theme}>{item.title}</TimelineTitle>
                  <TimelineText theme={theme}>{item.text}</TimelineText>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Contact Form */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Quieres formar parte de nuestro equipo?</SectionTitle>
          <SectionDescription theme={theme}>
            Estamos siempre en búsqueda de talento apasionado por la tecnología. Contáctanos para conocer las oportunidades disponibles.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
