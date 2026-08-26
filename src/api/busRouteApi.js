// src/api/busRouteApi.js
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

// ============ BUS ROUTE CRUD ============
// Note: The payload (data) for create/update no longer includes busId, driverId, or conductorId.
// These fields are optional on the backend and will be set to null if omitted.

export const getAllBusRoutes = async () => {
  const response = await api.get("/bus-routes");
  return response.data; // array of BusRouteResponse
};

export const getBusRouteById = async (id) => {
  const response = await api.get(`/bus-routes/${id}`);
  return response.data;
};

export const createBusRoute = async (data) => {
  // data should contain: routeName, description, startStopId, endStopId,
  // startTime, endTime, totalDistanceKm, estimatedTimeMin, status, stopIds[]
  const response = await api.post("/bus-routes", data);
  return response.data;
};

export const updateBusRoute = async (id, data) => {
  const response = await api.put(`/bus-routes/${id}`, data);
  return response.data;
};

export const deleteBusRoute = async (id) => {
  await api.delete(`/bus-routes/${id}`);
};

const busRouteApi = {
  getAll: getAllBusRoutes,
  getById: getBusRouteById,
  create: createBusRoute,
  update: updateBusRoute,
  delete: deleteBusRoute,
};

export default busRouteApi;