// src/api/conductorApi.js
import api from 'axios';

// ============ CONDUCTOR CRUD ============
export const getAllConductors = async () => {
  const response = await api.get("/conductors");
  return response.data;
};

export const getConductorById = async (id) => {
  const response = await api.get(`/conductors/${id}`);
  return response.data;
};

export const createConductor = async (data) => {
  const response = await api.post("/conductors", data);
  return response.data;
};

export const updateConductor = async (id, data) => {
  const response = await api.put(`/conductors/${id}`, data);
  return response.data;
};

export const deleteConductor = async (id) => {
  await api.delete(`/conductors/${id}`);
};

const conductorApi = {
  getAllConductors,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
};

export default conductorApi;