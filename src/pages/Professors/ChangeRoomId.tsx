    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import background from "../../assets/images/background.png";
    import Header from "../../components/Header";
    import Card from "../../components/Forms/Card";
    import Button from "../../components/Button";
    import Footer from "../../components/Footer";
    import { Classroom } from "../../interfaces/AdmInterfaces";
    import { classroomsApi } from "../../api/admin/apiClassroom";
    import api from "../../services/api";
import ScheduleCardChange from "../../components/ScheduleChangeCard";
    const API_URL = process.env.REACT_APP_API_URL;

    interface Schedule {
    id: number;
    start_time: string;
    end_time: string;
    day_of_week: number;
    default_day: number;
    block_id: number;
    block_name: string;
    block_photo: string;
    classroom_id: number | null; // Allow classroom_id to be null
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
    const scheduleId = Number(id);

    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [rooms, setRooms] = useState<Classroom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string | number>("");

    const handleShow = async () => {
        try {
        const response = await api.get(`/schedules/${scheduleId}`);
        const data = response.data;
        setSchedule(data);
        setSelectedDate(data.date ?? "");
        setStartTime(data.start_time);
        setEndTime(data.end_time);
        setSelectedRoom(data.classroom_id ?? ""); 
        } catch (err) {
        console.error("An error occurred: ", err);
        }
    };

    const handleClassroomList = async () => {
        try {
        const response = await classroomsApi.getClassrooms();
        setRooms(response.data);
        } catch (err) {
        console.error("An error occurred: ", err);
        }
    };

    const handleChange = async () => {
        try {
        const response = await api.post(`/schedules/change`, {
            date: selectedDate,
            schedule_id: scheduleId,
            classroom_id: selectedRoom,
            start_time: startTime,
            end_time: endTime,
        });
        console.log(response);
        } catch (err) {
        console.error("An error occurred: ", err);
        }
    };

    useEffect(() => {
        handleShow();
        handleClassroomList();
    }, [scheduleId]);

    return (
        <div
        className="min-h-screen flex flex-col bg-cover bg-center text-white"
        style={{
            backgroundImage: `url(${background})`,
            mixBlendMode: "soft-light",
        }}
        >
        <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>
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
                    handleRoomChange={(e) => setSelectedRoom(e.target.value)}
                    handleStartTimeChange={(e) => setStartTime(e.target.value)}
                    handleEndTimeChange={(e) => setEndTime(e.target.value)}
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
        </div>
    );
    }
