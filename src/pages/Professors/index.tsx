import React from "react";
import background from "../../assets/images/background.png";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import Button from "../../components/Button";
import Line from "../../components/Line";
import Footer from "../../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MenuGeral() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        mixBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title="MENU" size="2xl">
            <Button
              onClick={() =>
                navigate(
                  `/professor/cancelar-aula${action ? `/${action}` : ""}`
                )
              }
              height={"80px"}
            >
              CANCELAR AULA
            </Button>
            <Line />
            <Button
              onClick={() =>
                navigate(`/professor/change-room${action ? `/${action}` : ""}`)
              }
              height={"80px"}
            >
              TROCAR SALA
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
