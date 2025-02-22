import { Routes, Route, Navigate } from "react-router-dom";
import ProfessorPage from "../pages/Professors";
import ListarSemestres from "../pages/Professors/ListarSemestres";
import ListarSalas from "../pages/Professors/ListarMaterias";
import ListarMaterias from "../pages/Professors/ListarMaterias";

const ProfessorRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<ProfessorPage />} />

    <Route path="/professor/curso/">
      <Route index element={<ListarSemestres />} />
      <Route path="semestre/:semesterId" />
      <Route index element={<ListarMaterias />} />
      <Route
        path="semestre/:semesterId/materia/:subjectId/"
        element={<ListarSalas />}
      />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProfessorRoute;
