// This utility provides a safe require function for images with fallback

// Safe require function that handles missing images
const safeRequire = (path) => {
  try {
    return require(path);
  } catch (err) {
    console.warn(`Image not found: ${path}, using fallback image`);
    return require('../assets/temp-image.jpg');
  }
};

// Export the safe require function
export default safeRequire;
