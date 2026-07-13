import axios from 'axios';

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pjsofttech.in:9090";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/trips`,
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
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
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

// ================= BUS TRIP API FUNCTIONS =================

export const busTripApi = {
  /**
   * GET ALL TRIPS
   * @returns {Promise<Array>} List of trips
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  },

  /**
   * GET TRIP BY ID
   * @param {number|string} id - Trip ID
   * @returns {Promise<Object>} Trip details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Trip ID is required');
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trip with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * CREATE NEW TRIP
   * @param {Object} data - Trip data
   * @param {number} data.busId - Bus ID (required)
   * @param {number} data.routeId - Route ID (required)
   * @param {number} data.driverId - Driver ID (required)
   * @param {number} data.conductorId - Conductor ID (required)
   * @param {string} data.startTime - Start time (required, ISO format)
   * @param {string} data.endTime - End time (optional, ISO format)
   * @param {string} data.tripStatus - Trip status: SCHEDULED, ONGOING, COMPLETED, CANCELLED (required)
   * @returns {Promise<Object>} Created trip
   */
  create: async (data) => {
    try {
      // Validate required fields
      const requiredFields = ['busId', 'routeId', 'driverId', 'conductorId', 'startTime', 'tripStatus'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate trip status
      const validStatuses = ['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED'];
      if (!validStatuses.includes(data.tripStatus)) {
        throw new Error(`Invalid trip status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Validate IDs are numbers
      const idFields = ['busId', 'routeId', 'driverId', 'conductorId'];
      idFields.forEach(field => {
        if (data[field] && isNaN(Number(data[field]))) {
          throw new Error(`${field} must be a valid number`);
        }
      });

      const payload = {
        busId: Number(data.busId),
        routeId: Number(data.routeId),
        driverId: Number(data.driverId),
        conductorId: Number(data.conductorId),
        startTime: data.startTime,
        endTime: data.endTime || null,
        tripStatus: data.tripStatus
      };

      const response = await apiClient.post('/create', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  /**
   * UPDATE TRIP
   * @param {number|string} id - Trip ID
   * @param {Object} data - Updated trip data
   * @param {number} data.busId - Bus ID (required)
   * @param {number} data.routeId - Route ID (required)
   * @param {number} data.driverId - Driver ID (required)
   * @param {number} data.conductorId - Conductor ID (required)
   * @param {string} data.startTime - Start time (required, ISO format)
   * @param {string} data.endTime - End time (optional, ISO format)
   * @param {string} data.tripStatus - Trip status (required)
   * @returns {Promise<Object>} Updated trip
   */
  update: async (id, data) => {
    try {
      if (!id) throw new Error('Trip ID is required for update');

      const requiredFields = ['busId', 'routeId', 'driverId', 'conductorId', 'startTime', 'tripStatus'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const validStatuses = ['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED'];
      if (!validStatuses.includes(data.tripStatus)) {
        throw new Error(`Invalid trip status. Must be one of: ${validStatuses.join(', ')}`);
      }

      const payload = {
        busId: Number(data.busId),
        routeId: Number(data.routeId),
        driverId: Number(data.driverId),
        conductorId: Number(data.conductorId),
        startTime: data.startTime,
        endTime: data.endTime || null,
        tripStatus: data.tripStatus
      };

      const response = await apiClient.put(`/update/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating trip with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * DELETE TRIP
   * @param {number|string} id - Trip ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Trip ID is required for deletion');
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting trip with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET TRIPS BY STATUS
   * @param {string} status - SCHEDULED, ONGOING, COMPLETED, CANCELLED
   * @returns {Promise<Array>} Filtered trips
   */
  getByStatus: async (status) => {
    try {
      if (!status) throw new Error('Status is required');
      const validStatuses = ['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      const allTrips = await busTripApi.getAll();
      return allTrips.filter(trip => trip.tripStatus === status);
    } catch (error) {
      console.error(`Error fetching trips with status ${status}:`, error);
      throw error;
    }
  },

  /**
   * GET TRIPS BY BUS
   * @param {number} busId - Bus ID
   * @returns {Promise<Array>} Filtered trips
   */
  getByBus: async (busId) => {
    try {
      if (!busId) throw new Error('Bus ID is required');
      const allTrips = await busTripApi.getAll();
      return allTrips.filter(trip => trip.busId === busId || trip.bus?.id === busId);
    } catch (error) {
      console.error(`Error fetching trips for bus ${busId}:`, error);
      throw error;
    }
  },

  /**
   * GET TRIPS BY ROUTE
   * @param {number} routeId - Route ID
   * @returns {Promise<Array>} Filtered trips
   */
  getByRoute: async (routeId) => {
    try {
      if (!routeId) throw new Error('Route ID is required');
      const allTrips = await busTripApi.getAll();
      return allTrips.filter(trip => trip.routeId === routeId || trip.route?.id === routeId);
    } catch (error) {
      console.error(`Error fetching trips for route ${routeId}:`, error);
      throw error;
    }
  },

  /**
   * SEARCH TRIPS (Client-side search)
   * @param {string} query - Search term
   * @returns {Promise<Array>} Search results
   */
  search: async (query) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      const allTrips = await busTripApi.getAll();
      const term = query.toLowerCase().trim();
      return allTrips.filter(trip =>
        trip.bus?.busNumber?.toLowerCase().includes(term) ||
        trip.route?.routeName?.toLowerCase().includes(term) ||
        trip.driver?.name?.toLowerCase().includes(term) ||
        trip.conductor?.name?.toLowerCase().includes(term) ||
        trip.tripStatus?.toLowerCase().includes(term) ||
        String(trip.id)?.includes(term)
      );
    } catch (error) {
      console.error('Error searching trips:', error);
      throw error;
    }
  },

  /**
   * GET TRIP STATISTICS
   * @returns {Promise<Object>} Statistics
   */
  getStats: async () => {
    try {
      const allTrips = await busTripApi.getAll();
      return {
        total: allTrips.length,
        scheduled: allTrips.filter(t => t.tripStatus === 'SCHEDULED').length,
        ongoing: allTrips.filter(t => t.tripStatus === 'ONGOING').length,
        completed: allTrips.filter(t => t.tripStatus === 'COMPLETED').length,
        cancelled: allTrips.filter(t => t.tripStatus === 'CANCELLED').length
      };
    } catch (error) {
      console.error('Error fetching trip statistics:', error);
      throw error;
    }
  },

  /**
   * BULK IMPORT TRIPS
   * @param {Array} trips - Array of trip objects
   * @returns {Promise<Object>} Import results
   */
  bulkImport: async (trips) => {
    try {
      if (!trips || trips.length === 0) {
        throw new Error('No trip data provided for import');
      }
      const results = [];
      for (const trip of trips) {
        try {
          const created = await busTripApi.create(trip);
          results.push({ success: true, data: created });
        } catch (error) {
          results.push({ success: false, error: error.message, data: trip });
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
   * EXPORT TRIPS TO CSV
   * @returns {Promise<Blob>} CSV file blob
   */
  exportToCSV: async () => {
    try {
      const trips = await busTripApi.getAll();
      // Create CSV content
      const headers = ['ID', 'Bus', 'Route', 'Driver', 'Conductor', 'Start Time', 'End Time', 'Status', 'Created At'];
      const rows = trips.map(t => [
        t.id,
        t.bus?.busNumber || t.busId || 'N/A',
        t.route?.routeName || t.routeId || 'N/A',
        t.driver?.name || t.driverId || 'N/A',
        t.conductor?.name || t.conductorId || 'N/A',
        t.startTime ? new Date(t.startTime).toLocaleString() : 'N/A',
        t.endTime ? new Date(t.endTime).toLocaleString() : 'N/A',
        t.tripStatus || 'N/A',
        t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    } catch (error) {
      console.error('Error exporting trips to CSV:', error);
      throw error;
    }
  },

  /**
   * UPDATE TRIP STATUS
   * @param {number|string} id - Trip ID
   * @param {string} status - New status (SCHEDULED, ONGOING, COMPLETED, CANCELLED)
   * @returns {Promise<Object>} Updated trip
   */
  updateStatus: async (id, status) => {
    try {
      if (!id) throw new Error('Trip ID is required');
      if (!status) throw new Error('Status is required');
      
      const validStatuses = ['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // First get the trip to preserve other fields
      const trip = await busTripApi.getById(id);
      
      const payload = {
        busId: trip.busId || trip.bus?.id,
        routeId: trip.routeId || trip.route?.id,
        driverId: trip.driverId || trip.driver?.id,
        conductorId: trip.conductorId || trip.conductor?.id,
        startTime: trip.startTime,
        endTime: trip.endTime,
        tripStatus: status
      };

      const response = await apiClient.put(`/update/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating status for trip with ID ${id}:`, error);
      throw error;
    }
  }
};

export default busTripApi;