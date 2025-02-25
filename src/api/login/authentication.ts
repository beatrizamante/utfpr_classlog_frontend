import axios from "axios";
import api from "../../services/api";

export const authApi = {
  async login(university_registry: string, password?: string) {
    console.log(university_registry, password);
    try {
      const response = await api.post(`/login`, {
        university_registry,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        if (data.success) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            console.log("Login bem-sucedido!");
          } else {
            console.error("Erro ao fazer login");
          }
          return { success: true, role: data.role };
        } else {
          return {
            success: false,
            message: "Erro no login: token não recebido",
          };
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

  async registerUser(
    name: string,
    university_registry: string,
    password: string,
    password_confirmation: string
  ) {
    try {
      const response = await api.post(`/register`, {
        name,
        university_registry,
        password,
        password_confirmation,
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return { error: "Erro ao registrar usuário" };
    }
  },

  async logout() {
    try {
      await api.post(`/logout`, {
        credentials: "include",
      });

      localStorage.removeItem("token");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  },

  async getRole() {
    return localStorage.getItem("role");
  },

  async getUserId() {
    return localStorage.getItem("university_registry");
  },
};
