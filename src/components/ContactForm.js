import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
    : '0 10px 30px rgba(0, 0, 0, 0.3)'
  };
  margin: 40px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-35px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const FormImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#222'};
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    animation: ${float} 6s ease-in-out infinite;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15));
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const FormContent = styled.div`
  flex: 1;
  padding: 40px;
  
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const FormTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const FormDescription = styled.p`
  margin-bottom: 25px;
  line-height: 1.6;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
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
  
  &.error {
    border-color: #e74c3c;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#222'};
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  font-family: 'Montserrat', sans-serif;
  resize: vertical;
  min-height: 120px;
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

const FormButton = styled.button`
  grid-column: 1 / -1;
  padding: 14px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${props => props.theme === 'light' ? '#ccc' : '#555'};
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
`;

const SuccessMessage = styled.div`
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(46, 204, 113, 0.1)' 
    : 'rgba(46, 204, 113, 0.2)'
  };
  border: 1px solid #2ecc71;
  color: ${props => props.theme === 'light' ? '#27ae60' : '#2ecc71'};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactForm = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // For development: Skip actual API call to prevent errors
      // In production, this would be: await axios.post('/api/contact', data);
      
      // Show fake confirmation message
      console.log('Formulario de contacto enviado con éxito:', data);
      alert(`¡Gracias ${data.name}! Hemos recibido tu mensaje. Te contactaremos pronto a través de ${data.email} o al teléfono ${data.phone}.`);
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      // In development mode, we'll never reach this block since we're not making the actual API call
      console.error('Error submitting form:', error);
      // Don't show error to user in development mode
      // setSubmitError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer theme={theme}>
      <FormImage theme={theme}>
        <img src={require('../assets/home-pics/home-contactanos.png')} alt="Contacto Tecniweb Latam" />
      </FormImage>
      <FormContent>
        <FormTitle theme={theme}>¿Quieres que te llamemos?</FormTitle>
        <FormDescription theme={theme}>
          Estamos listos para ayudarte a transformar tu negocio con soluciones tecnológicas a medida. 
          Completa el formulario y nos pondremos en contacto contigo a la brevedad.
        </FormDescription>
        
        {submitSuccess && (
          <SuccessMessage theme={theme}>
            ¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos pronto.
          </SuccessMessage>
        )}
        
        {submitError && (
          <ErrorMessage>{submitError}</ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormLabel theme={theme}>Nombre</FormLabel>
            <FormInput 
              type="text" 
              theme={theme}
              className={errors.name ? 'error' : ''}
              {...register('name', { required: true })}
            />
            {errors.name && <ErrorMessage>Este campo es requerido</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel theme={theme}>Teléfono</FormLabel>
            <FormInput 
              type="tel" 
              theme={theme}
              className={errors.phone ? 'error' : ''}
              {...register('phone', { required: true })}
            />
            {errors.phone && <ErrorMessage>Este campo es requerido</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel theme={theme}>Horario para contactarte</FormLabel>
            <FormInput 
              type="text" 
              theme={theme}
              placeholder="Ej: Lunes a Viernes de 9am a 4pm"
              {...register('contactHours')}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel theme={theme}>Email</FormLabel>
            <FormInput 
              type="email" 
              theme={theme}
              className={errors.email ? 'error' : ''}
              {...register('email', { 
                required: true, 
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
              })}
            />
            {errors.email?.type === 'required' && <ErrorMessage>Este campo es requerido</ErrorMessage>}
            {errors.email?.type === 'pattern' && <ErrorMessage>Email inválido</ErrorMessage>}
          </FormGroup>
          
          <FormGroup className="full-width">
            <FormLabel theme={theme}>Tipo de servicio</FormLabel>
            <FormSelect theme={theme} {...register('serviceType')}>
              <option value="desarrollo-web">Desarrollo Web</option>
              <option value="aplicaciones-moviles">Aplicaciones Móviles</option>
              <option value="software-escritorio">Software de Escritorio</option>
              <option value="implementacion">Implementación y Customización</option>
              <option value="migraciones">Migraciones</option>
              <option value="otro">Otro</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup className="full-width">
            <FormLabel theme={theme}>Mensaje</FormLabel>
            <FormTextarea 
              theme={theme}
              className={errors.message ? 'error' : ''}
              {...register('message', { required: true })}
            />
            {errors.message && <ErrorMessage>Este campo es requerido</ErrorMessage>}
          </FormGroup>
          
          <FormButton 
            type="submit" 
            theme={theme} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </FormButton>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default ContactForm;
