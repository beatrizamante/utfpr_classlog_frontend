import React, { useEffect, useState } from "react";
import background from "../../assets/images/background.png";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Footer from "../../components/Footer";
import { authApi } from "../../api/login/authentication";
import Modal from "../../components/Modal";
import {
  Block,
  Classroom,
  Schedule,
} from "../../interfaces/ProfessorInterfaces";
import { blocksApi } from "../../api/admin/apiBlock";
import { classroomsApi } from "../../api/admin/apiClassroom";
import { schedulesApi } from "../../api/admin/apiSchedules";

export default function ProfessorTroca() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const professorId = authApi.getUserId();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await blocksApi.getBlocks();
        setBlocks(response.data);
      } catch (err) {
        console.error("Erro ao buscar blocos:", err);
      }
    }

    fetchBlocks();
  }, []);

  const fetchClassrooms = async (blockId: number) => {
    try {
      const response = await classroomsApi.getClassroomById(String(blockId));
      setClassrooms(response.data);
    } catch (err) {
      console.error("Erro ao buscar salas:", err);
    }
  };

  const fetchSchedules = async (classroomId: number) => {
    try {
      const response = await schedulesApi.getSchedules();
      setSchedules(response.data);
    } catch (err) {
      console.error("Erro ao buscar horários:", err);
    }
  };

  const handleBlockSelection = async (id: number) => {
    setSelectedBlockId(id);
    await fetchClassrooms(id);
    setStep(2);
  };

  const handleClassroomSelection = async (id: number) => {
    setSelectedClassroomId(id);
    await fetchSchedules(id);
    setStep(3);
  };

  const handleScheduleSelection = (id: number) => {
    setSelectedScheduleId(id);
    setShowModal(true);
  };

  const handleConfirmChange = async () => {
    if (!subjectId || !selectedScheduleId || !selectedBlockId || !selectedClassroomId || !professorId) {
      console.error("Dados incompletos para a troca de sala.");
      return;
    }

    const requestData = {
      subject_id: subjectId,
      schedule_id: selectedScheduleId,
      block_id: selectedBlockId,
      classroom_id: selectedClassroomId,
      professor_id: professorId,
    };

    try {
      const response = await schedulesApi.changeSchedule();
      console.log("Troca confirmada:", response.data);
      setShowModal(false);
      navigate("/professor");
    } catch (err) {
      console.error("Erro ao solicitar troca:", err);
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
          <Card
            title={
              step === 1
                ? "Escolha um bloco"
                : step === 2
                ? "Escolha uma sala"
                : step === 3
                ? "Escolha um horário"
                : "Confirmar troca"
            }
            size="2xl"
          >
            <div className="mx-4 mb-4">
              <ul>
                {step === 1 && (
                  <List
                    listOf={blocks}
                    onSelected={(id) => id !== null && handleBlockSelection(id)}
                    selectedId={selectedBlockId}
                    getItemLabel={(block) => `Bloco: ${block.identification}`}
                    getItemId={(block) => block.id}
                  />
                )}

                {step === 2 && (
                  <List
                    listOf={classrooms}
                    onSelected={(id) => id !== null && handleClassroomSelection(id)}
                    selectedId={selectedClassroomId}
                    getItemLabel={(room) => `Sala: ${room.identification} ${room.occupied ? "(Ocupada)" : "(Livre)"}`}
                    getItemId={(room) => room.id}
                  />
                )}

                {step === 3 && (
                  <List
                    listOf={schedules}
                    onSelected={(id) => id !== null && handleScheduleSelection(id)}
                    selectedId={selectedScheduleId}
                    getItemLabel={(schedule) => `Horário: ${schedule.identification} - ${schedule.period}`}
                    getItemId={(schedule) => schedule.id}
                  />
                )}
              </ul>
            </div>
          </Card>
        </div>
      </div>
      <Footer />

      {selectedClassroom && (
        <Modal
          message={selectedClassroom.occupied ? "Essa sala está ocupada, deseja solicitar troca?" : "Confirmar mudança para essa sala?"}
          isVisible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmChange}
        />
      )}
    </div>
  );
}
