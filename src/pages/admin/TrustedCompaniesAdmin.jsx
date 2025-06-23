import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { adminApi } from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave, FiMenu, FiChevronUp, FiChevronDown, FiImage, FiLink } from 'react-icons/fi';

const TrustedCompaniesAdmin = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({
    id: null,
    name: '',
    logo: null,
    website: '',
    is_active: true,
    order: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.getTrustedCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setCurrentCompany({
      ...currentCompany,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(currentCompany).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (isEditing) {
        await adminApi.updateTrustedCompany(currentCompany.id, formData);
        toast.success('Company updated successfully');
      } else {
        await adminApi.createTrustedCompany(formData);
        toast.success('Company created successfully');
      }

      setShowForm(false);
      resetForm();
      fetchCompanies();
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} company`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit company
  const handleEdit = (company) => {
    setCurrentCompany({
      id: company.id,
      company_name: company.company_name,
      website: company.website,
      is_active: company.is_active,
      logo: null,
      order: company.order
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete company
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await adminApi.deleteTrustedCompany(id);
        toast.success('Company deleted successfully');
        fetchCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
        toast.error('Failed to delete company');
      }
    }
  };

  // Toggle company status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await adminApi.updateTrustedCompany(id, { is_active: !currentStatus });
      toast.success(`Company ${currentStatus ? 'deactivated' : 'activated'}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error updating company status:', error);
      toast.error('Failed to update company status');
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentCompany({
      id: null,
      name: '',
      logo: null,
      website: '',
      is_active: true,
      order: 0
    });
    setIsEditing(false);
  };

  // Handle drag end for reordering
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(companies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCompanies(items);

    try {
      await adminApi.updateTrustedCompaniesOrder(items.map(item => item.id));
      toast.success('Companies order updated');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
      fetchCompanies();
    }
  };

  // Move company up or down
  const moveItem = async (currentIndex, direction) => {
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === companies.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newCompanies = [...companies];
    const [movedItem] = newCompanies.splice(currentIndex, 1);
    newCompanies.splice(newIndex, 0, movedItem);

    setCompanies(newCompanies);

    try {
      await adminApi.updateTrustedCompaniesOrder(newCompanies.map(item => item.id));
      toast.success('Company moved successfully');
    } catch (error) {
      console.error('Error moving company:', error);
      toast.error('Failed to move company');
      fetchCompanies();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Trusted Companies</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {showForm ? <FiX className="mr-2" /> : <FiPlus className="mr-2" />}
          {showForm ? 'Cancel' : 'Add New Company'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {isEditing ? 'Edit Company' : 'Add New Company'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={currentCompany.company_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Website URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={currentCompany.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Logo *
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <FiImage className="inline mr-2" />
                    {currentCompany.logo ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  <input
                    id="logo-upload"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  {currentCompany.logo_url && !currentCompany.logo && (
                    <div className="ml-4">
                      <img
                        src={currentCompany.logo_url}
                        alt={currentCompany.company_name}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  )}
                  {currentCompany.logo && (
                    <span className="ml-4 text-sm text-gray-500">
                      {currentCompany.logo.name}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Recommended size: 200x100px (will be resized to fit)
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={currentCompany.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="-ml-1 mr-2 h-4 w-4" />
                    {isEditing ? 'Update' : 'Save'} Company
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        {companies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No companies found. Add your first company!</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="companies">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {companies.map((company, index) => (
                    <Draggable key={company.id} draggableId={String(company.id)} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`px-4 py-4 sm:px-6 ${!company.is_active ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="p-2 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-move"
                              >
                                <FiMenu size={20} />
                              </div>
                              <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center bg-white dark:bg-gray-700 p-2 rounded">
                                {company.logo_url ? (
                                  <img
                                    src={company.logo_url}
                                    alt={company.company_name}
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <span className="text-gray-400 text-sm text-center">No Logo</span>
                                )}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {company.company_name}
                                </p>
                                {company.website && (
                                  <a 
                                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                  >
                                    <FiLink className="mr-1" size={12} />
                                    {company.website.replace(/^https?:\/\//, '')}
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => moveItem(index, 'up')}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move up"
                              >
                                <FiChevronUp size={18} />
                              </button>
                              <button
                                onClick={() => moveItem(index, 'down')}
                                disabled={index === companies.length - 1}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <FiChevronDown size={18} />
                              </button>
                              <button
                                onClick={() => handleEdit(company)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(company.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                              <button
                                onClick={() => toggleStatus(company.id, company.is_active)}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  company.is_active
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                                }`}
                              >
                                {company.is_active ? 'Active' : 'Inactive'}
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default TrustedCompaniesAdmin;
