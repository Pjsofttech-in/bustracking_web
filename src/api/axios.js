// src/api/axios.js
import axios from "axios";

// ✅ FIX: Use env var, fall back to local dev
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor — attach token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const url = config.url || "";

    // ✅ FIX: Never send a stale Authorization header to auth endpoints.
    // Login/register must be anonymous requests.
    const isAuthEndpoint =
      url.includes("/api/auth/login") || url.includes("/api/auth/register");

    if (token && !isAuthEndpoint && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Strip any leftover Authorization on auth endpoints (safety net)
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

// ✅ Response interceptor — smarter error handling
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

    // ✅ FIX: Detect auth endpoints so we don't treat login 401 as "session expired"
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
          // ✅ Login/register failure → use the REAL backend error message
          message = data.error || data.message || "Invalid credentials";
          shouldLogout = false; // do NOT wipe storage or redirect
        } else {
          // ✅ Genuine expired/invalid token on a protected route
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

    // ✅ Only force logout for genuine 401s on protected routes
    if (shouldLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("roleId");

      // ✅ FIX: keep redirect path consistent with vite base (`/bus-api/`)
      const loginPath = "/bus-api/login";
      if (!window.location.pathname.includes("/login")) {
        window.location.href = loginPath;
      }
    }

    console.error("Error Message:", message);

    // ✅ Preserve original response on the rejected error
    const err = new Error(message);
    err.response = error.response;
    err.status = error.response?.status;
    return Promise.reject(err);
  }
);

export default api;