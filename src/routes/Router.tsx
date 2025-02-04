import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import ProfessorPage from "../pages/Professors/index";
import StudentPage from "../pages/Guest/index";
import AdminRoute from "./AdminRoute";

const authenticathedAs = () => {
  return true;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/professor" element={<ProfessorPage />} />
      <Route path="/estudante" element={<StudentPage />} />
      <Route
        path="/admin/*"
        element={authenticathedAs() ? <AdminRoute /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
