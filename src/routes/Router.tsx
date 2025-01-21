import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from '../pages/login/LoginScreen';
import AdminPage from '../pages/Admin';
import ProfessorPage from '../pages/Professors/index';
import StudentPage from '../pages/Guest/index';

const Router: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/estudante" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );

export default Router;
