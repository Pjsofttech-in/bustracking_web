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


// ✅ Named export (used by Dashboard.jsx)
export const getDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

// ✅ Default export (for convenience)
const dashboardApi = {
  getDashboard: getDashboardData,
};

export default dashboardApi;