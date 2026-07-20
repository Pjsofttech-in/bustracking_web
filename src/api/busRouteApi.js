import api from "./axios";

// ============ BUS ROUTE CRUD ============

export const getAllBusRoutes = async () => {
  const response = await api.get("/bus-routes");
  return response.data; // array of BusRouteResponse
};

export const getBusRouteById = async (id) => {
  const response = await api.get(`/bus-routes/${id}`);
  return response.data;
};

export const createBusRoute = async (data) => {
  const response = await api.post("/bus-routes", data);
  return response.data;
};

export const updateBusRoute = async (id, data) => {
  const response = await api.put(`/bus-routes/${id}`, data);
  return response.data;
};

export const deleteBusRoute = async (id) => {
  await api.delete(`/bus-routes/${id}`);
};

const busRouteApi = {
  getAll: getAllBusRoutes,
  getById: getBusRouteById,
  create: createBusRoute,
  update: updateBusRoute,
  delete: deleteBusRoute,
};

export default busRouteApi;