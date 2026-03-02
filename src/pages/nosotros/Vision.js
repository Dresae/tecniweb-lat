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

const VisionStatement = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto 30px;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  border-left: 4px solid ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  padding-left: 20px;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
`;

const StrategicPillars = styled.div`
  margin-top: 60px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 40px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
`;

const PillarCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 60px 60px 60px 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PillarIcon = styled.div`
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

const PillarContent = styled.div`
  flex: 1;
  padding: 30px;
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
  }
`;

const Milestone = styled.div`
  background-color: ${props => props.theme === 'light' ? '#f3f3f3' : '#333'};
  border-radius: 6px;
  padding: 15px;
  margin-top: 20px;
  
  h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    margin-bottom: 0;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
`;

const VisionImpact = styled.div`
  margin-top: 60px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
  
  > p {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px;
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
`;

const ImpactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin: 20px auto;
  max-width: 1000px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const PuzzlePiece = styled.div`
  width: 45%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  z-index: 1;
  min-height: 400px;
  
  @media (max-width: 992px) {
    width: 90%;
    min-height: 350px;
  }
  
  @media (max-width: 768px) {
    width: 95%;
    min-height: 350px;
    padding: 10px;
    margin-bottom: 10px;
    margin-left: 40px;
  }
  
  @media (max-width: 480px) {
    width: 95%;
    min-height: 350px;
    padding: 5px;
  }
`;

const PuzzleImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 450px;
  max-height: 450px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: ${props => props.theme === 'light' ? 0.9 : 0.7};
  
  @media (max-width: 992px) {
    max-width: 400px;
    max-height: 400px;
  }
  
  @media (max-width: 768px) {
    max-width: 350px;
    max-height: 350px;
  }
  
  @media (max-width: 480px) {
    max-width: 350px;
    max-height: 350px;
  }
