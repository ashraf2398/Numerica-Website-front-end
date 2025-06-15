import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">Welcome back to your dashboard</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </div>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-2">
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <span className="text-sm font-medium text-gray-700">{currentUser?.name || 'User'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 