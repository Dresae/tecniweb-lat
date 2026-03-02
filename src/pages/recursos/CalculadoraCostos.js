import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Breadcrumb from '../../components/Breadcrumb';
import CostCalculator from '../../components/CostCalculator';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-color-secondary);
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CalculadoraCostos = () => {
  return (
    <div>
      <Banner 
        title="Calculadora de Costos" 
        subtitle="La transparencia es nuestra prioridad. Estima el costo de tu proyecto de software." 
        images={[
          require('../../assets/banner-pics/banner-calculadora2.webp'),
          require('../../assets/banner-pics/banner-calculadora3.webp'),
          require('../../assets/banner-pics/banner-calculadora4.webp')
        ]}
      />
      <Breadcrumb 
        items={[
          { label: 'Inicio', path: '/' },
          { label: 'Recursos', path: '/recursos' },
          { label: 'Calculadora de Costos', path: '/recursos/calculadora-costos' }
        ]}
      />
      
      <PageContainer>
        <CostCalculator />
      </PageContainer>
    </div>
  );
};

export default CalculadoraCostos;
