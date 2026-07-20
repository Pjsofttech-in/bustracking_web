// src/api/busTripApi.js
import api from "./axios";

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