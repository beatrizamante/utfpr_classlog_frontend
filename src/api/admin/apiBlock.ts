import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const blocksApi = {
  async getBlocks() {
    return axios.get(`${API_URL}/blocks`);
  },

  async getBlockById(blockId: string) {
    return axios.get(`${API_URL}/blocks/${blockId}`);
  },

  async createBlock(data: Object) {
    return axios.post(`${API_URL}/blocks`, data);
  },

  async updateBlock(blockId: string, data: Object) {
    return axios.put(`${API_URL}/blocks/${blockId}`, data);
  },

  async deleteBlock(blockId: string) {
    return axios.delete(`${API_URL}/blocks/${blockId}`);
  },

  async uploadBlockImage(blockId: string, fileData: FormData) {
    return axios.post(`${API_URL}/blocks/image-update/${blockId}`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
