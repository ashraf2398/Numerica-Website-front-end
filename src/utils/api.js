import axios from 'axios';
import config from '../config';

// Create an axios instance with default config
const api = axios.create({
  baseURL: config.endpoints.default,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  timeout: config.api.timeout,
  withCredentials: true, // Include cookies in cross-origin requests
  validateStatus: (status) => status >= 200 && status < 500, // Consider HTTP status codes less than 500 as success
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

// Add response interceptor to handle errors and retries
const { maxRetries, retryDelay } = config.api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: errorResponse } = error;
    
    // Handle authentication errors
    if (errorResponse?.status === 401) {
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.userKey);
      window.location.href = '/admin/login';
      return Promise.reject(error);
    }
    
    // If config doesn't exist or retry option is not set, reject
    if (!config || !config.retry) {
      return Promise.reject(error);
    }

    // Set retry count if not set
    config.retryCount = config.retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if (config.retryCount >= maxRetries) {
      return Promise.reject(error);
    }
    
    // Increase the retry count
    config.retryCount += 1;
    
    // Create new promise to handle exponential backoff
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, retryDelay * config.retryCount);
    });

    // Return the promise in which we'll make the retry
    await backoff;
    return api(config);
  }
);

// Request interceptor for common headers and error handling
api.interceptors.request.use(
  (config) => {
    // Add auth token to every request if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Enable retry for all GET requests by default
    if (config.method?.toLowerCase() === 'get') {
      config.retry = true;
    }
    
    return config;
  },
  (error) => {
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