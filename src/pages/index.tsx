import React, { useEffect, useState } from "react";
import Card from "../components/Forms/Card";
import Button from "../components/Button";
import Line from "../components/Line";
import background from "../assets/images/background.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export default function HomeSchedules() {
    const [blocks, setBlocks] = useState<any[]>([]);

    const handleSchedules = async () => {
        try {
            const response = await axios.get(`${API_URL}/blocks`);
            setBlocks(response.data);
        } catch (err) {
            console.error("An error occurred: ", err);
        }
    };

    useEffect(() => {
        handleSchedules();
    }, []);

    const navigate = useNavigate();

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
                <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
                    <Card title={"Todos os Blocos"} color="utfpr_white" size="2xl">
                        {/* Aqui renderizamos os botões para cada bloco */}
                        <div className="mt-8 w-full">
                            {blocks.map((block) => {
                                return (
                                    <div
                                        key={block.id}
                                        className="mb-4"
                                    >
                                        <button
                                            onClick={() => navigate(`/schedules/block/${block.id}`)}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                fontSize: '1.25rem',
                                                fontWeight: '600',
                                                backgroundColor: '#3b82f6', // cor azul do bg-blue-500
                                                color: '#ffffff', // cor branca do text-white
                                                borderRadius: '0.375rem', // equivalente a rounded-lg
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // equivalente a shadow-lg
                                            }}
                                        >
                                            Bloco {block.name}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Botão de login */}
                        <Button
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </Button>
                        <Button onClick={() => window.history.back()}>Voltar</Button>

                    </Card>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
