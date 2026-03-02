import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import HeroBanner from '../../components/HeroBanner';
import Breadcrumbs from '../../components/Breadcrumb';
import ParallaxSection from '../../components/ParallaxSection';
import ProcessSection from '../../components/ProcessSection';
import ContactForm from '../../components/ContactForm';
import GoogleCalendarButton from '../../components/GoogleCalendarButton';
import { FaRobot, FaBrain, FaChartLine, FaComments, FaSearch, FaCode } from 'react-icons/fa';

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

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const UseCaseCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const UseCaseImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${UseCaseCard}:hover & img {
    transform: scale(1.05);
  }
`;

const UseCaseContent = styled.div`
  padding: 20px;
`;

const UseCaseTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const UseCaseDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 15px;
  line-height: 1.6;
`;

// Styled components for the creative focus items layout
const FocusItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 40px 0;
`;

const FocusItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 26, 26, 0.8)'};
  border-radius: 70px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  transform-origin: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const FocusItemContent = styled.div`
  flex: 1;
`;

const FocusItemTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
  
  @media (max-width: 768px) {
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FocusItemDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  line-height: 1.7;
  font-size: 1.05rem;
`;

const FocusItemImage = styled.div`
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: ${props => props.theme === 'light' ? 'none' : 'brightness(0.9) contrast(1.1)'};
    animation: bounce 3s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 0 auto 20px;
  }
`;

