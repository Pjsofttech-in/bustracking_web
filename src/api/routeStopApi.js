// api/routeStopApi.js

import axios from 'axios';

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/stops`,
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
          console.error('Resource not found - Please check if the server is running and the endpoint exists');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          console.error(`Error: ${error.response.status} - ${error.response.data}`);
      }
    } else if (error.request) {
      console.error('No response received from server. Please check if the server is running.');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// ================= ROUTE STOP API FUNCTIONS =================

export const routeStopApi = {
  /**
   * GET ALL ROUTE STOPS
   * @returns {Promise<Array>} List of route stops
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching route stops:', error);
      throw error;
    }
  },

  /**
   * GET ROUTE STOP BY ID
   * @param {number|string} id - Stop ID
   * @returns {Promise<Object>} Route stop details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Stop ID is required');
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stop with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * CREATE NEW ROUTE STOP
   * @param {number|string} routeId - Route ID
   * @param {Object} data - Stop data
   * @param {string} data.stopName - Stop name (required)
   * @param {string} data.arrivalTime - Arrival time (required, format: HH:mm)
   * @returns {Promise<Object>} Created route stop
   */
  create: async (routeId, data) => {
    try {
      // Validate required fields
      if (!routeId) throw new Error('Route ID is required');
      
      const requiredFields = ['stopName', 'arrivalTime'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate time format (HH:mm)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(data.arrivalTime)) {
        throw new Error('Arrival time must be in HH:mm format');
      }

      // Prepare payload
      const payload = {
        stopName: data.stopName.trim(),
        arrivalTime: data.arrivalTime
      };

      const response = await apiClient.post(`/${routeId}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating route stop:', error);
      throw error;
    }
  },

  /**
   * DELETE ROUTE STOP
   * @param {number|string} id - Stop ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Stop ID is required for deletion');
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting stop with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * UPDATE ROUTE STOP
   * @param {number|string} id - Stop ID
   * @param {Object} data - Updated stop data
   * @param {string} data.stopName - Stop name
   * @param {string} data.arrivalTime - Arrival time (format: HH:mm)
   * @returns {Promise<Object>} Updated route stop
   */
  update: async (id, data) => {
    try {
      if (!id) throw new Error('Stop ID is required for update');

      // Validate required fields
      const requiredFields = ['stopName', 'arrivalTime'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate time format
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(data.arrivalTime)) {
        throw new Error('Arrival time must be in HH:mm format');
      }

      // Prepare payload
      const payload = {
        stopName: data.stopName.trim(),
        arrivalTime: data.arrivalTime
      };

      // Note: Your backend doesn't have a PUT endpoint.
      // You need to add @PutMapping in RouteStopController.
      const response = await apiClient.put(`/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating stop with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET STOPS BY ROUTE ID (Client-side filter)
   * @param {number|string} routeId - Route ID
   * @returns {Promise<Array>} List of stops for the route
   */
  getByRoute: async (routeId) => {
    try {
      if (!routeId) throw new Error('Route ID is required');
      const allStops = await routeStopApi.getAll();
      return allStops.filter(stop => stop.routeId === Number(routeId) || stop.route?.id === Number(routeId));
    } catch (error) {
      console.error(`Error fetching stops for route ${routeId}:`, error);
      throw error;
    }
  },

  /**
   * SEARCH ROUTE STOPS (Client-side search)
   * @param {string} query - Search term
   * @param {Array} stops - List of stops to search (optional)
   * @returns {Promise<Array>} Search results
   */
  search: async (query, stops = null) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      
      const allStops = stops || await routeStopApi.getAll();
      const term = query.toLowerCase().trim();
      
      return allStops.filter(stop =>
        stop.stopName?.toLowerCase().includes(term) ||
        stop.route?.routeName?.toLowerCase().includes(term) ||
        stop.arrivalTime?.toLowerCase().includes(term) ||
        String(stop.id)?.includes(term) ||
        String(stop.routeId)?.includes(term)
      );
    } catch (error) {
      console.error('Error searching route stops:', error);
      throw error;
    }
  },

  /**
   * GET STOP STATISTICS
   * @param {Array} stops - List of stops (optional)
   * @param {Array} routes - List of routes (optional)
   * @returns {Promise<Object>} Statistics
   */
  getStats: async (stops = null, routes = null) => {
    try {
      const allStops = stops || await routeStopApi.getAll();
      const allRoutes = routes || [];
      
      // Group stops by route
      const stopsByRoute = allStops.reduce((acc, stop) => {
        const routeId = stop.routeId || stop.route?.id;
        if (routeId) {
          if (!acc[routeId]) {
            acc[routeId] = [];
          }
          acc[routeId].push(stop);
        }
        return acc;
      }, {});

      return {
        total: allStops.length,
        totalRoutes: allRoutes.length,
        stopsByRoute: stopsByRoute,
        avgStopsPerRoute: allRoutes.length > 0 ? Math.round(allStops.length / allRoutes.length) : 0,
        routesWithStops: Object.keys(stopsByRoute).length,
        routesWithoutStops: allRoutes.length - Object.keys(stopsByRoute).length
      };
    } catch (error) {
      console.error('Error fetching stop statistics:', error);
      throw error;
    }
  },

  /**
   * VALIDATE ROUTE STOP DATA
   * @param {Object} data - Stop data to validate
   * @returns {Object} Validation result
   */
  validate: (data) => {
    const errors = [];
    const warnings = [];

    // Required fields
    const requiredFields = ['stopName', 'arrivalTime'];
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors.push(`${field} is required`);
      }
    });

    // Time format validation
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (data.arrivalTime && !timeRegex.test(data.arrivalTime)) {
      errors.push('Arrival time must be in HH:mm format (e.g., 14:30)');
    }

    // Stop name length
    if (data.stopName && data.stopName.trim().length < 2) {
      warnings.push('Stop name should be at least 2 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  },

  /**
   * BULK IMPORT ROUTE STOPS
   * @param {number|string} routeId - Route ID
   * @param {Array} stops - Array of stop objects
   * @returns {Promise<Object>} Import results
   */
  bulkImport: async (routeId, stops) => {
    try {
      if (!routeId) throw new Error('Route ID is required');
      if (!stops || stops.length === 0) {
        throw new Error('No stop data provided for import');
      }
      
      const results = [];
      for (const stop of stops) {
        try {
          const created = await routeStopApi.create(routeId, stop);
          results.push({ success: true, data: created });
        } catch (error) {
          results.push({ success: false, error: error.message, data: stop });
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
   * EXPORT ROUTE STOPS TO CSV
   * @param {Array} stops - List of stops (optional)
   * @returns {Promise<Blob>} CSV file blob
   */
  exportToCSV: async (stops = null) => {
    try {
      const allStops = stops || await routeStopApi.getAll();
      
      const headers = ['ID', 'Stop Name', 'Arrival Time', 'Route ID', 'Route Name'];
      const rows = allStops.map(s => [
        s.id,
        s.stopName || 'N/A',
        s.arrivalTime || 'N/A',
        s.routeId || s.route?.id || 'N/A',
        s.route?.routeName || 'N/A'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    } catch (error) {
      console.error('Error exporting route stops to CSV:', error);
      throw error;
    }
  },

  /**
   * GET STOPS BY TIME RANGE
   * @param {string} startTime - Start time (HH:mm)
   * @param {string} endTime - End time (HH:mm)
   * @param {Array} stops - List of stops (optional)
   * @returns {Promise<Array>} Filtered stops
   */
  getByTimeRange: async (startTime, endTime, stops = null) => {
    try {
      if (!startTime || !endTime) {
        throw new Error('Start time and end time are required');
      }
      
      const allStops = stops || await routeStopApi.getAll();
      
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      
      return allStops.filter(stop => {
        const stopMinutes = timeToMinutes(stop.arrivalTime);
        return stopMinutes >= startMinutes && stopMinutes <= endMinutes;
      });
    } catch (error) {
      console.error('Error fetching stops by time range:', error);
      throw error;
    }
  },

  /**
   * REORDER STOPS (Update sequence)
   * @param {Array} stops - Array of stops with updated order
   * @returns {Promise<Array>} Updated stops
   */
  reorderStops: async (stops) => {
    try {
      if (!stops || stops.length === 0) {
        throw new Error('No stops provided for reordering');
      }
      
      const results = [];
      for (let i = 0; i < stops.length; i++) {
        const stop = stops[i];
        try {
          // Update each stop with new sequence number
          const updated = await routeStopApi.update(stop.id, {
            stopName: stop.stopName,
            arrivalTime: stop.arrivalTime
          });
          results.push(updated);
        } catch (error) {
          console.error(`Error updating stop ${stop.id}:`, error);
          results.push({ ...stop, error: error.message });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error reordering stops:', error);
      throw error;
    }
  }
};

export default routeStopApi;