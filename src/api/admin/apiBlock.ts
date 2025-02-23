import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const blocksApi = {
  async getBlocks() {
    return axios.get(`${API_URL}/blocks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  },

  getBlockById(blockId: string) {
    return axios.get(`${API_URL}/blocks/${blockId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  },

  createBlock(data: Object) {
    return axios.post(`${API_URL}/blocks`, data, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      }
    });
  },

  updateBlock(blockId: string, data: Object) {
    return axios.put(`${API_URL}/blocks/${blockId}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  },

  deleteBlock(blockId: string) {
    return axios.delete(`${API_URL}/blocks/${blockId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  },
};
