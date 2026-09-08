import api from "./axios";

export const getLatestLocation = async (busId) => {
  const response = await api.get(`/bus-locations/bus/${busId}/latest`);
  return response.data;
};

export const getLocationHistory = async (busId, limit = 20) => {
  const response = await api.get(`/bus-locations/bus/${busId}/history`, {
    params: { limit }
  });
  return response.data;
};

export const saveLocation = async (data) => {
  const response = await api.post("/bus-locations", data);
  return response.data;
};

export const getAllLocations = async () => {
  const response = await api.get("/bus-locations");
  return response.data;
};

const busLocationApi = {
  getLatest: getLatestLocation,
  getHistory: getLocationHistory,
  save: saveLocation,
  getAll: getAllLocations,
};

export default busLocationApi;