import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) navigate('/admin/dashboard', { replace: true });
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} max-w-md w-full space-y-8 p-10 rounded-lg shadow-xl transition-colors`}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-center text-sm">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className={`${isDarkMode ? 'bg-red-900 bg-opacity-50 text-red-300' : 'bg-red-100 text-red-700'} border ${isDarkMode ? 'border-red-700' : 'border-red-400'} px-4 py-3 rounded`} role="alert">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${isDarkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100' : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900'} appearance-none rounded-none relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${isDarkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100' : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900'} appearance-none rounded-none relative block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${isDarkMode ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
