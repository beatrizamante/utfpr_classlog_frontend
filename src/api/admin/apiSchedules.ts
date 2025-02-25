import api from "../../services/api";

const API_URL = process.env.REACT_APP_API_URL;

export const schedulesApi = {
  async getSchedules() {
    return api.get(`/schedules`);
  },

  async getScheduleById(scheduleId: string) {
    return api.get(`/schedules/${scheduleId}`);
  },

  async createSchedule(data: Object) {
    return api.post(`/schedules`, data);
  },

  async updateSchedule(scheduleId: string| undefined, data: Object) {
    return api.put(`/schedules/${scheduleId}`, data);
  },

  async deleteSchedule(scheduleId: string) {
    return api.delete(`/schedules/${scheduleId}`);
  },

  async cancelSchedule() {
    return api.post(`/schedules/cancel/`);
  },

  async changeSchedule() { 
    return api.post(`/schedules/change/`)
  },

  async cancelDeleteSchedule(scheduleId: string) { 
    return api.post(`/schedules/cancel/${scheduleId}`)
  }
};
