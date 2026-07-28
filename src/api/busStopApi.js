// src/api/busStopApi.js
import axios from "axios";

const BASE_URL = ""; // proxy handles it

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);


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