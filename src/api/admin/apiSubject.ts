import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;
export const subjectsApi = {
  getSubjects() {
    const token = localStorage.getItem("authToken");
    return axios.get(`${API_URL}/subjects`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // Exemplo de adicionar um header
      }
    });
  },

  getSubjectById(subjectId: string) {
    return axios.get(`${API_URL}/subjects/${subjectId}`);
  },


  createSubject(data: Object) {
    return axios.post(`${API_URL}/subjects`, data);
  },

  updateSubject(subjectId: string, data: Object) {
    return axios.put(`${API_URL}/subjects/${subjectId}`, data);
  },

  deleteSubject(subjectId: string) {
    return axios.delete(`${API_URL}/subjects/${subjectId}`);
  },
};
