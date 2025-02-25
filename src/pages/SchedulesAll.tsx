import React, { useEffect, useState } from "react";
import Card from "../components/Forms/Card";
import Button from "../components/Button";
import background from "../assets/images/background.png";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ViewList from "../components/ViewList/ViewList";

export default function SchedulesAll() {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const handleSchedules = async () => {
      try {
        const response = await api.get(
          `/`
        );
            console.log(response.data)
        setSchedules(response.data.schedules);
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };
  
    handleSchedules();
  });

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 opacity-40 z-0"></div>

      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title={"TODAS AS AULAS"} color="utfpr_yellow" size="2xl">
            <div className="mt-8 w-full">
              <ViewList
                listOf={schedules}
                getItemId={(item) => item.id}
                getScheduleData={(item) => ({
                  subjectName: item.subject_subject_name,
                  professorName: item.subject_professor_name,
                  blockName: item.block_name,
                  classroomName: item.classroom_name,
                  date: item.date,
                  isCanceled: item.is_canceled,
                  exceptionalDay: item.exceptional_day,
                  dayOfWeek: item.day_of_week,
                  startTime: item.start_time,
                  endTime: item.end_time,
                })}
              />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <Button onClick={() => navigate("/login")} height={"80px"}>
                LOGIN
              </Button>
              <Button onClick={() => navigate(-1)} color="utfpr_red">VOLTAR</Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
