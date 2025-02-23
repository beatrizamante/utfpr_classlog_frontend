import React, { useEffect, useState } from "react";
import Card from "../../components/Forms/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { scheduleApi } from "../../api/scheduleApi";
import { useParams } from "react-router";
import ViewList from "../../components/ViewList/ViewList";
import { Item } from "../../interfaces/GuestInterface";

export default function DetalhesPorSemestre() {
  const { semesterId, subjectId } = useParams();
  const [items, setItems ] = useState<Item[]>([]);
  const [identification, setIdentification] = useState<string>("");

  useEffect(() => {
    async function fetchItem() {
      if (!semesterId || !subjectId) return;
      try {
        const response = await scheduleApi.getSubjectByProfessor(semesterId, subjectId);
        setIdentification(response.data.subject);
        setItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }
    fetchItem();
  }, [semesterId, subjectId]);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <Header />
      <div className="flex justify-center pb-8 flex-grow pt-12">
        <Card title={identification} size="2xl">
          <ViewList
            listOf={items}
            getItemName={(item) => `${item.block} ${item.classroom} ${item.professor} ${item.schedule}`} 
            getItemId={(item) => item.id}          />
        </Card>
      </div>
      <Footer />
    </div>
  );
}
