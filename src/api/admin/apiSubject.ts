import api from "../../services/api";

export const subjectsApi = {
  getSubjects() {

    return api.get(`/subjects`);
  },

  getSubjectById(subjectId: string) {
    return api.get(`/subjects/${subjectId}`);
  },


  createSubject(data: Object) {
    return api.post(`/subjects`, data);
  },

  updateSubject(subjectId: string, data: Object) {
    return api.put(`/subjects/${subjectId}`, data);
  },

  deleteSubject(subjectId: string) {
    return api.delete(`/subjects/${subjectId}`);
  },
};
