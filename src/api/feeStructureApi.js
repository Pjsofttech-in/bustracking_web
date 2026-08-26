// src/api/feeStructureApi.js
import axios from 'axios';

const BASE_URL = ''; // Vite proxy will handle /fee-structures

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor (for debugging)
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) console.log('Request Data:', config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (for debugging and error handling)
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

// ============ FEE STRUCTURE CRUD ============
export const getAllFeeStructures = async (params = {}) => {
  const response = await api.get('/fee-structures', { params });
  return response.data;
};

export const getFeeStructureById = async (id) => {
  const response = await api.get(`/fee-structures/${id}`);
  return response.data;
};

export const createFeeStructure = async (data) => {
  const response = await api.post('/fee-structures', data);
  return response.data;
};

export const updateFeeStructure = async (id, data) => {
  const response = await api.put(`/fee-structures/${id}`, data);
  return response.data;
};

export const deleteFeeStructure = async (id) => {
  await api.delete(`/fee-structures/${id}`);
};

// ============ SPECIFIC QUERIES ============
export const getFeeStructuresByAcademicYear = async (yearName) => {
  const response = await api.get(`/fee-structures/by-year/${yearName}`);
  return response.data;
};

export const getFeeStructureByRouteAndYear = async (routeId, yearName) => {
  const response = await api.get(`/fee-structures/by-route/${routeId}/year/${yearName}`);
  return response.data;
};

const feeStructureApi = {
  getAll: getAllFeeStructures,
  getById: getFeeStructureById,
  create: createFeeStructure,
  update: updateFeeStructure,
  delete: deleteFeeStructure,
  getByAcademicYear: getFeeStructuresByAcademicYear,
  getByRouteAndYear: getFeeStructureByRouteAndYear,
};

export default feeStructureApi;