import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const Contacts = () => {
  const { contacts, fetchContacts, createContact, updateContact, loading, error } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: ''
  });
  const [newContact, setNewContact] = useState({
    addresses: [],
    phones: [],
    emails: [],
    is_published: true
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isCreating) {
        // Creating a new contact from scratch
        await createContact(newContact);
        setIsCreating(false);
      } else if (editingId) {
        // Adding to existing contact
        const currentContact = contacts.find(c => c.id === editingId);
        if (!currentContact) return;
        
        const updatedContact = { ...currentContact };
        
        // Add all non-empty fields to the existing contact
        if (formData.address.trim()) {
          updatedContact.addresses = [...updatedContact.addresses, formData.address];
        }
        if (formData.phone.trim()) {
          updatedContact.phones = [...updatedContact.phones, formData.phone];
        }
        if (formData.email.trim()) {
          updatedContact.emails = [...updatedContact.emails, formData.email];
        }
        
        await updateContact(editingId, updatedContact);
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        address: '',
        phone: '',
        email: ''
      });
      setNewContact({
        addresses: [],
        phones: [],
        emails: [],
        is_published: true
      });
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (isCreating) {
      if (newContact.addresses.length === 0 && 
          newContact.phones.length === 0 && 
          newContact.emails.length === 0) {
        errors.general = 'At least one contact item is required';
      }
    } else {
      // When adding to existing contact, at least one field must be filled
      if (!formData.address.trim() && !formData.phone.trim() && !formData.email.trim()) {
        errors.general = 'At least one field is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddToNewContact = () => {
    const hasContent = formData.address.trim() || formData.phone.trim() || formData.email.trim();
    
    if (!hasContent) {
      setFormErrors({ general: 'At least one field is required' });
      return;
    }
    
    const updatedContact = { ...newContact };
    
    if (formData.address.trim()) {
      updatedContact.addresses = [...updatedContact.addresses, formData.address];
    }
    
    if (formData.phone.trim()) {
      updatedContact.phones = [...updatedContact.phones, formData.phone];
    }
    
    if (formData.email.trim()) {
      updatedContact.emails = [...updatedContact.emails, formData.email];
    }
    
    setNewContact(updatedContact);
    setFormData({
      address: '',
      phone: '',
      email: ''
    });
    setFormErrors({});
  };

  const handleRemoveFromNewContact = (type, index) => {
    const updatedContact = { ...newContact };
    
    if (type === 'address') {
      updatedContact.addresses = updatedContact.addresses.filter((_, i) => i !== index);
    } else if (type === 'phone') {
      updatedContact.phones = updatedContact.phones.filter((_, i) => i !== index);
    } else if (type === 'email') {
      updatedContact.emails = updatedContact.emails.filter((_, i) => i !== index);
    }
    
    setNewContact(updatedContact);
  };

  const handleDeleteItem = async (contactId, type, index) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact) return;
      
      const updatedContact = { ...contact };
      
      if (type === 'address') {
        updatedContact.addresses = updatedContact.addresses.filter((_, i) => i !== index);
      } else if (type === 'phone') {
        updatedContact.phones = updatedContact.phones.filter((_, i) => i !== index);
      } else if (type === 'email') {
        updatedContact.emails = updatedContact.emails.filter((_, i) => i !== index);
      }
      
      await updateContact(contactId, updatedContact);
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  // Get icon based on contact type
  const getContactIcon = (type) => {
    switch (type) {
      case 'address':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case 'email':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Contact Information</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setIsCreating(true);
            setFormData({
              address: '',
              phone: '',
              email: ''
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Create New Contact
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
          {contacts.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
              No contact information found. Create your first one!
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {contact.is_published !== undefined && (
                  <div className="bg-gray-50 px-6 py-2 border-b flex justify-between items-center">
                    <div className={`px-2 py-1 rounded text-xs ${contact.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {contact.is_published ? 'Published' : 'Draft'}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {contact.id} | Created: {new Date(contact.created_at).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Addresses Section */}
                {contact.addresses && contact.addresses.length > 0 && (
                  <div className="border-b">
                    <div className="bg-gray-50 px-6 py-3 border-b">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        {getContactIcon('address')}
                        <span className="ml-2">Addresses</span>
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {contact.addresses.map((address, index) => (
                        <div key={index} className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="text-gray-700 whitespace-pre-line">{address}</div>
                            <button
                              onClick={() => handleDeleteItem(contact.id, 'address', index)}
                              className="text-red-600 hover:text-red-800 ml-4"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phones Section */}
                {contact.phones && contact.phones.length > 0 && (
                  <div className="border-b">
                    <div className="bg-gray-50 px-6 py-3 border-b">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        {getContactIcon('phone')}
                        <span className="ml-2">Phone Numbers</span>
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {contact.phones.map((phone, index) => (
                        <div key={index} className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="text-gray-700">
                              <a href={`tel:${phone}`} className="text-blue-600 hover:underline">{phone}</a>
                            </div>
                            <button
                              onClick={() => handleDeleteItem(contact.id, 'phone', index)}
                              className="text-red-600 hover:text-red-800 ml-4"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emails Section */}
                {contact.emails && contact.emails.length > 0 && (
                  <div>
                    <div className="bg-gray-50 px-6 py-3 border-b">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        {getContactIcon('email')}
                        <span className="ml-2">Email Addresses</span>
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {contact.emails.map((email, index) => (
                        <div key={index} className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="text-gray-700">
                              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
                            </div>
                            <button
                              onClick={() => handleDeleteItem(contact.id, 'email', index)}
                              className="text-red-600 hover:text-red-800 ml-4"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-gray-50 border-t flex justify-end">
                  <button
                    onClick={() => {
                      setEditingId(contact.id);
                      setFormData({
                        address: contact.addresses ? contact.addresses[0] : '',
                        phone: contact.phones ? contact.phones[0] : '',
                        email: contact.emails ? contact.emails[0] : ''
                      });
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm text-sm"
                  >
                    Add New Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isCreating ? 'Create New Contact' : 'Add Contact Information'}
            </h2>
            
            {isCreating ? (
              <form onSubmit={handleSubmit}>
                {/* Contact Creation Form */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Contact Details</h3>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Published</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={newContact.is_published}
                          onChange={(e) => setNewContact({...newContact, is_published: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4 mb-4">
                    {/* Address Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Enter address"
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToNewContact}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
                  >
                    Add to Contact
                  </button>

                  {formErrors.general && (
                    <p className="text-red-500 text-xs mb-4">{formErrors.general}</p>
                  )}
                  
                  {/* Preview of added items */}
                  {newContact.addresses.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sm text-gray-700 mb-2">Addresses:</h3>
                      <ul className="border border-gray-200 rounded divide-y">
                        {newContact.addresses.map((address, index) => (
                          <li key={index} className="px-3 py-2 flex justify-between items-center">
                            <div className="text-sm text-gray-700">{address}</div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFromNewContact('address', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {newContact.phones.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sm text-gray-700 mb-2">Phone Numbers:</h3>
                      <ul className="border border-gray-200 rounded divide-y">
                        {newContact.phones.map((phone, index) => (
                          <li key={index} className="px-3 py-2 flex justify-between items-center">
                            <div className="text-sm text-gray-700">{phone}</div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFromNewContact('phone', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {newContact.emails.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sm text-gray-700 mb-2">Email Addresses:</h3>
                      <ul className="border border-gray-200 rounded divide-y">
                        {newContact.emails.map((email, index) => (
                          <li key={index} className="px-3 py-2 flex justify-between items-center">
                            <div className="text-sm text-gray-700">{email}</div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFromNewContact('email', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    disabled={loading || (newContact.addresses.length === 0 && newContact.phones.length === 0 && newContact.emails.length === 0)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Create Contact'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Add to existing contact */}
                <div className="space-y-4 mb-6">
                  {/* Address Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter address"
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                {formErrors.general && (
                  <p className="text-red-500 text-xs mb-4">{formErrors.general}</p>
                )}

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
                    disabled={loading || (!formData.address.trim() && !formData.phone.trim() && !formData.email.trim())}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Add to Contact'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts; 