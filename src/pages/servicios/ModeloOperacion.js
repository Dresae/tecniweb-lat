import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import HeroBanner from '../../components/HeroBanner';
import Breadcrumbs from '../../components/Breadcrumb';
import ParallaxSection from '../../components/ParallaxSection';
import ContactForm from '../../components/ContactForm';
import GoogleCalendarButton from '../../components/GoogleCalendarButton';
import { FaCogs, FaUsers, FaChartLine, FaHeadset, FaClipboardCheck, FaLaptopCode } from 'react-icons/fa';

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

const ModelsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin: 40px 0;
`;

const ModelCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ModelIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme === 'light' ? 'rgba(33, 158, 188, 0.1)' : 'rgba(0, 119, 182, 0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  
  svg {
    font-size: 2rem;
    color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ModelTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ModelDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ModelFeaturesList = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
  columns: 2;
  
  @media (max-width: 768px) {
    columns: 1;
  }
  
  li {
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
    line-height: 1.6;
    
    &::marker {
      color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    }
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme === 'light' ? 'rgba(33, 158, 188, 0.1)' : 'rgba(0, 119, 182, 0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  
  svg {
    font-size: 1.8rem;
    color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
`;

const BenefitTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const BenefitDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  line-height: 1.5;
  font-size: 0.95rem;
`;

const TestimonialsContainer = styled.div`
  margin: 40px 0;
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const TestimonialQuote = styled.blockquote`
  font-style: italic;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '"';
    font-size: 3rem;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    position: absolute;
    left: -10px;
    top: -20px;
    opacity: 0.5;
  }
`;

const TestimonialAuthor = styled.div`
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h5`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const AuthorPosition = styled.p`
  color: ${props => props.theme === 'light' ? '#777' : '#999'};
  font-size: 0.9rem;
`;

