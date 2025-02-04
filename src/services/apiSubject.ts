import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const subjectsApi = {
  getSubjects() {
    return apiClient.get("/subjects");
  },

  getSubjectById(subjectId: string) {
    return apiClient.get(`/subjects/${subjectId}`);
  },

  createSubject(data: Object) {
    return apiClient.post("/subjects", data);
  },

  updateSubject(subjectId: string, data: Object) {
    return apiClient.put(`/subjects/${subjectId}`, data);
  },

  deleteSubject(subjectId: string) {
    return apiClient.delete(`/subjects/${subjectId}`);
  },
};
