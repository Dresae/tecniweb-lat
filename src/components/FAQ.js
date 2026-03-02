import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const float = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(0);
  }
  75% {
    transform: translateY(10px) translateX(-10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;

const AnimatedBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Dot = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: ${props => props.opacity};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: -1;
`;

const FAQContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  z-index: 1;
`;

const FAQTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const FAQItem = styled.div`
  margin-bottom: 15px;
  border-radius: 30px 30px 10px 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme === 'light' 
    ? 'var(--light-gray-1)' 
    : 'var(--dark-gray-1)'
  };
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
  border: none;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' 
      ? 'var(--light-gray-2)' 
      : 'var(--dark-gray-2)'
    };
  }
  
  svg {
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0;
  overflow: hidden;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
`;

const FAQAnswerContent = styled.div`
  padding: 20px;
  color: ${props => props.theme === 'light' ? '#555' : '#ddd'};
  line-height: 1.6;
`;

const FAQ = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const backgroundRef = useRef(null);
  const [dots, setDots] = useState([]);
  
  useEffect(() => {
    // Generate random dots for the animated background
    const generateDots = () => {
      const newDots = [];
      const dotCount = 30; // Number of dots to generate
      
      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          id: i,
          size: Math.random() * 10 + 5, // Size between 5-15px
          top: Math.random() * 100,
          left: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.1, // Opacity between 0.1-0.6
          duration: Math.random() * 10 + 10, // Animation duration between 10-20s
          delay: Math.random() * 5, // Animation delay between 0-5s
          color: theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'
        });
      }
      
      setDots(newDots);
    };
    
    generateDots();
  }, [theme]);
  
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "¿Qué servicios ofrece Tecniweb Latam?",
      answer: "Tecniweb Latam ofrece una amplia gama de servicios de desarrollo de software, incluyendo desarrollo web, aplicaciones móviles, software de escritorio, implementación y customización de software, migraciones y soluciones de integración con IA. Nuestro enfoque está en crear soluciones personalizadas que se adapten a las necesidades específicas de cada cliente."
    },
    {
      question: "¿Cuánto tiempo toma desarrollar un proyecto de software?",
      answer: "El tiempo de desarrollo varía según la complejidad y el alcance del proyecto. Un sitio web básico puede tomar de 2 a 4 semanas, mientras que aplicaciones más complejas pueden requerir de 3 a 6 meses o más. Durante nuestra fase de consulta inicial, proporcionamos un cronograma detallado basado en sus requisitos específicos."
    },
    {
      question: "¿Cómo se calcula el costo de un proyecto?",
      answer: "El costo de un proyecto se calcula en base a varios factores, incluyendo la complejidad técnica, el tiempo estimado de desarrollo, el número de funcionalidades requeridas y los recursos necesarios. Utilizamos un enfoque transparente basado en datos para proporcionar estimaciones precisas. Puede utilizar nuestra calculadora de costos para obtener una estimación inicial."
    },
    {
      question: "¿Qué metodología de trabajo utilizan?",
      answer: "Utilizamos metodologías ágiles como Scrum y Kanban, que permiten un desarrollo iterativo y entregas incrementales. Esto nos permite adaptarnos rápidamente a los cambios, mantener una comunicación constante con el cliente y entregar valor de forma continua. Nuestro proceso está dividido en fases claras, con puntos de control y aprobación para garantizar la calidad."
    },
    {
      question: "¿Ofrecen mantenimiento y soporte después de la entrega del proyecto?",
      answer: "Sí, ofrecemos servicios de mantenimiento y soporte continuo para todos nuestros proyectos. Tenemos diferentes planes de soporte que incluyen actualizaciones de seguridad, corrección de errores, optimización de rendimiento y asistencia técnica. También ofrecemos capacitación para que su equipo pueda gestionar el sistema de manera efectiva."
    },
    {
      question: "¿Cómo integran la Inteligencia Artificial en sus soluciones?",
      answer: "Integramos la IA en nuestras soluciones mediante el uso de APIs de aprendizaje automático, procesamiento de lenguaje natural y visión por computadora. Esto permite crear características como chatbots inteligentes, análisis predictivo, reconocimiento de imágenes y automatización de procesos. Cada integración se diseña específicamente para resolver problemas de negocio concretos y mejorar la experiencia del usuario."
    },
    {
      question: "¿Trabajan con empresas de cualquier tamaño?",
      answer: "Sí, trabajamos con empresas de todos los tamaños, desde startups y pequeñas empresas hasta grandes corporaciones. Adaptamos nuestros servicios y soluciones según las necesidades y presupuesto de cada cliente, manteniendo siempre los más altos estándares de calidad y profesionalismo."
    }
  ];
  
  return (
    <>
      <AnimatedBackground>
        {dots.map(dot => (
          <Dot 
            key={dot.id}
            size={dot.size}
            top={dot.top}
            left={dot.left}
            opacity={dot.opacity}
            duration={dot.duration}
            delay={dot.delay}
            color={dot.color}
          />
        ))}
      </AnimatedBackground>
      <FAQContainer>
        <FAQTitle theme={theme}>Te Ayudamos a Despejar tus Dudas</FAQTitle>
      {faqItems.map((item, index) => (
        <FAQItem key={index} theme={theme}>
          <FAQQuestion 
            theme={theme} 
            onClick={() => toggleQuestion(index)}
            aria-expanded={activeIndex === index}
          >
            {item.question}
            {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </FAQQuestion>
          <AnimatePresence>
            {activeIndex === index && (
              <FAQAnswer
                theme={theme}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FAQAnswerContent theme={theme}>
                  {item.answer}
                </FAQAnswerContent>
              </FAQAnswer>
            )}
          </AnimatePresence>
        </FAQItem>
      ))}
      </FAQContainer>
    </>
  );
};

export default FAQ;
