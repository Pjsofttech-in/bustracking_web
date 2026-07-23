// src/api/axios.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pjsofttech.com";


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log("Request Data:", config.data);
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error);
    
    let message = "Something went wrong.";
    
    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      
      if (error.response.status === 404) {
        message = `API endpoint not found: ${error.response.config?.url}`;
      } else if (error.response.status === 500) {
        message = "Server error. Please check the backend logs.";
      } else if (error.response.status === 403) {
        message = "Access forbidden. Please check your permissions.";
      } else if (error.response.status === 401) {
        message = "Unauthorized. Please login again.";
      } else {
        message = error.response.data?.message || 
                  error.response.data?.error || 
                  error.response.statusText || 
                  "Server error";
      }
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
      message = "Cannot connect to the server. Please check if the backend is running.";
    } else {
      // Request setup error
      console.error("Request setup error:", error.message);
      message = error.message;
    }
    
    console.error("Error Message:", message);
    return Promise.reject(new Error(message));
  }
);

export default api;