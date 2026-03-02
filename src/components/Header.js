import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const HomeIcon = styled(FaHome)`
  font-size: 1.5rem;
  padding: 4px;
  border-radius: 50%;
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 5px;
  height: 50px;
  z-index: 100;
  margin: 0 20px;
  padding: var(--padding-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)'};
  box-shadow: ${props => props.theme === 'light' ? 
    '0 10px 30px rgba(0, 0, 0, 0.08), 0 6px 10px rgba(0, 0, 0, 0.05)' : 
    '0 10px 30px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.2)'};
  backdrop-filter: blur(10px);
  border-radius: 14px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    top: 10px;
    margin: 0 10px;
    height: 40px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 35px;
    margin-right: var(--margin-sm);
    margin-left: var(--margin-md);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const LogoTitle = styled.h1`
  font-family: 'Montserrat';
  font-size: 1.7rem;
  font-weight: 700;
  margin-left: var(--margin-md);
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 20px;
    right: ${props => props.isOpen ? '20px' : '-100%'};
    width: 70%;
    max-width: 320px;
    height: calc(80vh - 110px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 60px var(--padding-sm) var(--padding-sm);
    background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(20, 20, 20, 0.98)'};
    box-shadow: ${props => props.theme === 'light' ? 
      '0 10px 30px rgba(0, 0, 0, 0.1), 0 6px 10px rgba(0, 0, 0, 0.05)' : 
      '0 10px 30px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.2)'};
    border-radius: 16px;
    backdrop-filter: blur(10px);
    transition: right 0.3s ease-in-out;
    overflow-y: auto;
  }
`;

const NavItem = styled.div`
  position: relative;
  margin: 0 var(--margin-sm);
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin: var(--margin-sm) 0;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-weight: 600;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  transition: all 0.3s ease;
  border-radius: 30px;
  background-color: ${props => props.active ? 
    (props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)') : 
    'transparent'};
  
  &:hover, &.active {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 5px;
  }
  
  @media (max-width: 768px) {
    padding: var(--padding-sm) 16px;
    width: 100%;
  }
