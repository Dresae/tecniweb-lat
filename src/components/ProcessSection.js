import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const ProcessContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme === 'light' 
      ? 'rgba(255, 255, 255, 0.7)' 
      : 'rgba(0, 0, 0, 0.7)'
    };
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const ContentBox = styled(motion.div)`
  width: 80%;
  max-width: 900px;
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(18, 18, 18, 0.9)'
  };
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 90%;
    padding: 30px 20px;
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 25px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  text-align: center;
`;

const Button = styled(motion.div)`
  display: flex;
  justify-content: center;
  
  a {
    padding: 12px 25px;
    background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const ProcessSection = ({ 
  title, 
  description, 
  backgroundImage, 
  buttonText, 
  buttonLink
}) => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const boxVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <ProcessContainer 
      theme={theme} 
      ref={ref} 
      backgroundImage={backgroundImage}
    >
      <ContentBox
        theme={theme}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <Title 
          theme={theme}
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {title}
        </Title>
        <Description 
          theme={theme}
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {description}
        </Description>
        {buttonText && (
          <Button 
            theme={theme}
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            <Link to={buttonLink}>
              {buttonText}
            </Link>
          </Button>
        )}
      </ContentBox>
    </ProcessContainer>
  );
};

export default ProcessSection;
