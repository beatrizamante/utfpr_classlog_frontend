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

export default function ProfessorTroca() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const professorId = authApi.getUserId();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [clickCount, setClickCount] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [selectedClassroomId, setSelectedClassroomId] = useState<number | null>(
    null
  );
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchCurrentClassroom() {
      try {
        const response = await authApi.getCurrentClassroom(
          subjectId,
          professorId
        );
        const { schedule_id, block_id, classroom_id } = response.data;

        setSelectedScheduleId(schedule_id);
        setSelectedBlockId(block_id);
        setSelectedClassroomId(classroom_id);

        fetchSchedules();
        fetchBlocks();
        fetchClassrooms(block_id);
      } catch (err) {
        console.error("Erro ao buscar a aula atual:", err);
      }
    }

    async function fetchSchedules() {
      try {
        const response = await authApi.getSchedules();
        setSchedules(response.data);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
      }
    }

    async function fetchBlocks() {
      try {
        const response = await authApi.getBlocks();
        setBlocks(response.data);
      } catch (err) {
        console.error("Erro ao buscar blocos:", err);
      }
    }

    async function fetchClassrooms(blockId: number) {
      try {
        const response = await authApi.getClassroomsByBlock(blockId);
        setClassrooms(response.data);
      } catch (err) {
        console.error("Erro ao buscar salas:", err);
      }
    }

    fetchCurrentClassroom();
  }, [subjectId, professorId]);

  const handleItemClick = (id: number) => {
    if (selectedItemId === id) {
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === 2) {
        setClickCount(0);
        advanceStep(id);
      }
    } else {
      setSelectedItemId(id);
      setClickCount(1);
    }
  };

  const advanceStep = (id: number) => {
    if (step === 1) {
      setSelectedScheduleId(id);
      fetchBlocks();
      setStep(2);
    } else if (step === 2 && selectedBlockId !== null) {
      setSelectedBlockId(id);
      fetchClassrooms(selectedBlockId);
      setStep(3);
    } else if (step === 3) {
      setSelectedClassroomId(id);
      const selected = classrooms.find((room) => room.id === id);
      setSelectedClassroom(selected || null);
      setStep(4);
      setShowModal(true);
    }
  };

  const handleConfirmChange = async () => {
    if (
      !subjectId ||
      !selectedScheduleId ||
      !selectedBlockId ||
      !selectedClassroomId ||
      !professorId
    ) {
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
      const response = await authApi.requestClassroomChange(requestData);
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
                ? "Escolha um horário"
                : step === 2
                ? "Escolha um bloco"
                : step === 3
                ? "Escolha uma sala"
                : "Confirmar troca"
            }
            size="2xl"
          >
            <div className="mx-4 mb-4">
              <ul>
                {step === 1 && (
                  <List
                    listOf={schedules}
                    onSelected={(id) => id !== null && handleItemClick(id)}
                    selectedId={selectedScheduleId}
                    getItemLabel={(schedule) =>
                      `Horário: ${schedule.identification} - ${schedule.period}`
                    }
                    getItemId={(schedule) => schedule.id}
                  />
                )}

                {step === 2 && (
                  <List
                    listOf={blocks}
                    onSelected={(id) => id !== null && handleItemClick(id)}
                    selectedId={selectedBlockId}
                    getItemLabel={(block) => `Bloco: ${block.identification}`}
                    getItemId={(block) => block.id}
                  />
                )}

                {step === 3 && (
                  <List
                    listOf={classrooms}
                    onSelected={(id) => id !== null && handleItemClick(id)}
                    selectedId={selectedClassroomId}
                    getItemLabel={(room) =>
                      `Sala: ${room.identification} ${
                        room.occupied ? "(Ocupada)" : "(Livre)"
                      }`
                    }
                    getItemId={(room) => room.id}
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
          message={
            selectedClassroom.occupied
              ? "Essa sala está ocupada, deseja solicitar troca?"
              : "Confirmar mudança para essa sala?"
          }
          isVisible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmChange}
        />
      )}
    </div>
  );
}
