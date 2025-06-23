import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

const Consultations = () => {
  const { consultations, fetchConsultations, updateConsultationStatus, loading, error } = useData();
  const { isDarkMode } = useTheme();

  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateConsultationStatus(id, status);
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation(prev => ({ ...prev, status }));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return `${isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`;
      case 'in_progress': return `${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`;
      case 'completed': return `${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`;
      case 'cancelled': return `${isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`;
      default: return `${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.replace('_', ' ')  
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const filtered = statusFilter === 'all'
    ? consultations
    : consultations.filter(c => c.status === statusFilter);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} container mx-auto px-4 py-6 min-h-screen`}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Consultation Requests</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and respond to incoming consultation requests</p>
      </div>

      {error && (
        <div className={`${isDarkMode ? 'bg-red-900 text-red-300 border-red-700' : 'bg-red-100 text-red-700 border-red-400'} border px-4 py-3 rounded mb-4`}>
          {error}
        </div>
      )}

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['all','pending','in_progress','completed','cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>{formatStatus(status)}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className={`${isDarkMode ? 'border-gray-300' : 'border-gray-900'} animate-spin rounded-full h-10 w-10 border-b-2`}></div>
        </div>
      ) : (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-md rounded-lg overflow-hidden border`}>  
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No requests found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  {['Name','Date','Service','Status','Actions'].map(title => (
                    <th key={title} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{c.name}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{c.email}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{formatDate(c.createdAt)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{c.service || 'General'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(c.status)}`}>  
                        {formatStatus(c.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewDetails(c)} 
                        className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-full overflow-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Consultation Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className={`text-2xl ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Client Info</h3>
                <p className="mt-2 text-sm"><span className="font-medium">Name:</span> <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{selectedConsultation.name}</span></p>
                <p className="mt-1 text-sm"><span className="font-medium">Email:</span> <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedConsultation.email}</span></p>
                {selectedConsultation.phone && (
                  <p className="mt-1 text-sm"><span className="font-medium">Phone:</span> <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedConsultation.phone}</span></p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Request Details</h3>
                <p className="mt-2 text-sm"><span className="font-medium">Date:</span> <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{formatDate(selectedConsultation.createdAt)}</span></p>
                <p className="mt-1 text-sm"><span className="font-medium">Status:</span> <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedConsultation.status)}`}>{formatStatus(selectedConsultation.status)}</span></p>
                {selectedConsultation.service && (
                  <p className="mt-1 text-sm"><span className="font-medium">Service:</span> <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{selectedConsultation.service}</span></p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-md border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>  
                <p className="text-sm whitespace-pre-line">{selectedConsultation.message}</p>
              </div>
            </div>
            {selectedConsultation.additionalInfo && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Info</h3>
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-md border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <p className="text-sm whitespace-pre-line">{selectedConsultation.additionalInfo}</p>
                </div>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Change Status</h3>
              <div className="flex flex-wrap gap-2">
                {['pending','in_progress','completed','cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(selectedConsultation.id, status)}
                    disabled={selectedConsultation.status === status}
                    className={selectedConsultation.status === status
                      ? `px-3 py-1 rounded text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} cursor-not-allowed`
                      : `px-3 py-1 rounded text-sm font-medium ${getStatusBadgeClass(status).replace(/-100/, '-200')}`
                    }
                  >
                    {formatStatus(status)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultations;
