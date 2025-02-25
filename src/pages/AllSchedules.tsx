import React, { useEffect, useState } from "react";
import Card from "../components/Forms/Card";
import Button from "../components/Button";
import background from "../assets/images/background.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function HomeSchedules() {
  const [schedules, setSchedules] = useState<any[]>([]);

  const handleSchedules = async () => {
    try {
      const response = await api.get(`/`);
      setSchedules(response.data.schedules);
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  useEffect(() => {
    handleSchedules();
  }, []);

  const navigate = useNavigate();

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
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title={"Todas aulas"} color="utfpr_white" size="2xl">
            <div className="mt-8 w-full">
              {schedules.map((schedule) => {
                const backgroundColor = schedule.is_canceled
                  ? "bg-red-500" // Vermelho se for cancelado
                  : schedule.exceptional_day
                  ? "bg-blue-500" // Azul se for excepcional
                  : "bg-white"; // Caso padrão

                return (
                  <div
                    key={schedule.id}
                    className={`flex flex-col p-4 rounded-lg shadow-lg mb-4 ${backgroundColor}`}
                  >
                    <h2 className="text-xl font-semibold">
                      {schedule.subject_subject_name}
                    </h2>
                    <p>
                      <strong>Professor:</strong>{" "}
                      {schedule.subject_professor_name}
                    </p>
                    <p>
                      <strong>Bloco:</strong> {schedule.block_name}
                    </p>
                    <p>
                      <strong>Sala de Aula:</strong> {schedule.classroom_name}
                    </p>
                    <p>
                      <strong>Data:</strong>{" "}
                      {schedule.date ? schedule.date : "Padrão"}
                    </p>
                    <p>
                      <strong>Cancelada:</strong>{" "}
                      {schedule.is_canceled ? "Sim" : "Não"}
                    </p>
                    <p>
                      <strong>Excepcional:</strong>{" "}
                      {schedule.exceptional_day ? "Sim" : "Não"}
                    </p>
                    <p>
                      <strong>Dia da Semana:</strong> {schedule.day_of_week}
                    </p>
                    <p>
                      <strong>Horário:</strong> {schedule.start_time} -{" "}
                      {schedule.end_time}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <Button onClick={() => navigate("/login")} height={"80px"}>
                LOGIN
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
