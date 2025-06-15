import React, { useState, useEffect } from 'react';

const EntityForm = ({ 
  fields, 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting, 
  title 
}) => {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  
  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: fieldValue
    });
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    let isValid = true;
    
    fields.forEach(field => {
      // Check required fields
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }
      
      // Number validation
      if (field.type === 'number' && formData[field.name]) {
        if (isNaN(Number(formData[field.name]))) {
          newErrors[field.name] = 'Please enter a valid number';
          isValid = false;
        }
      }
      
      // Custom validation
      if (field.validate && formData[field.name]) {
        const customError = field.validate(formData[field.name], formData);
        if (customError) {
          newErrors[field.name] = customError;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? "col-span-2" : ""}>
              <label 
                htmlFor={field.name} 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={field.disabled || isSubmitting}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    field.disabled ? 'bg-gray-100' : ''
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={field.rows || 3}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={field.disabled || isSubmitting}
                  placeholder={field.placeholder}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    field.disabled ? 'bg-gray-100' : ''
                  }`}
                />
              ) : field.type === 'checkbox' ? (
                <div className="mt-1 flex items-center">
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={!!formData[field.name]}
                    onChange={handleChange}
                    disabled={field.disabled || isSubmitting}
                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                      field.disabled ? 'bg-gray-100' : ''
                    }`}
                  />
                  <span className="ml-2 text-sm text-gray-500">{field.description}</span>
                </div>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  disabled={field.disabled || isSubmitting}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  className={`mt-1 block w-full py-2 px-3 border ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    field.disabled ? 'bg-gray-100' : ''
                  }`}
                />
              )}
              
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
              )}
              
              {field.helperText && !errors[field.name] && (
                <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3 mt-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : initialData?.id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntityForm; 