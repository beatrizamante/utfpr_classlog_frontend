import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Forms/Card";
import background from "../../assets/images/background.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/login/authentication";
import { Course } from "../../interfaces/ProfessorInterfaces";
import List from "../../components/List/List";

export default function ProfessorPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  

  const handleList = async () => {
    try {
      //Will only have TSI
      const response = await authApi.getCourseByProfessor();
      setCourses(response.data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const getMappedItemId = (
    item: Course & { id: number }
  ): number => item.id;

  const handleItemClick = (id: number) => {
    if (selectId === id) {
      setClickCount(clickCount + 1);

      if (clickCount + 1 === 2) {
        navigate(`/professor/curso/semestre`);
      }
    } else {
      setSelectId(id);
      setClickCount(1); 
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
        setClickCount(0);
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
          <Card title={"Visão do Professor"} color="utfpr_white" size="2xl">
            <List
              listOf={courses.map((course) => ({
                ...course,
                id: course.id,
              }))}
              onSelected={(id: number | null) => {
                if (id !== null) handleItemClick(id);
              }}
              selectedId={selectId}
              getItemLabel={(course) => `${course.nome}`}
              getItemId={getMappedItemId}
            />
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}
