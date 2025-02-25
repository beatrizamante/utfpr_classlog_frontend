import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import background from "../../assets/images/background.png";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import api from "../../services/api";
import ScheduleCardChange from "../../components/ScheduleChangeCard";
import ModalAlert from "../../components/ModalAlert";

interface Schedule {
  id: number;
  start_time: string;
  end_time: string;
  day_of_week: number;
  default_day: number;
  block_id: number;
  block_name: string;
  block_photo: string;
  classroom_id: number | null;
  classroom_name: string;
  date: string | null;
  exceptional_day: string | null;
  is_canceled: number;
  subject_professor_id: number;
  subject_professor_name: string;
  subject_subject_id: number;
  subject_subject_name: string;
}

export default function ChangeRoomId() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scheduleId = Number(id);
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDescription, setModalDescription] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string | number>("");

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
  };

  const handleChange = async () => {
    try {
      const response = await api.post(`/schedules/change`, {
        schedule_id: scheduleId,
        classroom_id: selectedRoom,
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
      });
      console.log(response);
      setModalDescription("Horário e sala alterados com sucesso!");
      setModalVisible(true);
    } catch (err) {
      console.error("An error occurred: ", err);
      setModalDescription("Ocorreu um erro ao tentar realizar a alteração.");
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const handleShow = async () => {
      try {
        const scheduleResponse = await api.get(`/schedules/${scheduleId}`);
        const scheduleData = scheduleResponse.data;
        setSchedule(scheduleData);
        setSelectedDate(scheduleData.date ?? "");
        setStartTime(scheduleData.start_time);
        setEndTime(scheduleData.end_time);
        setSelectedRoom(scheduleData.classroom_id ?? "");
  
        const roomsResponse = await api.get(`/classrooms`);
        const roomsData = roomsResponse.data;
        setRooms(roomsData);
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };
    handleShow();
  }, [scheduleId]);
  
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="DETALHES DE SCHEDULE" size="2xl">
            <div className="flex flex-col space-y-6">
              {schedule ? (
                <ScheduleCardChange
                  professorName={schedule?.subject_professor_name ?? ""}
                  subjectName={schedule?.subject_subject_name ?? ""}
                  classroomName={schedule?.classroom_name ?? ""}
                  startTime={startTime}
                  endTime={endTime}
                  dayOfWeek={schedule?.day_of_week ?? 0}
                  blockName={schedule?.block_name ?? ""}
                  date={schedule?.date}
                  selectedDate={selectedDate}
                  handleDateChange={(e) => setSelectedDate(e.target.value)}
                  selectedRoom={selectedRoom}
                  handleRoomChange={handleRoomChange}
                  handleStartTimeChange={(e) => setStartTime(e.target.value)}
                  handleEndTimeChange={(e) => setEndTime(e.target.value)}
                  rooms={rooms} 
                />
              ) : (
                <p>Loading schedule...</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleChange} color="utfpr_red">
                TROCAR
              </Button>
              <Button onClick={() => window.history.back()}>VOLTAR</Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
      <ModalAlert
        isVisible={modalVisible}
        onClose={() => {setModalVisible(false); navigate(-1)}}
        description={modalDescription}
      />
    </div>
  );
}
