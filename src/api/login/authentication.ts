import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const authApi = {
  async login(university_registry: string, password?: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        university_registry,
        password,
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role || "user");
          return { success: true, role: data.role };
        } else {
          return { success: false, message: "Erro no login: token não recebido" };
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao fazer login:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Erro desconhecido",
        };
      } else {
        console.error("Erro inesperado:", error);
        return { success: false, message: "Erro inesperado" };
      }
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  getRole() {
    return localStorage.getItem("role");
  },

  getUserId() {
    return localStorage.getItem("university_registry"); 
  }
};
