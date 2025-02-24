import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const professorApi = {
  async getProfessors() {
    return axios.get(`${API_URL}/users/professors`);
  },

  getSubjectByProfessor(data: Object) {
    return axios.get(`${API_URL}/user-subjects`, data);
  },

  addSubjectToProfessor(data: Object) {
    return axios.post(`${API_URL}/user-subjects`, data);
  },

  deleteProfessorSubject(subjectId: string) {
    return axios.delete(`${API_URL}/user-subjects/${subjectId}`);
  },
};
