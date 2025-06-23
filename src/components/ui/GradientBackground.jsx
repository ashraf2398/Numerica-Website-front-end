import React from 'react';

const GradientBackground = ({ 
  variant = 'primary', 
  children, 
  className = '',
  overlay = true 
}) => {
  const gradients = {
    primary: 'from-primary via-primary/90 to-secondary',
    secondary: 'from-secondary via-secondary/90 to-primary',
    dark: 'from-gray-900 via-gray-800 to-gray-900',
    light: 'from-gray-50 via-white to-gray-100'
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;