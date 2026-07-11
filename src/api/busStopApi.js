// api/busStopApi.js

import axios from 'axios';

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with default config
// ✅ FIXED: Using /busstop prefix since controller has @RequestMapping("/busstop")
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/busstop`,
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

// ================= BUS STOP API FUNCTIONS =================

export const busStopApi = {
  /**
   * GET ALL BUS STOPS
   * @returns {Promise<Array>} List of bus stops
   */
  getAll: async () => {
    try {
      // ✅ FIXED: Endpoint matches controller: /busstop/getAllStops
      const response = await apiClient.get('/getAllStops');
      return response.data;
    } catch (error) {
      console.error('Error fetching bus stops:', error);
      throw error;
    }
  },

  /**
   * GET STOPS BY BUS ID
   * @param {number|string} busId - Bus ID
   * @returns {Promise<Array>} List of stops for the bus
   */
  getByBus: async (busId) => {
    try {
      if (!busId) throw new Error('Bus ID is required');
      // ✅ FIXED: Endpoint matches controller: /busstop/getBusStopByBus/{busId}
      const response = await apiClient.get(`/getBusStopByBus/${busId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stops for bus ${busId}:`, error);
      throw error;
    }
  },

  /**
   * CREATE NEW BUS STOP
   * @param {Object} data - Bus stop data
   * @param {number} data.busId - Bus ID (required)
   * @param {string} data.stopName - Stop name (required)
   * @param {number} data.latitude - Latitude coordinate (required)
   * @param {number} data.longitude - Longitude coordinate (required)
   * @param {number} data.sequenceNumber - Sequence number (optional, default: 0)
   * @returns {Promise<Object>} Created bus stop
   */
  create: async (data) => {
    try {
      // Validate required fields
      const requiredFields = ['busId', 'stopName', 'latitude', 'longitude'];
      const missingFields = requiredFields.filter(field => !data[field] && data[field] !== 0);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate coordinates
      if (data.latitude < -90 || data.latitude > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
      if (data.longitude < -180 || data.longitude > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }

      // Prepare payload
      const payload = {
        busId: Number(data.busId),
        stopName: data.stopName.trim(),
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        sequenceNumber: data.sequenceNumber ? Number(data.sequenceNumber) : 0
      };

      // ✅ FIXED: Endpoint matches controller: /busstop/addBusStop
      const response = await apiClient.post('/addBusStop', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating bus stop:', error);
      throw error;
    }
  },

  /**
   * MARK BUS STOP AS REACHED
   * @param {number|string} stopId - Stop ID
   * @returns {Promise<Object>} Updated bus stop
   */
  markReached: async (stopId) => {
    try {
      if (!stopId) throw new Error('Stop ID is required');
      // ✅ FIXED: Endpoint matches controller: /busstop/reach/{stopId}
      const response = await apiClient.post(`/reach/${stopId}`);
      return response.data;
    } catch (error) {
      console.error(`Error marking stop ${stopId} as reached:`, error);
      throw error;
    }
  },

  /**
   * COUNT REACHED STOPS FOR A BUS
   * @param {number|string} busId - Bus ID
   * @returns {Promise<number>} Count of reached stops
   */
  countReached: async (busId) => {
    try {
      if (!busId) throw new Error('Bus ID is required');
      // ✅ FIXED: Endpoint matches controller: /busstop/count/{busId}
      const response = await apiClient.get(`/count/${busId}`);
      return response.data;
    } catch (error) {
      console.error(`Error counting reached stops for bus ${busId}:`, error);
      throw error;
    }
  },

  /**
   * DELETE BUS STOP
   * @param {number|string} id - Stop ID
   * @returns {Promise<string>} Success message
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error('Stop ID is required for deletion');
      // ✅ FIXED: Endpoint matches controller: /busstop/delete/{id}
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting stop with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * SEARCH BUS STOPS (Client-side search)
   * @param {string} query - Search term
   * @param {Array} stops - List of stops to search (optional)
   * @returns {Promise<Array>} Search results
   */
  search: async (query, stops = null) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      
      const allStops = stops || await busStopApi.getAll();
      const term = query.toLowerCase().trim();
      
      return allStops.filter(stop =>
        stop.stopName?.toLowerCase().includes(term) ||
        stop.bus?.busNumber?.toLowerCase().includes(term) ||
        String(stop.id)?.includes(term) ||
        String(stop.latitude)?.includes(term) ||
        String(stop.longitude)?.includes(term)
      );
    } catch (error) {
      console.error('Error searching bus stops:', error);
      throw error;
    }
  },

  /**
   * GET STOP STATISTICS
   * @param {Array} stops - List of stops (optional)
   * @returns {Promise<Object>} Statistics
   */
  getStats: async (stops = null) => {
    try {
      const allStops = stops || await busStopApi.getAll();
      
      const stopsWithBus = allStops.filter(s => s.bus);
      const reachedStops = allStops.filter(s => s.reached);
      
      return {
        total: allStops.length,
        assignedToBus: stopsWithBus.length,
        unassigned: allStops.length - stopsWithBus.length,
        reached: reachedStops.length,
        pending: allStops.length - reachedStops.length,
        byBus: stopsWithBus.reduce((acc, stop) => {
          const busId = stop.bus?.id || 'unassigned';
          if (!acc[busId]) {
            acc[busId] = {
              busName: stop.bus?.busNumber || 'Unassigned',
              total: 0,
              reached: 0
            };
          }
          acc[busId].total++;
          if (stop.reached) acc[busId].reached++;
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error fetching stop statistics:', error);
      throw error;
    }
  },

  /**
   * VALIDATE BUS STOP DATA
   * @param {Object} data - Stop data to validate
   * @returns {Object} Validation result
   */
  validate: (data) => {
    const errors = [];
    const warnings = [];

    const requiredFields = ['busId', 'stopName', 'latitude', 'longitude'];
    requiredFields.forEach(field => {
      if (!data[field] && data[field] !== 0) {
        errors.push(`${field} is required`);
      }
    });

    if (data.latitude !== undefined && (data.latitude < -90 || data.latitude > 90)) {
      errors.push('Latitude must be between -90 and 90');
    }
    if (data.longitude !== undefined && (data.longitude < -180 || data.longitude > 180)) {
      errors.push('Longitude must be between -180 and 180');
    }

    if (data.sequenceNumber !== undefined && data.sequenceNumber < 0) {
      warnings.push('Sequence number should be a positive integer');
    }

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
   * BULK IMPORT BUS STOPS
   * @param {Array} stops - Array of stop objects
   * @returns {Promise<Object>} Import results
   */
  bulkImport: async (stops) => {
    try {
      if (!stops || stops.length === 0) {
        throw new Error('No stop data provided for import');
      }
      
      const results = [];
      for (const stop of stops) {
        try {
          const created = await busStopApi.create(stop);
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
   * EXPORT BUS STOPS TO CSV
   * @param {Array} stops - List of stops (optional)
   * @returns {Promise<Blob>} CSV file blob
   */
  exportToCSV: async (stops = null) => {
    try {
      const allStops = stops || await busStopApi.getAll();
      
      const headers = ['ID', 'Stop Name', 'Latitude', 'Longitude', 'Bus', 'Sequence', 'Reached', 'Reached At'];
      const rows = allStops.map(s => [
        s.id,
        s.stopName || 'N/A',
        s.latitude || 'N/A',
        s.longitude || 'N/A',
        s.bus?.busNumber || 'Not Assigned',
        s.sequenceNumber || 'N/A',
        s.reached ? 'Yes' : 'No',
        s.reachedAt ? new Date(s.reachedAt).toLocaleString() : 'N/A'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    } catch (error) {
      console.error('Error exporting bus stops to CSV:', error);
      throw error;
    }
  },

  /**
   * GET STOPS BY COORDINATES (Find nearest stops)
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} radius - Search radius in kilometers (optional)
   * @returns {Promise<Array>} List of nearby stops
   */
  getNearbyStops: async (lat, lng, radius = 5) => {
    try {
      if (lat === undefined || lng === undefined) {
        throw new Error('Latitude and longitude are required');
      }
      
      const allStops = await busStopApi.getAll();
      
      const toRad = (value) => (value * Math.PI) / 180;
      
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };
      
      return allStops
        .filter(stop => {
          const distance = calculateDistance(lat, lng, stop.latitude, stop.longitude);
          return distance <= radius;
        })
        .map(stop => ({
          ...stop,
          distance: calculateDistance(lat, lng, stop.latitude, stop.longitude)
        }))
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Error finding nearby stops:', error);
      throw error;
    }
  },

  /**
   * GET STOP BY ID
   * @param {number|string} id - Stop ID
   * @returns {Promise<Object>} Stop details
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error('Stop ID is required');
      const allStops = await busStopApi.getAll();
      const stop = allStops.find(s => s.id === Number(id));
      if (!stop) {
        throw new Error(`Stop with ID ${id} not found`);
      }
      return stop;
    } catch (error) {
      console.error(`Error fetching stop with ID ${id}:`, error);
      throw error;
    }
  }
};

export default busStopApi;