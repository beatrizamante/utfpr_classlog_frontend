import React, { useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { schedulesApi } from "../../../../api/admin/apiSchedules";
import { Schedules } from "../../../../interfaces/AdmInterfaces";

type FormDataInput = {
  start_time: "";
  end_time: "";
  day_of_week: "";
  default_day: "";
  professor: "";
  classroom: "";
};

export default function NovoHorario() {
  const [formData, setFormData] = useState<FormDataInput>({
    start_time: "",
    end_time: "",
    day_of_week: "",
    default_day: "",
    professor: "",
    classroom: "",
  });

  const inputConfig = [
    {
      label: "Início da Aula",
      name: "start_time",
      value: formData.start_time,
    },
    {
      label: "Fim da Aula",
      name: "end_time",
      value: formData.end_time,
    },
    {
      label: "Dia da Semana",
      name: "day_of_week",
      value: formData.day_of_week,
    },
    {
      label: "Dia Padrão",
      name: "default_day",
      value: formData.default_day,
    },
    {
      label: "Professor",
      name: "professor",
      value: formData.professor,
    },
    {
      label: "Sala de Aula",
      name: "classroom",
      value: formData.classroom,
    },
  ];

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (
        formData.start_time &&
        formData.end_time &&
        formData.professor &&
        formData.classroom 
      ) {
        const newSchedule = {
          id: null,
          start_time: formData.start_time,
          end_time: formData.end_time,
          day_of_week: formData.day_of_week,
          default_day: formData.default_day,
          user_subject_id: formData.professor,
          classroom_id: formData.classroom,
        };

        await schedulesApi.createSchedule(newSchedule);
        console.log("Schedule successfully created.");
        setFormData({
          start_time: "",
          end_time: "",
          day_of_week: "",
          default_day: "",
          professor: "",
          classroom: "",
        });
      } else {
        console.error("All fields must be filled.");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const onCancel = () => {
    setFormData({
      start_time: "",
      end_time: "",
      day_of_week: "",
      default_day: "",
      professor: "",
      classroom: "",
    });
    navigate(-1);
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
          <Card title="NOVA SCHEDULE" size="2xl">
            <div className="flex flex-col space-y-6">
              {inputConfig.map((input) => (
                <Input
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  value={input.value}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleSave}>SALVAR</Button>
              <Button onClick={onCancel} color="utfpr_red">
                CANCELAR
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
