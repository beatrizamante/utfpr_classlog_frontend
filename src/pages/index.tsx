import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Forms/Card";
import Button from "../components/Button";
import background from "../assets/images/background.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import List from "../components/List/List";

export default function HomeSchedules() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<any[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const [selectId, setSelectId] = useState<number | null>(null);

  const handleSchedules = async () => {
    try {
      const response = await api.get(`/blocks`);
      setBlocks(response.data);
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  useEffect(() => {
    console.log("Item clicked with id after state update:", selectId);
  }, [selectId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideList =
        listRef.current && listRef.current.contains(target);
      const clickedOnButton = (event.target as HTMLElement).closest("button");

      if (!clickedInsideList && !clickedOnButton) {
        setSelectId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectId]);

  useEffect(() => {
    handleSchedules();
  }, []);

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
            <div className="mt-8 w-full">
              {blocks.map((block) => {
                return (
                  <Button
                    onClick={() => navigate(`/schedules/block/${block.id}`)}
                  >
                    Bloco {block.name}
                  </Button>
                );
              })}
            </div>

            <ul ref={listRef}>
              <List
                listOf={blocks.map((block) => ({
                  ...block,
                  id: block.id,
                }))}
                onSelected={(id: number | null) => {
                  if (id !== null) navigate(`/schedules/block/${selectId}`);
                }}
                selectedId={selectId}
                getItemLabel={(block) => block.name}
                getItemId={(block) => block.id}
              />
            </ul>

            <Button onClick={() => navigate("/login")}>LOGIN</Button>
            <Button onClick={() => window.history.back()}>Voltar</Button>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
