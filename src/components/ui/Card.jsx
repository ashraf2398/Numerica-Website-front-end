import React from 'react';

/**
 * Enhanced Card Component with animations and dark mode support
 */
const Card = ({ 
  title,
  description,
  image,
  children,
  hover = true,
  className = '',
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl border-0',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20'
  };

  const hoverEffects = hover 
    ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
    : 'transition-all duration-300';

  return (
    <div 
      className={`
        rounded-xl overflow-hidden
        ${variants[variant]}
        ${hoverEffects}
        ${className}
      `} 
      {...props}
    >
      {image && (
        <div className="relative overflow-hidden">
          {typeof image === 'string' ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" 
            />
          ) : (
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              {image}
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;