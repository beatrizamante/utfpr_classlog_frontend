import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Schedule } from "../../interfaces/ProfessorInterfaces";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { scheduleApi } from "../../api/scheduleApi";

export default function SelecionarHorario() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const professorId = params.get("professorId");

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    async function fetchSchedules() {
      if (!professorId) return;
      try {
        const response = await scheduleApi.getSchedulesByProfessor(professorId);
        setSchedules(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }
    fetchSchedules();
  }, [professorId]);

  const handleItemClick = (id: number) => {
    if (selectedScheduleId === id) {
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === 2) {
        navigate(`/guest/aula?professorId=${professorId}&scheduleId=${id}`);
      }
    } else {
      setSelectedScheduleId(id);
      setClickCount(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <Header />
      <div className="flex justify-center pb-8 flex-grow pt-12">
        <Card title="Escolha um Horário (2 cliques)" size="2xl">
          <List
            listOf={schedules}
            onSelected={(id) => id !== null && handleItemClick(id)}
            selectedId={selectedScheduleId}
            getItemLabel={(schedule) => schedule.period}
            getItemId={(schedule) => schedule.id}
          />
        </Card>
      </div>
      <Footer />
    </div>
  );
}
