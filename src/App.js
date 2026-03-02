import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

// Import the ImageFallbackProvider to handle missing images
import { ImageFallbackProvider } from './utils/ImageFallbackProvider';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LegalFooter from './components/LegalFooter';
import Loader from './components/Loader';
import PageLoader from './components/PageLoader';
import SocialMediaIcons from './components/SocialMediaIcons';
import PromotionalModal from './components/PromotionalModal';
import InfoModal from './components/InfoModal';
import GoogleCalendarButton from './components/GoogleCalendarButton';
import AiBot from './components/AiBot';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Resources from './pages/Resources';
import AboutUs from './pages/AboutUs';
import AdminPage from './pages/AdminPage';


// Servicios Subpages
import DesarrolloWebPage from './pages/servicios/DesarrolloWeb';
import AplicacionesMovilesPage from './pages/servicios/AplicacionesMoviles';
import SoftwareEscritorioPage from './pages/servicios/SoftwareEscritorio';
import ImplementacionPage from './pages/servicios/Implementacion';
import MigracionesPage from './pages/servicios/Migraciones';
import IntegracionIAPage from './pages/servicios/IntegracionIA';
import ModeloOperacionPage from './pages/servicios/ModeloOperacion';

// Recursos Subpages
import BlogPage from './pages/recursos/Blog';
import TutorialesPage from './pages/recursos/Tutoriales';
import CalculadoraCostosPage from './pages/recursos/CalculadoraCostos';

// Blog Posts
import BlogPost1 from './pages/recursos/blog/BlogPost1';
import BlogPost2 from './pages/recursos/blog/BlogPost2';
import BlogPost3 from './pages/recursos/blog/BlogPost3';
import BlogPost4 from './pages/recursos/blog/BlogPost4';
import BlogPost5 from './pages/recursos/blog/BlogPost5';
import BlogPost6 from './pages/recursos/blog/BlogPost6';

// Tutorials
import Tutorial1 from './pages/recursos/tutoriales/Tutorial1';
import Tutorial2 from './pages/recursos/tutoriales/Tutorial2';
import Tutorial3 from './pages/recursos/tutoriales/Tutorial3';
import Tutorial4 from './pages/recursos/tutoriales/Tutorial4';
import Tutorial5 from './pages/recursos/tutoriales/Tutorial5';
import Tutorial6 from './pages/recursos/tutoriales/Tutorial6';
import Tutorial7 from './pages/recursos/tutoriales/Tutorial7';
import Tutorial8 from './pages/recursos/tutoriales/Tutorial8';

// Nosotros Subpages
import MetodologiaTrabajoPage from './pages/nosotros/MetodologiaTrabajo';
import PorqueEscogernos from './pages/nosotros/PorqueEscogernos';
import ValoresCorporativosPage from './pages/nosotros/ValoresCorporativos';
import VisionPage from './pages/nosotros/Vision';
import ImpactoSocialPage from './pages/nosotros/ImpactoSocial';

// Legal Pages
import PoliticaCookies from './pages/PoliticaCookies';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';

function App() {
  const { theme } = useTheme();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Page transition loader
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Show promotional modal after 75 seconds
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 75000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  // Show info modal after 240 seconds
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowInfoModal(true);
      }, 240000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <ImageFallbackProvider>
      <div className={`app ${theme}-theme`}>
        <Header />
        <SocialMediaIcons />
        <AiBot />
        
        {pageLoading ? (
          <PageLoader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/nosotros" element={<AboutUs />} />
            
            {/* Servicios Subpages */}
            <Route path="/servicios/desarrollo-web" element={<DesarrolloWebPage />} />
            <Route path="/servicios/aplicaciones-moviles" element={<AplicacionesMovilesPage />} />
            <Route path="/servicios/software-escritorio" element={<SoftwareEscritorioPage />} />
            <Route path="/servicios/implementacion-customizacion" element={<ImplementacionPage />} />
            <Route path="/servicios/migraciones" element={<MigracionesPage />} />
            <Route path="/servicios/integracion-ia" element={<IntegracionIAPage />} />
            <Route path="/servicios/modelo-operacion" element={<ModeloOperacionPage />} />
            
            {/* Recursos Subpages */}
            <Route path="/recursos/blog" element={<BlogPage />} />
            <Route path="/recursos/tutoriales" element={<TutorialesPage />} />
            <Route path="/recursos/calculadora-costos" element={<CalculadoraCostosPage />} />
            
            {/* Blog Posts */}
            <Route path="/recursos/blog/1" element={<BlogPost1 />} />
            <Route path="/recursos/blog/2" element={<BlogPost2 />} />
            <Route path="/recursos/blog/3" element={<BlogPost3 />} />
            <Route path="/recursos/blog/4" element={<BlogPost4 />} />
            <Route path="/recursos/blog/5" element={<BlogPost5 />} />
            <Route path="/recursos/blog/6" element={<BlogPost6 />} />
            
            {/* Tutorials */}
            <Route path="/recursos/tutoriales/1" element={<Tutorial1 />} />
            <Route path="/recursos/tutoriales/2" element={<Tutorial2 />} />
            <Route path="/recursos/tutoriales/3" element={<Tutorial3 />} />
            <Route path="/recursos/tutoriales/4" element={<Tutorial4 />} />
            <Route path="/recursos/tutoriales/5" element={<Tutorial5 />} />
            <Route path="/recursos/tutoriales/6" element={<Tutorial6 />} />
            <Route path="/recursos/tutoriales/7" element={<Tutorial7 />} />
            <Route path="/recursos/tutoriales/8" element={<Tutorial8 />} />
           
            {/* Nosotros Subpages */}
            <Route path="/nosotros/metodologia" element={<MetodologiaTrabajoPage />} />
            <Route path="/nosotros/porque-escogernos" element={<PorqueEscogernos />} />
            <Route path="/nosotros/valores-corporativos" element={<ValoresCorporativosPage />} />
            <Route path="/nosotros/vision" element={<VisionPage />} />
            <Route path="/nosotros/impacto-social" element={<ImpactoSocialPage />} />
            
            {/* Legal Pages */}
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            
            {/* Admin Page */}
            <Route path="/admin/bot" element={<AdminPage />} />
          </Routes>
        )}
        
        <Footer />
        <LegalFooter />
        
        {showPromoModal && (
          <PromotionalModal onClose={() => setShowPromoModal(false)} />
        )}
        
        {showInfoModal && (
          <InfoModal onClose={() => setShowInfoModal(false)} />
        )}
      </div>
    </ImageFallbackProvider>
  );
}

export default App;
