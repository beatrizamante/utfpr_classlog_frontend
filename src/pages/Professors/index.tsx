import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Forms/Card";
import background from "../../assets/images/background.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authentication";
import { subjectsApi } from "../../api/apiSubject";
import List from "../../components/List/List";
import { Subjects } from "../../interfaces/AdmInterfaces";

export default function ProfessorPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  

  const handleList = async () => {
    try {
      const response = await authApi.getCourseByProfessor();
      setSubjects(response.data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const getSubjectsLabel = (item: Subjects): string =>
    `${item.period} - ${item.professor}`;
  const getMappedItemId = (
    item: Subjects & { id: number | null }
  ): number | null => item.id;

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
        <div className="flex flex-col items-center justify-between pt-4 pb-4 relative z-10">
          <Card title={"Visão de Professor"} color="utfpr_white" size="2xl">
            <List
              listOf={subjects.map((subject) => ({
                ...subject,
                id: subject.id,
              }))}
              onSelected={(id: number | null) => {
                setSelectId(id);
              }}
              selectedId={selectId}
              getItemLabel={getSubjectsLabel}
              getItemId={getMappedItemId}
            />
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
