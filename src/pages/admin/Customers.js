import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/DataTable';
import EntityForm from '../../components/admin/EntityForm';

const Customers = () => {
  const { customers, fetchCustomers, createCustomer, updateCustomer, deleteCustomer, loading } = useData();
  
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
  
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { 
      header: 'Status', 
      accessor: 'active',
      render: (customer) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          customer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {customer.active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      header: 'Type', 
      accessor: 'type',
      render: (customer) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          customer.type === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {customer.type === 'business' ? 'Business' : 'Individual'}
        </span>
      )
    },
  ];
  
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter customer name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter customer email'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: 'Enter phone number'
    },
    {
      name: 'type',
      label: 'Customer Type',
      type: 'select',
      required: true,
      options: [
        { value: 'individual', label: 'Individual' },
        { value: 'business', label: 'Business' }
      ]
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Enter company name (for business customers)'
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      rows: 3,
      fullWidth: true,
      placeholder: 'Enter customer address'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city'
    },
    {
      name: 'state',
      label: 'State/Province',
      type: 'text',
      placeholder: 'Enter state or province'
    },
    {
      name: 'zipCode',
      label: 'Zip/Postal Code',
      type: 'text',
      placeholder: 'Enter zip or postal code'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      placeholder: 'Enter country'
    },
    {
      name: 'active',
      label: 'Status',
      type: 'checkbox',
      description: 'Customer is active',
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      rows: 3,
      fullWidth: true,
      placeholder: 'Additional notes about this customer'
    }
  ];
  
  const handleAddNew = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };
  
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };
  
  const handleDelete = async (customer) => {
    try {
      await deleteCustomer(customer.id);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  const handleView = (customer) => {
    // Could implement a detailed view modal or page here
    console.log('View customer details:', customer);
  };
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, formData);
      } else {
        await createCustomer(formData);
      }
      
      setShowForm(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };
  
  if (loading && !customers.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {showForm ? (
        <EntityForm
          fields={formFields}
          initialData={editingCustomer}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
        />
      ) : (
        <DataTable
          columns={columns}
          data={customers}
          title="Customers"
          onAdd={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}
    </div>
  );
};

export default Customers; 