import React, { createContext, useState, useContext, useCallback } from 'react';
import { adminApi } from '../utils/api';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Entities data storage
  const [admins, setAdmins] = useState([]);
  const [aboutEntries, setAboutEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [consultations, setConsultations] = useState([]);
  
  // Admin User Management
  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getCurrentUser();
      setAdmins([response.data]); // Usually only the current user is accessible
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch admin user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAdmin = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.register(data);
      setAdmins(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAdmin = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      // Assume there is an endpoint for this
      await adminApi.deleteAdmin(id);
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete admin');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // About Entries
  const fetchAboutEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAboutEntries();
      setAboutEntries(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch about entries');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAboutEntry = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.createAbout(data);
      setAboutEntries(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create about entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAboutEntry = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      // Assume there is an endpoint for this
      const response = await adminApi.updateAbout(id, data);
      setAboutEntries(prev => prev.map(entry => entry.id === id ? response.data : entry));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update about entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAboutEntry = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      // Assume there is an endpoint for this
      await adminApi.deleteAbout(id);
      setAboutEntries(prev => prev.filter(entry => entry.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete about entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAdminCategories();
      setCategories(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.createCategory(data);
      setCategories(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.updateCategory(id, data);
      setCategories(prev => prev.map(category => category.id === id ? response.data : category));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await adminApi.deleteCategory(id);
      setCategories(prev => prev.filter(category => category.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Services
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAdminServices();
      setServices(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createService = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.createService(data);
      setServices(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateService = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.updateService(id, data);
      setServices(prev => prev.map(service => service.id === id ? response.data : service));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteService = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await adminApi.deleteService(id);
      setServices(prev => prev.filter(service => service.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete service');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Contacts
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAdminContacts();
      setContacts(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contacts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createContact = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.createContact(data);
      setContacts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create contact');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContact = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      // Assume there is an endpoint for this
      const response = await adminApi.updateContact(id, data);
      setContacts(prev => prev.map(contact => contact.id === id ? response.data : contact));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update contact');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Team Members
  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAdminTeamMembers();
      setTeamMembers(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch team members');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeamMember = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.createTeamMember(data);
      setTeamMembers(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team member');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTeamMember = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.updateTeamMember(id, data);
      setTeamMembers(prev => prev.map(member => member.id === id ? response.data : member));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update team member');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTeamMember = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await adminApi.deleteTeamMember(id);
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete team member');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Consultations
  const fetchConsultations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getConsultations();
      setConsultations(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch consultations');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConsultationStatus = useCallback(async (id, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.updateConsultationStatus(id, { status });
      setConsultations(prev => prev.map(consultation => consultation.id === id ? response.data : consultation));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update consultation status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    loading,
    error,
    // Data
    admins,
    aboutEntries,
    categories,
    services,
    contacts,
    teamMembers,
    consultations,
    
    // Admin operations
    fetchAdmins,
    createAdmin,
    deleteAdmin,
    
    // About operations
    fetchAboutEntries,
    createAboutEntry,
    updateAboutEntry,
    deleteAboutEntry,
    
    // Category operations
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    
    // Service operations
    fetchServices,
    createService,
    updateService,
    deleteService,
    
    // Contact operations
    fetchContacts,
    createContact,
    updateContact,
    
    // Team operations
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    
    // Consultation operations
    fetchConsultations,
    updateConsultationStatus
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 