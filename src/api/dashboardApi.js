// src/api/dashboardApi.js
import api from "./axios";

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

const dashboardApi = {
  getDashboard: getDashboardData,
};

export default dashboardApi;   // ← MUST have this line