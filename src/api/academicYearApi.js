// src/api/academicYearApi.js
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


// ============ ACADEMIC YEAR CRUD ============

export const getAllAcademicYears = async () => {
  const response = await api.get("/academic-years");
  return response.data;
};

export const getAcademicYearById = async (id) => {
  const response = await api.get(`/academic-years/${id}`);
  return response.data;
};

export const createAcademicYear = async (data) => {
  const response = await api.post("/academic-years", data);
  return response.data;
};

export const updateAcademicYear = async (id, data) => {
  const response = await api.put(`/academic-years/${id}`, data);
  return response.data;
};

export const deleteAcademicYear = async (id) => {
  await api.delete(`/academic-years/${id}`);
};

const academicYearApi = {
  getAll: getAllAcademicYears,
  getById: getAcademicYearById,
  create: createAcademicYear,
  update: updateAcademicYear,
  delete: deleteAcademicYear,
};

export default academicYearApi;