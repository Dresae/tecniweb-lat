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

const PoliticaPrivacidad = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Política de Privacidad | Tecniweb Latam</title>
        <meta name="description" content="Política de privacidad de Tecniweb Latam. Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales." />
      </Helmet>
      
      <HeroSection>
        <ContentWrapper>
          <HeroTitle>Política de Privacidad</HeroTitle>
        </ContentWrapper>
      </HeroSection>
      
      <ContentWrapper>
        <Breadcrumbs items={[
          {
            label: 'Inicio',
            path: '/'
          },
          {
            label: 'Política de Privacidad',
            path: '/politica-privacidad'
          }
        ]} />
      </ContentWrapper>
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <Paragraph>
            Última actualización: {new Date().toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}
          </Paragraph>
          
          <Paragraph>
            En Tecniweb Latam, accesible desde www.tecniweb.lat, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene información sobre qué datos personales recopilamos y cómo los utilizamos.
          </Paragraph>
          
          <Paragraph>
            Si tienes preguntas adicionales o requieres más información sobre nuestra Política de Privacidad, no dudes en contactarnos.
          </Paragraph>
          
          <SectionTitle theme={theme}>1. Recopilación de Información</SectionTitle>
          <Paragraph>
            Recopilamos información personal que nos proporcionas cuando:
          </Paragraph>
          
          <List theme={theme}>
            <li>Completas formularios en nuestro sitio web</li>
            <li>Te suscribes a nuestro boletín</li>
            <li>Solicitas información sobre nuestros servicios</li>
            <li>Participas en encuestas o promociones</li>
            <li>Nos contactas a través de nuestros canales de comunicación</li>
          </List>
          
          <Paragraph>
            La información personal que podemos recopilar incluye:
          </Paragraph>
          
          <List theme={theme}>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Nombre de la empresa (en caso de representar a una)</li>
            <li>Información sobre tu proyecto o necesidades</li>
          </List>
          
          <SubTitle theme={theme}>1.1 Datos recopilados automáticamente</SubTitle>
          <Paragraph>
            Además, recopilamos automáticamente cierta información cuando visitas nuestro sitio web, incluyendo:
          </Paragraph>
          
          <List theme={theme}>
            <li>Dirección IP</li>
            <li>Tipo de navegador y versión</li>
            <li>Páginas que visitas en nuestro sitio</li>
            <li>Tiempo y fecha de tu visita</li>
            <li>Tiempo que pasas en cada página</li>
            <li>Información sobre tu dispositivo</li>
          </List>
          
          <SectionTitle theme={theme}>2. Uso de la Información</SectionTitle>
          <Paragraph>
            Utilizamos la información que recopilamos para los siguientes propósitos:
          </Paragraph>
          
          <List theme={theme}>
            <li>Proporcionar, operar y mantener nuestro sitio web</li>
            <li>Mejorar, personalizar y ampliar nuestro sitio web</li>
            <li>Entender y analizar cómo utilizas nuestro sitio web</li>
            <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
            <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, para proporcionarte actualizaciones y otra información relacionada con el sitio web y para fines de marketing y promocionales</li>
            <li>Enviarte correos electrónicos</li>
            <li>Encontrar y prevenir fraudes</li>
            <li>Responder a tus solicitudes, preguntas y necesidades</li>
          </List>
          
          <SectionTitle theme={theme}>3. Base Legal para el Procesamiento</SectionTitle>
          <Paragraph>
            Procesamos tus datos personales solo cuando tenemos una base legal válida para hacerlo. Estas bases legales incluyen:
          </Paragraph>
          
          <List theme={theme}>
            <li><strong>Consentimiento:</strong> Has dado tu consentimiento para el procesamiento de tus datos personales para uno o más propósitos específicos.</li>
            <li><strong>Ejecución de un contrato:</strong> El procesamiento es necesario para la ejecución de un contrato del que eres parte o para tomar medidas a petición tuya antes de celebrar un contrato.</li>
            <li><strong>Obligaciones legales:</strong> El procesamiento es necesario para cumplir con una obligación legal a la que estamos sujetos.</li>
            <li><strong>Intereses legítimos:</strong> El procesamiento es necesario para los fines de los intereses legítimos perseguidos por nosotros o por un tercero, excepto cuando dichos intereses son anulados por tus intereses o derechos y libertades fundamentales que requieren la protección de datos personales.</li>
          </List>
          
          <SectionTitle theme={theme}>4. Retención de Datos</SectionTitle>
          <Paragraph>
            Retendremos tus datos personales solo durante el tiempo necesario para los fines establecidos en esta Política de Privacidad. Mantendremos y utilizaremos tus datos en la medida necesaria para cumplir con nuestras obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.
          </Paragraph>
          
          <SectionTitle theme={theme}>5. Transferencia de Datos</SectionTitle>
          <Paragraph>
            Tu información, incluidos los datos personales, puede ser transferida y mantenida en ordenadores ubicados fuera de tu estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de tu jurisdicción.
          </Paragraph>
          
          <Paragraph>
            Si te encuentras fuera de España y eliges proporcionarnos información, ten en cuenta que transferimos los datos, incluidos los datos personales, a España y los procesamos allí.
          </Paragraph>
          
          <Paragraph>
            Tu consentimiento a esta Política de Privacidad seguido de tu envío de dicha información representa tu acuerdo con esa transferencia.
          </Paragraph>
          
          <Paragraph>
            Tecniweb Latam tomará todas las medidas razonablemente necesarias para garantizar que tus datos sean tratados de forma segura y de acuerdo con esta Política de Privacidad y no se realizará ninguna transferencia de tus datos personales a una organización o país a menos que existan controles adecuados establecidos, incluida la seguridad de tus datos y otra información personal.
          </Paragraph>
          
          <SectionTitle theme={theme}>6. Divulgación de Datos</SectionTitle>
          <SubTitle theme={theme}>6.1 Requisitos legales</SubTitle>
          <Paragraph>
            Tecniweb Latam puede divulgar tus datos personales de buena fe cuando considere que esta acción es necesaria para:
          </Paragraph>
          
          <List theme={theme}>
            <li>Cumplir con una obligación legal</li>
            <li>Proteger y defender los derechos o propiedad de Tecniweb Latam</li>
            <li>Prevenir o investigar posibles irregularidades en relación con el Servicio</li>
            <li>Proteger la seguridad personal de los usuarios del Servicio o del público</li>
            <li>Protegerse contra la responsabilidad legal</li>
          </List>
          
          <SubTitle theme={theme}>6.2 Proveedores de servicios</SubTitle>
          <Paragraph>
            Podemos emplear a empresas e individuos terceros para facilitar nuestro Servicio ("Proveedores de Servicios"), para proporcionar el Servicio en nuestro nombre, para realizar servicios relacionados con el Servicio o para ayudarnos a analizar cómo se utiliza nuestro Servicio.
          </Paragraph>
          
          <Paragraph>
            Estos terceros tienen acceso a tus Datos Personales únicamente para realizar estas tareas en nuestro nombre y están obligados a no divulgarlos ni utilizarlos para ningún otro fin.
          </Paragraph>
          
          <SectionTitle theme={theme}>7. Seguridad de los Datos</SectionTitle>
          <Paragraph>
            La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger tus datos personales, no podemos garantizar su seguridad absoluta.
          </Paragraph>
          
          <SectionTitle theme={theme}>8. Tus Derechos de Protección de Datos</SectionTitle>
          <Paragraph>
            Tecniweb Latam tiene como objetivo tomar medidas razonables para permitirte corregir, modificar, eliminar o limitar el uso de tus Datos Personales.
          </Paragraph>
          
          <Paragraph>
            Si deseas ser informado sobre qué Datos Personales tenemos sobre ti y si deseas que sean eliminados de nuestros sistemas, por favor contáctanos.
          </Paragraph>
          
          <Paragraph>
            En determinadas circunstancias, tienes los siguientes derechos de protección de datos:
          </Paragraph>
          
          <List theme={theme}>
            <li><strong>Derecho de acceso:</strong> Tienes derecho a acceder a la información que tenemos sobre ti.</li>
            <li><strong>Derecho de rectificación:</strong> Tienes derecho a rectificar tu información si esa información es inexacta o incompleta.</li>
            <li><strong>Derecho al olvido:</strong> Tienes derecho a que eliminemos tu información personal de nuestros registros.</li>
            <li><strong>Derecho a la restricción del procesamiento:</strong> Tienes derecho a restringir el procesamiento de tu información personal.</li>
            <li><strong>Derecho a la portabilidad de datos:</strong> Tienes derecho a obtener una copia de tu información personal en un formato estructurado, legible por máquina y comúnmente usado.</li>
            <li><strong>Derecho a oponerte:</strong> Tienes derecho a oponerte a que procesemos tu información personal.</li>
            <li><strong>Derecho a retirar el consentimiento:</strong> Tienes derecho a retirar tu consentimiento en cualquier momento cuando nos hayamos basado en tu consentimiento para procesar tu información personal.</li>
          </List>
          
          <SectionTitle theme={theme}>9. Enlaces a Otros Sitios</SectionTitle>
          <Paragraph>
            Nuestro Servicio puede contener enlaces a otros sitios que no son operados por nosotros. Si haces clic en un enlace de terceros, serás dirigido al sitio de ese tercero. Te recomendamos encarecidamente que revises la Política de Privacidad de cada sitio que visites.
          </Paragraph>
          
          <Paragraph>
            No tenemos control ni asumimos responsabilidad alguna por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.
          </Paragraph>
          
          <SectionTitle theme={theme}>10. Cambios en esta Política de Privacidad</SectionTitle>
          <Paragraph>
            Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.
          </Paragraph>
          
          <Paragraph>
            Te recomendamos que revises esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.
          </Paragraph>
          
          <SectionTitle theme={theme}>11. Contacto</SectionTitle>
          <Paragraph>
            Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos:
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
            Si tienes alguna pregunta sobre nuestra política de privacidad o cualquier otro aspecto legal de nuestros servicios, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
          </Paragraph>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default PoliticaPrivacidad;
