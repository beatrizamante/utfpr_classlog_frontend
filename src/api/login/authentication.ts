import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const authApi = {
  async login(university_registry: string, password?: string) {
    console.log(university_registry, password)
    try {
      const response = await axios.post(`${API_URL}/login`, {
        university_registry,
        password,
      });

      if (response.status === 200) {
    console.log("register?")

        const data = response.data;
        console.log("Role/", data.role)

        if (data.success) {
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

  async logout() {
  },

  async isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  async getRole() {
    return localStorage.getItem("role");
  },

  async getUserId() {
    return localStorage.getItem("university_registry"); 
  }
};
