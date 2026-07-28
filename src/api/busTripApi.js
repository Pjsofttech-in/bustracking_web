// src/api/busTripApi.js
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


// ============ BUS TRIP CRUD ============

export const getAllBusTrips = async () => {
  const response = await api.get("/bus-trips");
  return response.data;
};

export const getBusTripById = async (id) => {
  const response = await api.get(`/bus-trips/${id}`);
  return response.data;
};

export const createBusTrip = async (data) => {
  const response = await api.post("/bus-trips", data);
  return response.data;
};

export const updateBusTrip = async (id, data) => {
  const response = await api.put(`/bus-trips/${id}`, data);
  return response.data;
};

export const deleteBusTrip = async (id) => {
  await api.delete(`/bus-trips/${id}`);
};

const busTripApi = {
  getAll: getAllBusTrips,
  getById: getBusTripById,
  create: createBusTrip,
  update: updateBusTrip,
  delete: deleteBusTrip,
};

export default busTripApi;