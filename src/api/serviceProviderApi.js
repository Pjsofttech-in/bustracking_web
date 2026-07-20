// src/api/serviceProviderApi.js
import axios from "axios";

const BASE_URL = "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// ... interceptors (same as above) ...

// ============ Service Provider CRUD ============
export const getAllServiceProviders = async () => {
  const response = await api.get("/service-providers");
  return response.data;
};

export const getServiceProviderById = async (id) => {
  const response = await api.get(`/service-providers/${id}`);
  return response.data;
};

export const createServiceProvider = async (data) => {
  const response = await api.post("/service-providers", data);
  return response.data;
};

export const updateServiceProvider = async (id, data) => {
  const response = await api.put(`/service-providers/${id}`, data);
  return response.data;
};

export const deleteServiceProvider = async (id) => {
  await api.delete(`/service-providers/${id}`);
};

const serviceProviderApi = {
  getAll: getAllServiceProviders,
  getById: getServiceProviderById,
  create: createServiceProvider,
  update: updateServiceProvider,
  delete: deleteServiceProvider,
};

export default serviceProviderApi;