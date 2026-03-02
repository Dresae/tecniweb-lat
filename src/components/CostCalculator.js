import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaCalculator, FaCheck, FaSpinner } from 'react-icons/fa';

const CalculatorContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  border-radius: 10px;
  box-shadow: ${props => props.theme === 'light' 
    ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
    : '0 10px 30px rgba(0, 0, 0, 0.3)'
  };
`;

const CalculatorTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  text-align: center;
`;

const CalculatorDescription = styled.p`
  margin-bottom: 30px;
  line-height: 1.6;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#555' : '#ccc'};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const OptionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected 
    ? (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)') 
    : (props.theme === 'light' ? '#e0e0e0' : '#333')
  };
  background-color: ${props => props.selected 
    ? (props.theme === 'light' ? 'rgba(33, 158, 188, 0.1)' : 'rgba(0, 119, 182, 0.1)') 
    : 'transparent'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  }
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const OptionText = styled.span`
  margin-left: 10px;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
`;

const CheckMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected 
    ? (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)') 
    : (props.theme === 'light' ? '#999' : '#666')
  };
  color: ${props => props.selected 
    ? (props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)') 
    : 'transparent'
  };
  transition: all 0.3s ease;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
  background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#222'};
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  font-family: 'Montserrat', sans-serif;
  resize: vertical;
  min-height: 100px;
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
  padding: 14px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${props => props.theme === 'light' ? '#ccc' : '#555'};
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ResultContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${props => props.theme === 'light' 
    ? 'rgba(33, 158, 188, 0.1)' 
    : 'rgba(0, 119, 182, 0.1)'
  };
  border: 1px solid ${props => props.theme === 'light' 
    ? 'var(--light-green-2)' 
    : 'var(--dark-green-2)'
  };
`;

const ResultTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const ResultDetail = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  
  &.total {
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333'};
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
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

const Spinner = styled.div`
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CostCalculator = () => {
  const { theme } = useTheme();
  const [projectType, setProjectType] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [complexity, setComplexity] = useState('');
  const [features, setFeatures] = useState([]);
  const [additionalServicesSelected, setAdditionalServicesSelected] = useState({});
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPricingDetails, setShowPricingDetails] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // Subcategories for each service type with detailed options from pricing file
  const subCategories = {
    'web': [
      { id: 'corporate', label: 'Sitios Web Corporativos', basePrice: 599000, maxPrice: 17900000 },
      { id: 'ecommerce', label: 'E-commerce / Tiendas en Línea', basePrice: 4490000, maxPrice: 65900000 },
      { id: 'pwa', label: 'Aplicaciones Web Progresivas (PWA)', basePrice: 5900000, maxPrice: 23900000 },
      { id: 'cms', label: 'Sistemas de Gestión de Contenidos (CMS)', basePrice: 3290000, maxPrice: 26900000 }
    ],
    'mobile': [
      { id: 'native', label: 'Aplicaciones Nativas (iOS o Android)', basePrice: 5900000, maxPrice: 44900000 },
      { id: 'hybrid', label: 'Aplicaciones Híbridas (iOS + Android)', basePrice: 7490000, maxPrice: 59900000 }
    ],
    'desktop': [
      { id: 'multiplatform', label: 'Aplicaciones Multiplataforma', basePrice: 11900000, maxPrice: 44490000 },
      { id: 'enterprise', label: 'Sistemas de Gestión Empresarial', basePrice: 8900000, maxPrice: 25000000 },
      { id: 'automation', label: 'Automatización de Procesos', basePrice: 5900000, maxPrice: 38900000 },
      { id: 'hardware', label: 'Integración con Hardware Específico', basePrice: 5900000, maxPrice: 35900000 }
    ],
    'implementation': [
      { id: 'crm_erp', label: 'Personalización de CRM/ERP', basePrice: 5900000, maxPrice: 44900000 },
      { id: 'integration', label: 'Integración de Sistemas', basePrice: 7490000, maxPrice: 47900000 },
      { id: 'configuration', label: 'Configuración de Plataformas', basePrice: 4490000, maxPrice: 32900000 },
      { id: 'training', label: 'Capacitación y Soporte', basePrice: 590000, maxPrice: 8900000 }
    ],
    'migration': [
      { id: 'database', label: 'Migración de Bases de Datos', basePrice: 8000000, maxPrice: 60000000 },
      { id: 'legacy', label: 'Actualización de Sistemas Legados', basePrice: 12000000, maxPrice: 100000000 },
      { id: 'data_transfer', label: 'Transferencia de Datos', basePrice: 5000000, maxPrice: 40000000 },
      { id: 'optimization', label: 'Optimización de Rendimiento', basePrice: 8000000, maxPrice: 60000000 }
    ],
    'ai': [
      { id: 'chatbots', label: 'Chatbots y Asistentes Virtuales', basePrice: 4490000, maxPrice: 44900000 },
      { id: 'predictive', label: 'Análisis Predictivo', basePrice: 8900000, maxPrice: 74900000 },
      { id: 'nlp', label: 'Procesamiento de Lenguaje Natural', basePrice: 11900000, maxPrice: 65900000 },
      { id: 'vision', label: 'Visión por Computadora', basePrice: 14900000, maxPrice: 74900000 }
    ]
  };

  // Feature options for each service category
  const featureOptions = {
    'web': [
      { id: 'responsive', label: 'Diseño Responsive', value: 500000 },
      { id: 'cms', label: 'CMS Personalizado', value: 11900000 },
      { id: 'blog', label: 'Blog Avanzado', value: 2000000 },
      { id: 'multilingual', label: 'Multilingüe', value: 2500000 },
      { id: 'seo', label: 'SEO Optimizado', value: 1190000 },
      { id: 'analytics', label: 'Analíticas Avanzadas', value: 1500000 },
      { id: 'payment', label: 'Pasarela de Pagos', value: 4000000 }
    ],
    'mobile': [
      { id: 'push', label: 'Notificaciones Push', value: 1000000 },
      { id: 'offline', label: 'Funcionalidad Offline', value: 3000000 },
      { id: 'geolocation', label: 'Geolocalización Avanzada', value: 3500000 },
      { id: 'camera', label: 'Integración de Cámara', value: 2000000 },
      { id: 'biometric', label: 'Autenticación Biométrica', value: 3000000 },
      { id: 'payment', label: 'Pasarela de Pagos', value: 4000000 },
      { id: 'api', label: 'Integración con APIs Externas', value: 3000000 }
    ],
    'desktop': [
      { id: 'multiplatform', label: 'Soporte Multiplataforma', value: 5000000 },
      { id: 'database', label: 'Base de Datos Avanzada', value: 4000000 },
      { id: 'sync', label: 'Sincronización en la Nube', value: 3000000 },
      { id: 'reports', label: 'Generación de Reportes', value: 2500000 },
      { id: 'automation', label: 'Automatización de Tareas', value: 3000000 },
      { id: 'api', label: 'Integración con APIs', value: 3000000 },
      { id: 'security', label: 'Seguridad Avanzada', value: 4000000 }
    ],
    'implementation': [
      { id: 'data_migration', label: 'Migración de Datos', value: 5000000 },
      { id: 'training', label: 'Capacitación Extendida (30 horas)', value: 3590000 },
      { id: 'customization', label: 'Personalización Avanzada', value: 6000000 },
      { id: 'integration', label: 'Integración con Sistemas Existentes', value: 7490000 },
      { id: 'support', label: 'Soporte Técnico Mensual', value: 1490000 },
      { id: 'documentation', label: 'Documentación Completa', value: 2000000 },
      { id: 'testing', label: 'Pruebas Exhaustivas', value: 3000000 }
    ],
    'migration': [
      { id: 'data_transfer', label: 'Transferencia de Datos Compleja', value: 10000000 },
      { id: 'platform_change', label: 'Cambio de Plataforma', value: 15000000 },
      { id: 'legacy_support', label: 'Soporte para Sistemas Legados', value: 12000000 },
      { id: 'parallel_run', label: 'Ejecución en Paralelo', value: 8000000 },
      { id: 'risk_assessment', label: 'Evaluación de Riesgos', value: 5000000 },
      { id: 'rollback_plan', label: 'Plan de Reversión', value: 5000000 },
      { id: 'performance_optimization', label: 'Optimización de Rendimiento', value: 8000000 }
    ],
    'ai': [
      { id: 'training', label: 'Entrenamiento de Modelos', value: 8000000 },
      { id: 'integration', label: 'Integración con Sistemas Existentes', value: 6000000 },
      { id: 'custom_models', label: 'Modelos Personalizados', value: 10000000 },
      { id: 'data_processing', label: 'Procesamiento de Datos', value: 5000000 },
      { id: 'dashboard', label: 'Dashboard de Análisis', value: 4000000 },
      { id: 'api', label: 'API para Desarrolladores', value: 7000000 },
      { id: 'maintenance', label: 'Plan de Mantenimiento', value: 3000000 }
    ]
  };

  // Additional services
  const additionalServices = [
    { id: 'maintenance', label: 'Mantenimiento Mensual', options: [
      { id: 'basic', label: 'Básico', value: 800000 },
      { id: 'standard', label: 'Estándar', value: 1500000 },
      { id: 'premium', label: 'Premium', value: 3000000 }
    ]},
    { id: 'consulting', label: 'Consultoría Tecnológica', options: [
      { id: 'hourly', label: 'Por Hora', value: 250000 },
      { id: 'daily', label: 'Por Día', value: 1800000 },
      { id: 'project', label: 'Por Proyecto', value: 5000000 }
    ]},
    { id: 'seo', label: 'SEO y Marketing Digital', options: [
      { id: 'basic', label: 'Optimización SEO Básica', value: 440000 },
      { id: 'campaign', label: 'Campaña de Marketing Digital', value: 1490000 },
      { id: 'strategy', label: 'Estrategia Digital Completa', value: 17900000 }
    ]},
    { id: 'hosting', label: 'Servicios de Hosting y Dominio', options: [
      { id: 'shared', label: 'Hosting Compartido (Anual)', value: 390000 },
      { id: 'vps', label: 'Servidor VPS (Anual)', value: 1190000 },
      { id: 'dedicated', label: 'Servidor Dedicado (Anual)', value: 4490000 },
      { id: 'domain', label: 'Registro de Dominio (Anual)', value: 49000 }
    ]}
  ];
  
  // Main service categories from pricing file
  const projectTypes = [
    { id: 'web', label: 'Desarrollo Web', basePrice: 599000 },
    { id: 'mobile', label: 'Aplicaciones Móviles', basePrice: 5900000 },
    { id: 'desktop', label: 'Software de Escritorio', basePrice: 5900000 },
    { id: 'implementation', label: 'Implementación y Customización', basePrice: 4490000 },
    { id: 'migration', label: 'Migraciones', basePrice: 5000000 },
    { id: 'ai', label: 'Integración con IA', basePrice: 4490000 }
  ];
  
  // Complexity levels with multipliers
  const complexityLevels = [
    { id: 'basic', label: 'Básico', multiplier: 1 },
    { id: 'standard', label: 'Estándar', multiplier: 1.5 },
    { id: 'premium', label: 'Premium', multiplier: 2.5 },
    { id: 'enterprise', label: 'Empresarial', multiplier: 4 }
  ];
  
  const handleFeatureToggle = (featureId) => {
    setFeatures(prevFeatures => {
      if (prevFeatures.includes(featureId)) {
        return prevFeatures.filter(id => id !== featureId);
      } else {
        return [...prevFeatures, featureId];
      }
    });
  };
  
  const calculateCost = () => {
    if (!projectType || !complexity) return;
    
    setIsCalculating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const selectedProjectType = projectTypes.find(type => type.id === projectType);
      const selectedComplexity = complexityLevels.find(level => level.id === complexity);
      
      // Get base price from subcategory if selected, otherwise from project type
      let basePrice;
      if (subCategory && subCategories[projectType]) {
        const selectedSubCategory = subCategories[projectType].find(sub => sub.id === subCategory);
        basePrice = selectedSubCategory ? selectedSubCategory.basePrice : selectedProjectType.basePrice;
      } else {
        basePrice = selectedProjectType.basePrice;
      }
      
      let complexityMultiplier = selectedComplexity.multiplier;
      
      // Calculate features cost
      let featuresTotal = 0;
      if (features.length > 0 && featureOptions[projectType]) {
        featuresTotal = featureOptions[projectType]
          .filter(feature => features.includes(feature.id))
          .reduce((sum, feature) => sum + feature.value, 0);
      }
      
      // Calculate additional services cost
      let additionalServicesTotal = 0;
      Object.entries(additionalServicesSelected).forEach(([serviceId, optionId]) => {
        const service = additionalServices.find(s => s.id === serviceId);
        if (service && optionId) {
          const option = service.options.find(o => o.id === optionId);
          if (option) {
            additionalServicesTotal += option.value;
          }
        }
      });
      
      // Calculate total
      const subtotal = basePrice * complexityMultiplier;
      const total = subtotal + featuresTotal + additionalServicesTotal;
      
      setEstimatedCost({
        basePrice,
        complexity: {
          label: selectedComplexity.label,
          multiplier: complexityMultiplier,
          value: basePrice * (complexityMultiplier - 1)
        },
        features: featuresTotal,
        additionalServices: additionalServicesTotal,
        subtotal: subtotal,
        total: Math.round(total)
      });
      
      setIsCalculating(false);
    }, 1000);
  };
  
  const resetCalculator = () => {
    setProjectType('');
    setSubCategory('');
    setComplexity('');
    setFeatures([]);
    setAdditionalServicesSelected({});
    setEstimatedCost(null);
    setShowContactForm(false);
    setSubmitSuccess(false);
    setSubmitError('');
    setShowPricingDetails(false);
    reset();
  };
  
  const onSubmit = async (data) => {
    if (!estimatedCost) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    const formData = {
      ...data,
      projectType: projectTypes.find(type => type.id === projectType)?.label,
      subCategory: subCategory ? subCategories[projectType]?.find(sub => sub.id === subCategory)?.label : '',
      complexity: complexityLevels.find(level => level.id === complexity)?.label,
      features: features.map(featureId => {
        const featureList = featureOptions[projectType] || [];
        return featureList.find(feature => feature.id === featureId)?.label;
      }).filter(Boolean),
      additionalServices: Object.entries(additionalServicesSelected).map(([serviceId, optionId]) => {
        const service = additionalServices.find(s => s.id === serviceId);
        const option = service?.options.find(o => o.id === optionId);
        return option ? `${service.label}: ${option.label}` : null;
      }).filter(Boolean),
      estimatedCost: estimatedCost.total
    };
    
    try {
      // For development: Skip actual API call to prevent errors
      // In production, this would be: await axios.post('/api/calculate', formData);
      
      // Show fake confirmation message
      console.log('Solicitud de cotización enviada con éxito:', formData);
      alert(`¡Gracias ${formData.name}! Hemos recibido tu solicitud de cotización para un proyecto de ${formData.projectType}. El costo estimado es de $${formData.estimatedCost}. Te enviaremos una cotización detallada a ${formData.email} en las próximas 24 horas.`);
      
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
    <CalculatorContainer theme={theme}>
      <CalculatorTitle theme={theme}>Calculadora de Costos</CalculatorTitle>
      <CalculatorDescription theme={theme}>
        Utiliza nuestra calculadora para obtener una estimación del costo de tu proyecto. 
        Selecciona el tipo de proyecto, su complejidad y las características que necesitas.
      </CalculatorDescription>
      
      {!showContactForm ? (
        <Form>
          <FormSection>
            <SectionTitle theme={theme}>
              <FaCalculator /> Categoría de Servicio
            </SectionTitle>
            <OptionGroup>
              {projectTypes.map((type) => (
                <OptionLabel 
                  key={type.id}
                  theme={theme}
                  selected={projectType === type.id}
                >
                  <HiddenRadio 
                    type="radio"
                    name="projectType"
                    value={type.id}
                    checked={projectType === type.id}
                    onChange={() => {
                      setProjectType(type.id);
                      setSubCategory('');
                      setFeatures([]);
                    }}
                  />
                  <CheckMark theme={theme} selected={projectType === type.id}>
                    {projectType === type.id && <FaCheck size={10} />}
                  </CheckMark>
                  <OptionText theme={theme}>{type.label}</OptionText>
                </OptionLabel>
              ))}
            </OptionGroup>
          </FormSection>
          
          {projectType && subCategories[projectType] && (
            <FormSection>
              <SectionTitle theme={theme}>
                <FaCalculator /> Tipo de Servicio
              </SectionTitle>
              <OptionGroup>
                {subCategories[projectType].map((subCat) => (
                  <OptionLabel 
                    key={subCat.id}
                    theme={theme}
                    selected={subCategory === subCat.id}
                  >
                    <HiddenRadio 
                      type="radio"
                      name="subCategory"
                      value={subCat.id}
                      checked={subCategory === subCat.id}
                      onChange={() => setSubCategory(subCat.id)}
                    />
                    <CheckMark theme={theme} selected={subCategory === subCat.id}>
                      {subCategory === subCat.id && <FaCheck size={10} />}
                    </CheckMark>
                    <OptionText theme={theme}>{subCat.label}</OptionText>
                  </OptionLabel>
                ))}
              </OptionGroup>
            </FormSection>
          )}
          
          {projectType && (
            <FormSection>
              <SectionTitle theme={theme}>
                <FaCalculator /> Nivel de Complejidad
              </SectionTitle>
              <OptionGroup>
                {complexityLevels.map((level) => (
                  <OptionLabel 
                    key={level.id}
                    theme={theme}
                    selected={complexity === level.id}
                  >
                    <HiddenRadio 
                      type="radio"
                      name="complexity"
                      value={level.id}
                      checked={complexity === level.id}
                      onChange={() => setComplexity(level.id)}
                    />
                    <CheckMark theme={theme} selected={complexity === level.id}>
                      {complexity === level.id && <FaCheck size={10} />}
                    </CheckMark>
                    <OptionText theme={theme}>{level.label}</OptionText>
                  </OptionLabel>
                ))}
              </OptionGroup>
            </FormSection>
          )}
          
          {projectType && complexity && featureOptions[projectType] && (
            <FormSection>
              <SectionTitle theme={theme}>
                <FaCalculator /> Características Adicionales
              </SectionTitle>
              <OptionGroup>
                {featureOptions[projectType].map((feature) => (
                  <OptionLabel 
                    key={feature.id}
                    theme={theme}
                    selected={features.includes(feature.id)}
                  >
                    <HiddenRadio 
                      type="checkbox"
                      name="features"
                      value={feature.id}
                      checked={features.includes(feature.id)}
                      onChange={() => handleFeatureToggle(feature.id)}
                    />
                    <CheckMark theme={theme} selected={features.includes(feature.id)}>
                      {features.includes(feature.id) && <FaCheck size={10} />}
                    </CheckMark>
                    <OptionText theme={theme}>{feature.label}</OptionText>
                  </OptionLabel>
                ))}
              </OptionGroup>
            </FormSection>
          )}
          
          {projectType && complexity && (
            <FormSection>
              <SectionTitle theme={theme}>
                <FaCalculator /> Servicios Adicionales
              </SectionTitle>
              {additionalServices.map((service) => (
                <div key={service.id} style={{ marginBottom: '20px' }}>
                  <FormLabel theme={theme}>{service.label}</FormLabel>
                  <OptionGroup>
                    <OptionLabel 
                      key={`${service.id}-none`}
                      theme={theme}
                      selected={!additionalServicesSelected[service.id]}
                    >
                      <HiddenRadio 
                        type="radio"
                        name={`additionalService-${service.id}`}
                        value=""
                        checked={!additionalServicesSelected[service.id]}
                        onChange={() => {
                          setAdditionalServicesSelected(prev => ({
                            ...prev,
                            [service.id]: ''
                          }));
                        }}
                      />
                      <CheckMark theme={theme} selected={!additionalServicesSelected[service.id]}>
                        {!additionalServicesSelected[service.id] && <FaCheck size={10} />}
                      </CheckMark>
                      <OptionText theme={theme}>Ninguno</OptionText>
                    </OptionLabel>
                    
                    {service.options.map((option) => (
                      <OptionLabel 
                        key={option.id}
                        theme={theme}
                        selected={additionalServicesSelected[service.id] === option.id}
                      >
                        <HiddenRadio 
                          type="radio"
                          name={`additionalService-${service.id}`}
                          value={option.id}
                          checked={additionalServicesSelected[service.id] === option.id}
                          onChange={() => {
                            setAdditionalServicesSelected(prev => ({
                              ...prev,
                              [service.id]: option.id
                            }));
                          }}
                        />
                        <CheckMark theme={theme} selected={additionalServicesSelected[service.id] === option.id}>
                          {additionalServicesSelected[service.id] === option.id && <FaCheck size={10} />}
                        </CheckMark>
                        <OptionText theme={theme}>{option.label}</OptionText>
                      </OptionLabel>
                    ))}
                  </OptionGroup>
                </div>
              ))}
            </FormSection>
          )}
          
          {projectType && complexity && (
            <FormButton 
              type="button" 
              theme={theme} 
              onClick={calculateCost}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <Spinner><FaSpinner /></Spinner> Calculando...
                </>
              ) : (
                <>
                  <FaCalculator /> Calcular Costo Estimado
                </>
              )}
            </FormButton>
          )}
          
          {estimatedCost && (
            <ResultContainer theme={theme}>
              <ResultTitle theme={theme}>Resultado de la Estimación</ResultTitle>
              <ResultDetail theme={theme}>
                <span>Precio Base:</span>
                <span>${(estimatedCost.basePrice / 1000000).toFixed(1)} millones COP</span>
              </ResultDetail>
              <ResultDetail theme={theme}>
                <span>Complejidad ({estimatedCost.complexity.label}):</span>
                <span>x{estimatedCost.complexity.multiplier} (+${(estimatedCost.complexity.value / 1000000).toFixed(1)} millones COP)</span>
              </ResultDetail>
              {estimatedCost.features > 0 && (
                <ResultDetail theme={theme}>
                  <span>Características Adicionales:</span>
                  <span>${(estimatedCost.features / 1000000).toFixed(1)} millones COP</span>
                </ResultDetail>
              )}
              {estimatedCost.additionalServices > 0 && (
                <ResultDetail theme={theme}>
                  <span>Servicios Adicionales:</span>
                  <span>${(estimatedCost.additionalServices / 1000000).toFixed(1)} millones COP</span>
                </ResultDetail>
              )}
              <ResultDetail className="total" theme={theme}>
                <span>Total Estimado:</span>
                <span>${(estimatedCost.total / 1000000).toFixed(1)} millones COP</span>
              </ResultDetail>
              <div style={{ fontSize: '0.8rem', color: theme === 'light' ? '#666' : '#aaa', marginTop: '10px', textAlign: 'center' }}>
                Precios en Pesos Colombianos (COP)
              </div>
              
              <ButtonGroup>
                <FormButton 
                  type="button" 
                  theme={theme}
                  onClick={() => setShowContactForm(true)}
                >
                  Solicitar Cotización Detallada
                </FormButton>
                <FormButton 
                  type="button" 
                  theme={theme}
                  onClick={resetCalculator}
                  style={{ 
                    backgroundColor: theme === 'light' ? '#e0e0e0' : '#333',
                    color: theme === 'light' ? '#333' : '#ddd'
                  }}
                >
                  Reiniciar Calculadora
                </FormButton>
              </ButtonGroup>
            </ResultContainer>
          )}
        </Form>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle theme={theme}>
            <FaCalculator /> Solicitar Cotización Detallada
          </SectionTitle>
          
          {submitSuccess && (
            <SuccessMessage theme={theme}>
              ¡Gracias por tu solicitud! Hemos recibido tu información y te enviaremos una cotización detallada a la brevedad.
            </SuccessMessage>
          )}
          
          {submitError && (
            <ErrorMessage>{submitError}</ErrorMessage>
          )}
          
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
            <FormLabel theme={theme}>Detalles adicionales del proyecto</FormLabel>
            <FormTextarea 
              theme={theme}
              {...register('details')}
              placeholder="Describe cualquier detalle adicional que consideres importante para tu proyecto..."
            />
          </FormGroup>
          
          <ButtonGroup>
            <FormButton 
              type="submit" 
              theme={theme} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner><FaSpinner /></Spinner> Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </FormButton>
            <FormButton 
              type="button" 
              theme={theme}
              onClick={() => setShowContactForm(false)}
              style={{ 
                backgroundColor: theme === 'light' ? '#e0e0e0' : '#333',
                color: theme === 'light' ? '#333' : '#ddd'
              }}
            >
              Volver a la Calculadora
            </FormButton>
          </ButtonGroup>
        </Form>
      )}
    </CalculatorContainer>
  );
};

export default CostCalculator;
