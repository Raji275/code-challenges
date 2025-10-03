import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // GET all items
  getItems: () => axios.get(`${API_BASE_URL}/items`),
  
  // GET single item
  getItem: (id: string) => axios.get(`${API_BASE_URL}/items/${id}`),
  
  // POST new item
  createItem: (data: any) => axios.post(`${API_BASE_URL}/items/create`, data),
  
  // PUT update item
  updateItem: (id: string, data: any) => axios.put(`${API_BASE_URL}/items/${id}`, data),
  
  // DELETE item
  deleteItem: (id: string) => axios.delete(`${API_BASE_URL}/items/${id}`)
};
