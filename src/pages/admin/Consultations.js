import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const Consultations = () => {
  const { consultations, fetchConsultations, updateConsultationStatus, loading, error } = useData();
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
      console.error('Error updating consultation status:', err);
    }
  };

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const filteredConsultations = statusFilter === 'all'
    ? consultations
    : consultations.filter(c => c.status === statusFilter);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Consultation Requests</h1>
        <p className="text-gray-600 mt-1">Manage and respond to incoming consultation requests</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'in_progress'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-md ${
              statusFilter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {filteredConsultations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No consultation requests found with the selected filter.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConsultations.map((consultation) => (
                  <tr key={consultation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{consultation.name}</div>
                      <div className="text-sm text-gray-500">{consultation.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(consultation.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{consultation.service || 'General Inquiry'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(consultation.status)}`}>
                        {formatStatus(consultation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(consultation)}
                        className="text-blue-600 hover:text-blue-900"
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

      {/* Consultation Details Modal */}
      {isModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold">Consultation Request Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Client Information</h3>
                <p className="mt-2 text-sm text-gray-900">
                  <span className="font-medium">Name:</span> {selectedConsultation.name}
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  <span className="font-medium">Email:</span> {selectedConsultation.email}
                </p>
                {selectedConsultation.phone && (
                  <p className="mt-1 text-sm text-gray-900">
                    <span className="font-medium">Phone:</span> {selectedConsultation.phone}
                  </p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Request Details</h3>
                <p className="mt-2 text-sm text-gray-900">
                  <span className="font-medium">Date Submitted:</span> {formatDate(selectedConsultation.createdAt)}
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  <span className="font-medium">Status:</span>{' '}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClass(selectedConsultation.status)}`}>
                    {formatStatus(selectedConsultation.status)}
                  </span>
                </p>
                {selectedConsultation.service && (
                  <p className="mt-1 text-sm text-gray-900">
                    <span className="font-medium">Service:</span> {selectedConsultation.service}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-900 whitespace-pre-line">{selectedConsultation.message}</p>
              </div>
            </div>

            {selectedConsultation.additionalInfo && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h3>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-900 whitespace-pre-line">{selectedConsultation.additionalInfo}</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Change Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedConsultation.id, 'pending')}
                  disabled={selectedConsultation.status === 'pending'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedConsultation.status === 'pending'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedConsultation.id, 'in_progress')}
                  disabled={selectedConsultation.status === 'in_progress'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedConsultation.status === 'in_progress'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedConsultation.id, 'completed')}
                  disabled={selectedConsultation.status === 'completed'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedConsultation.status === 'completed'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedConsultation.id, 'cancelled')}
                  disabled={selectedConsultation.status === 'cancelled'}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedConsultation.status === 'cancelled'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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