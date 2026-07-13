import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pjsofttech.in:9090";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/conductor`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        message: error.message
      });
      
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminToken');
          window.location.href = '/login';
          break;
        case 400:
          // Log the error details
          console.error('Bad Request Details:', error.response.data);
          break;
        case 403:
          console.error('Forbidden: You do not have permission');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          console.error(`Error: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const conductorApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      if (!id) throw new Error('Conductor ID is required');
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getExpiredLicenses: async () => {
    try {
      const response = await apiClient.get('/expired-licenses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      // Validate data before sending
      if (!data.name) throw new Error('Name is required');
      if (!data.phone) throw new Error('Phone is required');
      if (!data.employeeId) throw new Error('Employee ID is required');
      if (!data.status) throw new Error('Status is required');

      // Validate phone format
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(data.phone)) {
        throw new Error('Phone must be exactly 10 digits');
      }

      // Validate email if provided
      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      const validStatuses = ['Join', 'Terminated', 'Suspended'];
      if (!validStatuses.includes(data.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      if (data.status === 'Terminated' && !data.terminateDate) {
        throw new Error('Terminate date is required for terminated status');
      }

      console.log('Sending conductor data:', data);
      const response = await apiClient.post('/add', data);
      return response.data;
    } catch (error) {
      console.error('Error creating conductor:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      if (!id) throw new Error('Conductor ID is required');

      const required = ['name', 'phone', 'employeeId', 'status'];
      const missing = required.filter(field => !data[field]);
      if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
      }

      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(data.phone)) {
        throw new Error('Phone must be exactly 10 digits');
      }

      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Updating conductor data:', data);
      const response = await apiClient.put(`/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating conductor:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      if (!id) throw new Error('Conductor ID is required');
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  search: async (params) => {
    try {
      const response = await apiClient.get('/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching conductors:', error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      const response = await apiClient.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching conductor statistics:', error);
      throw error;
    }
  },

  uploadConductorPhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await apiClient.post(`/upload-photo/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading conductor photo:', error);
      throw error;
    }
  },

  uploadLicensePhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('licensePhoto', file);
      
      const response = await apiClient.post(`/upload-license/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading license photo:', error);
      throw error;
    }
  }
};

export default conductorApi;