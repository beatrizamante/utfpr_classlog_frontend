import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const classroomsApi = {
  getClassrooms() {
    return apiClient.get("/classrooms");
  },

  getClassroomById(classroomId: string) {
    return apiClient.get(`/classrooms/${classroomId}`);
  },

  createClassroom(data: Object) {
    return apiClient.post("/classrooms", data);
  },

  updateClassroom(classroomId: string, data: Object) {
    return apiClient.put(`/classrooms/${classroomId}`, data);
  },

  deleteClassroom(classroomId: string) {
    return apiClient.delete(`/classrooms/${classroomId}`);
  },
};
