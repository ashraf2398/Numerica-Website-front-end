import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      
      // Ensure the token is set in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await axios.post('/api/admin/login', { email, password });
      
      const user = response.data;
      setCurrentUser(user);
      
      // Store user object and token separately
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 