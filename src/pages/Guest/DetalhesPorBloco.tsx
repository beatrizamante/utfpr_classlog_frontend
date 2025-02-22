import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { scheduleApi } from "../../api/scheduleApi";
import { Classroom } from "../../interfaces/GuestInterface";
import Button from "../../components/Button";

export default function SelecionarHorario() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const blockId = params.get("blockId");

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleSeeBlock = (blockId: number) => {
    
  }

  useEffect(() => {
    async function fetchClassrooms() {
      if (!blockId) return;
      try {
        const response = await scheduleApi.getClassroomByBlock(blockId);
        setClassrooms(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }
    fetchClassrooms();
  }, [blockId]);

  const handleItemClick = (id: number) => {
    if (selectedClassroomId === id) {
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === 2) {
        navigate(`/guest/sala?blockId=${blockId}&classroomId=${id}`);
      }
    } else {
      setSelectedClassroomId(id);
      setClickCount(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <Header />
      <div className="flex justify-center pb-8 flex-grow pt-12">
        <Card title="Escolha um Horário (2 cliques)" size="2xl">
          <List
            listOf={classrooms}
            onSelected={(id) => id !== null && handleItemClick(id)}
            selectedId={selectedClassroomId}
            getItemLabel={(classroom) => classroom.identification}
            getItemId={(classroom) => classroom.id}
          />
          <Button onClick={() => handleSeeBlock}>
            PLANTA BAIXA
          </Button>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
