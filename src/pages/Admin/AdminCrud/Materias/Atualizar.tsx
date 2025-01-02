import React, { useEffect, useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Subjects } from "../../../../interfaces/AdmInterfaces";
// import apiClient from "../../../utils/apiClient"; // Assuming you have a client for API requests

type FormDataInput = {
  periodo: string;
  professor: string;
  time: string;
};

export default function AtualizaSala() {
  const { id } = useParams<{ id: string }>();
  const subjectId = Number(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataInput>({
    periodo: "",
    professor: "",
    time: "",
  });

  // Fetch room data on mount
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        if (subjectId) {
          // const response = await apiClient.getClassroomById(subjectId.toString());
          // if (response.data) {
          //   setFormData({
          //     periodo: response.data.periodo,
          //     professor: response.data.professor,
          //     time: response.data.time,
          //     tipo: response.data.tipo,
          //   });
          // }
        }
      } catch (err) {
        console.error("An error occurred while fetching the room data:", err);
      }
    };

    fetchSubject();
  }, [subjectId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (subjectId && formData) {
        // await apiClient.updateRoom(subjectId.toString(), formData);
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
                { label: "Período", name: "periodo" },
                { label: "Professor", name: "professor" },
                { label: "Horário", name: "time" },
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
              <Button onClick={() => {}} color="utfpr_red">
                EXCLUIR
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
