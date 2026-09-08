// src/api/authApi.js
import api from 'axios';


export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response;
};

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response;
};

// Add token to all requests if needed
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};