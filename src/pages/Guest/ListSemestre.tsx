import React, { useEffect, useRef, useState } from "react";
import background from "../../../../assets/images/background.png";
import { useNavigate } from "react-router";
import { Semester } from "../../interfaces/GuestInterface";
import Footer from "../../components/Footer";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import Header from "../../components/Header";

export default function ListarProfessores() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(
    null
  );
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const handleList = async () => {
    try {
      const response = await semesterApi.getProfessors();
      setSemesters(response.data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const handleItemClick = (id: number) => {
    if (selectedSemesterId === id) {
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === 2) {
        navigate(`/guest/horarios?professorId=${id}`);
      }
    } else {
      setSelectedSemesterId(id);
      setClickCount(1);
    }
  };

  useEffect(() => {
    console.log(
      "Item clicked with id after state update:",
      selectedSemesterId
    );
  }, [selectedSemesterId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideList =
        listRef.current && listRef.current.contains(target);
      const clickedOnButton = (event.target as HTMLElement).closest("button");

      if (!clickedInsideList && !clickedOnButton) {
        setSelectedSemesterId(null);
        setClickCount(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedSemesterId]);

  useEffect(() => {
    handleList();
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
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="MATÉRIAS" size="2xl">
            <div className="mx-4 mb-4">
              <ul ref={listRef}>
                <List
                  listOf={semesters}
                  onSelected={(id) => id !== null && handleItemClick(id)}
                  selectedId={selectedSemesterId}
                  getItemLabel={(semester) => semester.identificacao}
                  getItemId={(semester) => semester.id}
                />
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10"></div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
