import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { currentUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-b border-gray-700' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Dashboard
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Welcome back, {currentUser?.name || 'User'}
            </p>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode
                  ? 'text-yellow-400 hover:text-yellow-300 focus:ring-yellow-500'
                  : 'text-gray-500 hover:text-gray-700 focus:ring-primary-500'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white focus:ring-gray-500' 
                    : 'text-gray-500 hover:text-gray-700 focus:ring-primary-500'
                }`}
                aria-label="Notifications"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                  />
                </svg>
                <span className="sr-only">View notifications</span>
              </button>
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
            </div>
            
            {/* User profile */}
            <div className="flex items-center">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentUser?.name || 'User'}
                </p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {currentUser?.role || 'Admin'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 