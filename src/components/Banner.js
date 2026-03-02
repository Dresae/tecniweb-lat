import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';

const Banner = ({ images, title, subtitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner">
      <div className="banner-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`banner-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="banner-overlay" />
      </div>
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
      <div className="banner-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
