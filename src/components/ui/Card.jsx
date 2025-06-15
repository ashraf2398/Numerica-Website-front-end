import React from 'react';

/**
 * Card Component
 * @param {string} title - card title
 * @param {string} description - card description
 * @param {React.ReactNode} image - card image
 * @param {React.ReactNode} children - card content
 * @param {boolean} hover - enable hover effect
 * @param {string} className - additional classes
 * @param {object} props - other props
 */
const Card = ({ 
  title,
  description,
  image,
  children,
  hover = true,
  className = '',
  ...props 
}) => {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
      {image && (
        <div className="card-image h-48 overflow-hidden">
          {typeof image === 'string' ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            image
          )}
        </div>
      )}
      <div className="p-5">
        {title && <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card; 