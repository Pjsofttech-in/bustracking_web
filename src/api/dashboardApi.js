import api from './axios';

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