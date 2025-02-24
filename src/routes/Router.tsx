import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import AdminRoute from "./AdminRoute";
import ProfessorRoute from "./ProfessorRoute";
import GuestRoute from "./GuestRoute";
import HomeSchedules from "../pages";

const authenticathedAs = () => {
  return true;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomeSchedules />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/guest/*"
        element={ <GuestRoute />}
      />
      <Route
        path="/professor/*"
        element={authenticathedAs() ? <ProfessorRoute /> : <Navigate to="/" />}
      />
      <Route
        path="/admin/*"
        element={authenticathedAs() ? <AdminRoute /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
