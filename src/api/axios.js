// src/api/axios.js
import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pjsofttech.com/bustracking";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ FIX: Request interceptor — always attach token from localStorage
api.interceptors.request.use(
  (config) => {
    // ✅ Safety net: if setAuthToken was never called (page refresh),
    // pull the token straight from localStorage.
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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

// ✅ FIX: Response interceptor with proper 401/403 handling
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error);

    let message = "Something went wrong.";
    let shouldLogout = false;

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);

      const status = error.response.status;

      if (status === 401) {
        message = "Session expired. Please login again.";
        shouldLogout = true; // ✅ token invalid/expired → force login
      } else if (status === 403) {
        message =
          error.response.data?.error ||
          error.response.data?.message ||
          "Access forbidden. Your account role does not permit this action.";
      } else if (status === 404) {
        message = `API endpoint not found: ${error.response.config?.url}`;
      } else if (status === 500) {
        message = "Server error. Please check the backend logs.";
      } else {
        message =
          error.response.data?.message ||
          error.response.data?.error ||
          error.response.statusText ||
          "Server error";
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      message = "Cannot connect to the server. Please check if the backend is running.";
    } else {
      console.error("Request setup error:", error.message);
      message = error.message;
    }

    // ✅ FIX: Force logout on 401 and redirect to login
    if (shouldLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("roleId");
      // avoid redirect loop when we're already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/bustracking/login";
      }
    }

    console.error("Error Message:", message);
    return Promise.reject(new Error(message));
  }
);

export default api;