import React, { useState } from "react";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Forms/Item/Input";
import { ReactComponent as Logo } from "../../assets/icons/utfpr logo.svg";
import { DropdownMenu } from "../../components/DropDown";
import { useNavigate } from "react-router";
import background from "../../assets/images/background.png";
import { authApi } from "../../api/login/authentication";

type formDataInput = {
  university_registry: string;
  password: string;
  role: string;
};

const items = [
  { title: "Estudante", action: () => {} },
  { title: "Professor", action: () => {} },
  { title: "Administrador", action: () => {} },
];

export default function LoginScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataInput>({
    university_registry: "",
    password: "",
    role: "Estudante",
  });
  const [error, setError] = useState<string | null>(null);

  const inputConfig = [
    {
      label: "RA + Matricula",
      name: "university_registry",
      value: formData.university_registry,
      type: "text",
    },
    {
      label: "Senha",
      name: "password",
      value: formData.password,
      type: "password",
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (formData.role === "Estudante") {
      navigate("/guest/");
    } else if (formData.role === "Professor") {
      localStorage.setItem("professor_register", formData.university_registry);
      navigate("/professor");
    } else {
      try {
        const loginResponse = await authApi.login(
          formData.university_registry,
          formData.password
        );
        if (loginResponse?.success) {
          const role = loginResponse.role;
          // if (role === "professor") {

          // } else
          if (role === "admin") {
            navigate("/admin");
          } else {
            setError("Tipo de usuário desconhecido.");
          }
        } else {
          setError(
            loginResponse?.message ||
              "Falha no login. Verifique suas credenciais."
          );
        }
      } catch (err) {
        console.error("Erro no login:", err);
        setError(
          "Ocorreu um erro ao tentar logar. Tente novamente mais tarde."
        );
      }
    }
  };

  const updatedItems = items.map((item) => ({
    ...item,
    action: () =>
      setFormData((prevData) => ({
        ...prevData,
        role: item.title,
      })),
  }));

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>

      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="h-[714px] w-[373px] bg-utfpr_dark_gray flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Logo />

          {inputConfig.map((input) => (
            <Input
              key={input.name}
              label={input.label}
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={handleInputChange}
            />
          ))}
          <DropdownMenu buttonLabel={formData.role} items={updatedItems} />

          <div className="flex flex-col items-center gap-4 w-full">
            <Button onClick={handleLogin} color="utfpr_yellow">
              ENTRAR
            </Button>
            <Button
              onClick={() => navigate("/recover-password")}
              color="utfpr_red"
            >
              RECUPERAR SENHA
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
