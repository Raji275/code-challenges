const API_URL = 'https://idb452246a.execute-api.us-east-1.amazonaws.com/prod';

const handleResponse = async (response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `HTTP error! status: ${response.status}`);
  return data;
};

export const api = {
  getTasks: async () => {
    const response = await fetch(`${API_URL}/items`);
    const data = await handleResponse(response);
    return Array.isArray(data) ? data.map(item => ({
      id: item.id,
      title: item.title || item.content || '',  // Handle both new and old format
      description: item.description || '',
      status: item.status || 'pending',
      priority: item.priority || 'medium',
      dueDate: item.dueDate || '',
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    })) : [];
  },

  createTask: async (task) => {
    console.log('=== API: CREATE TASK START ===');
    console.log('Task data being sent:', JSON.stringify(task, null, 2));
    
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
      })
    });

    const result = await handleResponse(response);
    console.log('API Response:', result);
    console.log('=== API: CREATE TASK END ===');
    return result;
  },

  updateTask: async (id, task) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,           // Changed from content to title
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
      })
    });
    return handleResponse(response);
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};
