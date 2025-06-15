import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const AboutEntries = () => {
  const { aboutEntries, fetchAboutEntries, createAboutEntry, updateAboutEntry, deleteAboutEntry, loading, error } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    is_published: false,
    order: 0
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchAboutEntries();
  }, [fetchAboutEntries]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.content.trim()) errors.content = 'Content is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateAboutEntry(editingId, formData);
      } else {
        await createAboutEntry(formData);
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        title: '',
        content: '',
        imageUrl: '',
        is_published: false,
        order: 0
      });
    } catch (err) {
      console.error('Error saving about entry:', err);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setFormData({
      title: entry.title,
      content: entry.content,
      imageUrl: entry.imageUrl || '',
      is_published: entry.is_published || false,
      order: entry.order || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this about entry? This action cannot be undone.')) {
      try {
        await deleteAboutEntry(id);
      } catch (err) {
        console.error('Error deleting about entry:', err);
      }
    }
  };

  const openNewEntryModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      is_published: false,
      order: aboutEntries.length > 0 ? Math.max(...aboutEntries.map(e => e.order || 0)) + 1 : 0
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">About Entries</h1>
        <button
          onClick={openNewEntryModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Add New Entry
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {aboutEntries.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
              No about entries found. Create your first one!
            </div>
          ) : (
            aboutEntries.map((entry) => (
              <div key={entry.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{entry.title}</h2>
                    <div className="flex space-x-2">
                      <div className={`text-sm px-2 py-1 rounded-full ${entry.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {entry.is_published ? 'Published' : 'Unpublished'}
                      </div>
                      <button
                        onClick={() => handleEdit(entry)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    {entry.imageUrl && (
                      <div className="md:w-1/4">
                        <img
                          src={entry.imageUrl}
                          alt={entry.title}
                          className="w-full h-auto rounded-md object-cover"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    )}
                    <div className={entry.imageUrl ? 'md:w-3/4' : 'w-full'}>
                      <p className="text-gray-600 whitespace-pre-line">{entry.content}</p>
                      {entry.order !== undefined && (
                        <p className="text-sm text-gray-500 mt-4">Order: {entry.order}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* About Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit About Entry' : 'Add New About Entry'}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_published">
                  Publication Status
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_published" className="ml-2 block text-gray-700">
                    {formData.is_published ? 'Published' : 'Unpublished'}
                  </label>
                  <div className={`ml-2 px-2 py-1 text-xs rounded-full ${formData.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {formData.is_published ? 'Visible to public' : 'Hidden from public'}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="6"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.content ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                ></textarea>
                {formErrors.content && <p className="text-red-500 text-xs mt-1">{formErrors.content}</p>}
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

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="order">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-gray-500 text-xs mt-1">Lower numbers appear first</p>
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
                  {loading ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutEntries; 