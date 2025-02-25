import { Routes, Route } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import AdminRoute from "./AdminRoute";
import ProfessorRoute from "./ProfessorRoute";
import HomeSchedules from "../pages";
import SchedulesByBlock from "../pages/SchedulesByBlock";
import RegisterUser from "../pages/login/RegisterUser";
import SchedulesAll from "../pages/SchedulesAll";

const Router: React.FC = () => (
  <Routes>
      <Route path="/" element={<HomeSchedules />} />
      <Route path="/fullSchedules" element={<SchedulesAll />} />
    <Route path="/schedules/block/:id" element={<SchedulesByBlock />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterUser />} />{" "}
    <Route path="/professor/*" element={<ProfessorRoute />} />
    <Route path="/admin/*" element={<AdminRoute />} />
  </Routes>
);

export default Router;
