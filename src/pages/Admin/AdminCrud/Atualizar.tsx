import React, { useEffect, useState } from "react";
import Input from "../../../components/Forms/Item/Input";
import Card from "../../../components/Forms/Card";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import background from "../../../assets/images/background.png";
import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Classroom } from "../../../interfaces/Classroom";
// import apiClient from "../../../utils/apiClient"; // Assuming you have a client for API requests

type FormDataInput = {
  bloco: string;
  identificacao: string;
  tamanho: string;
  tipo: string;
};

export default function AtualizaSala() {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataInput>({
    bloco: "",
    identificacao: "",
    tamanho: "",
    tipo: "",
  });

  // Fetch room data on mount
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (roomId) {
          // const response = await apiClient.getClassroomById(roomId.toString()); 
          // if (response.data) {
          //   setFormData({
          //     bloco: response.data.bloco,
          //     identificacao: response.data.identificacao,
          //     tamanho: response.data.tamanho,
          //     tipo: response.data.tipo,
          //   });
          // }
        }
      } catch (err) {
        console.error("An error occurred while fetching the room data:", err);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (roomId && formData) {
        // await apiClient.updateRoom(roomId.toString(), formData);
        console.log("Room successfully updated.");
        navigate("/ListaItems"); 
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
              {[
                { label: "Bloco", name: "bloco" },
                { label: "Identificação", name: "identificacao" },
                { label: "Tamanho da Sala", name: "tamanho" },
                { label: "Tipo de Laboratório", name: "tipo" },
              ].map((input) => (
                <Input
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  value={formData[input.name as keyof FormDataInput]}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleUpdate}>ATUALIZAR</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}