import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

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
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminToken');
          window.location.href = '/login';
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
  /**
   * GET ALL CONDUCTORS
   * @returns {Promise<Array>} List of conductors
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching conductors:', error);
      throw error;
    }
  },

  /**
   * GET CONDUCTOR BY ID
   * @param {number|string} id - Conductor ID
   * @returns {Promise<Object>} Conductor details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Conductor ID is required');
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching conductor ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET CONDUCTORS BY STATUS
   * @param {string} status - Status filter
   * @returns {Promise<Array>} Filtered conductors
   */
  getByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching conductors by status ${status}:`, error);
      throw error;
    }
  },

  /**
   * GET CONDUCTORS WITH EXPIRED LICENSES
   * @returns {Promise<Array>} Conductors with expired licenses
   */
  getExpiredLicenses: async () => {
    try {
      const response = await apiClient.get('/expired-licenses');
      return response.data;
    } catch (error) {
      console.error('Error fetching expired licenses:', error);
      throw error;
    }
  },

  /**
   * CREATE NEW CONDUCTOR
   * @param {Object} data - Conductor data
   * @returns {Promise<Object>} Created conductor
   */
  create: async (data) => {
    try {
      const required = ['name', 'phone', 'employeeId', 'status'];
      const missing = required.filter(field => !data[field]);
      if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
      }

      // Validate phone - exactly 10 digits
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

      const response = await apiClient.post('/add', data);
      return response.data;
    } catch (error) {
      console.error('Error creating conductor:', error);
      throw error;
    }
  },

  /**
   * UPDATE CONDUCTOR
   * @param {number|string} id - Conductor ID
   * @param {Object} data - Updated conductor data
   * @returns {Promise<Object>} Updated conductor
   */
  update: async (id, data) => {
    try {
      if (!id) throw new Error('Conductor ID is required');

      const required = ['name', 'phone', 'employeeId', 'status'];
      const missing = required.filter(field => !data[field]);
      if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
      }

      // Validate phone - exactly 10 digits
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(data.phone)) {
        throw new Error('Phone must be exactly 10 digits');
      }

      // Validate email if provided
      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await apiClient.put(`/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating conductor ${id}:`, error);
      throw error;
    }
  },

  /**
   * DELETE CONDUCTOR
   * @param {number|string} id - Conductor ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Conductor ID is required');
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting conductor ${id}:`, error);
      throw error;
    }
  },

  /**
   * SEARCH CONDUCTORS
   * @param {Object} params - Search parameters
   * @returns {Promise<Array>} Search results
   */
  search: async (params) => {
    try {
      const response = await apiClient.get('/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching conductors:', error);
      throw error;
    }
  },

  /**
   * GET CONDUCTOR STATISTICS
   * @returns {Promise<Object>} Statistics
   */
  getStats: async () => {
    try {
      const response = await apiClient.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching conductor statistics:', error);
      throw error;
    }
  },

  /**
   * UPLOAD CONDUCTOR PHOTO
   * @param {number|string} id - Conductor ID
   * @param {File} file - Photo file
   * @returns {Promise<Object>} Upload result
   */
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

  /**
   * UPLOAD LICENSE PHOTO
   * @param {number|string} id - Conductor ID
   * @param {File} file - License photo file
   * @returns {Promise<Object>} Upload result
   */
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