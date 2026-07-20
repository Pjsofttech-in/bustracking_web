// src/api/busStopApi.js
import api from "../api/axios";

export const getAll = async () => {
  const response = await api.get("/bus-stops");
  return response.data;
};

export const getById = async (id) => {
  const response = await api.get(`/bus-stops/${id}`);
  return response.data;
};

export const create = async (data) => {
  const response = await api.post("/bus-stops", data);
  return response.data;
};

export const update = async (id, data) => {
  const response = await api.put(`/bus-stops/${id}`, data);
  return response.data;
};

export const deleteStop = async (id) => {
  await api.delete(`/bus-stops/${id}`);
};

export const markReached = async (id) => {
  const response = await api.patch(`/bus-stops/${id}/reached`);
  return response.data;
};

const busStopApi = {
  getAll,
  getById,
  create,
  update,
  delete: deleteStop,
  markReached,
};

export default busStopApi;