import React from "react";
import Card from "../../components/Forms/Card";
import Button from "../../components/Button";
import Line from "../../components/Line";
import background from "../../assets/images/background.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function GuestPage() {
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
          <Card title={"Visão do Aluno"} color="utfpr_white" size="2xl">
            <Button
              onClick={() => navigate("/guest/blocos")}
              height={"80px"}
            >
              BLOCOS
            </Button>
            <Line />
            <Button
              onClick={() => navigate("/guest/semestres")}
              height={"80px"}
            >
              SEMESTRE
            </Button>
            <Line />
            <Button
              onClick={() => navigate("/guest/professores")}
              height={"80px"}
            >
              PROFESSORES
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
