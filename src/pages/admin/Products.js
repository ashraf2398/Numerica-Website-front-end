import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/DataTable';
import EntityForm from '../../components/admin/EntityForm';

const Products = () => {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct, loading } = useData();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const columns = [
    { header: 'Name', accessor: 'name' },
    { 
      header: 'Price', 
      accessor: 'price',
      render: (product) => (
        <span>${parseFloat(product.price).toFixed(2)}</span>
      )
    },
    { 
      header: 'Category', 
      accessor: 'category',
      render: (product) => (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
          {product.category}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'inStock',
      render: (product) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
  ];
  
  const formFields = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      placeholder: 'Enter product name'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 3,
      fullWidth: true,
      placeholder: 'Enter product description'
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      placeholder: 'Enter price',
      min: 0,
      step: 0.01
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
        { value: 'home', label: 'Home & Kitchen' },
        { value: 'beauty', label: 'Beauty & Personal Care' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'toys', label: 'Toys & Games' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'inStock',
      label: 'Stock Status',
      type: 'checkbox',
      description: 'Product is in stock',
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      placeholder: 'Enter image URL'
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      min: 0,
      placeholder: 'Enter available quantity'
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      placeholder: 'Enter product SKU'
    }
  ];
  
  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  
  const handleDelete = async (product) => {
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      // Ensure price is a number
      const processedData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : 0
      };
      
      if (editingProduct) {
        await updateProduct(editingProduct.id, processedData);
      } else {
        await createProduct(processedData);
      }
      
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };
  
  if (loading && !products.length) {
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
          initialData={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
        />
      ) : (
        <DataTable
          columns={columns}
          data={products}
          title="Products"
          onAdd={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Products; 