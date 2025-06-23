import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const Categories = () => {
  const { categories, fetchCategories, createCategory, updateCategory, deleteCategory, loading, error } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData);
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        icon: ''
      });
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await deleteCategory(id);
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  };

  return (
    <div className={`container mx-auto px-4 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-6`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Categories</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              description: '',
              icon: ''
            });
            setFormErrors({});
            setIsModalOpen(true);
          }}
          className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow-sm transition-colors`}
        >
          Add New Category
        </button>
      </div>

      {error && (
        <div className={`${isDarkMode ? 'bg-red-900 bg-opacity-30 border-red-700' : 'bg-red-100 border-red-400'} border px-4 py-3 rounded mb-4 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className={`animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'}`}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <div className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} shadow-md rounded-lg p-6 text-center col-span-full`}>
              No categories found. Create your first one!
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-md rounded-lg overflow-hidden transition-colors`}>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex items-center">
                      {category.icon && (
                        <div className={`mr-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          <i className={category.icon} style={{ fontSize: '24px' }}></i>
                        </div>
                      )}
                      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{category.name}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} transition-colors`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {category.description && (
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{category.description}</p>
                  )}
                  
                  <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {category.servicesCount !== undefined && (
                      <p>{category.servicesCount} services</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 w-full max-w-md transition-colors`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="description">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="icon">
                  Icon Class (optional)
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="e.g., fas fa-chart-line"
                  className={`shadow appearance-none border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-700'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>Font Awesome or similar icon classes</p>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-2 px-4 rounded mr-2 transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors`}
                >
                  {loading ? 'Saving...' : editingId ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 