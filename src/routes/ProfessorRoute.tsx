import { Routes, Route, Navigate } from "react-router-dom";
import ProfessorPage from "../pages/Professors";
import ListarMaterias from "../pages/Professors/ListarMaterias";
import ListarSalas from "../pages/Professors/ListarSalas";

const ProfessorRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<ProfessorPage />} />

    <Route path="curso/materia">
      <Route index element={<ListarMaterias />} />
      <Route path=":subjectId/sala" element={<ListarSalas />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProfessorRoute;
