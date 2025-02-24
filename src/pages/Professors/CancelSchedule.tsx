  import React, { useEffect, useRef, useState } from "react";
  import background from "../../assets/images/background.png";
  import { useNavigate } from "react-router";
  import { Schedules } from "../../interfaces/AdmInterfaces";
  import Header from "../../components/Header";
  import Card from "../../components/Forms/Card";
  import List from "../../components/List/List";
  import Button from "../../components/Button";
  import Footer from "../../components/Footer";
  import Modal from "../../components/Modal";
  import axios from "axios";
  import {subjectsApi} from "../../api/admin/apiSubject";
  const API_URL = process.env.REACT_APP_API_URL;
  export default function CancelSchedule() {
    const [schedules, setSchedules] = useState<Schedules[]>([]);
    const [selectId, setSelectId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const listRef = useRef<HTMLUListElement>(null);
    const handleList = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response  = await  axios.get(`${API_URL}/schedules/professor/${token}`)
        setSchedules(Array.isArray(response.data) ? response.data : []);
        console.log(schedules)
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };

    useEffect(() => {
    }, [schedules]);


    const getScheduleLabel = (item: Schedules): string =>
        `${item.id} - ${item.subject_subject_name} - horaŕio: ${item.start_time} - ${item.end_time} - ${item.block_name} - ${item.classroom_name}`;
    const getMappedItemId = (
        item: Schedules & { id: number | null }
    ): number | null => item.id;


    useEffect(() => {
      console.log("Item clicked with id after state update:", selectId);
    }, [selectId]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const clickedInsideList =
          listRef.current && listRef.current.contains(target);
        const clickedOnButton = (event.target as HTMLElement).closest("button");

        if (!showModal && !clickedInsideList && !clickedOnButton) {
          setSelectId(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showModal, selectId]);

    useEffect(() => {
      handleList();
    }, []);

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
            <Card title="HORÁRIOS" size="2xl">
              <div className="mx-4 mb-4">
                <ul ref={listRef}>
                  <List
                      listOf={schedules.map((schedule) => ({
                        ...schedule,
                        id: schedule.id,
                        className: schedule.is_canceled
                            ? "bg-red-500 text-white" // Vermelho se cancelado
                            : schedule.exceptional_day
                                ? "bg-blue-500 text-white" // Azul se dia excepcional
                                : "bg-white", // Branco por padrão
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
                    onClick={() =>
                        navigate(`/professor/cancelar-aula/${selectId}`)
                    }
                    height={"80px"}
                >
                  Cancelar
                </Button>
                <Button onClick={() => window.history.back()}>Voltar</Button>

              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
