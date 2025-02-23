import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const classroomsApi = {
  getClassrooms() {
    return axios.get(`${API_URL}/classrooms`);
  },

  getClassroomById(classroomId: string) {
    return axios.get(`${API_URL}/classrooms/${classroomId}`);
  },

  createClassroom(data: Object) {
    return axios.post(`${API_URL}/classrooms`, data);
  },

  updateClassroom(classroomId: string, data: Object) {
    return axios.put(`${API_URL}/classrooms/${classroomId}`, data);
  },

  deleteClassroom(classroomId: string) {
    return axios.delete(`${API_URL}/classrooms/${classroomId}`);
  },
};
