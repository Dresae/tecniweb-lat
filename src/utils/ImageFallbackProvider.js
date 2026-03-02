import React, { createContext, useContext } from 'react';

// Create a context for the image fallback
const ImageFallbackContext = createContext();

// Provider component that wraps the app and provides the fallback image functionality
export const ImageFallbackProvider = ({ children }) => {
  // Function to safely require images with fallback
  const safeRequire = (path) => {
    try {
      return require(path);
    } catch (err) {
      console.warn(`Image not found: ${path}, using fallback image`);
      return require('../assets/temp-image.jpg');
    }
  };

  return (
    <ImageFallbackContext.Provider value={{ safeRequire }}>
      {children}
    </ImageFallbackContext.Provider>
  );
};

// Hook to use the image fallback context
export const useSafeImage = () => {
  const context = useContext(ImageFallbackContext);
  if (!context) {
    throw new Error('useSafeImage must be used within an ImageFallbackProvider');
  }
  return context.safeRequire;
};

// HOC to wrap components with the image fallback provider
export const withImageFallback = (Component) => {
  return (props) => (
    <ImageFallbackProvider>
      <Component {...props} />
    </ImageFallbackProvider>
  );
};

// Export a direct function for components that don't need the context
export default function safeRequire(path) {
  try {
    return require(path);
  } catch (err) {
    console.warn(`Image not found: ${path}, using fallback image`);
    return require('../assets/temp-image.jpg');
  }
}
