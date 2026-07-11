// src/api/serviceProviderApi.js

import api from "./axios";

const BASE_URL = "/service-provider";

const serviceProviderApi = {
  /**
   * Get all service providers
   * GET /service-provider/all
   */
  getAll: async () => {
    try {
      console.log("🔍 Fetching all service providers...");
      const response = await api.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error("❌ Error in getAll:", error);
      throw new Error(error.message || "Failed to fetch service providers");
    }
  },

  /**
   * Get service provider by ID
   * GET /service-provider/{id}
   */
  getById: async (id) => {
    try {
      if (!id) throw new Error("Provider ID is required");
      console.log(`🔍 Fetching service provider with ID: ${id}`);
      const response = await api.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error in getById for ID ${id}:`, error);
      throw new Error(error.message || "Failed to fetch service provider details");
    }
  },

  /**
   * Create a new service provider
   * POST /service-provider/add
   */
  create: async (provider) => {
    try {
      if (!provider || !provider.name) {
        throw new Error("Provider name is required");
      }
      console.log("📝 Creating new service provider:", provider);
      const response = await api.post(`${BASE_URL}/add`, provider);
      return response.data;
    } catch (error) {
      console.error("❌ Error in create:", error);
      throw new Error(error.message || "Failed to create service provider");
    }
  },

  /**
   * Update an existing service provider
   * PUT /service-provider/update/{id}
   */
  update: async (id, provider) => {
    try {
      if (!id) throw new Error("Provider ID is required");
      if (!provider || !provider.name) {
        throw new Error("Provider name is required");
      }
      console.log(`📝 Updating service provider ${id}:`, provider);
      const response = await api.put(`${BASE_URL}/update/${id}`, provider);
      return response.data;
    } catch (error) {
      console.error(`❌ Error in update for ID ${id}:`, error);
      throw new Error(error.message || "Failed to update service provider");
    }
  },

  /**
   * Delete a service provider
   * DELETE /service-provider/delete/{id}
   */
  delete: async (id) => {
    try {
      if (!id) throw new Error("Provider ID is required");
      console.log(`🗑️ Deleting service provider with ID: ${id}`);
      const response = await api.delete(`${BASE_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error in delete for ID ${id}:`, error);
      throw new Error(error.message || "Failed to delete service provider");
    }
  },
};

export default serviceProviderApi;