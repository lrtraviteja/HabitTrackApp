import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const habitAPI = {
  getAll: () => API.get('/habits'),
  create: (data) => API.post('/habits', data),
  update: (id, data) => API.put(`/habits/${id}`, data),
  delete: (id) => API.delete(`/habits/${id}`),
  toggle: (id) => API.post(`/habits/${id}/toggle`)
};

export const aiAPI = {
  getInsights: () => API.get('/ai/insights')
};
