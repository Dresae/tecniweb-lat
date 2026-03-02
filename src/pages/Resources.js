import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import HeroBanner from '../components/HeroBanner';
import Breadcrumbs from '../components/Breadcrumb';
import ParallaxSection from '../components/ParallaxSection';
import ContactForm from '../components/ContactForm';
import GoogleCalendarButton from '../components/GoogleCalendarButton';
import { FaSearch, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

const ResourcesContainer = styled.div`
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

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled(Link)`
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ResourceImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ResourceCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ResourceCategory = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ResourceContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ResourceTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ResourceDescription = styled.p`
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const ResourceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#777' : '#999'};
`;

const ResourceMetaItem = styled.span`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#222'};
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
    box-shadow: 0 0 0 2px ${props => props.theme === 'light' 
      ? 'rgba(33, 158, 188, 0.2)' 
      : 'rgba(0, 119, 182, 0.2)'
    };
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const CategoryTab = styled.button`
  padding: 8px 15px;
  background-color: ${props => props.active 
    ? (props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)') 
    : (props.theme === 'light' ? '#f0f0f0' : '#2a2a2a')
  };
  color: ${props => props.active ? 'white' : (props.theme === 'light' ? '#555' : '#ccc')};
  border: none;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => !props.active && (props.theme === 'light' ? '#e0e0e0' : '#333')};
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 12px 25px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    transform: translateY(-2px);
  }
