/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default {
  getItems() {
    return apiClient.get("/api/vinyls");
  },

  getItemById(vinyl_id: string) {
    return apiClient.get(`/api/vinyls/${vinyl_id}`)
  },

  createItem(data: Object) {
    return apiClient.post("/api/vinyls", data);
  },

  deleteItem(vinyl_id: string) {
    return apiClient.delete(`/api/vinyls/${vinyl_id}`);
  },

  updateItem(vinyl_id: string, data: Object) {
    return apiClient.put(`/api/vinyls/${vinyl_id}`, data);
  },
};
