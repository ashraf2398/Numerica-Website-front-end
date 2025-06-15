import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Dashboard = () => {
  const { 
    fetchServices, 
    fetchCategories, 
    fetchAboutEntries, 
    fetchTeamMembers, 
    fetchContacts, 
    fetchConsultations,
    services,
    categories,
    aboutEntries,
    teamMembers,
    contacts,
    consultations,
    loading
  } = useData();
  const [stats, setStats] = useState({
    totalServices: 0,
    totalCategories: 0,
    totalTeamMembers: 0,
    totalAboutEntries: 0,
    totalContacts: 0,
    pendingConsultations: 0
  });
  const [recentConsultations, setRecentConsultations] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchServices(),
        fetchCategories(),
        fetchAboutEntries(),
        fetchTeamMembers(),
        fetchContacts(),
        fetchConsultations()
      ]);
    };

    fetchAllData();
  }, [
    fetchServices, 
    fetchCategories, 
    fetchAboutEntries, 
    fetchTeamMembers, 
    fetchContacts, 
    fetchConsultations
  ]);

  useEffect(() => {
    setStats({
      totalServices: services.length,
      totalCategories: categories.length,
      totalTeamMembers: teamMembers.length,
      totalAboutEntries: aboutEntries.length,
      totalContacts: contacts.length,
      pendingConsultations: consultations.filter(c => c.status === 'pending').length
    });

    // Get 5 most recent consultations
    const sorted = [...consultations].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setRecentConsultations(sorted.slice(0, 5));
  }, [services, categories, teamMembers, aboutEntries, contacts, consultations]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    
    return status
      .replace('_', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Services</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.totalServices}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/services" className="text-blue-600 hover:text-blue-800 text-sm">View all services →</Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Categories</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.totalCategories}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/categories" className="text-indigo-600 hover:text-indigo-800 text-sm">View all categories →</Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Team Members</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.totalTeamMembers}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/team" className="text-green-600 hover:text-green-800 text-sm">View team members →</Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">About Entries</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.totalAboutEntries}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/about" className="text-purple-600 hover:text-purple-800 text-sm">View about entries →</Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 text-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Contacts</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.totalContacts}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/contacts" className="text-pink-600 hover:text-pink-800 text-sm">View contacts →</Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Pending Consultations</h2>
                  <p className="text-2xl font-semibold text-gray-800">{stats.pendingConsultations}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/admin/consultations" className="text-yellow-600 hover:text-yellow-800 text-sm">View all consultations →</Link>
              </div>
            </div>
          </div>
          
          {/* Recent Consultations */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Consultation Requests</h2>
            </div>
            {recentConsultations.length === 0 ? (
              <div className="px-6 py-4 text-center text-gray-500">
                No consultation requests found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentConsultations.map((consultation) => (
                  <div key={consultation.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{consultation.name}</h3>
                        <p className="text-sm text-gray-500">{consultation.email}</p>
                        <div className="mt-1 flex items-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(consultation.status)}`}>
                            {formatStatus(consultation.status)}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">{formatDate(consultation.createdAt)}</span>
                        </div>
                      </div>
                      <Link 
                        to="/admin/consultations" 
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </Link>
                    </div>
                    {consultation.message && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {consultation.message.length > 120 
                          ? consultation.message.substring(0, 120) + '...' 
                          : consultation.message
                        }
                      </p>
                    )}
                  </div>
                ))}
                <div className="px-6 py-3 bg-gray-50">
                  <Link 
                    to="/admin/consultations" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all consultation requests →
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/admin/services"
                className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-blue-800 font-medium">Add New Service</span>
              </Link>
              
              <Link
                to="/admin/team"
                className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-green-800 font-medium">Add Team Member</span>
              </Link>
              
              <Link
                to="/admin/categories"
                className="flex items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-indigo-800 font-medium">Add New Category</span>
              </Link>
              
              <Link
                to="/admin/about"
                className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-purple-100 text-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-purple-800 font-medium">Add About Entry</span>
              </Link>
              
              <Link
                to="/admin/contacts"
                className="flex items-center p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-pink-100 text-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-pink-800 font-medium">Add Contact Info</span>
              </Link>
              
              <Link
                to="/admin/consultations"
                className="flex items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-yellow-800 font-medium">View Pending Requests</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 