import api from "./api";

export async function getDevices() {
  const response = await api.get("/devices/");
  return response.data;
}

export async function createDevice(device) {
  const response = await api.post("/devices/", device);
  return response.data;
}

export async function updateDevice(id, device) {
  const response = await api.put(`/devices/${id}`, device);
  return response.data;
}

export async function deleteDevice(id) {
  const response = await api.delete(`/devices/${id}`);
  return response.data;
}