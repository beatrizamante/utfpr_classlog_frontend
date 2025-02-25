import { Routes, Route, Navigate } from "react-router-dom";
import GuestPage from "../pages/Guest";
import ListarSemestres from "../pages/Guest/ListarSemestre";
import ListarMaterias from "../pages/Guest/ListarMaterias";
import ListarProfessores from "../pages/Guest/ListarBlocos";
import ListarHorarios from "../pages/Guest/ListarHorario";
import ListarBlocos from "../pages/Guest/ListarBlocos";
import ListarSalas from "../pages/Professors/ListarMaterias";

const GuestRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<GuestPage />} />

    <Route path="/guest/semestre">
      <Route index element={<ListarSemestres />} />
      <Route path="semestre/:semesterId/materia" element={<ListarMaterias />} />
    </Route>

    <Route path="/guest/professor">
      <Route index element={<ListarProfessores />} />
      <Route path="professor/:professorId/horario" element={<ListarHorarios />} />
    </Route>

    <Route path="/guest/bloco">
      <Route index element={<ListarBlocos />} />
      <Route path="bloco/:blockId/sala" element={<ListarSalas />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default GuestRoute;
