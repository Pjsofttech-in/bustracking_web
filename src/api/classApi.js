// src/api/classApi.js
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


// ============ CLASS CRUD ============

export const getAllClasses = async () => {
  const response = await api.get("classes");
  return response.data;
};

export const getClassById = async (id) => {
  const response = await api.get(`classes/${id}`);
  return response.data;
};

export const createClass = async (data) => {
  const response = await api.post("classes", data);
  return response.data;
};

export const updateClass = async (id, data) => {
  const response = await api.put(`classes/${id}`, data);
  return response.data;
};

export const deleteClass = async (id) => {
  await api.delete(`classes/${id}`);
};

const classApi = {
  getAll: getAllClasses,
  getById: getClassById,
  create: createClass,
  update: updateClass,
  delete: deleteClass,
};

export default classApi;