import React from 'react';
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

const CoreValueHighlight = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ValueIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  color: white;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 0;
  }
`;

const ValueContent = styled.div`
  flex: 1;
  padding: 30px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      padding: 10px 0;
      border-bottom: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
      color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
      
      &:last-child {
        border-bottom: none;
      }
      
      strong {
        color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
      }
    }
  }
`;

const ValuesGrid = styled.div`
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

const ValueCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    margin: 15px 0;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
  
  .value-icon {
    font-size: 2.5rem;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
`;

const ValuesInPractice = styled.div`
  margin-top: 60px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 30px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
`;

const PracticeExample = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
`;

const ContactSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#222'};
  
  .contact-intro {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px;
    
    h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 2rem;
      margin-bottom: 20px;
      color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    }
    
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
    }
  }
`;

const ValoresCorporativos = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Valores Corporativos | Tecniweb Latam</title>
        <meta name="description" content="Descubre los valores corporativos que guían nuestras acciones y decisiones en Tecniweb Latam: transparencia, innovación, excelencia, colaboración, empatía, integridad y adaptabilidad." />
        <meta name="keywords" content="valores corporativos, transparencia, innovación, excelencia, colaboración, empatía, integridad, adaptabilidad, Tecniweb Latam" />
      </Helmet>
      
      <Breadcrumb items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' },
          { label: 'Valores Corporativos', path: '/nosotros/valores-corporativos' }
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
        title="Valores Corporativos"
        subtitle="Los principios que guían nuestras acciones y decisiones"
      />
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <IntroSection>
            <SectionTitle theme={theme}>Nuestros Valores Fundamentales</SectionTitle>
            <SectionDescription theme={theme}>
              En Tecniweb Latam, nuestros valores corporativos no son simplemente palabras en una pared; 
              son los principios que guían cada decisión que tomamos, cada línea de código que escribimos 
              y cada interacción con nuestros clientes y colaboradores. Estos valores definen quiénes somos 
              y cómo operamos como organización.
            </SectionDescription>
          </IntroSection>
          
          <CoreValueHighlight theme={theme}>
            <ValueIcon theme={theme}>
              <i className="fas fa-handshake"></i>
            </ValueIcon>
            <ValueContent theme={theme}>
              <h2>Transparencia: Nuestro Valor Principal</h2>
              <p>
                La transparencia es la piedra angular de nuestra cultura corporativa. Creemos firmemente que 
                la honestidad y la claridad son fundamentales para construir relaciones duraderas y generar 
                confianza tanto con nuestros clientes como dentro de nuestro equipo.
              </p>
              <p>
                Para nosotros, la transparencia significa:
              </p>
              <ul>
                <li>
                  <strong>Comunicación clara y directa:</strong> Compartimos información de manera abierta y oportuna, 
                  evitando ambigüedades y asegurando que todos los involucrados tengan acceso a la información que necesitan.
                </li>
                <li>
                  <strong>Procesos visibles:</strong> Nuestros clientes siempre saben en qué etapa se encuentra su proyecto, 
                  qué trabajo se ha completado y qué viene a continuación.
                </li>
                <li>
                  <strong>Precios justos y claros:</strong> No hay costos ocultos ni sorpresas desagradables. 
                  Nuestras cotizaciones son detalladas y explicamos claramente el valor que aportamos.
                </li>
                <li>
                  <strong>Reconocimiento de errores:</strong> Cuando cometemos un error, lo admitimos abiertamente, 
                  aprendemos de él y tomamos medidas para corregirlo y evitar que se repita.
                </li>
              </ul>
            </ValueContent>
          </CoreValueHighlight>
          
          <ValuesGrid>
            <ValueCard theme={theme}>
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovación</h3>
              <p>
                Buscamos constantemente nuevas formas de resolver problemas y crear valor. 
                No nos conformamos con soluciones convencionales cuando podemos desarrollar 
                algo mejor, más eficiente o más impactante para nuestros clientes.
              </p>
            </ValueCard>
            
            <ValueCard theme={theme}>
              <div className="value-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Integridad</h3>
              <p>
                Actuamos con honestidad y ética en todas nuestras interacciones. Cumplimos nuestras 
                promesas y asumimos la responsabilidad de nuestras acciones, construyendo relaciones 
                basadas en la confianza y el respeto mutuo.
              </p>
            </ValueCard>
            
            <ValueCard theme={theme}>
              <div className="value-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Enfoque En El Cliente</h3>
              <p>
              Priorizamos las necesidades de nuestros clientes, trabajando en estrecha colaboración para entender sus objetivos y ofrecer soluciones que superen sus expectativas.
              </p>
            </ValueCard>
          </ValuesGrid>
          
          <ValuesInPractice theme={theme}>
            <h2>Nuestros Valores en Acción</h2>
            
            <PracticeExample theme={theme}>
              <h3>Transparencia en Nuestros Proyectos</h3>
              <p>
                Implementamos dashboards en tiempo real que permiten a nuestros clientes ver el progreso 
                de su proyecto, las horas invertidas, los hitos alcanzados y los próximos pasos. 
                Esto elimina la incertidumbre y construye confianza a lo largo de todo el proceso de desarrollo.
              </p>
            </PracticeExample>
            
            <PracticeExample theme={theme}>
              <h3>Innovación en Soluciones</h3>
              <p>
                Destinamos el 10% del tiempo de nuestro equipo a la investigación y experimentación con 
                nuevas tecnologías y enfoques. Esto nos ha permitido desarrollar soluciones pioneras en 
                áreas como la inteligencia artificial aplicada a problemas empresariales específicos en Latinoamérica.
              </p>
            </PracticeExample>
            
            <PracticeExample theme={theme}>
              <h3>Colaboración con la Comunidad</h3>
              <p>
                Participamos activamente en la comunidad de desarrollo de software a través de contribuciones 
                a proyectos de código abierto, organización de eventos de tecnología y programas de mentoría 
                para nuevos desarrolladores. Creemos que elevar el nivel de toda la industria beneficia a todos.
              </p>
            </PracticeExample>
          </ValuesInPractice>
        </ContentWrapper>
      </SectionContainer>
      
      <ContactSection theme={theme}>
        <ContentWrapper>
          <div className="contact-intro">
            <h2>Comparte Nuestros Valores</h2>
            <p>
              Si buscas un socio tecnológico que no solo entregue soluciones técnicas excepcionales, 
              sino que lo haga con integridad, transparencia y un compromiso genuino con tu éxito, 
              nos encantaría hablar contigo.
            </p>
          </div>
          
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </ContactSection>
    </PageContainer>
  );
};

export default ValoresCorporativos;
