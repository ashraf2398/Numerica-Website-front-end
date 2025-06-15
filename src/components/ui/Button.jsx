import React from 'react';

/**
 * Button Component
 * @param {string} variant - primary, secondary, outline, text, disabled
 * @param {string} size - sm, md, lg
 * @param {boolean} fullWidth - whether button should take full width
 * @param {function} onClick - click handler
 * @param {React.ReactNode} children - button content
 * @param {string} className - additional classes
 * @param {boolean} disabled - disabled state
 * @param {object} props - other props
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  onClick, 
  children,
  className = '',
  disabled = false,
  ...props 
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Define variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    text: 'bg-transparent text-primary hover:bg-gray-100',
    disabled: 'btn-disabled'
  };
  
  // Combine classes
  const buttonClass = `
    ${variantClasses[disabled ? 'disabled' : variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 