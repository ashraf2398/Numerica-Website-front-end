import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const Contacts = () => {
  const { contacts, fetchContacts, createContact, updateContact, loading, error } = useData();
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ address: '', phone: '', email: '' });
  const [newContact, setNewContact] = useState({ addresses: [], phones: [], emails: [], is_published: true });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (isCreating) {
      if (!newContact.addresses.length && !newContact.phones.length && !newContact.emails.length) {
        errors.general = 'At least one contact item is required';
      }
    } else {
      if (!formData.address.trim() && !formData.phone.trim() && !formData.email.trim()) {
        errors.general = 'At least one field is required';
      }
    }
    setFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleAddToNewContact = () => {
    const { address, phone, email } = formData;
    if (!address.trim() && !phone.trim() && !email.trim()) {
      setFormErrors({ general: 'At least one field is required' });
      return;
    }
    const updated = { ...newContact };
    if (address.trim()) updated.addresses.push(address.trim());
    if (phone.trim()) updated.phones.push(phone.trim());
    if (email.trim()) updated.emails.push(email.trim());
    setNewContact(updated);
    setFormData({ address: '', phone: '', email: '' });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isCreating) {
        await createContact(newContact);
      } else if (editingId) {
        const contact = contacts.find(c => c.id === editingId);
        const updated = { ...contact };
        if (formData.address.trim()) updated.addresses = [...(updated.addresses || []), formData.address.trim()];
        if (formData.phone.trim()) updated.phones = [...(updated.phones || []), formData.phone.trim()];
        if (formData.email.trim()) updated.emails = [...(updated.emails || []), formData.email.trim()];
        await updateContact(editingId, updated);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const handleDeleteItem = async (contactId, type, index) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const contact = contacts.find(c => c.id === contactId);
      const updated = { ...contact };
      updated[`${type}s`] = updated[`${type}s`].filter((_, i) => i !== index);
      await updateContact(contactId, updated);
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'address':
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>);
      case 'phone':
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>);
      case 'email':
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>);
      default:
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>);
    }
  };

  const openModalForNew = () => {
    setEditingId(null);
    setIsCreating(true);
    setFormData({ address: '', phone: '', email: '' });
    setNewContact({ addresses: [], phones: [], emails: [], is_published: true });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openModalForEdit = (contact) => {
    setEditingId(contact.id);
    setIsCreating(false);
    setFormData({
      address: contact.addresses?.[0] || '',
      phone: contact.phones?.[0] || '',
      email: contact.emails?.[0] || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsCreating(false);
    setFormData({ address: '', phone: '', email: '' });
    setNewContact({ addresses: [], phones: [], emails: [], is_published: true });
    setFormErrors({});
  };

  return (
    <div className={`container mx-auto px-4 min-h-screen py-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contact Information</h1>
        <button onClick={openModalForNew} className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow-sm transition-colors`}>
          Create New Contact
        </button>
      </div>
      {error && <div className={`${isDarkMode ? 'bg-red-900 bg-opacity-30 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded mb-4`}><p>{error}</p></div>}
      {loading ? (
        <div className="flex justify-center"><div className={`animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'}`}></div></div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.length === 0 ? (
            <div className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} shadow-md rounded-lg p-6 text-center`}>No contact information found. Create your first one!</div>
          ) : contacts.map((contact) => (
            <div key={contact.id} className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-md rounded-lg overflow-hidden transition-colors`}>
              {typeof contact.is_published !== 'undefined' && (
                <div className={`${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-500'} px-6 py-2 border-b flex justify-between items-center`}>
                  <div className={`px-2 py-1 rounded text-xs ${contact.is_published ? (isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-800')}`}>{contact.is_published ? 'Published' : 'Draft'}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID: {contact.id} | Created: {new Date(contact.created_at).toLocaleDateString()}</div>
                </div>
              )}
              {/* Addresses Section */}
              {contact.addresses?.length > 0 && (
                <div className="border-b">
                  <div className={`px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}><h2 className="text-lg font-semibold flex items-center">{getContactIcon('address')}<span className="ml-2">Addresses</span></h2></div>
                  <div className="divide-y divide-gray-200">
                    {contact.addresses.map((addr, idx) => (
                      <div key={idx} className={`p-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex justify-between items-start">
                          <div className="whitespace-pre-line">{addr}</div>
                          <button onClick={() => handleDeleteItem(contact.id, 'address', idx)} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} ml-4`}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Phones Section */}
              {contact.phones?.length > 0 && (
                <div className="border-b">
                  <div className={`px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}><h2 className="text-lg font-semibold flex items-center">{getContactIcon('phone')}<span className="ml-2">Phone Numbers</span></h2></div>
                  <div className="divide-y divide-gray-200">
                    {contact.phones.map((ph, idx) => (
                      <div key={idx} className={`p-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex justify-between items-start">
                          <a href={`tel:${ph}`} className={`${isDarkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}>{ph}</a>
                          <button onClick={() => handleDeleteItem(contact.id, 'phone', idx)} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} ml-4`}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Emails Section */}
              {contact.emails?.length > 0 && (
                <div>
                  <div className={`px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}><h2 className="text-lg font-semibold flex items-center">{getContactIcon('email')}<span className="ml-2">Email Addresses</span></h2></div>
                  <div className="divide-y divide-gray-200">
                    {contact.emails.map((em, idx) => (
                      <div key={idx} className={`p-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex justify-between items-start">
                          <a href={`mailto:${em}`} className={`${isDarkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}>{em}</a>
                          <button onClick={() => handleDeleteItem(contact.id, 'email', idx)} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} ml-4`}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={`p-4 flex justify-end ${isDarkMode ? 'bg-gray-700 border-t border-gray-600' : 'bg-gray-50 border-t border-gray-200'}`}>  
                <button onClick={() => openModalForEdit(contact)} className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow-sm text-sm transition-colors`}>Add New Item</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md max-h-full overflow-y-auto transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{isCreating ? 'Create New Contact' : 'Add Contact Information'}</h2>
            <form onSubmit={handleSubmit}>
              {isCreating ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Published</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={newContact.is_published} onChange={e => setNewContact(prev => ({ ...prev, is_published: e.target.checked }))} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="address">Address</label>
                      <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="Enter address" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                  </div>
                  <button type="button" onClick={handleAddToNewContact} className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white w-full py-2 rounded mb-4`}>Add to Contact</button>
                  {formErrors.general && <p className="text-red-500 text-xs mb-4">{formErrors.general}</p>}
                  {newContact.addresses.length > 0 && (
                    <div className="mb-4">
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold text-sm mb-2`}>Addresses:</h3>
                      <ul className="border rounded divide-y divide-gray-200">
                        {newContact.addresses.map((addr, idx) => (
                          <li key={idx} className="px-3 py-2 flex justify-between items-center">
                            <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{addr}</span>
                            <button type="button" onClick={() => setNewContact(prev => ({ ...prev, addresses: prev.addresses.filter((_, i) => i !== idx) }))} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {newContact.phones.length > 0 && (
                    <div className="mb-4">
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold text-sm mb-2`}>Phone Numbers:</h3>
                      <ul className="border rounded divide-y divide-gray-200">
                        {newContact.phones.map((ph, idx) => (
                          <li key={idx} className="px-3 py-2 flex justify-between items-center">
                            <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{ph}</span>
                            <button type="button" onClick={() => setNewContact(prev => ({ ...prev, phones: prev.phones.filter((_, i) => i !== idx) }))} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {newContact.emails.length > 0 && (
                    <div className="mb-4">
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold text-sm mb-2`}>Email Addresses:</h3>
                      <ul className="border rounded divide-y divide-gray-200">
                        {newContact.emails.map((em, idx) => (
                          <li key={idx} className="px-3 py-2 flex justify-between items-center">
                            <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{em}</span>
                            <button type="button" onClick={() => setNewContact(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== idx) }))} className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="address">Address</label>
                      <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="Enter address" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                    <div>
                      <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-bold mb-2`} htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    </div>
                  </div>
                  {formErrors.general && <p className="text-red-500 text-xs mb-4">{formErrors.general}</p>}
                </>
              )}
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} font-bold py-2 px-4 rounded mr-2 transition-colors`}>Cancel</button>
                <button type="submit" disabled={loading || (!isCreating && !formData.address.trim() && !formData.phone.trim() && !formData.email.trim()) || (isCreating && !newContact.addresses.length && !newContact.phones.length && !newContact.emails.length)} className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}>{loading ? 'Saving...' : isCreating ? 'Create Contact' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
