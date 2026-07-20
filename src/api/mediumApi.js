// src/api/mediumApi.js
import api from "./axios";

// ============ MEDIUM CRUD ============

export const getAllMediums = async () => {
  const response = await api.get("/mediums");
  return response.data;
};

export const getMediumById = async (id) => {
  const response = await api.get(`/mediums/${id}`);
  return response.data;
};

export const createMedium = async (data) => {
  const response = await api.post("/mediums", data);
  return response.data;
};

export const updateMedium = async (id, data) => {
  const response = await api.put(`/mediums/${id}`, data);
  return response.data;
};

export const deleteMedium = async (id) => {
  await api.delete(`/mediums/${id}`);
};

const mediumApi = {
  getAll: getAllMediums,
  getById: getMediumById,
  create: createMedium,
  update: updateMedium,
  delete: deleteMedium,
};

export default mediumApi;