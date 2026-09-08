// src/api/busApi.js
import api from "./axios";

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