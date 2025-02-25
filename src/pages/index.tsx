import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Forms/Card";
import Button from "../components/Button";
import background from "../assets/images/background.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import List from "../components/List/List";

export default function HomeSchedules() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<any[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const [selectId, setSelectId] = useState<number | null>(null);

  useEffect(() => {
    const handleSchedules = async () => {
      try {
        const response = await api.get(`/blocks`);
        setBlocks(response.data);
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    };
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
      <div className="absolute inset-0 opacity-40 z-0"></div>
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title={"TODOS OS BLOCOS"} size="2xl">
            <div className="mt-8 px-2">
              <ul ref={listRef}>
                <List
                    listOf={blocks.map((block) => ({
                      ...block,
                      id: block.id,
                    }))}
                    onSelected={(id: number | null) => {
                      if (id !== null) {
                        setSelectId(id);
                        navigate(`/schedules/block/${id}`);
                      }
                    }}
                    selectedId={selectId}
                    getItemLabel={(block) => block.name}
                    getItemId={(block) => block.id}
                />
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-4">
              <Button onClick={() => navigate("/fullSchedules")}>Todos os Horários</Button>
              <Button onClick={() => navigate("/login")}>LOGIN</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
