import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import background from "../../assets/images/background.png";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import api from "../../services/api";
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
    classroom_id: number;
    classroom_name: string;
    date: string | null;
    exceptional_day: string | null;
    is_canceled: number;
    subject_professor_id: number;
    subject_professor_name: string;
    subject_subject_id: number;
    subject_subject_name: string;
}

export default function CancelScheduleId() {
    const { id } = useParams<{ id: string }>();
    const scheduleId = Number(id);
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(schedule?.date ?? null);


    const handleShow = async () => {
        try {
            const response = await api.get(`/schedules/${scheduleId}`);
            setSchedule(response.data);
        } catch (err) {
            console.error("An error occurred: ", err);
        }
    };

    const handleCancel = async () => {
        console.log(scheduleId, selectedDate);

        try {
            const response = await api.post(`/schedules/cancel`, {
                id: scheduleId,
                date: selectedDate
            });
            console.log(response);
        } catch (err) {
            console.error("An error occurred: ", err);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    useEffect(() => {
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
            <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>
            <Header />
            <div className="flex justify-center pb-8 relative flex-grow pt-12">
                <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
                    <Card title="DETAILS SCHEDULE" size="2xl">
                        <div className="flex flex-col space-y-6">
                            {schedule ? (
                                <>
                                    <div>
                                        <strong>Professor:</strong> {schedule.subject_professor_name}
                                    </div>
                                    <div>
                                        <strong>Subject:</strong> {schedule.subject_subject_name}
                                    </div>
                                    <div>
                                        <strong>Classroom:</strong> {schedule.classroom_name}
                                    </div>
                                    <div>
                                        <strong>Start Time:</strong> {schedule.start_time}
                                    </div>
                                    <div>
                                        <strong>End Time:</strong> {schedule.end_time}
                                    </div>
                                    <div>
                                        <strong>Day of Week:</strong> {schedule.day_of_week}
                                    </div>
                                    <div>
                                        <strong>Block:</strong> {schedule.block_name}
                                    </div>
                                    <div>
                                        <strong>Date:</strong>
                                        <input
                                            type="date"
                                            value={selectedDate ?? ""}
                                            onChange={handleDateChange}
                                            className="bg-gray-800 text-white p-2 rounded"
                                        />
                                    </div>
                                </>
                            ) : (
                                <p>Loading schedule...</p>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-4 w-full pt-10">
                            <Button onClick={handleCancel} color="utfpr_red">
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
