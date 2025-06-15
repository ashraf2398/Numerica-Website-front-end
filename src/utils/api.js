import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Initialize with token if it exists
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    
    return Promise.reject(error);
  }
);

// Public API
export const publicApi = {
  // About
  getAbout: () => api.get('/public/about'),
  
  // Categories
  getCategories: () => api.get('/public/categories'),
  
  // Services
  getServices: () => api.get('/public/services'),
  getServicesByCategory: (categoryId) => api.get(`/public/services/category/${categoryId}`),
  
  // Team
  getTeamMembers: () => api.get('/public/team'),
  getTeamMember: (id) => api.get(`/public/team/${id}`),
  
  // Contact
  getContactInfo: () => api.get('/public/contact'),
  submitConsultation: (data) => api.post('/public/consultations', data)
};

// Admin API
export const adminApi = {
  // Auth
  login: (credentials) => api.post('/admin/login', credentials),
  register: (data) => api.post('/admin/register', data),
  forgotPassword: (email) => api.post('/admin/forgot-password', email),
  resetPassword: (data) => api.post('/admin/reset-password', data),
  getCurrentUser: () => api.get('/admin/me'),
  
  // About
  getAboutEntries: () => api.get('/admin/about'),
  createAbout: (data) => api.post('/admin/about', data),
  updateAbout: (id, data) => api.put(`/admin/about/${id}`, data),
  deleteAbout: (id) => api.delete(`/admin/about/${id}`),
  
  // Categories
  getAdminCategories: () => api.get('/admin/categories'),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
  
  // Services
  getAdminServices: () => api.get('/admin/services'),
  getAdminServicesByCategory: (categoryId) => api.get(`/admin/services/category/${categoryId}`),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  
  // Team
  getAdminTeamMembers: () => api.get('/admin/team'),
  createTeamMember: (data) => api.post('/admin/team', data),
  updateTeamMember: (id, data) => api.put(`/admin/team/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}`),
  
  // Contacts
  getAdminContacts: () => api.get('/admin/contacts'),
  createContact: (data) => api.post('/admin/contacts', data),
  updateContact: (id, data) => api.put(`/admin/contacts/${id}`, data),
  
  // Consultations
  getConsultations: () => api.get('/admin/consultations'),
  updateConsultationStatus: (id, status) => api.put(`/admin/consultations/${id}/status`, status)
};

export default api; 