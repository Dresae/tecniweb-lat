import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import Breadcrumbs from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';
import GoogleCalendarButton from '../components/GoogleCalendarButton';

const PageContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--dark-green-2)'};
  color: white;
  padding: 80px 0 60px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  margin-bottom: 30px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SubTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin: 30px 0 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const List = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
    line-height: 1.6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    border: 1px solid ${props => props.theme === 'light' ? '#ddd' : '#333'};
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: ${props => props.theme === 'light' ? '#f2f2f2' : '#222'};
    color: ${props => props.theme === 'light' ? '#333' : '#eee'};
  }
  
  tr:nth-child(even) {
    background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
  }
`;

const PoliticaCookies = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Política de Cookies | Tecniweb Latam</title>
        <meta name="description" content="Política de cookies de Tecniweb Latam. Información sobre el uso de cookies en nuestro sitio web." />
      </Helmet>
      
      <HeroSection>
        <ContentWrapper>
          <HeroTitle>Política de Cookies</HeroTitle>
        </ContentWrapper>
      </HeroSection>
      
      <ContentWrapper>
        <Breadcrumbs items={[
          {
            label: 'Inicio',
            path: '/'
          },
          {
            label: 'Política de Cookies',
            path: '/politica-cookies'
          }
        ]} />
      </ContentWrapper>
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <Paragraph>
            Última actualización: {new Date().toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}
          </Paragraph>
          
          <Paragraph>
            En Tecniweb Latam, utilizamos cookies y tecnologías similares en nuestro sitio web. Esta Política de Cookies explica qué son las cookies, cómo las utilizamos, qué tipos de cookies utilizamos, y cómo puede controlar sus preferencias de cookies.
          </Paragraph>
          
          <SectionTitle theme={theme}>¿Qué son las cookies?</SectionTitle>
          <Paragraph>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita un sitio web. Las cookies ayudan a que el sitio web recuerde información sobre su visita, como su idioma preferido y otras configuraciones. Esto puede facilitar su próxima visita y hacer que el sitio sea más útil para usted.
          </Paragraph>
          
          <SectionTitle theme={theme}>¿Cómo utilizamos las cookies?</SectionTitle>
          <Paragraph>
            Utilizamos cookies para diversos propósitos, incluyendo:
          </Paragraph>
          <List theme={theme}>
            <li>Entender y guardar las preferencias del usuario para futuras visitas.</li>
            <li>Recopilar datos sobre el tráfico del sitio y la interacción para ofrecer mejores experiencias y herramientas en el futuro.</li>
            <li>Analizar y mejorar el rendimiento y funcionamiento de nuestro sitio web.</li>
            <li>Permitir ciertas funcionalidades, como compartir contenido en redes sociales.</li>
            <li>Personalizar el contenido y los anuncios según sus intereses.</li>
          </List>
          
          <SectionTitle theme={theme}>Tipos de cookies que utilizamos</SectionTitle>
          
          <SubTitle theme={theme}>Cookies necesarias</SubTitle>
          <Paragraph>
            Estas cookies son esenciales para que pueda navegar por el sitio web y utilizar sus funciones. Sin estas cookies, no podríamos proporcionar los servicios que ha solicitado, como la autenticación segura y el mantenimiento de la seguridad.
          </Paragraph>
          
          <SubTitle theme={theme}>Cookies de preferencias</SubTitle>
          <Paragraph>
            Estas cookies permiten que el sitio web recuerde las elecciones que ha realizado en el pasado, como el idioma que prefiere, la región desde la que accede o las personalizaciones de diseño.
          </Paragraph>
          
          <SubTitle theme={theme}>Cookies estadísticas</SubTitle>
          <Paragraph>
            Estas cookies recopilan información sobre cómo los visitantes utilizan un sitio web, por ejemplo, qué páginas visitan con más frecuencia y si reciben mensajes de error de las páginas web. Estas cookies no recopilan información que identifique a un visitante específico.
          </Paragraph>
          
          <SubTitle theme={theme}>Cookies de marketing</SubTitle>
          <Paragraph>
            Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual y, por lo tanto, más valiosos para los editores y anunciantes terceros.
          </Paragraph>
          
          <SectionTitle theme={theme}>Cookies específicas que utilizamos</SectionTitle>
          <Table theme={theme}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Propósito</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Google Analytics</td>
                <td>Registra una identificación única que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                <td>2 años</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Google Analytics</td>
                <td>Registra una identificación única que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                <td>24 horas</td>
              </tr>
              <tr>
                <td>_gat</td>
                <td>Google Analytics</td>
                <td>Se utiliza para limitar la velocidad de las solicitudes.</td>
                <td>1 minuto</td>
              </tr>
              <tr>
                <td>session_id</td>
                <td>Tecniweb Latam</td>
                <td>Mantiene el estado de la sesión del usuario a través de las solicitudes de página.</td>
                <td>Sesión</td>
              </tr>
              <tr>
                <td>theme_preference</td>
                <td>Tecniweb Latam</td>
                <td>Almacena la preferencia de tema (claro/oscuro) del usuario.</td>
                <td>1 año</td>
              </tr>
            </tbody>
          </Table>
          
          <SectionTitle theme={theme}>Control de cookies</SectionTitle>
          <Paragraph>
            La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la configuración del navegador. Para saber más sobre las cookies, incluyendo cómo ver qué cookies se han establecido y cómo gestionarlas y eliminarlas, visite <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
          </Paragraph>
          
          <Paragraph>
            Puede optar por deshabilitar las cookies en su navegador en cualquier momento. Sin embargo, tenga en cuenta que si deshabilita las cookies, es posible que no pueda acceder a ciertas partes de nuestro sitio web o que algunas funcionalidades no estén disponibles.
          </Paragraph>
          
          <SectionTitle theme={theme}>Cookies de terceros</SectionTitle>
          <Paragraph>
            En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección detalla qué cookies de terceros puede encontrar a través de este sitio.
          </Paragraph>
          
          <List theme={theme}>
            <li>Este sitio utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y fiables en la web, para ayudarnos a entender cómo utiliza el sitio y las formas en que podemos mejorar su experiencia. Estas cookies pueden rastrear cosas como el tiempo que pasa en el sitio y las páginas que visita para que podamos seguir produciendo contenido atractivo.</li>
            <li>También utilizamos botones de redes sociales y/o plugins que le permiten conectarse con su red social de varias maneras. Para que estos funcionen, los sitios de redes sociales como Facebook, Twitter, etc., establecerán cookies a través de nuestro sitio que pueden utilizarse para mejorar su perfil en su sitio o contribuir a los datos que tienen para diversos propósitos descritos en sus respectivas políticas de privacidad.</li>
          </List>
          
          <SectionTitle theme={theme}>Cambios en nuestra política de cookies</SectionTitle>
          <Paragraph>
            Podemos actualizar nuestra Política de Cookies de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Cookies en esta página y, si los cambios son significativos, le proporcionaremos un aviso más destacado.
          </Paragraph>
          
          <SectionTitle theme={theme}>Contacto</SectionTitle>
          <Paragraph>
            Si tiene alguna pregunta sobre nuestra Política de Cookies, no dude en ponerse en contacto con nosotros:
          </Paragraph>
          
          <List theme={theme}>
            <li>Por correo electrónico: digital@tecniweb.lat(tecniweblat@gmail.com)</li>
            <li>Por teléfono: +57 322 983 3008</li>
          </List>
        </ContentWrapper>
      </SectionContainer>
      
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Necesitas más información?</SectionTitle>
          <Paragraph>
            Si tienes alguna pregunta sobre nuestra política de cookies o cualquier otro aspecto legal de nuestros servicios, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
          </Paragraph>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default PoliticaCookies;
