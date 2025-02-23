import React, { useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { classroomsApi } from "../../../../api/admin/apiClassroom";

type formDataInput = {
  bloco: string;
  identificacao: string;
};

export default function NovaSala() {
  const [formData, setFormData] = useState<formDataInput>({
    bloco: "",
    identificacao: "",
  });

  const inputConfig = [
    {
      label: "Bloco",
      name: "bloco",
      value: formData.bloco,
    },
    {
      label: "Identificação",
      name: "identificacao",
      value: formData.identificacao,
    },
  ];

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (formData.bloco && formData.identificacao) {
        const newClassroom = {
          name: formData.identificacao,
          block_id: Number(formData.bloco),
        };
        console.log("Create Room", newClassroom)

        await classroomsApi.createClassroom(newClassroom);
        console.log("Room successfully created.");
        setFormData({
          bloco: "",
          identificacao: "",
        });
      } else {
        console.error("All fields must be filled.");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const onCancel = () => {
    setFormData({
      bloco: "",
      identificacao: "",
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
          <Card title="NOVA SALA" size="2xl">
            <div className="flex flex-col space-y-6">
              {inputConfig.map((input) => (
                <Input
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  value={input.value}
                  onChange={handleInputChange}
                />
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
      </div>
      <Footer />
    </div>
  );
}
