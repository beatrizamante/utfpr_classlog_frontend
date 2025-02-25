import api from "../../services/api";

export const blocksApi = {
  async getBlocks() {

    return api.get(`/blocks`);
  },

  async getBlockById(blockId: string) {
    return api.get(`/blocks/${blockId}`);
  },

  async createBlock(data: Object) {
    return await api.post(`/blocks`, data);
  },

  async updateBlock(blockId: string, data: Object) {
    return api.put(`/blocks/${blockId}`, data);
  },

  async deleteBlock(blockId: string) {
    return api.delete(`/blocks/${blockId}`);
  },

  async uploadBlockImage(blockId: string, fileData: FormData) {
    return api.post(`/blocks/image-update/${blockId}`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
