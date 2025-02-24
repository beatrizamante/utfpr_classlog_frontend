import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import AdminRoute from "./AdminRoute";
import ProfessorRoute from "./ProfessorRoute";
import GuestRoute from "./GuestRoute";
import HomeSchedules from "../pages";
import SchedulesByBlock from "../pages/SchedulesByBlock";

const authenticathedAs = () => {
  return true;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomeSchedules />} />
      <Route path="/schedules/block/:id" element={<SchedulesByBlock />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/guest/*"
        element={ <GuestRoute />}
      />
      <Route
        path="/professor/*"
        element={ <ProfessorRoute />}
      />
      <Route
        path="/admin/*"
        element={authenticathedAs() ? <AdminRoute /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