const ModeloOperacion = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios1.webp'),
    require('../../assets/banner-pics/banner-servicios2.webp'),
    require('../../assets/banner-pics/banner-servicios5.webp')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaCogs />,
      title: 'Gestión de Infraestructura',
      description: 'Administración proactiva de servidores, redes, almacenamiento y sistemas operativos para garantizar disponibilidad y rendimiento.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Desarrollo y Mantenimiento',
      description: 'Equipos dedicados para el desarrollo continuo, mejoras y mantenimiento de tus aplicaciones y sistemas.'
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte Técnico',
      description: 'Asistencia técnica multinivel para resolver incidencias y problemas, con tiempos de respuesta garantizados por SLA.'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Gestión de Calidad',
      description: 'Procesos de control de calidad y testing para asegurar el correcto funcionamiento de los sistemas y aplicaciones.'
    },
    {
      icon: <FaChartLine />,
      title: 'Monitoreo y Optimización',
      description: 'Supervisión constante del rendimiento y disponibilidad de los sistemas con optimizaciones proactivas.'
    },
    {
      icon: <FaUsers />,
      title: 'Gestión de Cambios',
      description: 'Procesos estructurados para implementar cambios y actualizaciones de forma segura y controlada.'
    }
  ];
  
  // Models data
  const models = [
    {
      icon: <FaUsers />,
      title: 'Equipo Dedicado',
      description: 'Un equipo exclusivo de profesionales asignados a tu proyecto o empresa, trabajando como una extensión de tu departamento de TI.',
      features: [
        'Profesionales 100% dedicados a tu proyecto',
        'Conocimiento profundo de tu negocio y sistemas',
        'Mayor control sobre las prioridades y tareas',
        'Comunicación directa y fluida',
        'Adaptación a tus procesos y metodologías',
        'Escalabilidad según tus necesidades',
        'Ideal para proyectos complejos y a largo plazo'
      ]
    },
    {
      icon: <FaHeadset />,
      title: 'Servicio Compartido',
      description: 'Un modelo flexible donde los recursos se comparten entre varios clientes, optimizando costos sin sacrificar calidad.',
      features: [
        'Costos optimizados y predecibles',
        'Acceso a un amplio pool de especialistas',
        'Servicios basados en SLAs claramente definidos',
        'Flexibilidad para aumentar o reducir recursos',
        'Procesos estandarizados y mejores prácticas',
        'Ideal para servicios recurrentes como soporte técnico',
        'Perfecto para empresas con presupuestos ajustados'
      ]
    },
    {
      icon: <FaCogs />,
      title: 'Modelo Híbrido',
      description: 'Combinación de equipos dedicados y servicios compartidos para obtener lo mejor de ambos mundos según tus necesidades específicas.',
      features: [
        'Equilibrio óptimo entre costo y dedicación',
        'Equipo core dedicado + especialistas bajo demanda',
        'Flexibilidad para adaptar el modelo según evoluciona el proyecto',
        'Escalabilidad controlada',
        'Gestión eficiente de picos de demanda',
        'Ideal para proyectos con necesidades variables',
        'Perfecto para empresas en crecimiento'
      ]
    }
  ];
  
  // Benefits data
  const benefits = [
    {
      icon: <FaChartLine />,
      title: 'Reducción de Costos',
      description: 'Optimiza tu inversión en TI eliminando gastos de contratación, capacitación y rotación de personal.'
    },
    {
      icon: <FaUsers />,
      title: 'Acceso a Talento',
      description: 'Trabaja con especialistas altamente calificados sin las limitaciones geográficas o de mercado laboral.'
    },
    {
      icon: <FaCogs />,
      title: 'Enfoque en tu Core Business',
      description: 'Concentra tus recursos y esfuerzos en tu negocio principal mientras nosotros nos encargamos de la tecnología.'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Calidad Garantizada',
      description: 'Servicios respaldados por SLAs claros y métricas de rendimiento para asegurar resultados óptimos.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Escalabilidad',
      description: 'Ajusta fácilmente los recursos según las necesidades cambiantes de tu negocio sin complicaciones.'
    },
    {
      icon: <FaHeadset />,
      title: 'Continuidad Operativa',
      description: 'Mantén tus sistemas funcionando sin interrupciones gracias a nuestros procesos de respaldo y contingencia.'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "La implementación del modelo de operación de Tecniweb transformó nuestra área de TI. Pasamos de estar constantemente apagando incendios a tener una operación estable y predecible que realmente apoya nuestro crecimiento.",
      name: "Carlos Ramírez",
      position: "Jefe de Operaciones, Compañia Logistica"
    },
    {
      quote: "El equipo dedicado que Tecniweb asignó a nuestra empresa se integró perfectamente con nuestros procesos. Ahora tenemos acceso a talento especializado que antes no podíamos permitirnos contratar directamente.",
      name: "María Fernández",
      position: "Directora de Operaciones, Distribuidora Comercial"
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Modelo de Operación | Tecniweb Latam</title>
        <meta name="description" content="Servicios gestionados de TI con diferentes modelos de operación. Equipos dedicados, servicios compartidos o modelos híbridos adaptados a tus necesidades." />
        <meta name="keywords" content="modelo de operación, servicios gestionados, outsourcing TI, equipo dedicado, servicio compartido, modelo híbrido" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Modelo de Operación"
        subtitle="Servicios gestionados de TI con diferentes modelos adaptados a las necesidades de tu negocio"
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
              label: 'Integración con IA',
              path: '/servicios/modelo-operacion'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios Gestionados</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos servicios integrales de gestión de TI para que puedas enfocarte en tu negocio
            mientras nosotros nos encargamos de mantener tu infraestructura tecnológica funcionando de manera óptima.
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
      
      {/* Operation Models */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Modelos de Operación</SectionTitle>
          <SectionDescription theme={theme}>
            Ofrecemos diferentes modelos de operación para adaptarnos a las necesidades específicas de tu empresa,
            desde equipos completamente dedicados hasta servicios compartidos o modelos híbridos.
          </SectionDescription>
          
          <ModelsContainer>
            {models.map((model, index) => (
              <ModelCard key={index} theme={theme}>
                <ModelHeader>
                  <ModelIcon theme={theme}>
                    {model.icon}
                  </ModelIcon>
                  <ModelTitle theme={theme}>{model.title}</ModelTitle>
                </ModelHeader>
                <ModelDescription theme={theme}>{model.description}</ModelDescription>
                <ModelFeaturesList theme={theme}>
                  {model.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ModelFeaturesList>
              </ModelCard>
            ))}
          </ModelsContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Benefits */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Beneficios de Nuestro Modelo de Operación</SectionTitle>
          <SectionDescription theme={theme}>
            Descubre cómo nuestros servicios gestionados pueden ayudarte a optimizar recursos,
            mejorar la calidad de tus servicios de TI y enfocarte en el crecimiento de tu negocio.
          </SectionDescription>
          
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} theme={theme}>
                <BenefitIcon theme={theme}>
                  {benefit.icon}
                </BenefitIcon>
                <BenefitTitle theme={theme}>{benefit.title}</BenefitTitle>
                <BenefitDescription theme={theme}>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Process Parallax */}
      <ParallaxSection 
        title="Nuestro Proceso de Implementación"
        description="La transición a nuestro modelo de operación es un proceso estructurado y cuidadosamente planificado. Comenzamos con un análisis detallado de tu situación actual y necesidades específicas. Luego diseñamos el modelo de operación ideal y definimos los SLAs. Implementamos el modelo con una fase de transición gradual que minimiza riesgos. Finalmente, establecemos mecanismos de mejora continua para optimizar constantemente el servicio."
        image="../../assets/servicios-pics/modelo-operacion/proceso-implementacion.jpg"
        buttonText="Conoce más sobre nuestra metodología"
        buttonLink="/nosotros/metodologia"
      />
      
      {/* Testimonials */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Lo que Dicen Nuestros Clientes</SectionTitle>
          <SectionDescription theme={theme}>
            Empresas que han confiado en nuestros modelos de operación y han experimentado
            mejoras significativas en sus servicios de TI.
          </SectionDescription>
          
          <TestimonialsContainer>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} theme={theme}>
                <TestimonialQuote theme={theme}>
                  {testimonial.quote}
                </TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <AuthorName theme={theme}>{testimonial.name}</AuthorName>
                    <AuthorPosition theme={theme}>{testimonial.position}</AuthorPosition>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para optimizar tu operación de TI?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tus necesidades y te ayudaremos a diseñar el modelo de operación
            perfecto para tu empresa. Nuestro equipo está listo para brindarte una consultoría inicial sin compromiso.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default ModeloOperacion;
