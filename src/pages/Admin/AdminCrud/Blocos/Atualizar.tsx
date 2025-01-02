import React, { useEffect, useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import LoadInput from "../../../../components/Forms/Item/LoadInput"; // Import the reusable InputLoad component
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Block } from "../../../../interfaces/AdmInterfaces";
// import apiClient from "../../../utils/apiClient"; // Assuming you have a client for API requests

type FormDataInput = {
  identificacao: string;
  planta: File | null;
};

export default function AtualizaBloco() {
  const { id } = useParams<{ id: string }>();
  const blockId = Number(id);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataInput>({
    identificacao: "",
    planta: null,
  });

  // Fetch room data on mount
  useEffect(() => {
    const fetchBlock = async () => {
      try {
        if (blockId) {
          // const response = await apiClient.getClassroomById(roomId.toString());
          // if (response.data) {
          //   setFormData({
          //     bloco: response.data.bloco,
          //     identificacao: response.data.identificacao,
          //     tamanho: response.data.tamanho,
          //     tipo: response.data.tipo,
          //     planta: null, // File is not preloaded from backend
          //   });
          // }
        }
      } catch (err) {
        console.error("An error occurred while fetching the block data:", err);
      }
    };

    fetchBlock();
  }, [blockId]);

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

  const handleUpdate = async () => {
    try {
      if (blockId && formData) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("identificacao", formData.identificacao);
        if (formData.planta) {
          formDataToUpload.append("planta", formData.planta);
        }

        // await apiClient.updateRoom(roomId.toString(), formDataToUpload);
        console.log("Room successfully updated.");
        // navigate("/ListaItems"); // Redirect after successful update
      } else {
        console.error("Room ID or form data is missing.");
      }
    } catch (err) {
      console.error("An error occurred while updating the room:", err);
    }
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
          <Card title="ATUALIZAR" size="2xl">
            <div className="flex flex-col space-y-6">
              {[{ label: "Identificação", name: "identificacao" }].map(
                (input) => (
                  <Input
                    key={input.name}
                    label={input.label}
                    name={input.name}
                    value={
                      formData[input.name as keyof FormDataInput] as string
                    }
                    onChange={handleInputChange}
                  />
                )
              )}
              <LoadInput
                label="Carregar Planta"
                name="planta"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleUpdate}>ATUALIZAR</Button>
              <Button onClick={() => {}} color="utfpr_red">EXCLUIR</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
