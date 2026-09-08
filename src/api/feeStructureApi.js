// src/api/feeStructureApi.js
import api from 'axios';



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