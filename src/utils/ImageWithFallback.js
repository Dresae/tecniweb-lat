import React from 'react';

// Higher-order component to handle image loading with fallback
const withImageFallback = (WrappedComponent) => {
  return (props) => {
    // Function to safely require images with fallback
    const safeRequire = (path) => {
      try {
        return require(path);
      } catch (err) {
        console.warn(`Image not found: ${path}, using fallback image`);
        return require('../assets/temp-image.jpg');
      }
    };

    // Modified props with safe image loading
    const modifiedProps = {
      ...props,
      // Override the require function in props
      require: safeRequire
    };

    return <WrappedComponent {...modifiedProps} />;
  };
};

export default withImageFallback;