`;

const JoinVision = styled.div`
  margin-top: 60px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-top: 40px;
  }
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  p {
    max-width: 800px;
    margin: 0 auto 20px;
    font-size: 1.1rem;
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

const Vision = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Nuestra Visión al 2029 | Tecniweb Latam</title>
        <meta name="description" content="Descubre nuestra visión para el 2029: ser líderes en transformación digital e innovación tecnológica en Latinoamérica, impulsando el crecimiento sostenible de las empresas de la región." />
        <meta name="keywords" content="visión empresarial, transformación digital, innovación tecnológica, Latinoamérica, futuro tecnológico, Tecniweb Latam" />
      </Helmet>
      
      <Breadcrumb items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' },
          { label: 'Visión al 2029', path: '/nosotros/vision' }
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
        title="Nuestra Visión al 2029"
        subtitle="Construyendo el futuro tecnológico de Latinoamérica"
      />
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <IntroSection>
            <SectionTitle theme={theme}>Hacia un Futuro Tecnológico Transformador</SectionTitle>
            <VisionStatement theme={theme}>
              "Para 2029, Tecniweb Latam será reconocida como la empresa líder en transformación digital 
              e innovación tecnológica en Latinoamérica, impulsando el crecimiento sostenible de las 
              empresas de la región a través de soluciones de software inteligentes y accesibles." Andy Amador - CEO Tecniweb Latam
            </VisionStatement>
            <SectionDescription theme={theme}>
              Esta visión ambiciosa pero alcanzable guía cada decisión estratégica que tomamos y 
              cada proyecto que emprendemos. Estamos comprometidos con un futuro donde la tecnología 
              sea un habilitador de crecimiento y desarrollo para todas las empresas latinoamericanas, 
              independientemente de su tamaño o sector.
            </SectionDescription>
          </IntroSection>
          
          <StrategicPillars theme={theme}>
            <h2>Pilares Estratégicos para 2029</h2>
            
            <PillarCard theme={theme}>
              <PillarIcon theme={theme}>
                <i className="fas fa-brain"></i>
              </PillarIcon>
              <PillarContent theme={theme}>
                <h3>Liderazgo en Inteligencia Artificial</h3>
                <p>
                  Nos posicionaremos como el referente regional en la implementación de soluciones 
                  de inteligencia artificial adaptadas a las necesidades específicas del mercado latinoamericano. 
                  Desarrollaremos modelos de IA que comprendan las particularidades culturales, lingüísticas 
                  y de negocio de la región, creando un valor diferencial significativo.
                </p>
                <Milestone theme={theme}>
                  <h4>Hito para 2029:</h4>
                  <p>
                    Desarrollar y desplegar al menos 50 soluciones de IA personalizadas que generen 
                    un impacto medible en la productividad y competitividad de empresas en al menos 
                    8 países de Latinoamérica.
                  </p>
                </Milestone>
              </PillarContent>
            </PillarCard>
            
            <PillarCard theme={theme}>
              <PillarIcon theme={theme}>
                <i className="fas fa-globe-americas"></i>
              </PillarIcon>
              <PillarContent theme={theme}>
                <h3>Expansión Regional</h3>
                <p>
                  Ampliaremos nuestra presencia física y digital en los principales mercados de Latinoamérica, 
                  estableciendo centros de innovación y desarrollo en puntos estratégicos de la región. 
                  Esto nos permitirá entender mejor las necesidades locales y ofrecer soluciones más 
                  relevantes y efectivas.
                </p>
                <Milestone theme={theme}>
                  <h4>Hito para 2029:</h4>
                  <p>
                    Establecer operaciones directas en al menos 6 países latinoamericanos, con centros 
                    de innovación tecnológica que empleen a más de 500 profesionales locales y generen 
                    un impacto económico positivo en sus comunidades.
                  </p>
                </Milestone>
              </PillarContent>
            </PillarCard>
            
            <PillarCard theme={theme}>
              <PillarIcon theme={theme}>
                <i className="fas fa-graduation-cap"></i>
              </PillarIcon>
              <PillarContent theme={theme}>
                <h3>Desarrollo de Talento Tecnológico</h3>
                <p>
                  Contribuiremos activamente al desarrollo del talento tecnológico en la región a través 
                  de programas de formación, becas y alianzas con instituciones educativas. Creemos que 
                  el futuro de Latinoamérica depende de su capacidad para formar profesionales altamente 
                  calificados en tecnologías emergentes.
                </p>
                <Milestone theme={theme}>
                  <h4>Hito para 2029:</h4>
                  <p>
                    Capacitar a más de 10,000 profesionales en tecnologías avanzadas a través de nuestra 
                    plataforma educativa y programas de becas, con especial énfasis en comunidades 
                    subrepresentadas en el sector tecnológico.
                  </p>
                </Milestone>
              </PillarContent>
            </PillarCard>
            
            <PillarCard theme={theme}>
              <PillarIcon theme={theme}>
                <i className="fas fa-seedling"></i>
              </PillarIcon>
              <PillarContent theme={theme}>
                <h3>Innovación Sostenible</h3>
                <p>
                  Integraremos principios de sostenibilidad en todo nuestro proceso de desarrollo, 
                  desde la concepción hasta la implementación. Desarrollaremos soluciones que no solo 
                  resuelvan problemas actuales, sino que lo hagan de manera responsable con el medio 
                  ambiente y las generaciones futuras.
                </p>
                <Milestone theme={theme}>
                  <h4>Hito para 2029:</h4>
                  <p>
                    Lograr que el 100% de nuestras soluciones implementen principios de "Green Coding" 
                    y reducir la huella de carbono digital de nuestros clientes en al menos un 30% a 
                    través de optimizaciones de software y arquitecturas eficientes.
                  </p>
                </Milestone>
              </PillarContent>
            </PillarCard>
            
            <PillarCard theme={theme}>
              <PillarIcon theme={theme}>
                <i className="fas fa-handshake"></i>
              </PillarIcon>
              <PillarContent theme={theme}>
                <h3>Democratización Tecnológica</h3>
                <p>
                  Trabajaremos para hacer que las tecnologías avanzadas sean accesibles para empresas 
                  de todos los tamaños, no solo para grandes corporaciones. Desarrollaremos modelos 
                  de servicio flexibles y escalables que permitan a las pequeñas y medianas empresas 
                  beneficiarse de soluciones tecnológicas de clase mundial.
                </p>
                <Milestone theme={theme}>
                  <h4>Hito para 2029:</h4>
                  <p>
                    Crear una plataforma de soluciones tecnológicas modulares y accesibles que sirva 
                    a más de 5,000 pequeñas y medianas empresas en toda Latinoamérica, ayudándolas a 
                    competir efectivamente en la economía digital.
                  </p>
                </Milestone>
              </PillarContent>
            </PillarCard>
          </StrategicPillars>
          
          <VisionImpact theme={theme}>
            <h2>El Impacto que Queremos Crear</h2>
            <p>
              Nuestra visión va más allá del crecimiento empresarial. Aspiramos a generar un impacto 
              significativo y duradero en Latinoamérica a través de la tecnología:
            </p>
            
            <ImpactGrid>
              <PuzzlePiece>
                <PuzzleImage image={require('../../assets/nosotros-pics/vision/puzzle1.png')} theme={theme} />
              </PuzzlePiece>
              
              <PuzzlePiece>
                <PuzzleImage image={require('../../assets/nosotros-pics/vision/puzzle2.png')} theme={theme} />
              </PuzzlePiece>
              
              <PuzzlePiece>
                <PuzzleImage image={require('../../assets/nosotros-pics/vision/puzzle3.png')} theme={theme} />
              </PuzzlePiece>
              
              <PuzzlePiece>
                <PuzzleImage image={require('../../assets/nosotros-pics/vision/puzzle4.png')} theme={theme} />
              </PuzzlePiece>
            </ImpactGrid>
          </VisionImpact>
          
          <JoinVision theme={theme}>
            <h2>Sé Parte de Nuestra Visión</h2>
            <p>
              Invitamos a clientes, colaboradores, inversionistas y a toda la comunidad tecnológica 
              a unirse a nosotros en este viaje hacia un futuro digital más innovador, inclusivo 
              y sostenible para Latinoamérica.
            </p>
            <p>
              Juntos, podemos transformar la manera en que las empresas latinoamericanas aprovechan 
              la tecnología para crecer y prosperar en un mundo cada vez más digital.
            </p>
          </JoinVision>
        </ContentWrapper>
      </SectionContainer>
      
      <ContactSection theme={theme}>
        <ContentWrapper>
          <div className="contact-intro">
            <h2>Construyamos el Futuro Juntos</h2>
            <p>
              ¿Compartes nuestra visión? ¿Tienes ideas sobre cómo podemos colaborar para 
              transformar el panorama tecnológico de Latinoamérica? Nos encantaría escucharte.
            </p>
          </div>
          
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </ContactSection>
    </PageContainer>
  );
};

export default Vision;
