import React from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 30px 0;
`;

const CarouselRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  animation: ${props => props.direction === 'left' 
    ? 'slideLeft 10s linear infinite' 
    : 'slideRight 10s linear infinite'};
  
  @keyframes slideLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @keyframes slideRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;

const TechIcon = styled.div`
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  margin: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const TechStackCarousel = ({ technologies }) => {
  // Split the technologies array into two equal parts for the two rows
  const midpoint = Math.ceil(technologies.length / 2);
  const firstHalf = technologies.slice(0, midpoint);
  const secondHalf = technologies.slice(midpoint);
  
  // Duplicate the items to create a seamless loop effect
  const firstRowItems = [...firstHalf, ...firstHalf];
  const secondRowItems = [...secondHalf, ...secondHalf];
  
  return (
    <CarouselContainer>
      <CarouselRow direction="left">
        {firstRowItems.map((tech, index) => (
          <TechIcon key={`first-${index}`}>
            <img src={tech.image} alt={tech.name} title={tech.name} />
          </TechIcon>
        ))}
      </CarouselRow>
      
      <CarouselRow direction="right">
        {secondRowItems.map((tech, index) => (
          <TechIcon key={`second-${index}`}>
            <img src={tech.image} alt={tech.name} title={tech.name} />
          </TechIcon>
        ))}
      </CarouselRow>
    </CarouselContainer>
  );
};

export default TechStackCarousel;
