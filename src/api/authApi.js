// src/api/authApi.js
import api from "./axios";

export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response;
};

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response;
};

export const logout = async () => {
  // Backend endpoint just returns 200 (stateless JWT)
  try {
    const response = await api.post("/api/auth/logout");
    return response;
  } finally {
    // Always clear local state, even if the server call fails
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("roleId");
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};