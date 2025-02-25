import React, { useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import LoadInput from "../../../../components/Forms/Item/LoadInput";
import { useNavigate } from "react-router";
import { blocksApi } from "../../../../api/admin/apiBlock";

type formDataInput = {
  name: string;
  photo: File | null;
};

export default function NovoBloco() {
  const [formData, setFormData] = useState<formDataInput>({
    name: "",
    photo: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.name) {
        alert("A identificação deve ser preenchida!");
        return;
      }
  
      const blockData = { name: formData.name };
      const blockResponse = await blocksApi.createBlock(blockData);

      if (blockResponse.data && blockResponse.data.data.id) {
        const blockId = blockResponse.data.data.id;
  
        if (formData.photo) {
          const formDataToUpload = new FormData();
          formDataToUpload.append("photo", formData.photo);
  
          await blocksApi.uploadBlockImage(blockId, formDataToUpload);
        }
  
        console.log("Bloco criado com sucesso!");
        setFormData({
          name: "",
          photo: null,
        });
      } else {
        alert("Erro ao criar o bloco.");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    }
  };

  const onCancel = () => {
    setFormData({
      name: "",
      photo: null,
    });
    navigate(-1)
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="NOVO BLOCO" size="2xl">
            <div className="flex flex-col space-y-6">
              <Input
                label="Identificação"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <LoadInput
                label="Carregar Planta"
                name="photo"
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
