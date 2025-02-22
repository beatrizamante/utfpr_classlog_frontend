import React, { useEffect, useRef, useState } from "react";
import background from "../../../../assets/images/background.png";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/Header";
import Card from "../../components/Forms/Card";
import List from "../../components/List/List";
import { Subjects } from "../../interfaces/ProfessrInterfaces";
import Footer from "../../components/Footer";
import ModalProfessor from "../../components/Forms/ModalProfessors";

export default function ProfessorTroca() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [schedule, setSchedule] = useState("");
  const [block, setBlock] = useState("");
  const [classroom, setClassroom] = useState("");
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const handleList = async () => {
    try {
      const response = await subjectsApi.getSubjectsByProfessor();
      setSubjects(response.data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const getSubjectsLabel = (item: Subjects): string =>
    `${item.identificaction}`;
  const getMappedItemId = (
    item: Subjects & { id: number }
  ): number => item.id;

  const onCancelClass = (item_id : number) => {

  }

  useEffect(() => {
    console.log("Item clicked with id after state update:", selectId);
  }, [selectId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideList =
        listRef.current && listRef.current.contains(target);
      const clickedOnButton = (event.target as HTMLElement).closest("button");

      if (!showModal && !clickedInsideList && !clickedOnButton) {
        setSelectId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, selectId]);

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
              </ul>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
      <ModalProfessor
        isVisible={showModal} 
        onChangeClassrom={() => navigate(`professor/horario/${selectId}`)} 
        onCancelClass={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
}
