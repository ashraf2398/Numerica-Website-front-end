import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-xl font-bold">Numerica Dashboard</h1>
      </div>
      
      <nav className="flex-grow p-4 overflow-y-auto">
        <p className="text-xs text-gray-400 uppercase font-bold mb-4">Main</p>
        <NavLink 
          to="/admin/dashboard" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </span>
          Dashboard
        </NavLink>
        
        <p className="text-xs text-gray-400 uppercase font-bold mt-6 mb-4">Management</p>
        
        <NavLink 
          to="/admin/admins" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </span>
          Admin Accounts
        </NavLink>
        
        <NavLink 
          to="/admin/about" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
          About Entries
        </NavLink>
        
        <NavLink 
          to="/admin/categories" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </span>
          Categories
        </NavLink>
        
        <NavLink 
          to="/admin/services" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </span>
          Services
        </NavLink>
        
        <NavLink 
          to="/admin/contacts" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </span>
          Contact Info
        </NavLink>
        
        <NavLink 
          to="/admin/team" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </span>
          Team Members
        </NavLink>
        
        <NavLink 
          to="/admin/consultations" 
          className={({isActive}) => 
            `flex items-center py-2 px-4 rounded transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </span>
          Consultations
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={logout}
          className="w-full flex items-center py-2 px-4 rounded text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h10v10H4V5zm4.707 5.707a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414l2 2a1 1 0 001.414-1.414L7.414 12H10a1 1 0 100-2H7.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 