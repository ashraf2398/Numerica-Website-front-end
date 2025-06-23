import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const Services = () => {
  const {
    services,
    categories,
    fetchServices,
    fetchCategories,
    createService,
    updateService,
    deleteService,
    loading,
    error,
  } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    is_published: true,
    features: [],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [fetchServices, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.categoryId) errors.categoryId = 'Category is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        imageUrl: '',
        is_published: true,
        features: [],
      });
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      categoryId: service.categoryId,
      imageUrl: service.imageUrl || '',
      is_published: service.is_published !== false,
      features: service.features || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        await deleteService(id);
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    }
  };

  return (
    <div className={`container mx-auto px-4 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-6`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Services</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              categoryId: categories.length > 0 ? categories[0].id : '',
              imageUrl: '',
              is_published: true,
              features: [],
            });
            setIsModalOpen(true);
          }}
          className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow-sm transition-colors`}
        >
          Add New Service
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
          {services.length === 0 ? (
            <div className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} shadow-md rounded-lg p-6 text-center col-span-full`}>
              No services found. Create your first one!
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-md rounded-lg overflow-hidden transition-colors`}>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex items-center">
                      {service.imageUrl && (
                        <img src={service.imageUrl} alt={service.title} className="mr-4 w-12 h-12 object-cover rounded" />
                      )}
                      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{service.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} transition-colors`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {service.description && (
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                  )}
                  
                  <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {service.features.length > 0 && (
                      <p>{service.features.length} features</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 w-full max-w-md transition-colors`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="categoryId">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formErrors.categoryId && <p className="text-red-500 text-xs mt-1">{formErrors.categoryId}</p>}
              </div>

              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="imageUrl">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-700'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>

              <div className="mb-4">
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="features">
                  Features
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    className={`shadow appearance-none border border-gray-300 rounded-l w-full py-2 px-3 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r`}
                  >
                    Add
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <ul className="mt-3 border border-gray-200 rounded divide-y">
                    {formData.features.map((feature, index) => (
                      <li key={index} className="px-3 py-2 flex justify-between items-center">
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
                  {loading ? 'Saving...' : editingId ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;