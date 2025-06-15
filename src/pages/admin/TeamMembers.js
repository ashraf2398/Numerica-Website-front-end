import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const TeamMembers = () => {
  const { teamMembers, fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, loading, error } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    email: '',
    phone: '',
    social_media: {
      linkedin: '',
      twitter: '',
      facebook: ''
    },
    is_published: true
  });
  const [socialInput, setSocialInput] = useState({ platform: 'linkedin', url: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSocialInputChange = (e) => {
    const { name, value } = e.target;
    setSocialInput({
      ...socialInput,
      [name]: value
    });
  };

  const addSocialLink = () => {
    if (socialInput.url.trim()) {
      setFormData({
        ...formData,
        social_media: {
          ...formData.social_media,
          [socialInput.platform]: socialInput.url
        }
      });
      setSocialInput({ platform: 'linkedin', url: '' });
    }
  };

  const removeSocialLink = (platform) => {
    const updatedSocialMedia = { ...formData.social_media };
    delete updatedSocialMedia[platform];
    
    setFormData({
      ...formData,
      social_media: updatedSocialMedia
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.title.trim()) errors.title = 'Position/Title is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Transform form data to API expected format
      const apiData = {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        social_media: formData.social_media,
        image: formData.image,
        email: formData.email,
        phone: formData.phone,
        is_published: formData.is_published
      };

      if (editingId) {
        await updateTeamMember(editingId, apiData);
      } else {
        await createTeamMember(apiData);
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        title: '',
        description: '',
        image: '',
        email: '',
        phone: '',
        social_media: {
          linkedin: '',
          twitter: '',
          facebook: ''
        },
        is_published: true
      });
    } catch (err) {
      console.error('Error saving team member:', err);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    
    // Transform API data to form format
    setFormData({
      name: member.name || '',
      title: member.title || '',
      description: member.description || '',
      image: member.image || '',
      email: member.email || '',
      phone: member.phone || '',
      social_media: member.social_media || {
        linkedin: '',
        twitter: '',
        facebook: ''
      },
      is_published: member.is_published !== undefined ? member.is_published : true
    });
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      try {
        await deleteTeamMember(id);
      } catch (err) {
        console.error('Error deleting team member:', err);
      }
    }
  };

  // Get social media icon based on platform
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        );
      case 'github':
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Format platform name for display
  const formatPlatformName = (platform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              title: '',
              description: '',
              image: '',
              email: '',
              phone: '',
              social_media: {
                linkedin: '',
                twitter: '',
                facebook: ''
              },
              is_published: true
            });
            setFormErrors({});
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Team Member
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500 col-span-full">
              No team members found. Add your first team member!
            </div>
          ) : (
            teamMembers.map((member) => (
              <div key={member.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                {member.image && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                      <p className="text-gray-600">{member.title}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {member.description && (
                    <p className="text-gray-600 mt-4">{member.description}</p>
                  )}
                  
                  {member.social_media && Object.keys(member.social_media).length > 0 && (
                    <div className="mt-4 flex space-x-4">
                      {Object.entries(member.social_media).map(([platform, url]) => (
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-800 hover:scale-110 transition-transform"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                  
                  {member.is_published !== undefined && (
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Status: <span className={member.is_published ? "text-green-600 font-medium" : "text-gray-500"}>
                          {member.is_published ? 'Published' : 'Draft'}
                        </span>
                      </p>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-xs text-blue-600 hover:underline">
                          {member.email}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Team Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-screen overflow-y-auto shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Position/Title
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Bio/Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-bold">
                    Social Media Links
                  </label>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Published</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.is_published}
                        onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <select
                    name="platform"
                    value={socialInput.platform}
                    onChange={handleSocialInputChange}
                    className="shadow border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="github">GitHub</option>
                  </select>
                  <input
                    type="text"
                    name="url"
                    value={socialInput.url}
                    onChange={handleSocialInputChange}
                    placeholder="https://..."
                    className="shadow appearance-none border border-gray-300 rounded flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>

                {Object.keys(formData.social_media).length > 0 && (
                  <ul className="mt-3 border border-gray-200 rounded divide-y">
                    {Object.entries(formData.social_media).map(([platform, url]) => (
                      url && (
                        <li key={platform} className="px-3 py-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">{getSocialIcon(platform)}</span>
                            <span className="font-medium mr-2">{formatPlatformName(platform)}:</span>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                              {url}
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSocialLink(platform)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-end mt-8 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded mr-3 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Team Member'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers; 