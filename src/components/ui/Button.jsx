import React from 'react';

/**
 * Enhanced Button Component with animations and dark mode support
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  onClick, 
  children,
  className = '',
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  // Define variant classes with dark mode support
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300',
    ghost: 'text-primary hover:bg-primary/10 dark:text-primary dark:hover:bg-primary/20 transition-all duration-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
  };
  
  // Combine classes
  const buttonClass = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    focus:outline-none focus:ring-4 focus:ring-primary/20
    disabled:transform-none disabled:shadow-none
    ${variantClasses[disabled ? 'disabled' : variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;