`;

const dropdownAnimation = keyframes`
  0% { opacity: 0; transform: translateY(10px) translateX(-50%); }
  100% { opacity: 1; transform: translateY(0) translateX(-50%); }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: ${props => props.isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)'};
  min-width: 220px;
  background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(20, 20, 20, 0.98)'};
  box-shadow: ${props => props.theme === 'light' ? 
    '0 10px 30px rgba(0, 0, 0, 0.1), 0 6px 10px rgba(0, 0, 0, 0.05)' : 
    '0 10px 30px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.2)'};
  border-radius: 12px;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  animation: ${props => props.isOpen ? dropdownAnimation : 'none'} 0.2s ease forwards;
  z-index: 10;
  padding: 8px;
  backdrop-filter: blur(10px);
  border-left: 3px solid ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  border-right: 3px solid ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  
  /* Add invisible hover bridge to prevent gap issues */
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 15px;
    background: transparent;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 70%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(20, 20, 20, 0.98)'};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    background-color: transparent;
    margin-left: 120px;
    display: ${props => props.isOpen ? 'block' : 'none'};
    padding: 0;
    backdrop-filter: none;
    
    &:before {
      display: none;
    }
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  color: ${props => props.theme === 'light' ? 'var(--dark-gray-1)' : 'var(--light-gray-1)'};
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 6px;
  font-size: 0.95rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
  border-left: 2px solid transparent;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'};
    color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    transform: translateX(3px);
    border-left: 2px solid ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    border-left: 2px solid ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    border-radius: 0;
    margin-bottom: 0;
    
    &:hover {
      transform: translateX(5px);
    }
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.theme === 'light' ? 
    'linear-gradient(145deg, #f5f5f5, #e6e6e6)' : 
    'linear-gradient(145deg, #2d2d2d, #1a1a1a)'};
  color: ${props => props.theme === 'light' ? 'var(--dark-gray-1)' : 'var(--light-gray-1)'};
  transition: all 0.3s ease;
  margin-left: var(--margin-md);
  margin-right: var(--margin-sm);
  box-shadow: ${props => props.theme === 'light' ? 
    '3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff' : 
    '3px 3px 6px #151515, -3px -3px 6px #353535'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'light' ? 
      '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff' : 
      '5px 5px 10px #151515, -5px -5px 10px #353535'};
  }
  
  @media (max-width: 768px) {
    margin: 20px 0 0 0;
    align-self: center;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  margin-right: var(--margin-sm);
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme === 'light' ? 'var(--dark-gray-1)' : 'var(--light-gray-1)'};
  font-size: 1.2rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme === 'light' ? 'var(--dark-gray-1)' : 'var(--light-gray-1)'};
  font-size: 1.2rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const navItems = [
    {
      name: '',
      path: '/',
      icon: <HomeIcon />,
      dropdown: null
    },
    {
      name: 'Servicios',
      path: '/servicios',
      dropdown: [
        { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
        { name: 'Aplicaciones Móviles', path: '/servicios/aplicaciones-moviles' },
        { name: 'Software de Escritorio', path: '/servicios/software-escritorio' },
        { name: 'Implementación y Customización', path: '/servicios/implementacion-customizacion' },
        { name: 'Migraciones', path: '/servicios/migraciones' },
        { name: 'Integración con IA', path: '/servicios/integracion-ia' },
        { name: 'Nuestro Modelo de Operación', path: '/servicios/modelo-operacion' }
      ]
    },
    {
      name: 'Recursos',
      path: '/recursos',
      dropdown: [
        { name: 'Blog', path: '/recursos/blog' },
        { name: 'Tutoriales', path: '/recursos/tutoriales' },
        { name: 'Calculadora de Costos', path: '/recursos/calculadora-costos' }
      ]
    },
    {
      name: 'Nosotros',
      path: '/nosotros',
      dropdown: [
        { name: 'Nuestra metodología de trabajo', path: '/nosotros/metodologia' },
        { name: 'Por qué escoger a Tecniweb Latam', path: '/nosotros/porque-escogernos' },
        { name: 'Valores Corporativos', path: '/nosotros/valores-corporativos' },
        { name: 'Visión al 2029', path: '/nosotros/vision' },
        { name: 'Impacto Social y Tecnológico en Latam', path: '/nosotros/impacto-social' }
      ]
    }
  ];
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item') && openDropdown !== null) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdown]);
  
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  
  return (
    <HeaderContainer theme={theme}>
      <Logo>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={require('../assets/tecniweb-logo1.png')} alt="Tecniweb Latam" />
          <LogoTitle theme={theme}>Tecniweb Latam</LogoTitle>
        </Link>
      </Logo>
      
      <MobileMenuButton 
        theme={theme} 
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Abrir menú"
      >
        <FaBars />
      </MobileMenuButton>
      
      <Nav theme={theme} isOpen={mobileMenuOpen}>
        <CloseButton 
          theme={theme} 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <FaTimes />
        </CloseButton>
        
        {navItems.map((item, index) => (
          <NavItem key={item.name} className="nav-item">
            {item.dropdown ? (
              <>
                <NavLink 
                  to={item.path} 
                  theme={theme}
                  active={location.pathname === item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={(e) => {
                    if (window.innerWidth <= 768) {
                      e.preventDefault();
                      handleDropdownToggle(index);
                    }
                  }}
                  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown(index)}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768) {
                      setTimeout(() => {
                        // Only close if mouse is not over the dropdown
                        const dropdown = document.querySelector(`[data-dropdown="${index}"]`);
                        if (!dropdown?.matches(':hover')) {
                          setOpenDropdown(null);
                        }
                      }, 150);
                    }
                  }}
                >
                  {item.icon} {item.name} <FaChevronDown style={{ fontSize: '0.7rem', marginLeft: '5px', opacity: 0.7 }} />
                </NavLink>
                <Dropdown 
                  theme={theme} 
                  isOpen={openDropdown === index}
                  data-dropdown={index}
                  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown(index)}
                  onMouseLeave={() => {
                    if (window.innerWidth > 768) {
                      setTimeout(() => setOpenDropdown(null), 200);
                    }
                  }}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownItem 
                      key={dropdownItem.name} 
                      to={dropdownItem.path}
                      theme={theme}
                    >
                      {dropdownItem.name}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </>
            ) : (
              <NavLink 
                to={item.path} 
                theme={theme}
                active={location.pathname === item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.icon} {item.name}
              </NavLink>
            )}
          </NavItem>
        ))}
        
        <ThemeToggle 
          theme={theme} 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