const IntegracionIA = () => {
  const { theme } = useTheme();
  
  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-servicios4.jpg'),
    require('../../assets/banner-pics/banner-servicios2.webp'),
    require('../../assets/banner-pics/banner-servicios3.jpg'),
    require('../../assets/banner-pics/banner-servicios4.jpg')
  ];
  
  // Features data
  const features = [
    {
      icon: <FaRobot />,
      title: 'Chatbots Inteligentes',
      description: 'Implementación de asistentes virtuales y chatbots con IA para atención al cliente 24/7, aumentando la satisfacción y reduciendo costos operativos.'
    },
    {
      icon: <FaBrain />,
      title: 'Machine Learning',
      description: 'Desarrollo de modelos de aprendizaje automático para análisis predictivo, segmentación de clientes y detección de patrones en grandes volúmenes de datos.'
    },
    {
      icon: <FaChartLine />,
      title: 'Análisis Predictivo',
      description: 'Implementación de soluciones que anticipan tendencias, comportamientos y resultados basados en datos históricos para toma de decisiones informadas.'
    },
    {
      icon: <FaComments />,
      title: 'Procesamiento de Lenguaje Natural',
      description: 'Integración de tecnologías NLP para análisis de sentimiento, extracción de información y automatización de procesos basados en texto.'
    },
    {
      icon: <FaSearch />,
      title: 'Visión por Computadora',
      description: 'Desarrollo de sistemas de reconocimiento de imágenes y video para automatización de procesos, control de calidad y seguridad.'
    },
    {
      icon: <FaCode />,
      title: 'APIs de IA',
      description: 'Integración de APIs de inteligencia artificial de terceros como OpenAI, Google Cloud AI o Azure Cognitive Services en tus aplicaciones existentes.'
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      number: 1,
      title: 'Evaluación de Necesidades',
      description: 'Analizamos tus procesos actuales e identificamos oportunidades donde la IA puede generar mayor valor para tu negocio.'
    },
    {
      number: 2,
      title: 'Definición de Objetivos',
      description: 'Establecemos métricas claras y resultados esperados para cada proyecto de integración de IA, alineados con tus objetivos de negocio.'
    },
    {
      number: 3,
      title: 'Selección de Tecnologías',
      description: 'Elegimos las tecnologías y frameworks de IA más adecuados para tu caso específico, considerando escalabilidad, mantenimiento y costos.'
    },
    {
      number: 4,
      title: 'Desarrollo e Integración',
      description: 'Implementamos la solución de IA y la integramos con tus sistemas existentes, asegurando una transición fluida y sin interrupciones.'
    },
    {
      number: 5,
      title: 'Entrenamiento y Ajuste',
      description: 'Entrenamos los modelos con tus datos específicos y realizamos ajustes para maximizar la precisión y relevancia de los resultados.'
    },
    {
      number: 6,
      title: 'Pruebas y Validación',
      description: 'Realizamos pruebas exhaustivas para verificar el rendimiento, precisión y robustez de la solución en diferentes escenarios.'
    },
    {
      number: 7,
      title: 'Despliegue y Monitoreo',
      description: 'Implementamos la solución en producción y establecemos sistemas de monitoreo continuo para asegurar su correcto funcionamiento y mejora constante.'
    }
  ];
  
  // Use cases data
  const useCases = [
    {
      title: 'Atención al Cliente Automatizada',
      description: 'Chatbot inteligente que resuelve consultas frecuentes, reduce tiempos de espera y escala el soporte sin aumentar costos.',
      image: require('../../assets/servicios-pics/integracion-ia/customer-service-ai.png')
    },
    {
      title: 'Análisis Predictivo de Ventas',
      description: 'Sistema de IA que analiza patrones históricos para predecir tendencias de ventas y optimizar inventario y recursos.',
      image: require('../../assets/servicios-pics/integracion-ia/forecasting.jpg')
    },
    {
      title: 'Automatización de Procesos Documentales',
      description: 'Solución de extracción inteligente de datos que procesa documentos y formularios, reduciendo errores y tiempos de procesamiento.',
      image: require('../../assets/servicios-pics/integracion-ia/automation.jpg')
    }
  ];
  
  // Development focus data
  const developmentFocus = [
    {
      title: 'Desarrollo Motores De Procesamiento De Texto',
      description: 'Creamos motores especializados para análisis y procesamiento de texto que permiten extraer información valiosa de documentos, emails y comunicaciones, optimizando la gestión documental y el análisis de datos no estructurados.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    },
    {
      title: 'Implementación de Motores Multimodales',
      description: 'Desarrollamos soluciones que combinan procesamiento de texto, imágenes y audio en un solo sistema inteligente, permitiendo análisis más completos y precisos para aplicaciones complejas.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    },
    {
      title: 'Integración De Tecnología RAG e IA',
      description: 'Implementamos sistemas de Retrieval Augmented Generation (RAG) que combinan bases de conocimiento propias con modelos de IA para generar respuestas precisas y contextualizadas a consultas específicas de tu negocio.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    },
    {
      title: 'Visión Computarizada En La Gestión de Activos Físicos y RH',
      description: 'Aplicamos tecnologías de visión artificial para monitoreo de activos físicos, control de acceso, seguimiento de inventario y optimización de recursos humanos mediante reconocimiento facial y análisis de comportamiento.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    },
    {
      title: 'Despliegue de Modelos Privados On-Premise y En Nube Pública (GCP)',
      description: 'Ofrecemos soluciones para implementar modelos de IA en tu infraestructura local o en Google Cloud Platform, garantizando seguridad, privacidad y control total sobre tus datos y algoritmos.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    },
    {
      title: 'Automatización De Tareas y Gestión Autónoma Por IA',
      description: 'Desarrollamos sistemas inteligentes que automatizan flujos de trabajo completos, toman decisiones basadas en datos y optimizan procesos sin intervención humana, aumentando eficiencia y reduciendo costos operativos.',
      image: require('../../assets/servicios-pics/integracion-ia/creative-hand.png')
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Integración con IA | Tecniweb Latam</title>
        <meta name="description" content="Servicios de integración de Inteligencia Artificial para empresas. Implementamos soluciones de IA personalizadas que transforman datos en valor para tu negocio." />
        <meta name="keywords" content="inteligencia artificial, machine learning, chatbots, análisis predictivo, procesamiento de lenguaje natural, visión por computadora" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Integración con IA"
        subtitle="Potencia tu negocio con soluciones de Inteligencia Artificial personalizadas"
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
              path: '/servicios/integracion-ia'
            }
          ]} />
      </ContentWrapper>
      
      {/* Main Features */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestros Servicios de Integración con IA</SectionTitle>
          <SectionDescription theme={theme}>
            Transformamos tu negocio con soluciones de Inteligencia Artificial que automatizan procesos,
            generan insights valiosos y mejoran la experiencia de tus clientes.
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
          <SectionTitle theme={theme}>Nuestro Proceso de Integración</SectionTitle>
          <SectionDescription theme={theme}>
            Seguimos una metodología estructurada para implementar soluciones de IA que generan
            valor real y medible para tu negocio, con un enfoque práctico y orientado a resultados.
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
          <SectionTitle theme={theme}>¿Por qué Integrar IA en tu Negocio?</SectionTitle>
          <SectionDescription theme={theme}>
            Comparativa entre negocios tradicionales y negocios potenciados con Inteligencia Artificial
          </SectionDescription>
          
          <ComparisonContainer>
            <ComparisonCard theme={theme}>
              <h3>Negocios Tradicionales</h3>
              <ComparisonList theme={theme}>
                <li>Decisiones basadas en intuición o datos limitados</li>
                <li>Procesos manuales propensos a errores</li>
                <li>Atención al cliente limitada por horarios y personal</li>
                <li>Dificultad para escalar operaciones</li>
                <li>Análisis de datos reactivo y retrospectivo</li>
                <li>Personalización limitada de productos y servicios</li>
                <li>Detección tardía de problemas y oportunidades</li>
              </ComparisonList>
            </ComparisonCard>
            
            <ComparisonCard theme={theme}>
              <h3>Negocios con IA</h3>
              <ComparisonList theme={theme}>
                <li>Decisiones basadas en análisis avanzado de datos</li>
                <li>Automatización inteligente de procesos repetitivos</li>
                <li>Atención al cliente 24/7 con chatbots y asistentes virtuales</li>
                <li>Escalabilidad eficiente de operaciones</li>
                <li>Análisis predictivo y proactivo</li>
                <li>Hiperpersonalización de experiencias y ofertas</li>
                <li>Detección temprana de patrones, riesgos y oportunidades</li>
              </ComparisonList>
            </ComparisonCard>
          </ComparisonContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Use Cases */}
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Casos de Uso</SectionTitle>
          <SectionDescription theme={theme}>
            Descubre cómo nuestras soluciones de IA están transformando negocios en diferentes industrias.
          </SectionDescription>
          
          <UseCasesGrid>
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} theme={theme}>
                <UseCaseImage>
                  <img src={useCase.image} alt={useCase.title} />
                </UseCaseImage>
                <UseCaseContent>
                  <UseCaseTitle theme={theme}>{useCase.title}</UseCaseTitle>
                  <UseCaseDescription theme={theme}>{useCase.description}</UseCaseDescription>
                </UseCaseContent>
              </UseCaseCard>
            ))}
          </UseCasesGrid>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Development Focus - Creative Animation */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Nuestro Enfoque de Desarrollo</SectionTitle>
          <SectionDescription theme={theme}>
            Tecnologías avanzadas y metodologías innovadoras que aplicamos en nuestros proyectos de integración con IA.
          </SectionDescription>
          
          <FocusItemsContainer>
            {developmentFocus.map((item, index) => (
              <FocusItem 
                key={index} 
                theme={theme}
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: index * 0.15 
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <FocusItemContent>
                  <FocusItemTitle theme={theme}>{item.title}</FocusItemTitle>
                  <FocusItemDescription theme={theme}>{item.description}</FocusItemDescription>
                </FocusItemContent>
                <FocusItemImage>
                  <img src={item.image} alt={item.title} />
                </FocusItemImage>
              </FocusItem>
            ))}
          </FocusItemsContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Benefits Section */}
      <ProcessSection 
        title="Beneficios de la Integración con IA"
        description="La implementación estratégica de Inteligencia Artificial en tu negocio no solo optimiza procesos y reduce costos, sino que también desbloquea nuevas oportunidades de crecimiento, mejora la experiencia del cliente y te proporciona ventajas competitivas sostenibles en un mercado cada vez más digital y orientado a datos."
        backgroundImage={require('../../assets/servicios-pics/migraciones/migracion-profesional.jpg')}
        buttonText="Conoce más sobre nuestro enfoque"
        buttonLink="/nosotros/metodologia"
      />
      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Listo para potenciar tu negocio con IA?</SectionTitle>
          <SectionDescription theme={theme}>
            Cuéntanos sobre tu proyecto y te ayudaremos a identificar las mejores oportunidades
            para integrar Inteligencia Artificial en tu negocio.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default IntegracionIA;
