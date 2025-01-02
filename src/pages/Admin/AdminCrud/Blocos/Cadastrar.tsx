import React, { useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import axios from "axios";
import LoadInput from "../../../../components/Forms/Item/LoadInput";

type formDataInput = {
  identificacao: string;
  planta: File | null;
};

export default function NovoBloco() {
  const [formData, setFormData] = useState<formDataInput>({
    identificacao: "",
    planta: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      planta: file,
    }));
  };

  const handleSave = async () => {
    try {
      if (formData.identificacao && formData.planta) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("identificacao", formData.identificacao);
        formDataToUpload.append("planta", formData.planta);

        const response = await axios.post(
          "https://your-backend-endpoint/upload", // Replace with actual URL
          formDataToUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Room successfully created:", response.data);
        alert("Room successfully created!");

        setFormData({
          identificacao: "",
          planta: null,
        });
      } else {
        alert("All fields must be filled, including the file!");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
      alert("An error occurred while saving. Please try again.");
    }
  };

  const onCancel = () => {
    setFormData({
      identificacao: "",
      planta: null,
    });
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
          <Card title="NOVO BLOCO" size="2xl">
            <div className="flex flex-col space-y-6">
              <Input
                label="Identificação"
                name="identificacao"
                value={formData.identificacao}
                onChange={handleInputChange}
              />
              <LoadInput
                label="Carregar Planta"
                name="planta"
                onChange={handleFileChange}
              />
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
