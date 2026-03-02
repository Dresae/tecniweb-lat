import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../context/ThemeContext';

const TutorialesContainer = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'light' ? '#ddd' : '#444'};
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  
  @media (max-width: 768px) {
    flex-grow: 1;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'light' ? '#ddd' : '#444'};
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  width: 250px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TutorialesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TutorialCard = styled(Link)`
  text-decoration: none;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const TutorialImage = styled.div`
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TutorialContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TutorialTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const TutorialExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  flex-grow: 1;
`;

const TutorialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#777' : '#999'};
`;

const TutorialDate = styled.span``;

const TutorialDifficulty = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  
  &.beginner {
    background-color: ${props => props.theme === 'light' ? '#e8f5e9' : '#1b5e20'};
    color: ${props => props.theme === 'light' ? '#2e7d32' : '#a5d6a7'};
  }
  
  &.intermediate {
    background-color: ${props => props.theme === 'light' ? '#fff8e1' : '#f57f17'};
    color: ${props => props.theme === 'light' ? '#f57f17' : '#ffecb3'};
  }
  
  &.advanced {
    background-color: ${props => props.theme === 'light' ? '#ffebee' : '#b71c1c'};
    color: ${props => props.theme === 'light' ? '#c62828' : '#ef9a9a'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  background-color: ${props => props.active 
    ? (props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)')
    : (props.theme === 'light' ? '#f5f5f5' : '#2a2a2a')};
  color: ${props => props.active 
    ? 'white'
    : (props.theme === 'light' ? '#333' : '#ddd')};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active 
      ? (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)')
      : (props.theme === 'light' ? '#e0e0e0' : '#3a3a3a')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: ${props => props.active 
        ? (props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)')
        : (props.theme === 'light' ? '#f5f5f5' : '#2a2a2a')};
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
`;

const Tutoriales = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const tutorialsPerPage = 6;
  
  // Sample tutorial data
  const tutorials = [
    {
      id: 1,
      title: "Cómo Crear una API REST con Node.js y Express",
      excerpt: "Aprende a desarrollar una API REST completa utilizando Node.js y Express, incluyendo operaciones CRUD, validación de datos y conexión a MongoDB.",
      date: "15 de Julio, 2025",
      difficulty: "Intermediate",
      category: "Backend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial1.jpg')
    },
    {
      id: 2,
      title: "Autenticación JWT para APIs REST con Node.js",
      excerpt: "Implementa un sistema de autenticación seguro utilizando JSON Web Tokens (JWT) en tu API REST de Node.js para proteger rutas y recursos.",
      date: "20 de Julio, 2025",
      difficulty: "Intermediate",
      category: "Backend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial2.jpg')
    },
    {
      id: 3,
      title: "Creando una aplicación React que consume una API REST",
      excerpt: "Aprende a construir una aplicación frontend con React que se conecta a una API REST, gestionando estados, efectos y formularios.",
      date: "25 de Julio, 2025",
      difficulty: "Intermediate",
      category: "Frontend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial3.png')
    },
    {
      id: 4,
      title: "Desplegando una API Node.js en AWS",
      excerpt: "Guía paso a paso para desplegar una API Node.js en Amazon Web Services (AWS) utilizando EC2, RDS y otros servicios para un entorno de producción robusto.",
      date: "30 de Julio, 2025",
      difficulty: "Advanced",
      category: "DevOps",
      image: require('../../assets/recursos-pics/tutoriales/tutorial4.png')
    },
    {
      id: 5,
      title: "Introducción a Docker para desarrolladores web",
      excerpt: "Descubre cómo Docker puede simplificar tu flujo de trabajo de desarrollo web, creando entornos consistentes y reproducibles para tus aplicaciones.",
      date: "5 de Agosto, 2025",
      difficulty: "Beginner",
      category: "DevOps",
      image: require('../../assets/recursos-pics/tutoriales/tutorial5.jpg')
    },
    {
      id: 6,
      title: "Implementando GraphQL en una aplicación web moderna",
      excerpt: "Aprende a implementar GraphQL en una aplicación web moderna, utilizando Node.js y Express para crear una API RESTful.",
      date: "10 de Agosto, 2025",
      difficulty: "Intermediate",
      category: "Backend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial6.png')
    },
    {
      id: 7,
      title: "Desarrollo de aplicaciones web con TypeScript",
      excerpt: "Aprende a desarrollar aplicaciones web modernas utilizando TypeScript, una versión tipada de JavaScript que mejora la calidad del código.",
      date: "15 de Agosto, 2025",
      difficulty: "Advanced",
      category: "Frontend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial7.jpg')
    },
    {
      id: 8,
      title: "Optimización de rendimiento en aplicaciones web",
      excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web, incluyendo memoización, lazy loading y optimización de renderizado.",
      date: "20 de Agosto, 2025",
      difficulty: "Advanced",
      category: "Frontend",
      image: require('../../assets/recursos-pics/tutoriales/tutorial8.jpg')
    }
  ];
  
  // Filter tutorials based on search term and filters
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tutorial.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || tutorial.difficulty === difficultyFilter;
    
    const matchesCategory = categoryFilter === 'all' || tutorial.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  // Pagination logic
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = filteredTutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);
  const totalPages = Math.ceil(filteredTutorials.length / tutorialsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };
  
  return (
    <TutorialesContainer>
      <Helmet>
        <title>Tutoriales | Tecniweb Latam</title>
        <meta name="description" content="Explora nuestros tutoriales detallados sobre desarrollo web, móvil, DevOps y más. Aprende nuevas tecnologías y mejora tus habilidades con guías paso a paso." />
        <meta name="keywords" content="tutoriales, desarrollo web, programación, Node.js, React, DevOps, Docker, AWS, React Native" />
      </Helmet>
      
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: 'Recursos', path: '/recursos' },
        { label: 'Tutoriales', path: '/recursos/tutoriales' }
      ]} />
      
      <Banner 
        images={[
          require('../../assets/banner-pics/banner-recursos1.jpg'),
          require('../../assets/banner-pics/banner-recursos2.jpg'),
          require('../../assets/banner-pics/banner-recursos3.jpg'),
          require('../../assets/banner-pics/banner-recursos4.webp')
        ]}
        title="Tutoriales"
        subtitle="Aprende nuevas tecnologías con nuestras guías paso a paso"
      />
      
      <ContentWrapper>
        <SectionTitle theme={theme}>Tutoriales de Tecniweb Latam</SectionTitle>
        <SectionDescription theme={theme}>
          Explora nuestra colección de tutoriales detallados sobre desarrollo web, móvil, DevOps y más.
          Diseñados para ayudarte a dominar nuevas tecnologías y mejorar tus habilidades.
        </SectionDescription>
        
        <FilterContainer>
          <FilterGroup>
            <FilterLabel theme={theme}>Dificultad:</FilterLabel>
            <FilterSelect 
              theme={theme}
              value={difficultyFilter}
              onChange={handleDifficultyChange}
            >
              <option value="all">Todas</option>
              <option value="Beginner">Principiante</option>
              <option value="Intermediate">Intermedio</option>
              <option value="Advanced">Avanzado</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel theme={theme}>Categoría:</FilterLabel>
            <FilterSelect 
              theme={theme}
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">Todas</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Móvil</option>
              <option value="DevOps">DevOps</option>
            </FilterSelect>
          </FilterGroup>
          
          <SearchInput 
            theme={theme}
            type="text" 
            placeholder="Buscar tutoriales..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </FilterContainer>
        
        {currentTutorials.length > 0 ? (
          <>
            <TutorialesGrid>
              {currentTutorials.map(tutorial => (
                <TutorialCard key={tutorial.id} to={`/recursos/tutoriales/${tutorial.id}`} theme={theme}>
                  <TutorialImage>
                    <img src={tutorial.image} alt={tutorial.title} />
                  </TutorialImage>
                  <TutorialContent>
                    <TutorialTitle theme={theme}>{tutorial.title}</TutorialTitle>
                    <TutorialExcerpt theme={theme}>{tutorial.excerpt}</TutorialExcerpt>
                    <TutorialMeta theme={theme}>
                      <TutorialDate>{tutorial.date}</TutorialDate>
                      <TutorialDifficulty 
                        className={tutorial.difficulty.toLowerCase()} 
                        theme={theme}
                      >
                        {tutorial.difficulty === 'Beginner' ? 'Principiante' : 
                         tutorial.difficulty === 'Intermediate' ? 'Intermedio' : 'Avanzado'}
                      </TutorialDifficulty>
                    </TutorialMeta>
                  </TutorialContent>
                </TutorialCard>
              ))}
            </TutorialesGrid>
            
            {totalPages > 1 && (
              <Pagination>
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
              </Pagination>
            )}
          </>
        ) : (
          <NoResults theme={theme}>
            No se encontraron tutoriales que coincidan con tu búsqueda. Por favor, intenta con otros criterios.
          </NoResults>
        )}
      </ContentWrapper>
    </TutorialesContainer>
  );
};

export default Tutoriales;
