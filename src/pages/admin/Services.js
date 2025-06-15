import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

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
    error 
  } = useData();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    is_published: true,
    features: []
  });
  const [featureInput, setFeatureInput] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [fetchServices, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
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
        features: []
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
      features: service.features || []
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

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.categoryId === activeFilter);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Services</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              categoryId: categories.length > 0 ? categories[0].id : '',
              imageUrl: '',
              is_published: true,
              features: []
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Add New Service
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-md ${
                activeFilter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500 col-span-full">
              No services found. {activeFilter !== 'all' ? 'Try selecting a different category or create a new service.' : 'Create your first service!'}
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {service.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    Category: {getCategoryNameById(service.categoryId)}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Features</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="text-gray-600">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${service.is_published ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-gray-500">{service.is_published ? 'Published' : 'Not Published'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryId">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                ></textarea>
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Features
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    className="shadow appearance-none border border-gray-300 rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
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

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Publish this service</span>
                </label>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? 'Saving...' : 'Save Service'}
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