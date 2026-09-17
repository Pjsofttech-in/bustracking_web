// src/api/axios.js
import axios from "axios";

// ✅ Use env var, fall back to local dev
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
//  REQUEST INTERCEPTOR
// ============================================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const url = config.url || "";

    const isAuthEndpoint =
      url.includes("/api/auth/login") || url.includes("/api/auth/register");

    if (token && !isAuthEndpoint && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (isAuthEndpoint && config.headers.Authorization) {
      delete config.headers.Authorization;
    }

    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) console.log("Request Data:", config.data);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// ============================================================
//  RESPONSE INTERCEPTOR
// ============================================================
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

    const url = error.config?.url || "";
    const isAuthEndpoint =
      url.includes("/api/auth/login") || url.includes("/api/auth/register");

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data || {};

      console.error("Status:", status);
      console.error("Data:", data);

      if (status === 401) {
        if (isAuthEndpoint) {
          message = data.error || data.message || "Invalid credentials";
          shouldLogout = false;
        } else {
          message = "Session expired. Please login again.";
          shouldLogout = true;
        }
      } else if (status === 403) {
        message =
          data.error ||
          data.message ||
          "Access forbidden. Your account role does not permit this action.";
      } else if (status === 404) {
        message = `API endpoint not found: ${error.response.config?.url}`;
      } else if (status === 500) {
        message = "Server error. Please check the backend logs.";
      } else {
        message =
          data.message ||
          data.error ||
          error.response.statusText ||
          "Server error";
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      message =
        "Cannot connect to the server. Please check if the backend is running.";
    } else {
      console.error("Request setup error:", error.message);
      message = error.message;
    }

    if (shouldLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("roleId");

      // ✅ FIX: match the SPA basename (/bustracking)
      const loginPath = "/bustracking/login";
      if (!window.location.pathname.includes("/login")) {
        window.location.href = loginPath;
      }
    }

    console.error("Error Message:", message);

    const err = new Error(message);
    err.response = error.response;
    err.status = error.response?.status;
    return Promise.reject(err);
  }
);

export default api;