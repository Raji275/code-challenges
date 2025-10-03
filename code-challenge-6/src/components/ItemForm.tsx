import React, { useState } from 'react';
import { api } from '../services/api';

const ItemForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (initialData) {
        await api.updateItem(initialData.id, formData);
      } else {
        await api.createItem(formData);
      }
      onSubmit();
    } catch (err) {
      setError('Failed to save item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      {/* ...existing code for other form fields... */}
      
      {error && <div className="text-red-600">{error}</div>}
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
      </button>
    </form>
  );
};

export default ItemForm;
