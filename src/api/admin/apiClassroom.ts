import axios from "axios";
import api from "../../services/api";

const API_URL = process.env.REACT_APP_API_URL;

export const classroomsApi = {
  getClassrooms() {
    return api.get(`/classrooms`, {
      headers: { "Content-Type": "application/json" },
    });
  },

  getClassroomById(classroomId: string) {
    return api.get(`/classrooms/${classroomId}`, {
      headers: { "Content-Type": "application/json" },
    });
  },

  createClassroom(data: Object) {
    return api.post(`/classrooms`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  updateClassroom(classroomId: string, data: Object) {
    return api.put(`/classrooms/${classroomId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  deleteClassroom(classroomId: string) {
    console.log(`/classrooms/${classroomId}`);
    return api.delete(`/classrooms/${classroomId}`);
  },
};
