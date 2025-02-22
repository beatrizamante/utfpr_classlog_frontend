import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Schedule } from "../../interfaces/ProfessorInterfaces";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { scheduleApi } from "../../api/scheduleApi";

export default function SelecionarMateria() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const semesterId = params.get("semesterId");
  const [subjects, setSubjects] = useState<Schedule[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    async function fetchSchedules() {
      if (!semesterId) return;
      try {
        const response = await scheduleApi.getSubjectsBySemester(semesterId);
        setSubjects(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }
    fetchSchedules();
  }, [semesterId]);

  const handleItemClick = (id: number) => {
    if (selectedSubjectId === id) {
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === 2) {
        navigate(`/guest/materia?semesterId=${semesterId}&subjectId=${id}`);
      }
    } else {
      setSelectedSubjectId(id);
      setClickCount(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <Header />
      <div className="flex justify-center pb-8 flex-grow pt-12">
        <Card title="Escolha um Horário (2 cliques)" size="2xl">
          <List
            listOf={subjects}
            onSelected={(id) => id !== null && handleItemClick(id)}
            selectedId={selectedSubjectId}
            getItemLabel={(subject) => subject.identification}
            getItemId={(subject) => subject.id}
          />
        </Card>
      </div>
      <Footer />
    </div>
  );
}
