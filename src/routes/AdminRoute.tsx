import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/Admin/index";
import MenuGeral from "../pages/Admin/AdminCrud/MenuGeral";
import ListarSalas from "../pages/Admin/AdminCrud/Salas/ListaItems";
import NovaSala from "../pages/Admin/AdminCrud/Salas/Cadastrar";
import AtualizarSala from "../pages/Admin/AdminCrud/Salas/Atualizar";
import ListarBlocos from "../pages/Admin/AdminCrud/Blocos/ListaItems";
import NovoBloco from "../pages/Admin/AdminCrud/Blocos/Cadastrar";
import AtualizarBloco from "../pages/Admin/AdminCrud/Blocos/Atualizar";
import ListarMaterias from "../pages/Admin/AdminCrud/Materias/ListaItems";
import NovaMateria from "../pages/Admin/AdminCrud/Materias/Cadastrar";
import AtualizarMateria from "../pages/Admin/AdminCrud/Materias/Atualizar";
import ListarHorarios from "../pages/Admin/AdminCrud/Horarios/ListaItems";
import NovoHorario from "../pages/Admin/AdminCrud/Horarios/Cadastrar";
import UpdateSchedule from "../pages/Admin/AdminCrud/Horarios/Atualizar";
import CreateProfessorSubjects from "../pages/Admin/AdminCrud/ProfessorSubjects/CreateProfessorSubjects";
import ListProfessorsSubjects from "../pages/Admin/AdminCrud/ProfessorSubjects/ListProfessorsSubjects";

const AdminRoute: React.FC = () => (
  <Routes>
    <Route path="/" element={<AdminPage />} />
    <Route path="/menu" element={<MenuGeral />} />

    <Route path="/salas">
      <Route index element={<ListarSalas />} />
      <Route path="cadastrar" element={<NovaSala />} />
      <Route path="atualizar/:id" element={<AtualizarSala />} />
    </Route>

    <Route path="/blocos">
      <Route index element={<ListarBlocos />} />
      <Route path="cadastrar" element={<NovoBloco />} />
      <Route path="atualizar/:id" element={<AtualizarBloco />} />
    </Route>

    <Route path="/materias">
      <Route index element={<ListarMaterias />} />
      <Route path="cadastrar" element={<NovaMateria />} />
      <Route path="atualizar/:id" element={<AtualizarMateria />} />
    </Route>

      <Route path="/professor-subjects">
          <Route index element={<ListProfessorsSubjects />} />
          <Route path="cadastrar" element={<CreateProfessorSubjects />} />
      </Route>

    <Route path="/horarios">
      <Route index element={<ListarHorarios />} />
      <Route path="cadastrar" element={<NovoHorario />} />
        <Route path="atualizar/:id" element={<UpdateSchedule />} />
    </Route>

    <Route path="*" element={<Navigate to="/admin/menu" />} />
  </Routes>
);

export default AdminRoute;
