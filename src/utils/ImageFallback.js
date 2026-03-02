// ImageFallback.js - Utility to handle missing image assets

// This is a module that intercepts require calls for images and provides a fallback
// when the requested image doesn't exist

// Store the original require function
const originalRequire = require;

// Create a new require function that catches errors for image assets
function customRequire(path) {
  try {
    // Try to load the requested asset
    return originalRequire(path);
  } catch (err) {
    // If it fails and it's an image asset, return the fallback image
    if (path.match(/\.(jpg|jpeg|png|gif)$/i)) {
      console.warn(`Image not found: ${path}, using fallback image`);
      return originalRequire('../assets/temp-image.jpg');
    }
    // For non-image assets, rethrow the error
    throw err;
  }
}

// Replace the global require function with our custom one
window.require = customRequire;

// Export a dummy function for imports to work
export default function getImageWithFallback(path) {
  return require(path);
}