`;

const Resources = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Banner images
  const bannerImages = [
    require('../assets/banner-pics/banner-recursos1.jpg'),
    require('../assets/banner-pics/banner-recursos2.jpg'),
    require('../assets/banner-pics/banner-recursos3.jpg'),
    require('../assets/banner-pics/banner-recursos4.webp')
  ];
  
  // Categories
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'blog', label: 'Blog' },
    { id: 'tutoriales', label: 'Tutoriales' }
  ];
  
  // Resources data
  const resourcesData = [
    {
      id: 1,
      title: 'Cómo la Inteligencia Artificial está transformando el desarrollo de software',
      description: 'Descubre cómo la IA está cambiando la forma en que se desarrolla software y cómo puede beneficiar a tu empresa.',
      image: require('../assets/recursos-pics/blog/blog1.jpg'),
      category: 'blog',
      date: '15 Jul 2023',
      author: 'Andy Amador',
      tags: ['Inteligencia Artificial', 'Desarrollo', 'Tendencias']
    },
    {
      id: 1,
      title: 'Tutorial: Cómo Crear una API REST con Node.js y Express',
      description: 'Guía paso a paso para crear una API REST con Node.js y Express.',
      image: require('../assets/recursos-pics/tutoriales/tutorial1.jpg'),
      category: 'tutoriales',
      date: '22 May 2023',
      author: 'Andy Amador',
      tags: ['Chatbot', 'Atención al Cliente', 'Implementación']
    },
    {
      id: 2,
      title: 'Tutorial: Autenticación JWT para APIs REST con Node.js',
      description: 'Aprende técnicas avanzadas para mejorar el rendimiento de tus aplicaciones React y ofrecer una mejor experiencia de usuario.',
      image: require('../assets/recursos-pics/tutoriales/tutorial2.jpg'),
      category: 'tutoriales',
      date: '18 Apr 2023',
      author: 'Andy Amador',
      tags: ['React', 'Rendimiento', 'Frontend']
    },
    {
      id: 2,
      title: 'Tendencias en Desarrollo Web para 2025',
      description: 'Análisis de las principales tendencias tecnológicas que están definiendo el panorama digital este año.',
      image: require('../assets/recursos-pics/blog/blog2.jpg'),
      category: 'blog',
      date: '05 Mar 2023',
      author: 'Andy Amador',
      tags: ['Tendencias', 'Tecnología', 'Innovación']
    },
    {
      id: 3,
      title: 'Tutorial: Creando una aplicación React que consume una API REST',
      description: 'Guía completa para implementar un sistema de autenticación seguro utilizando JSON Web Tokens en aplicaciones web modernas.',
      image: require('../assets/recursos-pics/tutoriales/tutorial3.png'),
      category: 'tutoriales',
      date: '28 Feb 2023',
      author: 'Andy Amador',
      tags: ['Seguridad', 'JWT', 'Autenticación']
    },
    {
      id: 4,
      title: 'Tutorial: Desplegando una API Node.js en AWS',
      description: 'Aprende a crear APIs RESTful escalables y mantenibles utilizando Node.js y Express, siguiendo las mejores prácticas del sector.',
      image: require('../assets/recursos-pics/tutoriales/tutorial4.png'),
      category: 'tutoriales',
      date: '15 Jan 2023',
      author: 'Andy Amador',
      tags: ['API', 'Node.js', 'Express', 'Backend']
    }
  ];
  
  // Filter resources based on active category and search query
  const filteredResources = resourcesData.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search functionality is already implemented with the onChange handler
  };
  
  return (
    <ResourcesContainer>
      <Helmet>
        <title>Recursos | Tecniweb Latam</title>
        <meta name="description" content="Explora nuestros recursos: blog, tutoriales y documentación técnica sobre desarrollo web, aplicaciones móviles y transformación digital." />
        <meta name="keywords" content="recursos tecnológicos, blog tecnología, tutoriales desarrollo, documentación técnica, Tecniweb Latam" />
      </Helmet>
      
      {/* Hero Banner */}
      <HeroBanner 
        images={bannerImages}
        title="Recursos"
        subtitle="Explora nuestro blog, tutoriales y documentación técnica"
      />
      
      <ContentWrapper>
        <Breadcrumbs items={[
          { label: 'Inicio', path: '/' },
          { label: 'Recursos', path: '/recursos' }
        ]} />
      </ContentWrapper>
      
      {/* Resources Section */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>Centro de Recursos</SectionTitle>
          <SectionDescription theme={theme}>
            Descubre artículos, tutoriales y documentación técnica para mantenerte actualizado 
            sobre las últimas tendencias en tecnología y desarrollo de software.
          </SectionDescription>
          
          {/* Search */}
          <SearchContainer>
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInput 
                type="text" 
                placeholder="Buscar recursos..." 
                value={searchQuery}
                onChange={handleSearchChange}
                theme={theme}
              />
              <SearchButton type="submit" theme={theme}>
                <FaSearch />
              </SearchButton>
            </SearchForm>
          </SearchContainer>
          
          {/* Category Tabs */}
          <CategoryTabs>
            {categories.map(category => (
              <CategoryTab 
                key={category.id}
                active={activeCategory === category.id}
                theme={theme}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.label}
              </CategoryTab>
            ))}
          </CategoryTabs>
          
          {/* Resources Grid */}
          <ResourcesGrid>
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} to={`/recursos/${resource.category}/${resource.id}`} theme={theme}>
                <ResourceImage>
                  <img src={resource.image} alt={resource.title} />
                  <ResourceCategory theme={theme}>
                    {categories.find(cat => cat.id === resource.category)?.label}
                  </ResourceCategory>
                </ResourceImage>
                <ResourceContent>
                  <ResourceTitle theme={theme}>{resource.title}</ResourceTitle>
                  <ResourceDescription theme={theme}>{resource.description}</ResourceDescription>
                  <ResourceMeta theme={theme}>
                    <ResourceMetaItem>
                      <FaCalendarAlt /> {resource.date}
                    </ResourceMetaItem>
                    <ResourceMetaItem>
                      <FaUser /> {resource.author}
                    </ResourceMetaItem>
                  </ResourceMeta>
                </ResourceContent>
              </ResourceCard>
            ))}
          </ResourcesGrid>
          
          {filteredResources.length > 0 && (
            <LoadMoreButton theme={theme}>Cargar más recursos</LoadMoreButton>
          )}
          
          {filteredResources.length === 0 && (
            <SectionDescription theme={theme}>
              No se encontraron recursos que coincidan con tu búsqueda. Intenta con otros términos o categorías.
            </SectionDescription>
          )}
        </ContentWrapper>
      </SectionContainer>
      
      {/* Subscribe Section */}
      <ParallaxSection 
        title="Suscríbete a nuestro newsletter"
        description="Recibe las últimas actualizaciones, tutoriales y recursos directamente en tu bandeja de entrada."
        image={require('../assets/recursos-pics/subscribete.jpg')}
        buttonText="Suscribirse"
        buttonLink="/contacto"
      />
      
      {/* Contact Form */}
      <SectionContainer theme={theme}>
        <ContentWrapper>
          <SectionTitle theme={theme}>¿Necesitas más información?</SectionTitle>
          <SectionDescription theme={theme}>
            Si tienes alguna pregunta o necesitas información adicional sobre nuestros recursos, no dudes en contactarnos.
          </SectionDescription>
          <ContactForm />
          <GoogleCalendarButton />
        </ContentWrapper>
      </SectionContainer>
    </ResourcesContainer>
  );
};

export default Resources;
