// src/api/studentScanApi.js
import api from "./axios";

// ============ STUDENT SCAN CRUD ============

export const getAllScans = async () => {
  const response = await api.get("/student-scans");
  return response.data;
};

export const getScanById = async (id) => {
  const response = await api.get(`/student-scans/${id}`);
  return response.data;
};

export const recordScan = async (data) => {
  const response = await api.post("/student-scans", data);
  return response.data;
};

export const getScansByStudent = async (studentId) => {
  const response = await api.get(`/student-scans/student/${studentId}`);
  return response.data;
};

export const getScansByBus = async (busId) => {
  const response = await api.get(`/student-scans/bus/${busId}`);
  return response.data;
};

const studentScanApi = {
  getAll: getAllScans,
  getById: getScanById,
  record: recordScan,
  getByStudent: getScansByStudent,
  getByBus: getScansByBus,
};

export default studentScanApi;