import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
});

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `${token}` } } : {};
};

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const habitAPI = {
  getAll: () => API.get('/habits', getAuthHeaders()),
  create: (data) => API.post('/habits', data, getAuthHeaders()),
  update: (id, data) => API.put(`/habits/${id}`, data, getAuthHeaders()),
  delete: (id) => API.delete(`/habits/${id}`, getAuthHeaders()),
  toggle: (id) => API.post(`/habits/${id}/toggle`, {}, getAuthHeaders())
};

export const aiAPI = {
  getInsights: () => API.get('/ai/insights', getAuthHeaders())
};
