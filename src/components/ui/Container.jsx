import React from 'react';

/**
 * Container Component
 * @param {React.ReactNode} children - container content
 * @param {string} size - sm, md, lg, xl, full
 * @param {string} className - additional classes
 * @param {object} props - other props
 */
const Container = ({ 
  children,
  size = 'lg',
  className = '',
  ...props
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };
  
  return (
    <div 
      className={`w-full mx-auto px-4 sm:px-6 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 