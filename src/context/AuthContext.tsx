import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/login/authentication";

type AuthContextType = {
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const logout = async () => {
    await authApi.logout();
    console.log("Usuário deslogado!"); 
    closeLogoutModal();
    navigate("/", { replace: true }); 
  };

  return (
    <AuthContext.Provider value={{ isLogoutModalOpen, openLogoutModal, closeLogoutModal, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
