import React, { useState, useRef } from "react";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Forms/Item/Input";
import { ReactComponent as Logo } from "../../assets/icons/utfpr logo.svg";
import { DropdownMenu } from "../../components/DropDown";
import { useNavigate } from "react-router";
import background from '../../assets/images/background.png';
import { handLogin, fetchUserRole } from '../../services/authentication'

type formDataInput = {
  login: string;
  password: string;
};

const initialDropdownValue = "Estudante";
const items = [
  { title: "Estudante", action: () => {} },
  { title: "Professor", action: () => {} },
  { title: "Administrador", action: () => {} },
];

export default function LoginScreen() {
  const navigate = useNavigate();;
  const [selectedRole, setSelectedRole] = useState(initialDropdownValue);
  const formData = useRef<formDataInput>({ login: "", password: "" });
  const [error, setError] = useState<string | null>(null)

  const inputConfig = [
    { label: "RA + Matricula", name: "login", value: formData.current.login },
    { label: "Senha", name: "password", value: formData.current.password },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name in formData.current) {
      formData.current[name as keyof formDataInput] = value;
    }
  };

  const handleLogin = async () => {
    try {
      await handLogin(formData.current.login, formData.current.password);

      const role = await fetchUserRole();

      if(role === "professor") {
        navigate('/professor')
      } else if (role === "admin") {
        navigate('admin')
      } else {
        setError("Role not recognized. Please contact support")
      }
    } catch (err) {
      console.error("Login error: ", err)
      setError("Failed to login. Please check your credentials.")
    }
  }

  const updatedItems = items.map((item) => ({
    ...item,
    action: () => setSelectedRole(item.title),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${background})`, mixBlendMode: 'soft-light' }}>
      <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>

      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="h-[714px] w-[373px] bg-utfpr_dark_gray flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Logo />

          {inputConfig.map((input) => (
            <Input
              key={input.name}
              label={input.label}
              name={input.name}
              value={input.value}
              onChange={handleInputChange}
            />
          ))}
          <DropdownMenu buttonLabel={selectedRole} items={updatedItems} />

          <div className="flex flex-col items-center gap-4 w-full">
            <Button onClick={handleLogin} color="utfpr_yellow">
              ENTRAR
            </Button>
            <Button onClick={() => navigate("/recover-password")} color="utfpr_red">
              RECUPERAR SENHA
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
