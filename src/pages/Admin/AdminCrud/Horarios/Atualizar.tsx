import React, {useEffect, useState} from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { schedulesApi } from "../../../../api/admin/apiSchedules";
import {Classroom, Schedules} from "../../../../interfaces/AdmInterfaces";
import {classroomsApi} from "../../../../api/admin/apiClassroom";
import axios from "axios";
import api from "../../../../services/api";
const API_URL = process.env.REACT_APP_API_URL;

type FormDataInput = {
    start_time: string;
    end_time: string;
    day_of_week: string;
    default_day: boolean;
    user_subject_id: number;
    classroom: string;
    date: string;
};

type User = {
    user_id: number;
    user_name: string;
};

type Subject = {
    subject_id: number;
    subject_name: string;
    subject_semester: string;
};

type UserSubject = {
    id: number;
    user: User;
    subject: Subject;
};

export default function UpdateSchedule() {
    const [rooms, setRooms] = useState<Classroom[]>([]);
    const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);

    const [formData, setFormData] = useState<FormDataInput>({
        start_time: "",
        end_time: "",
        day_of_week: "",
        default_day: false,
        user_subject_id: 0,
        classroom: "",
        date: "",
    });


    const handleClassroomList = async () => {
        try {
            const response = await classroomsApi.getClassrooms();
            setRooms(response.data);
            console.log(userSubjects)
        } catch (err) {
            console.error("An error occurred: ", err);
        }
    };

    const handleProfessorsList = async () => {
        try {
            const response = await api.get(`/user-subjects`);
            setUserSubjects(response.data.data);
        } catch (err) {
            console.error("An error occurred: ", err);
        }
    };

    useEffect(() => {
        handleClassroomList()
        handleProfessorsList()
    }, []);



    const daysOfWeek = [
        { label: "Segunda", value: "1" },
        { label: "Terça", value: "2" },
        { label: "Quarta", value: "3" },
        { label: "Quinta", value: "4" },
        { label: "Sexta", value: "5" },
    ];

    const inputConfig = [
        {
            label: "Início da Aula",
            name: "start_time",
            value: formData.start_time,
            type: "time",
        },
        {
            label: "Fim da Aula",
            name: "end_time",
            value: formData.end_time,
            type: "time",
        },
        {
            label: "Dia da Semana",
            name: "day_of_week",
            value: formData.day_of_week,
            type: "select",
            options: daysOfWeek,
        },
        {
            label: "Dia Padrão",
            name: "default_day",
            value: formData.default_day,
            type: "checkbox",
        },
        {
            label: "Matérias",
            name: "user_subject_id",
            value: formData.user_subject_id,
            type: "select",
            options: userSubjects.map((userSubject) => ({
                label: `${userSubject.user.user_name} - ${userSubject.subject.subject_name}`,
                value: userSubject.id, // O valor será o 'id' do userSubject
            })),    },
        {
            label: "Sala de Aula",
            name: "classroom",
            value: formData.classroom,
            type: "select",
            options: rooms,
        },
        {
            label: "Data",
            name: "date",
            value: formData.date,
            type: "date",
        },
    ];

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        // Atualiza o valor no estado sem conversões desnecessárias
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // O valor será atribuído diretamente, sem conversões
        }));
    };

    const handleSave = async () => {
        try {
            console.log(formData);
            if (
                formData.start_time &&
                formData.end_time &&
                formData.user_subject_id &&
                formData.classroom
            ) {
                const newSchedule: Schedules = {
                    id: null,
                    name: null,
                    semester:  null,
                    start_time: formData.start_time,
                    end_time: formData.end_time,
                    day_of_week: formData.day_of_week,
                    default_day: formData.default_day,
                    user_subject_id: formData.user_subject_id,
                    classroom_id: Number(formData.classroom), // Convertendo para número
                    date: formData.date,
                };

                const response = await schedulesApi.createSchedule(newSchedule);
                console.log(response)
                console.log("Schedule successfully created.");
                setFormData({
                    start_time: "",
                    end_time: "",
                    day_of_week: "",
                    default_day: false,
                    user_subject_id: 0,
                    classroom: "",
                    date: "",
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
            default_day: false,
            user_subject_id: 0,
            classroom: "",
            date: "",
        });
        navigate(-1);
    };

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
                    <Card title="NOVA SCHEDULE" size="2xl">
                        <div className="flex flex-col space-y-6">
                            {inputConfig.map((input) => {
                                const inputStyle = {
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#333",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                };

                                if (input.type === "select") {
                                    return (
                                        <div key={input.name}>
                                            <label>{input.label}</label>
                                            <select
                                                name={input.name}
                                                value={input.value as string | number}
                                                onChange={handleInputChange}
                                                style={inputStyle}  // Inline style aplicado aqui
                                            >
                                                <option value="" style={{ backgroundColor: "#000", color: "white" }}>
                                                    Selecione
                                                </option>
                                                {input.options?.map((option) => {
                                                    if ("id" in option && "name" in option) {
                                                        // Ensure option.id is not null
                                                        const value = option.id !== null ? option.id : 'default'; // Fallback value for null
                                                        return (
                                                            <option key={value} value={value}>
                                                                {option.name}
                                                            </option>
                                                        );
                                                    }
                                                    // Handle the second case where 'value' and 'label' are present
                                                    const value = option.value !== null ? option.value : 'default'; // Fallback for null
                                                    return (
                                                        <option key={value} value={value}>
                                                            {option.label}
                                                        </option>
                                                    );
                                                })}

                                            </select>
                                        </div>
                                    );
                                }

                                if (input.type === "checkbox") {
                                    return (
                                        <div key={input.name}>
                                            <label>{input.label}</label>
                                            <input
                                                type="checkbox"
                                                name={input.name}
                                                checked={formData.default_day}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, default_day: e.target.checked })
                                                }
                                                style={{ marginTop: "10px" }}  // Deixa o checkbox um pouco mais espaçado
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <Input
                                        key={input.name}
                                        label={input.label}
                                        name={input.name}
                                        value={String(input.value)}  // Garantindo que seja uma string
                                        type={input.type}
                                        onChange={handleInputChange}
                                    />
                                );
                            })}
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