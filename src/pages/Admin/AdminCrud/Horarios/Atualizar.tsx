import React, { useEffect, useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { schedulesApi } from "../../../../api/admin/apiSchedules";

type FormDataInput = {
  start_time: "";
  end_time: "";
  day_of_week: "";
  default_day: "";
  professor: "";
  classroom: "";
  date: "";
};

export default function AtualizaHorario() {
  const { id } = useParams<{ id: string }>();
  const scheduleId = Number(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataInput>({
    start_time: "",
    end_time: "",
    day_of_week: "",
    default_day: "",
    professor: "",
    classroom: "",
    date: "",
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (scheduleId) {
          const response = await schedulesApi.getScheduleById(
            scheduleId.toString()
          );
          if (response.data) {
            setFormData({
              start_time: response.data.start_time,
              end_time: response.data.end_time,
              day_of_week: response.data.day_of_week,
              default_day: response.data.default_day,
              professor: response.data.user_subject_id,
              classroom: response.data.classroom_id,
              date: response.data.date,
            });
          }
        }
      } catch (err) {
        console.error("An error occurred while fetching the room data:", err);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (scheduleId && formData) {
        await schedulesApi.updateSchedule(scheduleId.toString(), formData);
        console.log("Room successfully updated.");
        navigate(-1);
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
                { label: "Início da Aula", name: "start_time" },
                { label: "Fim da Aula", name: "end_time" },
                { label: "Dia da Semana", name: "day_of_week" },
                { label: "Dia Padrão", name: "default_day" },
                { label: "Professor", name: "user_subject_id" },
                { label: "Sala de Aula", name: "classroom_id" },
                { label: "Data", name: "date" },
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
              <Button onClick={() => navigate(-1)} color="utfpr_red">
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
