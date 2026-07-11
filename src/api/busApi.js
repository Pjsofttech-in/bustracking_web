import axios from "axios";

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
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
          console.error('Forbidden: You do not have permission to perform this action');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          console.error(`Error: ${error.response.status} - ${error.response.data}`);
      }
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// ================= BUS API FUNCTIONS =================

export const busApi = {
  /**
   * GET ALL BUSES
   * @returns {Promise<Array>} List of buses
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/bus/getALLBuses');
      return response.data;
    } catch (error) {
      console.error('Error fetching buses:', error);
      throw error;
    }
  },

  /**
   * GET BUS BY ID
   * @param {number|string} id - Bus ID
   * @returns {Promise<Object>} Bus details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Bus ID is required');
      const response = await apiClient.get(`/bus/getBusById/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bus with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET BUSES BY SERVICE PROVIDER
   * @param {number|string} providerId - Service Provider ID
   * @returns {Promise<Array>} List of buses for the provider
   */
  getByProvider: async (providerId) => {
    try {
      if (!providerId) throw new Error('Service Provider ID is required');
      const response = await apiClient.get(`/bus/by-provider/${providerId}`);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching buses for provider ${providerId}:`, error);
      throw error;
    }
  },

  /**
   * CREATE NEW BUS
   * @param {Object} busData - Bus data
   * @param {string} busData.busNumber - Bus number (required) - comes from serviceProvider
   * @param {string} busData.busType - Bus type: STANDARD, MINI, LUXURY, ELECTRIC, HYBRID (required)
   * @param {number} busData.mfgYear - Manufacturing year (required)
   * @param {number} busData.capacity - Capacity (required)
   * @param {string} busData.status - Status: ACTIVE, BREAKDOWN, TERMINATED (required)
   * @param {number} [busData.serviceProviderId] - Service Provider ID
   * @returns {Promise<Object>} Created bus
   */
  create: async (busData) => {
    try {
      const requiredFields = ['busNumber', 'busType', 'mfgYear', 'capacity', 'status'];
      const missingFields = requiredFields.filter(field => !busData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const validBusTypes = ['STANDARD', 'MINI', 'LUXURY', 'ELECTRIC', 'HYBRID'];
      if (!validBusTypes.includes(busData.busType)) {
        throw new Error(`Invalid bus type. Must be one of: ${validBusTypes.join(', ')}`);
      }

      const validStatuses = ['ACTIVE', 'BREAKDOWN', 'TERMINATED'];
      if (!validStatuses.includes(busData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      if (busData.capacity <= 0) {
        throw new Error('Capacity must be greater than 0');
      }

      const currentYear = new Date().getFullYear();
      if (busData.mfgYear < 1990 || busData.mfgYear > currentYear + 1) {
        throw new Error(`MFG Year must be between 1990 and ${currentYear + 1}`);
      }

      const payload = {
        busNumber: busData.busNumber.trim().toUpperCase(),
        busType: busData.busType,
        mfgYear: Number(busData.mfgYear),
        capacity: Number(busData.capacity),
        status: busData.status,
        serviceProviderId: busData.serviceProviderId || null
      };

      const response = await apiClient.post('/bus/addBus', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating bus:', error);
      throw error;
    }
  },

  /**
   * UPDATE BUS
   * @param {number|string} id - Bus ID
   * @param {Object} busData - Updated bus data
   * @param {string} busData.busNumber - Bus number (required) - comes from serviceProvider
   * @param {string} busData.busType - Bus type (required)
   * @param {number} busData.mfgYear - Manufacturing year (required)
   * @param {number} busData.capacity - Capacity (required)
   * @param {string} busData.status - Status (required)
   * @param {number} [busData.serviceProviderId] - Service Provider ID
   * @returns {Promise<Object>} Updated bus
   */
  update: async (id, busData) => {
    try {
      if (!id) throw new Error('Bus ID is required for update');

      const requiredFields = ['busNumber', 'busType', 'mfgYear', 'capacity', 'status'];
      const missingFields = requiredFields.filter(field => !busData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const validBusTypes = ['STANDARD', 'MINI', 'LUXURY', 'ELECTRIC', 'HYBRID'];
      if (!validBusTypes.includes(busData.busType)) {
        throw new Error(`Invalid bus type. Must be one of: ${validBusTypes.join(', ')}`);
      }

      const validStatuses = ['ACTIVE', 'BREAKDOWN', 'TERMINATED'];
      if (!validStatuses.includes(busData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      if (busData.capacity <= 0) {
        throw new Error('Capacity must be greater than 0');
      }

      const currentYear = new Date().getFullYear();
      if (busData.mfgYear < 1990 || busData.mfgYear > currentYear + 1) {
        throw new Error(`MFG Year must be between 1990 and ${currentYear + 1}`);
      }

      const payload = {
        busNumber: busData.busNumber.trim().toUpperCase(),
        busType: busData.busType,
        mfgYear: Number(busData.mfgYear),
        capacity: Number(busData.capacity),
        status: busData.status,
        serviceProviderId: busData.serviceProviderId || null
      };

      const response = await apiClient.put(`/bus/updateBus/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating bus with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * DELETE BUS
   * @param {number|string} id - Bus ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Bus ID is required for deletion');
      const response = await apiClient.delete(`/bus/deleteBus/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting bus with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET DAILY RUNNING BUSES
   * @returns {Promise<Array>} List of running buses
   */
  getDailyRunning: async () => {
    try {
      const response = await apiClient.get('/bus/daily-running');
      return response.data;
    } catch (error) {
      console.error('Error fetching daily running buses:', error);
      throw error;
    }
  },

  /**
   * SEARCH BUSES (Client-side search)
   * @param {string} query - Search term
   * @returns {Promise<Array>} Search results
   */
  search: async (query) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      const allBuses = await busApi.getAll();
      const term = query.toLowerCase().trim();
      return allBuses.filter(bus =>
        bus.busNumber?.toLowerCase().includes(term) ||
        bus.busType?.toLowerCase().includes(term) ||
        bus.status?.toLowerCase().includes(term) ||
        bus.serviceProviderName?.toLowerCase().includes(term) ||
        String(bus.mfgYear)?.includes(term) ||
        String(bus.capacity)?.includes(term)
      );
    } catch (error) {
      console.error('Error searching buses:', error);
      throw error;
    }
  },

  /**
   * GET BUS STATISTICS
   * @returns {Promise<Object>} Statistics
   */
  getStats: async () => {
    try {
      const allBuses = await busApi.getAll();
      
      return {
        total: allBuses.length,
        active: allBuses.filter(b => b.status === 'ACTIVE').length,
        breakdown: allBuses.filter(b => b.status === 'BREAKDOWN').length,
        terminated: allBuses.filter(b => b.status === 'TERMINATED').length,
        avgCapacity: Math.round(allBuses.reduce((sum, b) => sum + (b.capacity || 0), 0) / (allBuses.length || 1)),
        avgMfgYear: Math.round(allBuses.reduce((sum, b) => sum + (b.mfgYear || 0), 0) / (allBuses.length || 1)),
        assignedToProvider: allBuses.filter(b => b.serviceProviderId).length,
        byProvider: allBuses.reduce((acc, bus) => {
          const providerName = bus.serviceProviderName || 'Unassigned';
          acc[providerName] = (acc[providerName] || 0) + 1;
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error fetching bus statistics:', error);
      throw error;
    }
  },

  /**
   * BULK IMPORT BUSES
   * @param {Array} buses - Array of bus objects
   * @returns {Promise<Object>} Import results
   */
  bulkImport: async (buses) => {
    try {
      if (!buses || buses.length === 0) {
        throw new Error('No bus data provided for import');
      }
      const results = [];
      for (const bus of buses) {
        try {
          const created = await busApi.create(bus);
          results.push({ success: true, data: created });
        } catch (error) {
          results.push({ success: false, error: error.message, data: bus });
        }
      }
      return {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      };
    } catch (error) {
      console.error('Error in bulk import:', error);
      throw error;
    }
  },

  /**
   * EXPORT BUSES TO CSV
   * @returns {Promise<Blob>} CSV file blob
   */
  exportToCSV: async () => {
    try {
      const buses = await busApi.getAll();
      const headers = ['ID', 'Bus Number', 'Type', 'MFG Year', 'Capacity', 'Status', 
                       'Service Provider', 'Created At'];
      const rows = buses.map(b => [
        b.id,
        b.busNumber || 'N/A',
        b.busType,
        b.mfgYear || 'N/A',
        b.capacity,
        b.status,
        b.serviceProviderName || 'Not Assigned',
        b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    } catch (error) {
      console.error('Error exporting buses to CSV:', error);
      throw error;
    }
  }
};

export default busApi;