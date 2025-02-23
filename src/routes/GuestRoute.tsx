import { Routes, Route, Navigate } from "react-router-dom";
import GuestPage from "../pages/Guest";
import ListarSemestres from "../pages/Guest/ListarSemestre";
import ListarMaterias from "../pages/Guest/ListarMaterias";
import DetalhesPorSemestre from "../pages/Guest/DetalhesPorSemestre";
import ListarProfessores from "../pages/Guest/ListarBlocos";
import ListarHorarios from "../pages/Guest/ListarHorario";
import DetalhesPorProfessor from "../pages/Guest/DetalhesPorProfessor";
import ListarBlocos from "../pages/Guest/ListarBlocos";
import ListarSalas from "../pages/Professors/ListarMaterias";
import DetalhesPorBloco from "../pages/Guest/DetalhesPorBloco";

const ProfessorRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<GuestPage />} />

    <Route path="/guest/semestre">
      <Route index element={<ListarSemestres />} />
      <Route path="semestre/:semesterId/materia" element={<ListarMaterias />} />
      <Route path="semestre/:semesterId/materia/:subjectId/" element={<DetalhesPorSemestre />} />
    </Route>

    <Route path="/guest/professor">
      <Route index element={<ListarProfessores />} />
      <Route path="professor/:professorId/horario" element={<ListarHorarios />} />
      <Route path="professor/:professorId/horario/:scheduleId/" element={<DetalhesPorProfessor />} />
    </Route>

    <Route path="/guest/bloco">
      <Route index element={<ListarBlocos />} />
      <Route path="bloco/:blockId/sala" element={<ListarSalas />} />
      <Route path="bloco/:blockId/sala/:classroomId/" element={<DetalhesPorBloco />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProfessorRoute;
