import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const TeamMembers = () => {
  const {
    teamMembers,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    loading,
    error
  } = useData();
  const { isDarkMode } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    email: '',
    phone: '',
    social_media: { linkedin: '', twitter: '', facebook: '', instagram: '', github: '' },
    is_published: true
  });
  const [socialInput, setSocialInput] = useState({ platform: 'linkedin', url: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => { fetchTeamMembers(); }, [fetchTeamMembers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialInputChange = (e) => {
    const { name, value } = e.target;
    setSocialInput(prev => ({ ...prev, [name]: value }));
  };

  const addSocialLink = () => {
    if (socialInput.url.trim()) {
      setFormData(prev => ({
        ...prev,
        social_media: { ...prev.social_media, [socialInput.platform]: socialInput.url.trim() }
      }));
      setSocialInput({ platform: 'linkedin', url: '' });
    }
  };

  const removeSocialLink = (platform) => {
    setFormData(prev => {
      const updated = { ...prev.social_media };
      delete updated[platform];
      return { ...prev, social_media: updated };
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.title.trim()) errors.title = 'Position/Title is required';
    setFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = {
      name: formData.name.trim(),
      title: formData.title.trim(),
      description: formData.description,
      image: formData.image,
      email: formData.email,
      phone: formData.phone,
      social_media: formData.social_media,
      is_published: formData.is_published
    };
    try {
      if (editingId) await updateTeamMember(editingId, payload);
      else await createTeamMember(payload);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name || '',
      title: member.title || '',
      description: member.description || '',
      image: member.image || '',
      email: member.email || '',
      phone: member.phone || '',
      social_media: member.social_media || {},
      is_published: member.is_published ?? true
    });
    setSocialInput({ platform: 'linkedin', url: '' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try { await deleteTeamMember(id); } catch (err) { console.error(err); }
    }
  };

  const getIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569..."/></svg>);
      case 'twitter': return (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>);
      case 'facebook': return (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>);
      case 'instagram': return (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>);
      case 'github': return (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>);
      default: return null;
    }
  };

  const openModal = () => {
    setEditingId(null);
    setFormData({ name: '', title: '', description: '', image: '', email: '', phone: '', social_media: {}, is_published: true });
    setFormErrors({});
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setFormErrors({}); };

  return (
    <div className={`${isDarkMode?'bg-gray-900 text-gray-100':'bg-gray-50 text-gray-900'} container mx-auto px-4 py-6 min-h-screen`}>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add Member</button>
      </div>
      {error && <div className={`${isDarkMode?'bg-red-900 text-red-300':'bg-red-100 text-red-700'} px-4 py-2 rounded mb-4`}>{error}</div>}
      {loading ? <div className="flex justify-center"><div className={`${isDarkMode?'border-white':'border-gray-900'} animate-spin rounded-full h-10 w-10 border-b-2`}></div></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.length===0 ? <div className="p-6 bg-white rounded shadow text-center">No members yet</div> : teamMembers.map(m=> (
            <div key={m.id} className={`${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-sm`}>
              {m.image && <img src={m.image} alt={m.name} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div><h2 className="text-xl font-semibold">{m.name}</h2><p className="text-gray-500">{m.title}</p></div>
                  <div className="space-x-2"><button onClick={()=>handleEdit(m)} className="text-blue-400">Edit</button><button onClick={()=>handleDelete(m.id)} className="text-red-400">Del</button></div>
                </div>
                {m.description && <p className="mt-2 text-gray-500">{m.description}</p>}
                <div className="mt-2 flex space-x-2">{Object.entries(m.social_media||{}).map(([p,u])=>u&&<a href={u} key={p} target="_blank" rel="noopener noreferrer">{getIcon(p)}</a>)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${isDarkMode?'bg-gray-800 text-gray-100':'bg-white text-gray-900'} w-full max-w-xl p-6 rounded shadow-lg max-h-full overflow-auto`}>
            <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">{editingId?'Edit':'Add'} Member</h2><button onClick={closeModal}>×</button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label>Name*</label><input name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" />{formErrors.name&&<p className="text-red-500 text-sm">{formErrors.name}</p>}</div>
                <div><label>Title*</label><input name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" />{formErrors.title&&<p className="text-red-500 text-sm">{formErrors.title}</p>}</div>
              </div>
              <div><label>Description</label><textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded"></textarea></div>
              <div><label>Image URL</label><input name="image" value={formData.image} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" /></div>
              <div><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" /></div>
              <div><label>Phone</label><input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" /></div>
              <div><label className="block mb-2">Social Links</label><div className="flex space-x-2 mb-2"><select name="platform" value={socialInput.platform} onChange={handleSocialInputChange} className="px-2 py-1 border rounded"><option>linkedin</option><option>twitter</option><option>facebook</option><option>instagram</option><option>github</option></select><input name="url" value={socialInput.url} onChange={handleSocialInputChange} placeholder="https://..." className="flex-1 px-3 py-2 border rounded" /><button type="button" onClick={addSocialLink} className="bg-blue-600 text-white px-3 rounded">Add</button></div>
                {Object.entries(formData.social_media).map(([p,u])=>u&&<div key={p} className="flex justify-between items-center mb-1"><span>{p}: <a href={u} className="text-blue-500 underline">{u}</a></span><button onClick={()=>removeSocialLink(p)} className="text-red-500">×</button></div>)}
              </div>
              <div className="flex items-center"><label className="mr-2">Published</label><input type="checkbox" checked={formData.is_published} onChange={e=>setFormData(prev=>({...prev,is_published:e.target.checked}))} /></div>
              <div className="flex justify-end space-x-2"><button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{loading?'Saving...':'Save'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
