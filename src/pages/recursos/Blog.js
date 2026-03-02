import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import HeroBanner from '../../components/HeroBanner';
import Breadcrumbs from '../../components/Breadcrumb';
import ParallaxSection from '../../components/ParallaxSection';
import ContactForm from '../../components/ContactForm';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const BlogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#777' : '#999'};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 15px;
  line-height: 1.6;
`;

const BlogLink = styled(Link)`
  display: inline-block;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  &::after {
    content: ' →';
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.active 
    ? (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)')
    : (props.theme === 'light' ? '#f0f0f0' : '#2a2a2a')};
  color: ${props => props.active
    ? 'white'
    : (props.theme === 'light' ? '#555' : '#ccc')};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => !props.active && (props.theme === 'light' ? '#e5e5e5' : '#333')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Blog = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Sample blog articles
  const articles = [
    {
      id: 1,
      title: "La Inteligencia Artificial en el Desarrollo de Software Moderno",
      date: "28 de Julio, 2025",
      author: "Luna Rivas",
      excerpt: "La integración de la inteligencia artificial en el desarrollo de software está revolucionando la forma en que creamos aplicaciones. Descubre cómo las empresas latinoamericanas están aprovechando esta tecnología para optimizar sus procesos y crear soluciones más inteligentes.",
      content: "La inteligencia artificial (IA) ha dejado de ser un concepto futurista para convertirse en una herramienta fundamental en el desarrollo de software moderno. Las empresas latinoamericanas están comenzando a integrar algoritmos de aprendizaje automático, procesamiento de lenguaje natural y visión por computadora en sus aplicaciones, lo que les permite ofrecer experiencias más personalizadas y eficientes a sus usuarios. En Tecniweb Latam, hemos implementado soluciones de IA en diversos proyectos, desde chatbots inteligentes hasta sistemas de análisis predictivo para empresas de diferentes sectores. La clave está en identificar los procesos que pueden beneficiarse de la automatización inteligente y aplicar las tecnologías adecuadas para cada caso. A medida que la IA continúa evolucionando, esperamos ver una adopción aún mayor en la región, lo que impulsará la innovación y la competitividad de las empresas latinoamericanas en el mercado global.",
      image: require('../../assets/recursos-pics/blog/blog1.jpg')
    },
    {
      id: 2,
      title: "Tendencias en Desarrollo Web para 2025",
      date: "15 de Julio, 2025",
      author: "Luna Rivas",
      excerpt: "El mundo del desarrollo web evoluciona constantemente. Conoce las tendencias más importantes que están definiendo el diseño y la funcionalidad de los sitios web en 2025 y cómo implementarlas en tu próximo proyecto.",
      content: "El desarrollo web en 2025 está marcado por varias tendencias innovadoras que están transformando la experiencia del usuario en línea. Entre las más destacadas se encuentran las interfaces de voz, que permiten a los usuarios interactuar con los sitios web mediante comandos hablados; el diseño minimalista con microinteracciones, que combina la simplicidad visual con pequeñas animaciones que mejoran la experiencia del usuario; y las Progressive Web Apps (PWAs), que ofrecen experiencias similares a las aplicaciones nativas directamente desde el navegador. Además, la accesibilidad web ha cobrado una importancia sin precedentes, con más empresas reconociendo la necesidad de crear sitios inclusivos para usuarios con diferentes capacidades. En Tecniweb Latam, implementamos estas tendencias en todos nuestros proyectos, asegurándonos de que nuestros clientes cuenten con sitios web modernos, accesibles y optimizados para el futuro.",
      image: require('../../assets/recursos-pics/blog/blog2.jpg')
    },
    {
      id: 3,
      title: "Cómo Implementar una Estrategia de Transformación Digital Exitosa",
      date: "5 de Julio, 2025",
      author: "Luna Rivas",
      excerpt: "La transformación digital es esencial para la supervivencia de las empresas en la era actual. Aprende los pasos clave para implementar una estrategia efectiva que impulse el crecimiento y la innovación en tu organización.",
      content: "Implementar una estrategia de transformación digital exitosa requiere un enfoque holístico que va más allá de simplemente adoptar nuevas tecnologías. En primer lugar, es fundamental realizar un diagnóstico exhaustivo de la situación actual de la empresa, identificando los procesos que pueden optimizarse mediante la digitalización. Luego, es necesario establecer objetivos claros y medibles, alineados con la visión y misión de la organización. La formación del personal es otro aspecto crucial, ya que los empleados deben estar preparados para adaptarse a los nuevos sistemas y metodologías de trabajo. Además, es importante seleccionar las herramientas tecnológicas adecuadas para las necesidades específicas de la empresa, evitando caer en la trampa de adoptar tecnologías de moda que no aportan valor real. Finalmente, la implementación debe ser gradual, con un seguimiento constante que permita realizar ajustes según los resultados obtenidos. En Tecniweb Latam, hemos guiado a numerosas empresas latinoamericanas en su proceso de transformación digital, ayudándoles a aumentar su eficiencia operativa y a mejorar su competitividad en el mercado.",
      image: require('../../assets/recursos-pics/blog/blog3.jpg')
    },
    {
      id: 4,
      title: "Seguridad en Aplicaciones Móviles: Mejores Prácticas",
      date: "20 de Junio, 2025",
      author: "Luna Rivas",
      excerpt: "La seguridad es un aspecto crucial en el desarrollo de aplicaciones móviles. Descubre las mejores prácticas para proteger los datos de tus usuarios y prevenir vulnerabilidades en tus apps.",
      content: "La seguridad en aplicaciones móviles se ha convertido en una preocupación primordial tanto para desarrolladores como para usuarios finales. Con el aumento de las transacciones financieras y el almacenamiento de datos personales en dispositivos móviles, garantizar la seguridad de estas aplicaciones es más importante que nunca. Entre las mejores prácticas se encuentran la implementación de autenticación multifactor, que añade una capa adicional de seguridad al proceso de inicio de sesión; el cifrado de datos sensibles, tanto en tránsito como en reposo; y la realización de auditorías de seguridad regulares para identificar y corregir posibles vulnerabilidades. Además, es fundamental mantener las bibliotecas y dependencias actualizadas, ya que muchas brechas de seguridad se producen debido a componentes obsoletos. En Tecniweb Latam, seguimos un riguroso protocolo de seguridad en el desarrollo de aplicaciones móviles, que incluye pruebas de penetración y análisis de código estático para garantizar que nuestros productos sean resistentes a las amenazas más comunes.",
      image: require('../../assets/recursos-pics/blog/blog4.jpg')
    },
    {
      id: 5,
      title: "El Futuro del E-commerce en Latinoamérica",
      date: "10 de Junio, 2025",
      author: "Luna Rivas",
      excerpt: "El comercio electrónico está experimentando un crecimiento sin precedentes en Latinoamérica. Analiza las tendencias actuales y futuras que están moldeando este sector y cómo las empresas pueden aprovecharlas.",
      content: "El e-commerce en Latinoamérica está experimentando una transformación radical, impulsada por cambios en los hábitos de consumo y avances tecnológicos. La región ha visto un crecimiento exponencial en las ventas en línea, con países como Brasil, México y Colombia liderando esta revolución digital. Entre las tendencias más significativas se encuentran la adopción de tecnologías de realidad aumentada para mejorar la experiencia de compra, permitiendo a los consumidores visualizar productos en su entorno real antes de comprarlos; la implementación de soluciones de pago innovadoras adaptadas a las realidades locales, como pagos en efectivo en puntos de conveniencia para quienes no tienen acceso a tarjetas de crédito; y el auge del comercio social, donde las redes sociales se convierten en plataformas de venta directa. Además, la logística de última milla está evolucionando rápidamente para satisfacer las expectativas de entrega rápida, con empresas invirtiendo en centros de distribución urbanos y alianzas con servicios de entrega locales. En Tecniweb Latam, ayudamos a las empresas a navegar este panorama cambiante, desarrollando soluciones de e-commerce personalizadas que aprovechan estas tendencias y se adaptan a las particularidades del mercado latinoamericano.",
      image: require('../../assets/recursos-pics/blog/blog5.jpg')
    },
    {
      id: 6,
      title: "Desarrollo Sostenible de Software: Reduciendo la Huella de Carbono Digital",
      date: "1 de Junio, 2025",
      author: "Luna Rivas",
      excerpt: "El impacto ambiental del software es un tema cada vez más relevante. Aprende cómo desarrollar aplicaciones más eficientes energéticamente y contribuir a la sostenibilidad ambiental desde el sector tecnológico.",
      content: "El desarrollo sostenible de software se está convirtiendo en una prioridad para las empresas tecnológicas conscientes de su impacto ambiental. La huella de carbono digital, generada por el consumo energético de los centros de datos, la transmisión de datos y el uso de dispositivos, representa una proporción significativa y creciente de las emisiones globales de CO2. Para reducir este impacto, los desarrolladores están implementando diversas estrategias: optimización del código para reducir el consumo de recursos, diseño de interfaces que minimicen la transferencia de datos, selección de proveedores de alojamiento que utilicen energías renovables, y aplicación de principios de economía circular en el ciclo de vida del software. En Tecniweb Latam, hemos adoptado un enfoque de 'Green Coding', incorporando estas prácticas en nuestro proceso de desarrollo y educando a nuestros clientes sobre los beneficios tanto ambientales como económicos de un software más eficiente. Creemos firmemente que la innovación tecnológica y la sostenibilidad ambiental pueden y deben avanzar de la mano, creando soluciones digitales que no solo resuelvan problemas actuales sino que también preserven los recursos para las generaciones futuras.",
      image: require('../../assets/recursos-pics/blog/blog6.jpg')
    }
  ];

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Banner images
  const bannerImages = [
    require('../../assets/banner-pics/banner-recursos1.jpg'),
    require('../../assets/banner-pics/banner-recursos2.jpg'),
    require('../../assets/banner-pics/banner-recursos3.jpg'),
    require('../../assets/banner-pics/banner-recursos4.webp')
  ];

  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Tecniweb Latam</title>
        <meta name="description" content="Explora nuestro blog con artículos sobre las últimas tendencias en tecnología, desarrollo de software y transformación digital." />
        <meta name="keywords" content="blog tecnología, desarrollo software, transformación digital, inteligencia artificial, tendencias tech" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Blog de Tecniweb Latam"
        subtitle="Insights y tendencias sobre tecnología y desarrollo de software"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Recursos', path: '/recursos' },
          { label: 'Blog', path: '/recursos/blog' }
        ]} />
      </ContentWrapper>
      
      {/* Blog Articles */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Artículos Recientes</SectionTitle>
          <SectionDescription theme={theme}>
            Explora nuestros artículos sobre las últimas tendencias en tecnología, desarrollo de software y transformación digital.
          </SectionDescription>
          
          <BlogGrid>
            {currentArticles.map(article => (
              <BlogCard key={article.id} theme={theme}>
                <BlogImage>
                  <img src={article.image} alt={article.title} />
                </BlogImage>
                <BlogContent>
                  <BlogTitle theme={theme}>{article.title}</BlogTitle>
                  <BlogMeta theme={theme}>
                    <MetaItem>
                      <FaCalendarAlt /> {article.date}
                    </MetaItem>
                    <MetaItem>
                      <FaUser /> {article.author}
                    </MetaItem>
                  </BlogMeta>
                  <BlogExcerpt theme={theme}>{article.excerpt}</BlogExcerpt>
                  <BlogLink to={`/recursos/blog/${article.id}`} theme={theme}>Leer más</BlogLink>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
          
          {/* Pagination */}
          <PaginationContainer>
            <PaginationButton 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              theme={theme}
            >
              &laquo; Anterior
            </PaginationButton>
            
            {[...Array(totalPages)].map((_, index) => (
              <PaginationButton
                key={index}
                onClick={() => paginate(index + 1)}
                active={currentPage === index + 1}
                theme={theme}
              >
                {index + 1}
              </PaginationButton>
            ))}
            
            <PaginationButton 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              theme={theme}
            >
              Siguiente &raquo;
            </PaginationButton>
          </PaginationContainer>
        </ContentWrapper>
      </SectionContainer>
      
      {/* Subscribe Parallax */}
      <ParallaxSection 
        title="Mantente Actualizado"
        description="Suscríbete a nuestro newsletter para recibir los últimos artículos, noticias y recursos directamente en tu bandeja de entrada."
        image={require('../../assets/recursos-pics/subscribete.jpg')}
        buttonText="Suscribirse"
        buttonLink="/contacto"
        withSubscriptionInput={true}
      />
      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Tienes alguna pregunta?</SectionTitle>
          <SectionDescription theme={theme}>
            Contáctanos si deseas más información sobre algún tema o si quieres sugerir un tema para un próximo artículo.
          </SectionDescription>
          <ContactForm />
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
  );
};

export default Blog;
