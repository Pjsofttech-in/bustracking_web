// src/api/divisionApi.js
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


// ============ DIVISION CRUD ============

export const getAllDivisions = async () => {
  const response = await api.get("/divisions");
  return response.data;
};

export const getDivisionById = async (id) => {
  const response = await api.get(`/divisions/${id}`);
  return response.data;
};

export const createDivision = async (data) => {
  const response = await api.post("/divisions", data);
  return response.data;
};

export const updateDivision = async (id, data) => {
  const response = await api.put(`/divisions/${id}`, data);
  return response.data;
};

export const deleteDivision = async (id) => {
  await api.delete(`/divisions/${id}`);
};

const divisionApi = {
  getAll: getAllDivisions,
  getById: getDivisionById,
  create: createDivision,
  update: updateDivision,
  delete: deleteDivision,
};

export default divisionApi;