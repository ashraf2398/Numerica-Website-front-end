import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { adminApi } from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave, FiMenu, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    id: null,
    client_name: '',
    client_position: '',
    company: '',
    content: '',
    rating: 5,
    is_active: true,
    avatar: null
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.getAdminTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setCurrentTestimonial({
      ...currentTestimonial,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(currentTestimonial).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (isEditing) {
        await adminApi.updateTestimonial(currentTestimonial.id, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await adminApi.createTestimonial(formData);
        toast.success('Testimonial created successfully');
      }

      setShowForm(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} testimonial`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setCurrentTestimonial({
      id: testimonial.id,
      client_name: testimonial.client_name,
      client_position: testimonial.client_position,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
      avatar: null
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await adminApi.deleteTestimonial(id);
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Failed to delete testimonial');
      }
    }
  };

  // Toggle testimonial status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await adminApi.updateTestimonial(id, { is_active: !currentStatus });
      toast.success(`Testimonial ${currentStatus ? 'deactivated' : 'activated'}`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      toast.error('Failed to update testimonial status');
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentTestimonial({
      id: null,
      client_name: '',
      client_position: '',
      company: '',
      content: '',
      rating: 5,
      is_active: true,
      avatar: null
    });
    setIsEditing(false);
  };

  // Handle drag end for reordering
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(testimonials);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTestimonials(items);

    try {
      await adminApi.updateTestimonialsOrder(items.map(item => item.id));
      toast.success('Testimonials order updated');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
      fetchTestimonials(); // Revert if there's an error
    }
  };

  // Move testimonial up or down
  const moveItem = async (currentIndex, direction) => {
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === testimonials.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newTestimonials = [...testimonials];
    const [movedItem] = newTestimonials.splice(currentIndex, 1);
    newTestimonials.splice(newIndex, 0, movedItem);

    setTestimonials(newTestimonials);

    try {
      await adminApi.updateTestimonialsOrder(newTestimonials.map(item => item.id));
      toast.success('Testimonial moved successfully');
    } catch (error) {
      console.error('Error moving testimonial:', error);
      toast.error('Failed to move testimonial');
      fetchTestimonials();
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Testimonials</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {showForm ? <FiX className="mr-2" /> : <FiPlus className="mr-2" />}
          {showForm ? 'Cancel' : 'Add New Testimonial'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={currentTestimonial.client_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client Position
                </label>
                <input
                  type="text"
                  name="client_position"
                  value={currentTestimonial.client_position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={currentTestimonial.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating (1-5)
                </label>
                <select
                  name="rating"
                  value={currentTestimonial.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'star' : 'stars'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Testimonial Content *
                </label>
                <textarea
                  name="content"
                  value={currentTestimonial.content}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {currentTestimonial.avatar_url && !currentTestimonial.avatar && (
                  <div className="mt-2">
                    <img
                      src={currentTestimonial.avatar_url}
                      alt="Current avatar"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={currentTestimonial.is_active}
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
                    {isEditing ? 'Update' : 'Save'} Testimonial
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No testimonials found. Add your first testimonial!</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="testimonials">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {testimonials.map((testimonial, index) => (
                    <Draggable key={testimonial.id} draggableId={String(testimonial.id)} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`px-4 py-4 sm:px-6 ${!testimonial.is_active ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="p-2 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-move"
                              >
                                <FiMenu size={20} />
                              </div>
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                {testimonial.avatar_url ? (
                                  <img
                                    src={testimonial.avatar_url}
                                    alt={testimonial.client_name}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-gray-500 dark:text-gray-300 font-medium">
                                    {testimonial.client_name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {testimonial.client_name}
                                  </p>
                                  {testimonial.company && (
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                      ({testimonial.company})
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < testimonial.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
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
                                disabled={index === testimonials.length - 1}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <FiChevronDown size={18} />
                              </button>
                              <button
                                onClick={() => handleEdit(testimonial)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                              <button
                                onClick={() => toggleStatus(testimonial.id, testimonial.is_active)}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  testimonial.is_active
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                                }`}
                              >
                                {testimonial.is_active ? 'Active' : 'Inactive'}
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            "{testimonial.content}"
                          </p>
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

export default TestimonialsAdmin;
