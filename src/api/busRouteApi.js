// api/busRouteApi.js

import axios from 'axios';

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/routes`,
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

// ================= BUS ROUTE API FUNCTIONS =================

export const busRouteApi = {
  /**
   * GET ALL ROUTES
   * @returns {Promise<Array>} List of routes
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('');
      return response.data;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  /**
   * GET ROUTE BY ID
   * @param {number|string} id - Route ID
   * @returns {Promise<Object>} Route details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Route ID is required');
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching route with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * CREATE NEW ROUTE
   * @param {Object} data - Route data
   * @param {string} data.routeName - Route name (required)
   * @param {string} data.startTime - Start time (required, format: HH:mm)
   * @param {string} data.stopTime - Stop time (required, format: HH:mm)
   * @param {string} data.startPoint - Start point (required)
   * @param {string} data.endPoint - End point (required)
   * @param {number} data.totalDistanceKm - Total distance in KM (required)
   * @param {number} data.estimatedTimeMin - Estimated time in minutes (required)
   * @param {string} data.status - Status: ACTIVE, INACTIVE, SUSPENDED (required)
   * @param {Array} [data.stops] - List of stops (optional)
   * @param {string} data.stops[].stopName - Stop name
   * @param {string} data.stops[].arrivalTime - Arrival time (format: HH:mm)
   * @returns {Promise<Object>} Created route
   */
  create: async (data) => {
    try {
      // Validate required fields
      const requiredFields = ['routeName', 'startTime', 'stopTime', 'startPoint', 'endPoint', 'totalDistanceKm', 'estimatedTimeMin', 'status'];
      const missingFields = requiredFields.filter(field => !data[field] && data[field] !== 0);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate status
      const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
      if (!validStatuses.includes(data.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Validate distance and time
      if (data.totalDistanceKm <= 0) {
        throw new Error('Total distance must be greater than 0');
      }
      if (data.estimatedTimeMin <= 0) {
        throw new Error('Estimated time must be greater than 0');
      }

      // Prepare payload
      const payload = {
        routeName: data.routeName.trim(),
        startTime: data.startTime,
        stopTime: data.stopTime,
        startPoint: data.startPoint.trim(),
        endPoint: data.endPoint.trim(),
        totalDistanceKm: Number(data.totalDistanceKm),
        estimatedTimeMin: Number(data.estimatedTimeMin),
        status: data.status,
      };

      // Add stops if provided
      if (data.stops && data.stops.length > 0) {
        payload.stops = data.stops.map(stop => ({
          stopName: stop.stopName,
          arrivalTime: stop.arrivalTime || data.startTime
        }));
      }

      const response = await apiClient.post('', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  },

  /**
   * UPDATE ROUTE
   * @param {number|string} id - Route ID
   * @param {Object} data - Updated route data
   * @param {string} data.routeName - Route name (required)
   * @param {string} data.startTime - Start time (required)
   * @param {string} data.stopTime - Stop time (required)
   * @param {string} data.startPoint - Start point (required)
   * @param {string} data.endPoint - End point (required)
   * @param {number} data.totalDistanceKm - Total distance in KM (required)
   * @param {number} data.estimatedTimeMin - Estimated time in minutes (required)
   * @param {string} data.status - Status (required)
   * @param {Array} [data.stops] - List of stops (optional)
   * @returns {Promise<Object>} Updated route
   */
  update: async (id, data) => {
    try {
      if (!id) throw new Error('Route ID is required for update');

      // Validate required fields
      const requiredFields = ['routeName', 'startTime', 'stopTime', 'startPoint', 'endPoint', 'totalDistanceKm', 'estimatedTimeMin', 'status'];
      const missingFields = requiredFields.filter(field => !data[field] && data[field] !== 0);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate status
      const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
      if (!validStatuses.includes(data.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      if (data.totalDistanceKm <= 0) {
        throw new Error('Total distance must be greater than 0');
      }
      if (data.estimatedTimeMin <= 0) {
        throw new Error('Estimated time must be greater than 0');
      }

      // Prepare payload
      const payload = {
        routeName: data.routeName.trim(),
        startTime: data.startTime,
        stopTime: data.stopTime,
        startPoint: data.startPoint.trim(),
        endPoint: data.endPoint.trim(),
        totalDistanceKm: Number(data.totalDistanceKm),
        estimatedTimeMin: Number(data.estimatedTimeMin),
        status: data.status,
      };

      // Add stops if provided
      if (data.stops && data.stops.length > 0) {
        payload.stops = data.stops.map(stop => ({
          stopName: stop.stopName,
          arrivalTime: stop.arrivalTime || data.startTime
        }));
      }

      const response = await apiClient.put(`/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating route with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * DELETE ROUTE
   * @param {number|string} id - Route ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Route ID is required for deletion');
      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting route with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * GET ROUTES BY STATUS
   * @param {string} status - ACTIVE, INACTIVE, SUSPENDED
   * @returns {Promise<Array>} Filtered routes
   */
  getByStatus: async (status) => {
    try {
      if (!status) throw new Error('Status is required');
      const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      const allRoutes = await busRouteApi.getAll();
      return allRoutes.filter(route => route.status === status);
    } catch (error) {
      console.error(`Error fetching routes with status ${status}:`, error);
      throw error;
    }
  },

  /**
   * SEARCH ROUTES (Client-side search)
   * @param {string} query - Search term
   * @returns {Promise<Array>} Search results
   */
  search: async (query) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      const allRoutes = await busRouteApi.getAll();
      const term = query.toLowerCase().trim();
      return allRoutes.filter(route =>
        route.routeName?.toLowerCase().includes(term) ||
        route.startPoint?.toLowerCase().includes(term) ||
        route.endPoint?.toLowerCase().includes(term) ||
        route.status?.toLowerCase().includes(term) ||
        String(route.id)?.includes(term)
      );
    } catch (error) {
      console.error('Error searching routes:', error);
      throw error;
    }
  },

  /**
   * GET ROUTE STATISTICS
   * @returns {Promise<Object>} Statistics
   */
  getStats: async () => {
    try {
      const allRoutes = await busRouteApi.getAll();
      const totalDistance = allRoutes.reduce((sum, route) => sum + (route.totalDistanceKm || 0), 0);
      const avgTime = allRoutes.reduce((sum, route) => sum + (route.estimatedTimeMin || 0), 0) / (allRoutes.length || 1);
      
      return {
        total: allRoutes.length,
        active: allRoutes.filter(r => r.status === 'ACTIVE').length,
        inactive: allRoutes.filter(r => r.status === 'INACTIVE').length,
        suspended: allRoutes.filter(r => r.status === 'SUSPENDED').length,
        totalDistance: Math.round(totalDistance * 10) / 10,
        avgEstimatedTime: Math.round(avgTime)
      };
    } catch (error) {
      console.error('Error fetching route statistics:', error);
      throw error;
    }
  },

  /**
   * GET ROUTE WITH STOPS
   * @param {number|string} id - Route ID
   * @returns {Promise<Object>} Route with stops
   */
  getWithStops: async (id) => {
    try {
      if (!id) throw new Error('Route ID is required');
      const route = await busRouteApi.getById(id);
      return route;
    } catch (error) {
      console.error(`Error fetching route with stops for ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * BULK IMPORT ROUTES
   * @param {Array} routes - Array of route objects
   * @returns {Promise<Object>} Import results
   */
  bulkImport: async (routes) => {
    try {
      if (!routes || routes.length === 0) {
        throw new Error('No route data provided for import');
      }
      const results = [];
      for (const route of routes) {
        try {
          const created = await busRouteApi.create(route);
          results.push({ success: true, data: created });
        } catch (error) {
          results.push({ success: false, error: error.message, data: route });
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
   * EXPORT ROUTES TO CSV
   * @returns {Promise<Blob>} CSV file blob
   */
  exportToCSV: async () => {
    try {
      const routes = await busRouteApi.getAll();
      // Create CSV content
      const headers = ['ID', 'Route Name', 'Start Point', 'Start Time', 'End Point', 'End Time', 'Distance (KM)', 'Est. Time (min)', 'Status'];
      const rows = routes.map(r => [
        r.id,
        r.routeName || 'N/A',
        r.startPoint || 'N/A',
        r.startTime || 'N/A',
        r.endPoint || 'N/A',
        r.stopTime || 'N/A',
        r.totalDistanceKm || 'N/A',
        r.estimatedTimeMin || 'N/A',
        r.status || 'N/A'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    } catch (error) {
      console.error('Error exporting routes to CSV:', error);
      throw error;
    }
  },

  /**
   * VALIDATE ROUTE DATA
   * @param {Object} data - Route data to validate
   * @returns {Object} Validation result
   */
  validate: (data) => {
    const errors = [];
    const warnings = [];

    // Required fields
    const requiredFields = ['routeName', 'startTime', 'stopTime', 'startPoint', 'endPoint', 'totalDistanceKm', 'estimatedTimeMin', 'status'];
    requiredFields.forEach(field => {
      if (!data[field] && data[field] !== 0) {
        errors.push(`${field} is required`);
      }
    });

    // Status validation
    const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    // Numeric validations
    if (data.totalDistanceKm && data.totalDistanceKm <= 0) {
      errors.push('Total distance must be greater than 0');
    }
    if (data.estimatedTimeMin && data.estimatedTimeMin <= 0) {
      errors.push('Estimated time must be greater than 0');
    }

    // Time format validation (HH:mm)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (data.startTime && !timeRegex.test(data.startTime)) {
      warnings.push('Start time should be in HH:mm format');
    }
    if (data.stopTime && !timeRegex.test(data.stopTime)) {
      warnings.push('Stop time should be in HH:mm format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
};

export default busRouteApi;