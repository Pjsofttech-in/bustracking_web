// src/api/driverApi.js
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


// ============ DRIVER CRUD ============

export const getAllDrivers = async () => {
  const response = await api.get("/drivers");
  return response.data;
};

export const getDriverById = async (id) => {
  const response = await api.get(`/drivers/${id}`);
  return response.data;
};

export const createDriver = async (data) => {
  const response = await api.post("/drivers", data);
  return response.data;
};

export const updateDriver = async (id, data) => {
  const response = await api.put(`/drivers/${id}`, data);
  return response.data;
};

export const deleteDriver = async (id) => {
  await api.delete(`/drivers/${id}`);
};

// Default export with all functions
const driverApi = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};

export default driverApi;