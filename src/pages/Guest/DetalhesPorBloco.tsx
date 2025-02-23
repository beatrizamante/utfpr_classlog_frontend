import React, { useEffect, useState } from "react";
import Card from "../../components/Forms/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import ViewList from "../../components/ViewList/ViewList";
import { Item } from "../../interfaces/GuestInterface";
import { schedulesApi } from "../../api/admin/apiSchedules";

export default function DetalhesPorBloco() {
  const { blockId, classroomId } = useParams();
  const [items, setItems ] = useState<Item[]>([]);
  const [identification, setIdentification] = useState<string>("");

  useEffect(() => {
    async function fetchItem() {
      if (!blockId && !classroomId) return;
      try {
        const response = await schedulesApi.getScheduleById(String(blockId));
        setIdentification(response.data.classroom);
        setItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }
    fetchItem();
  }, [blockId, classroomId]);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <Header />
      <div className="flex justify-center pb-8 flex-grow pt-12">
        <Card title={identification} size="2xl">
          <ViewList
            listOf={items}
            getItemName={(item) => `${item.block} ${item.subject} ${item.professor} ${item.schedule}`} 
            getItemId={(item) => item.id}          />
        </Card>
      </div>
      <Footer />
    </div>
  );
}
