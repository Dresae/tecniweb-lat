import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Breadcrumb from './Breadcrumb';

const TutorialContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const TutorialHeader = styled.div`
  margin-bottom: 40px;
`;

const TutorialTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TutorialMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-family: 'Rubik', sans-serif;
  color: ${props => props.theme === 'light' ? '#666' : '#aaa'};
`;

const TutorialAuthor = styled.span`
  margin-right: 20px;
  
  &::before {
    content: 'Por: ';
    font-weight: 500;
  }
`;

const TutorialDate = styled.span`
  &::before {
    content: '• ';
    margin: 0 10px;
  }
`;

const TutorialDifficulty = styled.span`
  &::before {
    content: '• ';
    margin: 0 10px;
  }
  
  &.beginner {
    color: #4CAF50;
  }
  
  &.intermediate {
    color: #FF9800;
  }
  
  &.advanced {
    color: #F44336;
  }
`;

const TutorialImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const TableOfContents = styled.div`
  background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#2a2a2a'};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

const TOCTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const TOCList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li`
  margin-bottom: 10px;
  
  a {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    text-decoration: none;
    display: flex;
    align-items: center;
    
    &:hover {
      text-decoration: underline;
    }
    
    &::before {
      content: '→';
      margin-right: 10px;
      transition: transform 0.2s ease;
    }
    
    &:hover::before {
      transform: translateX(5px);
    }
  }
  
  ul {
    list-style-type: none;
    padding-left: 20px;
    margin-top: 10px;
    
    li {
      margin-bottom: 5px;
    }
  }
`;

const TutorialContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${props => props.theme === 'light' ? '#333' : '#ddd'};
  
  p {
    margin-bottom: 20px;
  }
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    margin: 40px 0 20px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    padding-top: 20px;
    border-top: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
  }
  
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    margin: 30px 0 15px;
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  }
  
  ul, ol {
    margin-bottom: 20px;
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
    padding-left: 20px;
    margin: 30px 0;
    font-style: italic;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
  }
  
  a {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    text-decoration: none;
    border-bottom: 1px dotted;
    
    &:hover {
      border-bottom: 1px solid;
    }
  }
  
  pre {
    background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#2a2a2a'};
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 20px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
  
  code {
    background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#2a2a2a'};
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 20px 0;
  }
  
  .note {
    background-color: ${props => props.theme === 'light' ? '#e1f5fe' : '#01579b'};
    border-left: 4px solid ${props => props.theme === 'light' ? '#03a9f4' : '#4fc3f7'};
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
  }
  
  .warning {
    background-color: ${props => props.theme === 'light' ? '#fff8e1' : '#bf360c'};
    border-left: 4px solid ${props => props.theme === 'light' ? '#ffc107' : '#ffcc80'};
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
  }
  
  .tip {
    background-color: ${props => props.theme === 'light' ? '#e8f5e9' : '#1b5e20'};
    border-left: 4px solid ${props => props.theme === 'light' ? '#4caf50' : '#81c784'};
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: bold;
`;

const CodeBlock = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme === 'light' ? '#e0e0e0' : '#1a1a1a'};
  padding: 8px 15px;
  border-radius: 5px 5px 0 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const CodeLanguage = styled.span`
  font-weight: bold;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::before {
    content: '📋';
    margin-right: 5px;
  }
`;

const CodeContent = styled.pre`
  background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#2a2a2a'};
  padding: 15px;
  border-radius: 0 0 5px 5px;
  overflow-x: auto;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const RelatedTutorials = styled.div`
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
`;

const RelatedTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled(Link)`
  text-decoration: none;
  background-color: ${props => props.theme === 'light' ? 'white' : '#1a1a1a'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const RelatedImage = styled.div`
  height: 150px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RelatedContent = styled.div`
  padding: 15px;
`;

const RelatedTutorialTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RelatedTutorialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#666' : '#aaa'};
`;

const BackToAllTutorials = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
  text-decoration: none;
  font-weight: 500;
  
  &::before {
    content: '← ';
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const Tutorial = ({ tutorial, sections, relatedTutorials }) => {
  const { theme } = useTheme();
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  // Generate IDs for section links
  const getSectionId = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };
  
  return (
    <TutorialContainer>
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: 'Recursos', path: '/recursos' },
        { label: 'Tutoriales', path: '/recursos/tutoriales' },
        { label: tutorial.title, path: `/recursos/tutoriales/${tutorial.id}` }
      ]} />
      
      <TutorialHeader>
        <TutorialTitle theme={theme}>{tutorial.title}</TutorialTitle>
        <TutorialMeta>
          <TutorialAuthor>{tutorial.author}</TutorialAuthor>
          <TutorialDate>{tutorial.date}</TutorialDate>
          <TutorialDifficulty className={tutorial.difficulty.toLowerCase()}>
            {tutorial.difficulty === 'Beginner' ? 'Principiante' : 
             tutorial.difficulty === 'Intermediate' ? 'Intermedio' : 'Avanzado'}
          </TutorialDifficulty>
        </TutorialMeta>
        <TutorialImage>
          <img src={tutorial.image} alt={tutorial.title} />
        </TutorialImage>
      </TutorialHeader>
      
      <TableOfContents theme={theme}>
        <TOCTitle theme={theme}>Contenido</TOCTitle>
        <TOCList>
          {sections.map((section, index) => (
            <TOCItem key={index} theme={theme}>
              <a href={`#${getSectionId(section.title)}`}>
                {section.title}
              </a>
              {section.subsections && section.subsections.length > 0 && (
                <ul>
                  {section.subsections.map((subsection, subIndex) => (
                    <li key={subIndex}>
                      <a href={`#${getSectionId(subsection)}`}>
                        {subsection}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </TOCItem>
          ))}
        </TOCList>
      </TableOfContents>
      
      <TutorialContent theme={theme}>
        {tutorial.introduction.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 id={getSectionId(section.title)}>
              {section.isStep && (
                <StepNumber theme={theme}>{sectionIndex + 1}</StepNumber>
              )}
              {section.title}
            </h2>
            
            {section.content.split('\n\n').map((paragraph, paraIndex) => (
              <p key={paraIndex}>{paragraph}</p>
            ))}
            
            {section.code && section.code.map((codeBlock, codeIndex) => (
              <CodeBlock key={codeIndex}>
                <CodeHeader theme={theme}>
                  <CodeLanguage>{codeBlock.language}</CodeLanguage>
                  <CopyButton 
                    theme={theme}
                    onClick={() => handleCopyCode(codeBlock.code, `${sectionIndex}-${codeIndex}`)}
                  >
                    {copiedIndex === `${sectionIndex}-${codeIndex}` ? 'Copiado!' : 'Copiar'}
                  </CopyButton>
                </CodeHeader>
                <CodeContent theme={theme}>
                  {codeBlock.code}
                </CodeContent>
              </CodeBlock>
            ))}
            
            {section.note && (
              <div className="note">{section.note}</div>
            )}
            
            {section.warning && (
              <div className="warning">{section.warning}</div>
            )}
            
            {section.tip && (
              <div className="tip">{section.tip}</div>
            )}
            
            {section.subsections && section.subsections.map((subsection, subIndex) => (
              <div key={subIndex}>
                <h3 id={getSectionId(subsection)}>{subsection}</h3>
                {section.subsectionContent && section.subsectionContent[subIndex] && (
                  section.subsectionContent[subIndex].split('\n\n').map((paragraph, paraIndex) => (
                    <p key={paraIndex}>{paragraph}</p>
                  ))
                )}
              </div>
            ))}
          </div>
        ))}
      </TutorialContent>
      
      {relatedTutorials && relatedTutorials.length > 0 && (
        <RelatedTutorials theme={theme}>
          <RelatedTitle theme={theme}>Tutoriales relacionados</RelatedTitle>
          <RelatedGrid>
            {relatedTutorials.map(related => (
              <RelatedCard key={related.id} to={`/recursos/tutoriales/${related.id}`} theme={theme}>
                <RelatedImage>
                  <img src={related.image} alt={related.title} />
                </RelatedImage>
                <RelatedContent>
                  <RelatedTutorialTitle theme={theme}>{related.title}</RelatedTutorialTitle>
                  <RelatedTutorialMeta theme={theme}>
                    <span>{related.date}</span>
                    <span className={related.difficulty.toLowerCase()}>
                      {related.difficulty === 'Beginner' ? 'Principiante' : 
                       related.difficulty === 'Intermediate' ? 'Intermedio' : 'Avanzado'}
                    </span>
                  </RelatedTutorialMeta>
                </RelatedContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedTutorials>
      )}
      
      <BackToAllTutorials to="/recursos/tutoriales" theme={theme}>
        Volver a todos los tutoriales
      </BackToAllTutorials>
    </TutorialContainer>
  );
};

export default Tutorial;
