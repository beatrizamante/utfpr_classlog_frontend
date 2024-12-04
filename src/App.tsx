import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/login/LoginScreen';
import ProfessorPage from './pages/Professors';
import AdminPage from './pages/Admin';
import StudentPage from './pages/Guest/'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/estudante" element={<StudentPage />} />

      </Routes>
    </Router>
  );
}
export default App;
