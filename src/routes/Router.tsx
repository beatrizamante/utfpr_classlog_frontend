import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import AdminRoute from "./AdminRoute";
import ProfessorRoute from "./ProfessorRoute";
import HomeSchedules from "../pages";
import SchedulesByBlock from "../pages/SchedulesByBlock";
import Logout from "../pages/logout";
import RegisterUser from "../pages/login/RegisterUser";

const authenticathedAs = () => {
  return true;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeSchedules />} />
      <Route path="/schedules/block/:id" element={<SchedulesByBlock />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterUser />} />{" "}
      <Route path="/logout" element={<Logout />} />
      <Route path="/professor/*" element={<ProfessorRoute />} />
      <Route
        path="/admin/*"
        element={authenticathedAs() ? <AdminRoute /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
