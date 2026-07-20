// src/api/studentApi.js
import api from "./axios";

// ============ STUDENT CRUD ============

export const getAllStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await api.post("/students", data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};

const studentApi = {
  getAll: getAllStudents,
  getById: getStudentById,
  create: createStudent,
  update: updateStudent,
  delete: deleteStudent,
};

export default studentApi;