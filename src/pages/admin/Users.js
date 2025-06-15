import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/DataTable';
import EntityForm from '../../components/admin/EntityForm';

const Users = () => {
  const { users, fetchUsers, createUser, updateUser, deleteUser, loading } = useData();
  
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (user) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {user.role || 'User'}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'active',
      render: (user) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.active ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];
  
  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter user name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter user email'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: !editingUser,
      placeholder: editingUser ? 'Leave blank to keep current password' : 'Enter password',
      helperText: editingUser ? 'Leave blank to keep current password' : null
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ]
    },
    {
      name: 'active',
      label: 'Status',
      type: 'checkbox',
      description: 'User is active',
    }
  ];
  
  const handleAddNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };
  
  const handleEdit = (user) => {
    // Create a copy without the password field for editing
    const userForEdit = { ...user };
    delete userForEdit.password;
    
    setEditingUser(userForEdit);
    setShowForm(true);
  };
  
  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      if (editingUser) {
        // If password field is empty, remove it from the data to avoid overwriting with empty string
        if (!formData.password) {
          const { password, ...dataWithoutPassword } = formData;
          await updateUser(editingUser.id, dataWithoutPassword);
        } else {
          await updateUser(editingUser.id, formData);
        }
      } else {
        await createUser(formData);
      }
      
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };
  
  if (loading && !users.length) {
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
          initialData={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          title={editingUser ? 'Edit User' : 'Add New User'}
        />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          title="Users"
          onAdd={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users; 