import React, { useEffect, useRef, useState } from "react";
import background from "../../../../assets/images/background.png";
import { useNavigate } from "react-router";
import Header from "../../../../components/Header";
import Card from "../../../../components/Forms/Card";
import List from "../../../../components/List/List";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import Modal from "../../../../components/Modal";
import api from "../../../../services/api";

interface User {
    user_id: number;
    user_name: string;
}

interface Subject {
    subject_id: number;
    subject_name: string;
    subject_semester: string;
}

interface ProfessorSubject {
    id: number;
    user: User;
    subject: Subject;
}
export default function ListProfessorsSubjects() {
  const [professorSubjects, setprofessorSubjects] = useState<ProfessorSubject[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);


    const handleDelete = async () => {
        try {
            if (selectId != null) {
               const response =  await api.delete(`/user-subjects/${selectId}`);
               console.log(response);
                setShowModal(false);
                setSelectId(null);
                setprofessorSubjects((prev) => prev.filter((item) => item.id !== selectId));
            }
        } catch (err) {
            console.error("Erro ao deletar:", err);
        }
    };

   const handleList = async () => {
     try {
       const response = await api.get("user-subjects");
       console.log(response.data.data)
       setprofessorSubjects(response.data.data);
       console.log("Success! List formed!");
     } catch (err) {
       console.error("An error occurred: ", err);
     }
   };

   const getProfessorSubjectsLabel = (item: ProfessorSubject): string => item.user.user_name +" - "+ item.subject.subject_name;
   const getMappedItemId = (
     item: ProfessorSubject & { id: number | null }
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
       <div className="absolute inset-0 opacity-40 z-0"></div>
       <Header />
       <div className="flex justify-center pb-8 relative flex-grow pt-12">
         <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
           <Card title="SALAS DE AULA" size="2xl">
             <div className="mx-4 mb-4">
               <ul ref={listRef}>
                 <List
                   listOf={professorSubjects.map((room) => ({
                     ...room,
                     id: room.id,
                   }))}
                   onSelected={(id: number | null) => {
                     setSelectId(id);
                   }}
                   selectedId={selectId}
                   getItemLabel={getProfessorSubjectsLabel}
                   getItemId={getMappedItemId}
                 />
               </ul>
             </div>
             <div className="flex flex-col items-center gap-4 w-full pt-10">
               <Button
                 onClick={() => {
                   if (selectId) {
                    navigate(`/admin/salas/atualizar/${selectId}`)
                    console.log(`Navegar para atualizar o ID: ${selectId}`);
                   }
                 }}
                 disabled={!selectId}
               >
                 ATUALIZAR
               </Button>
               <Button
                 onClick={() => {
                   if (selectId) {
                     setShowModal(true);
                   }
                 }}
                 color="utfpr_red"
                 disabled={!selectId}
               >
                 EXCLUIR
               </Button>
             </div>
           </Card>
         </div>
       <Footer />
       </div>
       <Modal
         message="Tem certeza que deseja deletar essas informações?"
         isVisible={showModal}
         onCancel={() => setShowModal(false)}
         onConfirm={handleDelete}
       />
     </div>
   );
 }
