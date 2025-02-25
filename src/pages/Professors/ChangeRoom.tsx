import React, { useEffect, useRef, useState } from "react";
import background from "../../assets/images/background.png";
import { useNavigate } from "react-router";
import { Schedules } from "../../interfaces/AdmInterfaces";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import api from "../../services/api";

export default function ChangeRoom() {
  const [schedules, setSchedules] = useState<Schedules[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const getScheduleLabel = (item: Schedules): string =>
    `${item.id} - ${item.subject_subject_name} - horaŕio: ${item.start_time} - ${item.end_time} - ${item.block_name} - ${item.classroom_name}`;
  const getMappedItemId = (
    item: Schedules & { id: number | null }
  ): number | null => item.id;

  useEffect(() => {
    console.log("Item clicked with id after state update:", selectId);
  }, [selectId]);

  useEffect(() => {
    const handleList = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token);
        const response = await api.get(`/schedules/professor/${token}`);
        setSchedules(Array.isArray(response.data) ? response.data : []);
        console.log(schedules);
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };
    handleList();
  }, [schedules]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="HORÁRIOS" size="2xl">
            <div className="mx-4 mb-4">
              <ul ref={listRef}>
                <List
                  listOf={schedules.map((schedule) => ({
                    ...schedule,
                    id: schedule.id,
                  }))}
                  onSelected={(id: number | null) => setSelectId(id)}
                  selectedId={selectId}
                  getItemLabel={getScheduleLabel}
                  getItemId={getMappedItemId}
                />
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button
                onClick={() => navigate(`/professor/change-room/${selectId}`)}
                height={"80px"}
              >
                TROCAR SALA
              </Button>
              <Button onClick={() => navigate(-1)} color="utfpr_red">
                VOLTAR
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
