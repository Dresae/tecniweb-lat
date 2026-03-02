import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner';
import Breadcrumb from '../../components/Breadcrumb';
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

const StagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StageCard = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 0;
  }
`;

const StageContent = styled.div`
  flex: 1;
  padding: 30px;
`;

const StageTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const StageDetails = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const StageDescription = styled.div`
  flex: 2;
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
    color: ${props => props.theme === 'light' ? '#444' : '#ccc'};
  }
`;

const StageDeliverables = styled.div`
  flex: 1;
  
  h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      padding: 8px 0;
      border-bottom: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
      color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
      
      &:last-child {
        border-bottom: none;
      }
      
      &::before {
        content: '✓';
        color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
        margin-right: 10px;
      }
    }
  }
`;

const BenefitsSection = styled.section`
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' ? 'white' : '#222'};
`;

const BenefitsTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BenefitsGrid = styled.div`
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

const BenefitCard = styled.div`
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

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const BenefitTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
`;

const BenefitDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
`;

const MetodologiaTrabajo = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Nuestra Metodología de Trabajo | Tecniweb Latam</title>
        <meta name="description" content="Conoce nuestra metodología de trabajo por etapas con pagos progresivos. Garantizamos transparencia, resultados tangibles y colaboración efectiva." />
        <meta name="keywords" content="metodología de trabajo, desarrollo por etapas, pagos progresivos, transparencia, Tecniweb Latam" />
      </Helmet>
      
      <Breadcrumb items={[
          { label: 'Inicio', path: '/' },
          { label: 'Nosotros', path: '/nosotros' },
          { label: 'Nuestra Metodología de Trabajo', path: '/nosotros/metodologia' }
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
        title="Nuestra Metodología de Trabajo"
        subtitle="Desarrollo por etapas con resultados tangibles"
      />
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <IntroSection>
            <SectionTitle theme={theme}>Desarrollo por Etapas con Pagos Progresivos</SectionTitle>
            <SectionDescription theme={theme}>
              En Tecniweb Latam, hemos desarrollado una metodología de trabajo que garantiza 
              transparencia, resultados tangibles y una colaboración efectiva con nuestros clientes. 
              Nuestro enfoque se basa en tres etapas principales, con pagos vinculados al progreso 
              real del proyecto, asegurando que solo pagas por lo que realmente se ha completado.
            </SectionDescription>
          </IntroSection>
          
          <StagesContainer>
            <StageCard theme={theme}>
              <StageNumber theme={theme}>1</StageNumber>
              <StageContent>
                <StageTitle theme={theme}>Etapa de Planificación y Diseño</StageTitle>
                <StageDetails>
                  <StageDescription theme={theme}>
                    <p>
                      La primera etapa se centra en establecer una base sólida para tu proyecto. 
                      Trabajamos en estrecha colaboración contigo para comprender tus necesidades, 
                      definir los requisitos y crear un plan detallado para el desarrollo.
                    </p>
                    <p>
                      Durante esta fase, nuestro equipo de expertos realiza un análisis exhaustivo 
                      de tus objetivos, audiencia objetivo y competidores. Creamos wireframes y 
                      prototipos interactivos que te permiten visualizar la solución antes de comenzar 
                      el desarrollo completo.
                    </p>
                  </StageDescription>
                  <StageDeliverables theme={theme}>
                    <h4>Entregables:</h4>
                    <ul>
                      <li>Documento de requisitos</li>
                      <li>Wireframes y prototipos</li>
                      <li>Arquitectura de la solución</li>
                      <li>Plan de proyecto detallado</li>
                      <li>Presupuesto desglosado</li>
                    </ul>
                  </StageDeliverables>
                </StageDetails>
              </StageContent>
            </StageCard>
            
            <StageCard theme={theme}>
              <StageNumber theme={theme}>2</StageNumber>
              <StageContent>
                <StageTitle theme={theme}>Etapa de Desarrollo e Implementación</StageTitle>
                <StageDetails>
                  <StageDescription theme={theme}>
                    <p>
                      Con la planificación completa, pasamos a la fase de desarrollo donde nuestro 
                      equipo de ingenieros transforma los diseños en código funcional. Utilizamos 
                      metodologías ágiles para mantener la flexibilidad y adaptarnos a los cambios 
                      que puedan surgir durante el proceso.
                    </p>
                    <p>
                      Implementamos ciclos de desarrollo iterativos con entregas parciales, lo que 
                      te permite ver el progreso real y proporcionar retroalimentación temprana. 
                      Cada iteración se somete a pruebas rigurosas para garantizar la calidad y 
                      el rendimiento óptimo.
                    </p>
                  </StageDescription>
                  <StageDeliverables theme={theme}>
                    <h4>Entregables:</h4>
                    <ul>
                      <li>Código fuente documentado</li>
                      <li>Versiones incrementales funcionales</li>
                      <li>Informes de pruebas</li>
                      <li>Documentación técnica</li>
                      <li>Repositorio de código</li>
                    </ul>
                  </StageDeliverables>
                </StageDetails>
              </StageContent>
            </StageCard>
            
            <StageCard theme={theme}>
              <StageNumber theme={theme}>3</StageNumber>
              <StageContent>
                <StageTitle theme={theme}>Etapa de Lanzamiento y Soporte</StageTitle>
                <StageDetails>
                  <StageDescription theme={theme}>
                    <p>
                      La etapa final se centra en el lanzamiento de tu solución y en asegurar 
                      una transición sin problemas. Realizamos pruebas exhaustivas de aceptación 
                      del usuario, optimizamos el rendimiento y preparamos todo para el despliegue.
                    </p>
                    <p>
                      Después del lanzamiento, proporcionamos soporte continuo para resolver 
                      cualquier problema que pueda surgir y garantizar que tu solución siga 
                      funcionando de manera óptima. También ofrecemos capacitación para tu equipo 
                      y documentación detallada para facilitar la adopción.
                    </p>
                  </StageDescription>
                  <StageDeliverables theme={theme}>
                    <h4>Entregables:</h4>
                    <ul>
                      <li>Producto final implementado</li>
                      <li>Documentación de usuario</li>
                      <li>Materiales de capacitación</li>
                      <li>Plan de mantenimiento</li>
                      <li>Soporte técnico (según contrato)</li>
                    </ul>
                  </StageDeliverables>
                </StageDetails>
              </StageContent>
            </StageCard>
          </StagesContainer>
        </ContentWrapper>
      </SectionContainer>
      
      <BenefitsSection theme={theme}>
        <ContentWrapper>
          <BenefitsTitle theme={theme}>Beneficios de Nuestra Metodología</BenefitsTitle>
          
          <BenefitsGrid>
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>💰</BenefitIcon>
              <BenefitTitle theme={theme}>Control Financiero</BenefitTitle>
              <BenefitDescription theme={theme}>Pagos vinculados a entregables concretos, sin sorpresas ni costos ocultos.</BenefitDescription>
            </BenefitCard>
            
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>🔍</BenefitIcon>
              <BenefitTitle theme={theme}>Transparencia Total</BenefitTitle>
              <BenefitDescription theme={theme}>Visibilidad completa del progreso y los resultados en cada etapa del proyecto.</BenefitDescription>
            </BenefitCard>
            
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>⚡</BenefitIcon>
              <BenefitTitle theme={theme}>Resultados Rápidos</BenefitTitle>
              <BenefitDescription theme={theme}>Entregas incrementales que permiten ver resultados tangibles desde las primeras semanas.</BenefitDescription>
            </BenefitCard>
            
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>🔄</BenefitIcon>
              <BenefitTitle theme={theme}>Flexibilidad</BenefitTitle>
              <BenefitDescription theme={theme}>Capacidad de adaptación a cambios y nuevos requisitos durante el desarrollo.</BenefitDescription>
            </BenefitCard>
            
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>🤝</BenefitIcon>
              <BenefitTitle theme={theme}>Colaboración Efectiva</BenefitTitle>
              <BenefitDescription theme={theme}>Comunicación constante y retroalimentación regular para asegurar que cumplimos tus expectativas.</BenefitDescription>
            </BenefitCard>
            
            <BenefitCard theme={theme}>
              <BenefitIcon theme={theme}>🛡️</BenefitIcon>
              <BenefitTitle theme={theme}>Reducción de Riesgos</BenefitTitle>
              <BenefitDescription theme={theme}>Identificación temprana de problemas potenciales y estrategias de mitigación proactivas.</BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </ContentWrapper>
      </BenefitsSection>
    </PageContainer>
  );
};

export default MetodologiaTrabajo;
