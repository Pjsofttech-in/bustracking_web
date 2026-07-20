// src/api/busApi.js
import axios from 'axios';

const BASE_URL = ''; // Vite proxy will handle /bus

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptors (for debugging)
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) console.log('Request Data:', config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error);
    let message = 'Something went wrong.';
    if (error.response) {
      message = error.response.data?.message || error.response.statusText || 'Server error';
    } else if (error.request) {
      message = 'Cannot connect to the server.';
    } else {
      message = error.message;
    }
    return Promise.reject(new Error(message));
  }
);

// ============ Bus CRUD ============
export const getAllBuses = async () => {
  const response = await api.get('/bus');
  return response.data; // array of BusResponse
};

export const getBusById = async (id) => {
  const response = await api.get(`/bus/${id}`);
  return response.data;
};

export const createBus = async (data) => {
  const response = await api.post('/bus', data);
  return response.data;
};

export const updateBus = async (id, data) => {
  const response = await api.put(`/bus/${id}`, data);
  return response.data;
};

export const deleteBus = async (id) => {
  await api.delete(`/bus/${id}`);
};

const busApi = {
  getAll: getAllBuses,
  getById: getBusById,
  create: createBus,
  update: updateBus,
  delete: deleteBus,
};

export default busApi;