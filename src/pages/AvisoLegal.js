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

const AvisoLegal = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <Helmet>
        <title>Aviso Legal | Tecniweb Latam</title>
        <meta name="description" content="Aviso legal de Tecniweb Latam. Información sobre términos y condiciones de uso del sitio web." />
      </Helmet>
      
      <HeroSection>
        <ContentWrapper>
          <HeroTitle>Aviso Legal</HeroTitle>
        </ContentWrapper>
      </HeroSection>
      
      <ContentWrapper>
        <Breadcrumbs items={[
          {
            label: 'Inicio',
            path: '/'
          },
          {
            label: 'Aviso Legal',
            path: '/aviso-legal'
          }
        ]} />
      </ContentWrapper>
      
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <Paragraph>
            Última actualización: {new Date().toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}
          </Paragraph>
          
          <SectionTitle theme={theme}>1. Información General</SectionTitle>
          <Paragraph>
            El presente aviso legal regula el uso del sitio web www.tecniweb.lat (en adelante, "el Sitio Web"), propiedad de Tecniweb Latam (en adelante, "Tecniweb Latam"), con domicilio social en la ciudad de Funza-Colombia
          </Paragraph>
          
          <Paragraph>
            Para comunicarse con nosotros, ponemos a su disposición diferentes medios de contacto que detallamos a continuación:
          </Paragraph>
          
          <List theme={theme}>
            <li>Teléfono: +57 322 983 3008</li>
            <li>Email: digital@tecniweb.lat(tecniweblat@gmail.com)</li>
          </List>
          
          <Paragraph>
            Todas las notificaciones y comunicaciones entre los usuarios y Tecniweb Latam se considerarán eficaces, a todos los efectos, cuando se realicen a través de cualquier medio de los detallados anteriormente.
          </Paragraph>
          
          <SectionTitle theme={theme}>2. Condiciones de Acceso y Utilización</SectionTitle>
          <Paragraph>
            El Sitio Web y sus servicios son de acceso libre y gratuito. No obstante, Tecniweb Latam puede condicionar la utilización de algunos de los servicios ofrecidos en su web a la previa cumplimentación del correspondiente formulario.
          </Paragraph>
          
          <Paragraph>
            El usuario garantiza la autenticidad y actualidad de todos aquellos datos que comunique a Tecniweb Latam y será el único responsable de las manifestaciones falsas o inexactas que realice.
          </Paragraph>
          
          <SubTitle theme={theme}>2.1 Condiciones de uso</SubTitle>
          <Paragraph>
            El usuario se compromete a utilizar el Sitio Web de conformidad con la ley, el presente aviso legal, las condiciones particulares de ciertos servicios y demás avisos e instrucciones puestos en su conocimiento, así como con la moral y las buenas costumbres generalmente aceptadas y el orden público.
          </Paragraph>
          
          <Paragraph>
            A tal efecto, el usuario se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos en el presente aviso legal, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios, los equipos informáticos o los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informático de Tecniweb Latam.
          </Paragraph>
          
          <SubTitle theme={theme}>2.2 Medidas de seguridad</SubTitle>
          <Paragraph>
            Los datos personales comunicados por el usuario a Tecniweb Latam pueden ser almacenados en bases de datos automatizadas o no, cuya titularidad corresponde en exclusiva a Tecniweb Latam, asumiendo ésta todas las medidas de índole técnica, organizativa y de seguridad que garantizan la confidencialidad, integridad y calidad de la información contenida en las mismas de acuerdo con lo establecido en la normativa vigente en protección de datos.
          </Paragraph>
          
          <SectionTitle theme={theme}>3. Propiedad Intelectual e Industrial</SectionTitle>
          <Paragraph>
            Tecniweb Latam por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial del Sitio Web, así como de los elementos contenidos en el mismo (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Tecniweb Latam o bien de sus licenciantes.
          </Paragraph>
          
          <Paragraph>
            Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos del Sitio Web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Tecniweb Latam.
          </Paragraph>
          
          <Paragraph>
            El usuario se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de Tecniweb Latam. Podrá visualizar los elementos del Sitio Web e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. El usuario deberá abstenerse de suprimir, alterar, eludir o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en el Sitio Web.
          </Paragraph>
          
          <SectionTitle theme={theme}>4. Exclusión de Garantías y Responsabilidad</SectionTitle>
          <Paragraph>
            Tecniweb Latam no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del Sitio Web o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </Paragraph>
          
          <Paragraph>
            Tecniweb Latam se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
          </Paragraph>
          
          <SectionTitle theme={theme}>5. Enlaces</SectionTitle>
          <Paragraph>
            En el caso de que en el Sitio Web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Tecniweb Latam no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso Tecniweb Latam asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
          </Paragraph>
          
          <Paragraph>
            Igualmente, la inclusión de estas conexiones externas no implicará ningún tipo de asociación, fusión o participación con las entidades conectadas.
          </Paragraph>
          
          <SectionTitle theme={theme}>6. Derecho de Exclusión</SectionTitle>
          <Paragraph>
            Tecniweb Latam se reserva el derecho a denegar o retirar el acceso al Sitio Web y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
          </Paragraph>
          
          <SectionTitle theme={theme}>7. Generalidades</SectionTitle>
          <Paragraph>
            Tecniweb Latam perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su Sitio Web ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
          </Paragraph>
          
          <SectionTitle theme={theme}>8. Modificación de las Presentes Condiciones y Duración</SectionTitle>
          <Paragraph>
            Tecniweb Latam podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen. La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
          </Paragraph>
          
          <SectionTitle theme={theme}>9. Legislación Aplicable y Jurisdicción</SectionTitle>
          <Paragraph>
            La relación entre Tecniweb Latam y el usuario se regirá por la normativa vigente y de aplicación en el territorio español. De surgir cualquier controversia las partes podrán someter sus conflictos a arbitraje o acudir a la jurisdicción ordinaria cumpliendo con las normas sobre jurisdicción y competencia al respecto. Tecniweb Latam tiene su domicilio en Funza, Colombia.
          </Paragraph>
        </ContentWrapper>
      </SectionContainer>
      
      <SectionContainer className="alt-bg" theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Necesitas más información?</SectionTitle>
          <Paragraph>
            Si tienes alguna pregunta sobre nuestro aviso legal o cualquier otro aspecto legal de nuestros servicios, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
          </Paragraph>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default AvisoLegal;
