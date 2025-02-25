import React, { useState } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../../api/login/authentication";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import Input from "../../components/Forms/Item/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import background from "../../assets/images/background.png";
import ModalAlert from "../../components/ModalAlert";

type formDataInput = {
  name: string;
  university_register: string;
  password: string;
  password_confirmation: string;
};

export default function NovoProfessor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataInput>({
    name: "",
    university_register: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Partial<formDataInput>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateForm = () => {
    let newErrors: Partial<formDataInput> = {};
    if (!formData.name) newErrors.name = "O nome é obrigatório.";
    if (!formData.university_register)
      newErrors.university_register = "O registro universitário é obrigatório.";
    if (!formData.password) newErrors.password = "A senha é obrigatória.";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "As senhas não coincidem.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const response = await authApi.registerUser(
        formData.name,
        formData.university_register,
        formData.password,
        formData.password_confirmation
      );
      if (response.success) {
        setModalMessage("Professor cadastrado com sucesso!");
        setShowModal(true);
        setFormData({
          name: "",
          university_register: "",
          password: "",
          password_confirmation: "",
        });
        navigate(-1)
      } else {
        setModalMessage("Erro ao criar o professor. Tente novamente.");
        setShowModal(true);
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    }
  };

  const onCancel = () => {
    setFormData({
      name: "",
      university_register: "",
      password: "",
      password_confirmation: "",
    });
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="NOVO PROFESSOR" size="2xl">
            <div className="flex flex-col space-y-6">
              {Object.entries({
                name: "Nome do Professor",
                university_register: "Registro Universitário",
                password: "Senha",
                password_confirmation: "Confirme a senha",
              }).map(([key, label]) => (
                <div key={key}>
                  <Input
                    label={label}
                    name={key}
                    type={key.includes("password") ? "password" : "text"}
                    value={formData[key as keyof formDataInput]}
                    onChange={handleInputChange}
                  />
                  {errors[key as keyof formDataInput] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[key as keyof formDataInput]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleSave}>SALVAR</Button>
              <Button onClick={onCancel} color="utfpr_red">
                CANCELAR
              </Button>
            </div>
          </Card>
        </div>
      <Footer />
      </div>
       <ModalAlert
              description={modalMessage}
              isVisible={showModal}
              onClose={() => setShowModal(false)}
            />
    </div>
  );
}
