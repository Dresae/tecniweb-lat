import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaEnvelope } from 'react-icons/fa';

const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 60px 0;
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(255, 255, 255, 20%)' 
    : 'rgba(0, 0, 0, 20%)'
  };
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme === 'light' 
      ? 'rgba(255, 255, 255, 40%)' 
      : 'rgba(0, 0, 0, 40%)'
    };
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 0;
    background-attachment: scroll;
  }
`;

const ContentContainer = styled.div`
  width: ${props => props.fullWidth ? '100%' : '50%'};
  padding: 0 50px;
  z-index: 2;
  text-align: ${props => props.fullWidth ? 'center' : 'left'};
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    order: 2;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  
  img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
    order: 1;
    
    img {
      max-height: 300px;
    }
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 12px 25px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.withInput ? '0 4px 4px 0' : '4px'};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    margin: 0 auto;
    border-radius: 4px;
    margin-top: 10px;
  }
`;

const SubscriptionInput = styled(motion.input)`
  padding: 12px 15px;
  border: 1px solid ${props => props.theme === 'light' ? '#ddd' : '#444'};
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  width: 300px;
  max-width: 100%;
  background-color: ${props => props.theme === 'light' ? 'white' : '#2a2a2a'};
  color: ${props => props.theme === 'light' ? '#333' : '#eee'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 4px;
  }
`;

const SubscriptionForm = styled(motion.form)`
  display: flex;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${props => props.theme === 'light' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.2)'};
  color: ${props => props.theme === 'light' ? '#2e7d32' : '#81c784'};
  border: 1px solid ${props => props.theme === 'light' ? '#a5d6a7' : '#4caf50'};
  border-radius: 4px;
  padding: 12px 20px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`

const ParallaxSection = ({ 
  title, 
  description, 
  image, 
  buttonText, 
  buttonLink, 
  imageOnRight = false,
  useBackgroundImage = false,
  alt = '',
  withSubscriptionInput = false
}) => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const textVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <ParallaxContainer 
      theme={theme} 
      ref={ref} 
      backgroundImage={useBackgroundImage ? image : null}>
      {!useBackgroundImage && !imageOnRight && (
        <ImageContainer
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <img src={image} alt={alt || title} />
        </ImageContainer>
      )}
      
      <ContentContainer fullWidth={useBackgroundImage}>
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
        {buttonText && !withSubscriptionInput && (
          <Button 
            href={buttonLink} 
            theme={theme}
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            {buttonText}
          </Button>
        )}
        
        {buttonText && withSubscriptionInput && !subscribed && (
          <SubscriptionForm 
            onSubmit={handleSubmit}
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            <SubscriptionInput 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              theme={theme}
            />
            <Button 
              as="button"
              type="submit"
              theme={theme}
              withInput
            >
              <FaEnvelope style={{ marginRight: '8px' }} /> {buttonText}
            </Button>
          </SubscriptionForm>
        )}
        
        {buttonText && withSubscriptionInput && subscribed && (
          <SuccessMessage 
            theme={theme}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaEnvelope /> ¡Gracias por suscribirte! Te contactaremos pronto.
          </SuccessMessage>
        )}
      </ContentContainer>
      
      {!useBackgroundImage && imageOnRight && (
        <ImageContainer
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <img src={image} alt={alt || title} />
        </ImageContainer>
      )}
    </ParallaxContainer>
  );
};

export default ParallaxSection;
