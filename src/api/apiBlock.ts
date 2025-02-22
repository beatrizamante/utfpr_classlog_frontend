import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const blocksApi = {
  getBlocks() {
    return apiClient.get("/blocks");
  },

  getBlockById(blockId: string) {
    return apiClient.get(`/blocks/${blockId}`);
  },

  createBlock(data: Object) {
    return apiClient.post("/blocks", data);
  },

  updateBlock(blockId: string, data: Object) {
    return apiClient.put(`/blocks/${blockId}`, data);
  },

  deleteBlock(blockId: string) {
    return apiClient.delete(`/blocks/${blockId}`);
  },
};
