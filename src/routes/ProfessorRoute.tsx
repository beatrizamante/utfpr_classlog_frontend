import { Routes, Route, Navigate } from "react-router-dom";
import ProfessorPage from "../pages/Professors";
import ListarSemestres from "../pages/Professors/ListarSemestres";
import ListarMaterias from "../pages/Professors/ListarMaterias";
import ListarSalas from "../pages/Professors/ListarSalas";

const ProfessorRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<ProfessorPage />} />

    <Route path="/professor/curso/semestre">
      <Route index element={<ListarSemestres />} />
      <Route path="semestre/:semesterId/materia" element={<ListarMaterias />} />
      <Route
        path="semestre/:semesterId/materia/:subjectId/sala"
        element={<ListarSalas />}
      />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProfessorRoute;
