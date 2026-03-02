import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner';
import Breadcrumbs from '../../components/Breadcrumb';
import ContactForm from '../../components/ContactForm';
import GoogleCalendarButton from '../../components/GoogleCalendarButton';
import { useTheme } from '../../context/ThemeContext';

// Styled Components
const PageContainer = styled.div`
  width: 100%;
`;

const ImpactSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ImpactIntro = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
`;

const ImpactAreas = styled.div`
  margin-bottom: 60px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 40px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
`;

const ImpactAreaCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 100px 10px 100px 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImpactAreaIcon = styled.div`
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

const ImpactAreaContent = styled.div`
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
  
  ul {
    margin-bottom: 20px;
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
      line-height: 1.6;
      color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
      
      strong {
        color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
      }
    }
  }
`;

const ImpactMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Metric = styled.div`
  flex: 1;
  min-width: 120px;
  background-color: ${props => props.theme === 'light' ? '#f3f3f3' : '#333'};
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  
  .metric-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  .metric-label {
    font-size: 0.9rem;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
    line-height: 1.4;
  }
`;

const ImpactStories = styled.div`
  margin-bottom: 60px;
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    margin-bottom: 40px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    text-align: center;
  }
`;

const StoryCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const StoryImage = styled.div`
  width: 40%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 992px) {
    width: 100%;
    height: 300px;
  }
`;

const StoryContent = styled.div`
  flex: 1;
  padding: 30px;
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  p {
    margin-bottom: 20px;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    padding-left: 20px;
    font-style: italic;
    margin-bottom: 0;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
    
    cite {
      display: block;
      margin-top: 10px;
      font-size: 0.9rem;
      color: ${props => props.theme === 'light' ? '#777' : '#999'};
    }
  }
`;

const FutureCommitments = styled.div`
  margin-bottom: 60px;
  
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

const CommitmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CommitmentCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 30px;
  padding: 25px;
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
    margin-bottom: 0;
  }
`;

const ContactSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#222'};
`;

const ContactIntro = styled.div`
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
`


const ImpactoSocial = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Impacto Social y Tecnológico | Tecniweb Latam</title>
        <meta name="description" content="Descubre cómo Tecniweb Latam contribuye al desarrollo sostenible de Latinoamérica a través de iniciativas de educación tecnológica, inclusión digital y sostenibilidad ambiental." />
        <meta name="keywords" content="impacto social, tecnología, educación tecnológica, inclusión digital, sostenibilidad, Latinoamérica, Tecniweb Latam" />
      </Helmet>
      
      <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' },
          { label: 'Impacto Social y Tecnológico', path: '/nosotros/impacto-social' }
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
        title="Impacto Social y Tecnológico en Latam"
        subtitle="Contribuyendo al desarrollo sostenible de nuestra región"
      />
      
      <ImpactSection theme={theme}>
        <Container>
          <ImpactIntro theme={theme}>
            <h2>Nuestro Compromiso con Latinoamérica</h2>
            <p>
              En Tecniweb Latam, creemos firmemente que el desarrollo tecnológico debe ir de la mano 
              con el progreso social. Como empresa nacida y arraigada en Latinoamérica, sentimos la 
              responsabilidad de contribuir activamente al desarrollo sostenible de nuestra región, 
              aprovechando el poder transformador de la tecnología para abordar desafíos sociales, 
              económicos y ambientales.
            </p>
          </ImpactIntro>
          
          <ImpactAreas theme={theme}>
            <h2>Áreas a Impactar</h2>
            
            <ImpactAreaCard theme={theme}>
              <ImpactAreaIcon theme={theme}>
                <i className="fas fa-laptop-code"></i>
              </ImpactAreaIcon>
              <ImpactAreaContent theme={theme}>
                <h3>Educación Tecnológica</h3>
                <p>
                  Reconocemos que el futuro de Latinoamérica depende en gran medida de su capacidad para 
                  formar profesionales calificados en tecnología. Por eso, hemos desarrollado diversas 
                  iniciativas educativas:
                </p>
                <ul>
                  <li>
                    <strong>Programa "Código Futuro":</strong> Talleres gratuitos de programación para jóvenes 
                    de comunidades vulnerables con profundo interés en la tecnología.
                  </li>
                  <li>
                    <strong>Mentoría para emprendedores tecnológicos:</strong> Asesoramiento gratuito a 
                    startups locales que buscan desarrollar soluciones innovadoras para problemas regionales.
                  </li>
                </ul>
              </ImpactAreaContent>
            </ImpactAreaCard>
            
            <ImpactAreaCard theme={theme}>
              <ImpactAreaIcon theme={theme}>
                <i className="fas fa-users"></i>
              </ImpactAreaIcon>
              <ImpactAreaContent theme={theme}>
                <h3>Inclusión Digital</h3>
                <p>
                  Trabajamos para reducir la brecha digital en Latinoamérica, asegurando que los beneficios 
                  de la transformación digital lleguen a todos los sectores de la sociedad:
                </p>
                <ul>
                  <li>
                    <strong>Proyecto "Conectando Comunidades":</strong> Desarrollo de aplicaciones móviles 
                    de bajo consumo de datos para zonas rurales con conectividad limitada.
                  </li>
                  <li>
                    <strong>Soluciones accesibles:</strong> Diseño de interfaces adaptadas para personas con 
                    discapacidades, siguiendo estándares internacionales de accesibilidad.
                  </li>
                  <li>
                    <strong>Tecnología para todos:</strong> Modelos de servicio flexibles que permiten a pequeñas 
                    empresas y organizaciones sin fines de lucro acceder a soluciones tecnológicas avanzadas.
                  </li>
                </ul>
              </ImpactAreaContent>
            </ImpactAreaCard>
            
            <ImpactAreaCard theme={theme}>
              <ImpactAreaIcon theme={theme}>
                <i className="fas fa-leaf"></i>
              </ImpactAreaIcon>
              <ImpactAreaContent theme={theme}>
                <h3>Sostenibilidad Ambiental</h3>
                <p>
                  Entendemos que el desarrollo tecnológico debe ser ambientalmente responsable. 
                  Nuestras iniciativas en este ámbito incluyen:
                </p>
                <ul>
                  <li>
                    <strong>Green Coding:</strong> Implementación de prácticas de programación que reducen 
                    el consumo energético y la huella de carbono de nuestras soluciones.
                  </li>
                  <li>
                    <strong>Proyecto "Tech por el Planeta":</strong> Desarrollo de soluciones tecnológicas 
                    para monitoreo ambiental y gestión eficiente de recursos naturales.
                  </li>
                  <li>
                    <strong>Oficinas eco-eficientes:</strong> Nuestras instalaciones operan con energía 
                    renovable y siguen prácticas de reducción de residuos y consumo responsable.
                  </li>
                </ul>
              </ImpactAreaContent>
            </ImpactAreaCard>
            
            <ImpactAreaCard theme={theme}>
              <ImpactAreaIcon theme={theme}>
                <i className="fas fa-chart-line"></i>
              </ImpactAreaIcon>
              <ImpactAreaContent theme={theme}>
                <h3>Desarrollo Económico</h3>
                <p>
                  Contribuimos al crecimiento económico de la región a través de:
                </p>
                <ul>
                  <li>
                    <strong>Creación de empleo de calidad:</strong> Generamos oportunidades laborales bien 
                    remuneradas en el sector tecnológico, con especial énfasis en la inclusión de mujeres 
                    y grupos subrepresentados.
                  </li>
                  <li>
                    <strong>Transformación digital de PyMEs:</strong> Ayudamos a pequeñas y medianas empresas 
                    a aumentar su competitividad a través de la adopción tecnológica.
                  </li>
                  <li>
                    <strong>Desarrollo de proveedores locales:</strong> Priorizamos la contratación de proveedores 
                    latinoamericanos para fortalecer el ecosistema empresarial regional.
                  </li>
                </ul>
              </ImpactAreaContent>
            </ImpactAreaCard>
          </ImpactAreas>
          
          <FutureCommitments theme={theme}>
            <h2>Nuestros Compromisos Futuros</h2>
            <p>
              Mirando hacia adelante, nos comprometemos a ampliar nuestro impacto social y tecnológico 
              en Latinoamérica a través de las siguientes iniciativas:
            </p>
            
            <CommitmentsGrid>
              <CommitmentCard theme={theme}>
                <h3>Ampliar Nuestros Programas Educativos</h3>
                <p>
                  Expandir el programa "Código Futuro" a tres nuevos países latinoamericanos 
                  y duplicar el número de becas para estudios tecnológicos en los próximos cinco años.
                </p>
              </CommitmentCard>
              
              <CommitmentCard theme={theme}>
                <h3>Impulsar la Innovación Social</h3>
                <p>
                  Crear un fondo de innovación social para financiar startups tecnológicas que 
                  aborden desafíos críticos en educación, salud y medio ambiente en la región.
                </p>
              </CommitmentCard>
              
              <CommitmentCard theme={theme}>
                <h3>Neutralidad de Carbono</h3>
                <p>
                  Lograr la neutralidad de carbono en todas nuestras operaciones para 2029 
                  y ayudar a nuestros clientes a reducir su huella ambiental digital.
                </p>
              </CommitmentCard>
              
              <CommitmentCard theme={theme}>
                <h3>Paridad de Género</h3>
                <p>
                  Alcanzar la paridad de género en todos los niveles de nuestra organización, 
                  incluyendo posiciones de liderazgo técnico y gerencial.
                </p>
              </CommitmentCard>
            </CommitmentsGrid>
          </FutureCommitments>
        </Container>
      </ImpactSection>
      
      <ContactSection theme={theme}>
        <Container>
          <ContactIntro theme={theme}>
            <h2>Colabora con Nosotros</h2>
            <p>
              Si compartes nuestra visión de una Latinoamérica tecnológicamente avanzada y socialmente 
              inclusiva, nos encantaría explorar oportunidades de colaboración. Ya sea como cliente, 
              socio o colaborador, juntos podemos generar un impacto positivo y duradero en nuestra región.
            </p>
          </ContactIntro>
          
          <ContactForm />
          <GoogleCalendarButton />
        </Container>
      </ContactSection>
    </PageContainer>
  );
};

export default ImpactoSocial;
