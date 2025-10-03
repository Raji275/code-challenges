import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const response = await api.getItems();
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteItem(id);
      fetchItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow">
          {/* ...existing code for item display... */}
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
