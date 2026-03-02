import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner';
import Breadcrumb from '../../components/Breadcrumb';
import ContactForm from '../../components/ContactForm';
import GoogleCalendarButton from '../../components/GoogleCalendarButton';
import { useTheme } from '../../context/ThemeContext';

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

const SectionContainer = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const IntroSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
`;

const AccordionContainer = styled.div`
  margin: 40px 0;
`;

const AccordionItem = styled.div`
  margin-bottom: 15px;
  border-radius: 40px 40px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background-color: ${props => props.active ? 
    (props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)') : 
    (props.theme === 'light' ? 'white' : '#2a2a2a')};
  transition: background-color 0.3s ease;
  
  h3 {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    color: ${props => props.active ? 
      'white' : 
      (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)')};
    transition: color 0.3s ease;
  }
`;

const ToggleIcon = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.active ? 
    'white' : 
    (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)')};
`;

const AccordionContent = styled.div`
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  
  ${props => props.active && `
    padding: 20px;
    max-height: 1000px;
  `}
  
  p {
    margin: 0;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
  }
`;

const TestimonialsSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#222'};
`;

const TestimonialsTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#2a2a2a'};
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialContent = styled.div`
  margin-bottom: 20px;
  
  p {
    font-style: italic;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
    
    &::before, &::after {
      content: '"';
      color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const TestimonialAuthor = styled.div`
  h4 {
    margin: 0 0 5px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${props => props.theme === 'light' ? '#777' : '#999'};
  }
`;

const ContactSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? '#f0f0f0' : '#1a1a1a'};
`;

const ContactIntro = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
`;

const PorqueEscogernos = () => {
  const { theme } = useTheme();
  const [activeReason, setActiveReason] = useState(null);
  
  const toggleReason = (index) => {
    setActiveReason(activeReason === index ? null : index);
  };
  
  const reasons = [
    {
      title: "Experiencia y Conocimiento Técnico",
      content: "Nuestro equipo está formado por desarrolladores y agentes de IA con solidos fundamentos para el desarrollo de tecnologia en una amplia gama de tecnologías, manteniendonos constantemente actualizados con las últimas tendencias y herramientas del mercado. Esta experiencia nos permite abordar proyectos complejos con confianza y ofrecer soluciones robustas y escalables que realmente satisfacen las necesidades de nuestros clientes."
    },
    {
      title: "Metodología Transparente por Etapas",
      content: "A diferencia de otras empresas que requieren pagos completos por adelantado o utilizan metodologías opacas, en Tecniweb Latam trabajamos con un modelo de desarrollo por etapas con pagos progresivos. Esto significa que solo pagas por el trabajo completado y verificado, reduciendo significativamente el riesgo para tu empresa. Cada etapa tiene entregables claros y medibles, lo que te permite ver el progreso real de tu inversión."
    },
    {
      title: "Enfoque en Resultados de Negocio",
      content: "No nos limitamos a escribir código; nos enfocamos en entender tus objetivos de negocio y crear soluciones que generen un impacto real en tu operación. Cada decisión técnica está alineada con tus metas comerciales, asegurando que la tecnología sea un facilitador de tu crecimiento y no solo un gasto. Nuestro éxito se mide por el valor que aportamos a tu negocio, no por las horas facturadas."
    },
    {
      title: "Integración de Inteligencia Artificial",
      content: "Somos pioneros en la integración de tecnologías de inteligencia artificial en soluciones empresariales en Latinoamérica. Desde chatbots inteligentes hasta sistemas de análisis predictivo, sabemos cómo aprovechar el poder de la IA para automatizar procesos, mejorar la toma de decisiones y crear experiencias personalizadas para tus usuarios. Esto te da una ventaja competitiva significativa en un mercado cada vez más digital."
    },
    {
      title: "Soporte y Acompañamiento Continuo",
      content: "Nuestra relación no termina con la entrega del proyecto. Ofrecemos planes de soporte y mantenimiento adaptados a tus necesidades, asegurando que tu solución siga funcionando de manera óptima y evolucionando con tu negocio. Además, proporcionamos capacitación completa a tu equipo para maximizar el aprovechamiento de las herramientas desarrolladas."
    },
    {
      title: "Soluciones Escalables y Adaptables",
      content: "Diseñamos nuestras soluciones pensando en el futuro. Utilizamos arquitecturas modulares y tecnologías escalables que pueden crecer con tu negocio sin necesidad de reemplazar sistemas completos. Esto protege tu inversión a largo plazo y te permite adaptarte rápidamente a nuevas oportunidades o desafíos del mercado."
    },
    {
      title: "Compromiso con la Excelencia",
      content: "La calidad no es negociable en Tecniweb Latam. Implementamos rigurosos procesos de control de calidad en cada fase del desarrollo, desde la planificación hasta las pruebas finales. Utilizamos metodologías de integración y entrega continuas para detectar y corregir problemas tempranamente, garantizando un producto final robusto y libre de errores que cumple o supera tus expectativas."
    }
  ];
  
  return (
    <PageContainer>
      <Helmet>
        <title>Por Qué Elegirnos | Tecniweb Latam</title>
        <meta name="description" content="Descubre por qué Tecniweb Latam es la mejor opción para tu proyecto tecnológico. Experiencia, metodología transparente, enfoque en resultados y más." />
        <meta name="keywords" content="por qué elegirnos, ventajas, beneficios, desarrollo web, aplicaciones móviles, Tecniweb Latam" />
      </Helmet>
      
      <Breadcrumb items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' },
          { label: 'Por qué Escogernos', path: '/nosotros/porque-escogernos' }
        ]} 
      />
      
      <Banner 
        images={[
          require('../../assets/banner-pics/banner-nosotros1.jpg'),
          require('../../assets/banner-pics/banner-nosotros2.jpg'),
          require('../../assets/banner-pics/banner-nosotros3.jpg'),
          require('../../assets/banner-pics/banner-nosotros4.jpg'),
          require('../../assets/banner-pics/banner-nosotros5.jpg')
        ]}
        title="¿Por Qué Elegir a Tecniweb Latam?"
        subtitle="Descubre lo que nos diferencia en el mercado tecnológico"
      />
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <IntroSection>
            <SectionTitle theme={theme}>7 Razones para Elegirnos como tu Aliado Tecnológico</SectionTitle>
            <SectionDescription theme={theme}>
              En un mercado saturado de proveedores de servicios tecnológicos, 
              Tecniweb Latam se destaca por ofrecer un enfoque diferente, centrado 
              en la transparencia, la calidad y los resultados tangibles para tu negocio.
            </SectionDescription>
          </IntroSection>
          
          <AccordionContainer>
            {reasons.map((reason, index) => (
              <AccordionItem 
                key={index} 
                theme={theme}
              >
                <AccordionHeader 
                  onClick={() => toggleReason(index)}
                  active={activeReason === index}
                  theme={theme}
                >
                  <h3>{reason.title}</h3>
                  <ToggleIcon active={activeReason === index} theme={theme}>
                    {activeReason === index ? '−' : '+'}
                  </ToggleIcon>
                </AccordionHeader>
                <AccordionContent 
                  active={activeReason === index}
                  theme={theme}
                >
                  <p>{reason.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionContainer>
          
        </ContentWrapper>
      </SectionContainer>
      
      <TestimonialsSection theme={theme}>
        <ContentWrapper>
          <TestimonialsTitle theme={theme}>Lo Que Dicen Nuestros Clientes</TestimonialsTitle>
          
          <TestimonialsGrid>
            <TestimonialCard theme={theme}>
              <TestimonialContent theme={theme}>
                <p>
                  Trabajar con Tecniweb Latam ha sido una experiencia transformadora para nuestra empresa. 
                  Su enfoque metodológico y transparente nos dio la confianza que necesitábamos para 
                  emprender un proyecto de transformación digital que parecía abrumador. El resultado 
                  superó nuestras expectativas y ha tenido un impacto directo en nuestro crecimiento.
                </p>
              </TestimonialContent>
              <TestimonialAuthor theme={theme}>
                <h4>Carlos Mendoza</h4>
                <p>Director de Operaciones, Logística Express</p>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard theme={theme}>
              <TestimonialContent theme={theme}>
                <p>
                  Lo que más valoramos de Tecniweb Latam es su capacidad para entender nuestro negocio 
                  y proponer soluciones que realmente abordan nuestros desafíos específicos. No son 
                  simplemente desarrolladores; son consultores estratégicos que han contribuido 
                  significativamente a nuestra ventaja competitiva en el mercado.
                </p>
              </TestimonialContent>
              <TestimonialAuthor theme={theme}>
                <h4>Ana María Vargas</h4>
                <p>Directora de tecnología, Multiservicios Vargas</p>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard theme={theme}>
              <TestimonialContent theme={theme}>
                <p>
                  La integración de inteligencia artificial en nuestros procesos de atención al cliente 
                  ha sido un cambio radical para nuestra operación. Tecniweb Latam no solo implementó 
                  la tecnología, sino que nos acompañó en todo el proceso de adopción y optimización. 
                  El resultado: 40% de reducción en tiempos de respuesta y un aumento significativo 
                  en la satisfacción de nuestros clientes.
                </p>
              </TestimonialContent>
              <TestimonialAuthor theme={theme}>
                <h4>Miguel Ángel Rojas</h4>
                <p>Director de Innovación, Distribuidora Asociada</p>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </ContentWrapper>
      </TestimonialsSection>
      
      <ContactSection theme={theme}>
        <ContentWrapper>
          <ContactIntro theme={theme}>
            <h2>¿Listo para Transformar tu Negocio?</h2>
            <p>
              Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar 
              tus objetivos tecnológicos y de negocio.
            </p>
          </ContactIntro>
          
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </ContactSection>
    </PageContainer>
  );
};

export default PorqueEscogernos;
