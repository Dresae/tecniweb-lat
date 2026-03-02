import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          {items.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {index === items.length - 1 ? (
                <span className="breadcrumb-active">{item.label}</span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
