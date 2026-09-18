import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle common API errors
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      console.error('Unauthorized API request');

      localStorage.removeItem('token');

      // Avoid redirecting if already on login
      if (!window.location.pathname.endsWith('/login')) {
        window.location.href = `${import.meta.env.VITE_APP_BASE_PATH || ''}/login`;
      }
    }

    if (status === 403) {
      console.error('Forbidden API request');
    }

    if (status >= 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;