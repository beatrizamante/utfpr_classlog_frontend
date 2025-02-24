import { Routes, Route, Navigate } from "react-router-dom";
import ProfessorPage from "../pages/Professors";
import ListarMaterias from "../pages/Professors/ListarMaterias";
import ListarSalas from "../pages/Professors/ListarSalas";
import CancelSchedule from "../pages/Professors/CancelSchedule";
import CancelScheduleId from "../pages/Professors/CancelScheduleId";
import ChangeRoom from "../pages/Professors/ChangeRoom";
import ChangeRoomId from "../pages/Professors/ChangeRoomId";

const ProfessorRoute: React.FC = () => (
  <Routes>
      <Route path="/" element={<ProfessorPage />} />
      <Route path="/cancelar-aula" element={<CancelSchedule />} />
      <Route path="/change-room" element={<ChangeRoom />} />
      <Route path="/change-room/:id" element={<ChangeRoomId />} />
      <Route path="/cancelar-aula/:id" element={<CancelScheduleId />} />

    <Route path="curso/materia">
      <Route index element={<ListarMaterias />} />
      <Route path=":subjectId/sala" element={<ListarSalas />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProfessorRoute;
