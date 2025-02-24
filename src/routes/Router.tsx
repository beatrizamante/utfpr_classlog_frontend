import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../pages/login/LoginScreen";
import AdminRoute from "./AdminRoute";
import ProfessorRoute from "./ProfessorRoute";
import GuestRoute from "./GuestRoute";

const authenticathedAs = () => {
  return true;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
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
