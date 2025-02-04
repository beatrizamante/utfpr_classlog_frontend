import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../pages/login/LoginScreen';
import ProfessorPage from '../pages/Professors/index';
import StudentPage from '../pages/Guest/index';
import MenuGeral from '../pages/Admin/AdminCrud/MenuGeral';
import ListarSalas from '../pages/Admin/AdminCrud/Salas/ListaItems'
import NovaSala from '../pages/Admin/AdminCrud/Salas/Cadastrar'
import AtualizarSala from '../pages/Admin/AdminCrud/Salas/Atualizar'
import ListarBlocos from '../pages/Admin/AdminCrud/Blocos/ListaItems'
import NovoBloco from '../pages/Admin/AdminCrud/Blocos/Cadastrar'
import AtualizarBloco from '../pages/Admin/AdminCrud/Blocos/Atualizar'
import ListarMaterias from '../pages/Admin/AdminCrud/Materias/ListaItems'
import NovaMateria from '../pages/Admin/AdminCrud/Materias/Cadastrar'
import AtualizarMateria from '../pages/Admin/AdminCrud/Materias/Atualizar'


const authenticathedAs = () => {
  return true;
}

const AdminRoute: React.FC = () => (
  <Routes>
    <Route path="menu" element={<MenuGeral />} />
    <Route path="salas">
      <Route index element={<ListarSalas />} />
      <Route path="cadastrar" element={<NovaSala />} />
      <Route path="atualizar/:id" element={<AtualizarSala />} />
    </Route>
    <Route path="blocos">
      <Route index element={<ListarBlocos />} />
      <Route path="cadastrar" element={<NovoBloco />} />
      <Route path="atualizar/:id" element={<AtualizarBloco />} />
    </Route>
    <Route path="materias">
      <Route index element={<ListarMaterias />} />
      <Route path="cadastrar" element={<NovaMateria />} />
      <Route path="atualizar/:id" element={<AtualizarMateria />} />
    </Route>
    <Route path="*" element={<Navigate to="menu" />} />
  </Routes>
)

const Router: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/estudante" element={<StudentPage />} />
        <Route
        path="/admin/*"
        element={authenticathedAs() ? <AdminRoute /> : <Navigate to="/" />}
      />
      </Routes>
    </BrowserRouter>
  );

export default Router;
