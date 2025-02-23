import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const subjectsApi = {
  getSubjects() {
    return axios.get(`${API_URL}/subjects`);
  },

  getSubjectById(subjectId: string) {
    return axios.get(`${API_URL}/subjects/${subjectId}`);
  },

  createSubject(data: Object) {
    return axios.post(`${API_URL}/subjects"`, data);
  },

  updateSubject(subjectId: string, data: Object) {
    return axios.put(`${API_URL}/subjects/${subjectId}`, data);
  },

  deleteSubject(subjectId: string) {
    return axios.delete(`${API_URL}/subjects/${subjectId}`);
  },
};
