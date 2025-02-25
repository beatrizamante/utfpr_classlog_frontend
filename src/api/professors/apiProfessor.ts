import api from "../../services/api";

export const professorApi = {
  async getProfessors() {
    return api.get(`/users/professors`);
  },

  getSubjectByProfessor(data: Object) {
    return api.get(`/user-subjects`, data);
  },

  addSubjectToProfessor(data: Object) {
    return api.post(`/user-subjects`, data);
  },

  deleteProfessorSubject(subjectId: string) {
    return api.delete(`/user-subjects/${subjectId}`);
  },
};
