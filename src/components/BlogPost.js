import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Breadcrumb from './Breadcrumb';

const BlogPostContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const BlogHeader = styled.div`
  margin-bottom: 40px;
`;

const BlogTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-family: 'Rubik', sans-serif;
  color: ${props => props.theme === 'light' ? '#666' : '#aaa'};
  flex-wrap: wrap;
  gap: 10px;
`;

const BlogAuthor = styled.span`
  margin-right: 20px;
  
  &::before {
    content: 'Por: ';
    font-weight: 500;
  }
`;

const BlogDate = styled.span`
  &::before {
    content: '• ';
    margin: 0 10px;
  }
`;

const BlogImage = styled.div`
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
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const BlogContent = styled.div`
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
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
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
    padding: 15px 20px;
    margin: 30px 0;
    font-style: italic;
    color: ${props => props.theme === 'light' ? '#555' : '#bbb'};
    background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#1a1a1a'};
    border-radius: 0 4px 4px 0;
  }
  
  a {
    color: ${props => props.theme === 'light' ? 'var(--dark-green-2)' : 'var(--light-green-2)'};
    text-decoration: none;
    border-bottom: 1px dotted;
    transition: all 0.2s ease;
    
    &:hover {
      border-bottom: 1px solid;
    }
  }
  
  strong {
    font-weight: 700;
    color: ${props => props.theme === 'light' ? '#222' : '#fff'};
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 20px 0;
    display: block;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BlogNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid ${props => props.theme === 'light' ? '#eee' : '#333'};
`;

const NavLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: ${props => props.theme === 'light' ? 'var(--light-green-2)' : 'var(--dark-green-2)'};
    }
  }
`;

const BackToAllPosts = styled(Link)`
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

const RelatedPosts = styled.div`
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
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
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
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const RelatedContent = styled.div`
  padding: 15px;
`;

const RelatedPostTitle = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: ${props => props.theme === 'light' ? 'var(--dark-green-1)' : 'var(--light-green-1)'};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RelatedPostDate = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme === 'light' ? '#666' : '#aaa'};
`;

const BlogPost = ({ post, relatedPosts, prevPost, nextPost }) => {
  const { theme } = useTheme();
  
  // Helper function to process content with basic formatting
  const processContent = (content) => {
    // Split content by double newlines to get paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph is a heading
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} id={`heading-${index}`}>{paragraph.substring(3)}</h2>;
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} id={`heading-${index}`}>{paragraph.substring(4)}</h3>;
      } 
      // Check if paragraph is a blockquote
      else if (paragraph.startsWith('> ')) {
        return <blockquote key={index}>{paragraph.substring(2)}</blockquote>;
      }
      // Check if paragraph is a list
      else if (paragraph.includes('- ')) {
        const listItems = paragraph.split('\n- ');
        // If the first item doesn't start with '- ', it's a paragraph before the list
        const hasPrefixText = !listItems[0].startsWith('- ');
        
        // Process any bold text in list items
        const processedListItems = listItems.map(item => {
          if (item.includes('**')) {
            return item.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
          }
          return item;
        });
        
        return (
          <React.Fragment key={index}>
            {hasPrefixText && (
              processedListItems[0].includes('<strong>') ? 
                <p dangerouslySetInnerHTML={{ __html: processedListItems[0] }} /> : 
                <p>{processedListItems[0]}</p>
            )}
            <ul>
              {processedListItems.slice(hasPrefixText ? 1 : 0).map((item, i) => (
                item.includes('<strong>') ? 
                  <li key={i} dangerouslySetInnerHTML={{ __html: item.startsWith('- ') ? item.substring(2) : item }} /> :
                  <li key={i}>{item.startsWith('- ') ? item.substring(2) : item}</li>
              ))}
            </ul>
          </React.Fragment>
        );
      } 
      // Process any paragraph that might contain formatting
      else {
        // Check if paragraph contains any formatting that needs processing
        const hasFormatting = paragraph.includes('**') || 
                             (paragraph.includes('[') && paragraph.includes('](') && paragraph.includes(')'));
        
        if (hasFormatting) {
          let processedText = paragraph;
          
          // Replace markdown links with actual anchor tags
          if (paragraph.includes('[') && paragraph.includes('](') && paragraph.includes(')')) {
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            processedText = processedText.replace(linkRegex, (match, text, url) => {
              return `<a href="${url}">${text}</a>`;
            });
          }
          
          // Replace bold text (**text**) with <strong> tags
          if (paragraph.includes('**')) {
            const boldRegex = /\*\*([^*]+)\*\*/g;
            processedText = processedText.replace(boldRegex, (match, text) => {
              return `<strong>${text}</strong>`;
            });
          }
          
          // Use dangerouslySetInnerHTML for the formatted text
          return <p key={index} dangerouslySetInnerHTML={{ __html: processedText }} />;
        } else {
          // Regular paragraph without formatting
          return <p key={index}>{paragraph}</p>;
        }
      }
    });
  };
  
  return (
    <BlogPostContainer>
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: 'Recursos', path: '/recursos' },
        { label: 'Blog', path: '/recursos/blog' },
        { label: post.title, path: `/recursos/blog/${post.id}` }
      ]} />
      
      <BlogHeader>
        <BlogTitle theme={theme}>{post.title}</BlogTitle>
        <BlogMeta>
          <BlogAuthor>{post.author}</BlogAuthor>
          <BlogDate>{post.date}</BlogDate>
        </BlogMeta>
        <BlogImage>
          <img src={post.image} alt={post.title} />
        </BlogImage>
      </BlogHeader>
      
      <BlogContent theme={theme}>
        {processContent(post.content)}
      </BlogContent>
      
      <BlogNavigation theme={theme}>
        {prevPost ? (
          <NavLink to={`/recursos/blog/${prevPost.id}`} theme={theme}>
            Artículo anterior
          </NavLink>
        ) : (
          <NavLink as="span" className="disabled" theme={theme}>
            Artículo anterior
          </NavLink>
        )}
        
        {nextPost ? (
          <NavLink to={`/recursos/blog/${nextPost.id}`} theme={theme}>
            Artículo siguiente
          </NavLink>
        ) : (
          <NavLink as="span" className="disabled" theme={theme}>
            Artículo siguiente
          </NavLink>
        )}
      </BlogNavigation>
      
      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPosts theme={theme}>
          <RelatedTitle theme={theme}>Artículos relacionados</RelatedTitle>
          <RelatedGrid>
            {relatedPosts.map(related => (
              <RelatedCard key={related.id} to={`/recursos/blog/${related.id}`} theme={theme}>
                <RelatedImage>
                  <img src={related.image} alt={related.title} />
                </RelatedImage>
                <RelatedContent>
                  <RelatedPostTitle theme={theme}>{related.title}</RelatedPostTitle>
                  <RelatedPostDate theme={theme}>{related.date}</RelatedPostDate>
                </RelatedContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedPosts>
      )}
      
      <BackToAllPosts to="/recursos/blog" theme={theme}>
        Volver a todos los artículos
      </BackToAllPosts>
    </BlogPostContainer>
  );
};

export default BlogPost;
