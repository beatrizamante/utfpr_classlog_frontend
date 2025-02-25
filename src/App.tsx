import "./App.css";
import Modal from "./components/Modal";
import { useAuth } from "./context/AuthContext";
import Router from "./routes/Router";

function App() {
  const { isLogoutModalOpen, closeLogoutModal, logout } = useAuth();

  return (
    <div className="App">
      <Router />
      <Modal 
      isVisible={isLogoutModalOpen} 
      onConfirm={logout} 
      onCancel={closeLogoutModal} 
      message={"Tem certeza que deseja sair?"}
      />
    </div>
  );
}

export default App;
