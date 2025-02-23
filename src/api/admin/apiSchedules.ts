import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const schedulesApi = {
  async getSchedules() {
    return axios.get(`${API_URL}/schedules`);
  },

  async getScheduleById(scheduleId: string) {
    return axios.get(`${API_URL}/schedules/${scheduleId}`);
  },

  async createSchedule(data: Object) {
    return axios.post(`${API_URL}/schedules`, data);
  },

  async updateSchedule(scheduleId: string, data: Object) {
    return axios.put(`${API_URL}/schedules/${scheduleId}`, data);
  },

  async deleteSchedule(scheduleId: string) {
    return axios.delete(`${API_URL}/schedules/${scheduleId}`);
  },

  async cancelSchedule() {
    return axios.post(`${API_URL}/schedules/cancel/`);
  },

  async changeSchedule() { 
    return axios.post(`${API_URL}/schedules/change/`)
  },

  async cancelDeleteSchedule(scheduleId: string) { 
    return axios.post(`${API_URL}/schedules/cancel/${scheduleId}`)
  }
};
