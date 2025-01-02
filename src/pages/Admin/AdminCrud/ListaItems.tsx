import React, { useEffect, useRef, useState } from "react";
import Card from "../../../components/Forms/Card";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import background from "../../../assets/images/background.png";
import Header from "../../../components/Header";
import { Classroom } from "../../../interfaces/AdmInterfaces";
import List from "../../../components/List/List";
import { useNavigate } from "react-router";
import DeleteModal from "../../../components/deleteModal";
import mockRooms from '../../../mocks/mockRooms'

export default function Listas() {
  const [rooms, setRooms] = useState<Classroom[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const handleDelete = async () => {
    try {
      if (selectId != null) {
        // await apiClient.deleteRoom(selectId.toString());
        console.log("Deletion successful");
        setShowModal(false);
        setSelectId(null);
        handleList();

        // Simulate removal from the mock data
        setRooms((prevRooms) => prevRooms.filter((room) => room.room_id !== selectId));
      } else {
        console.error("Classroom ID is missing!");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const handleList = async () => {
    try {
      // const response = await apiClient.getClassrooms();
      // setRooms(response.data);
      setRooms(mockRooms)
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };
  
  const getClassroomLabel = (item: Classroom): string => item.identificacao;
  const getClassroomId = (item: Classroom): number => item.room_id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        if (!showModal) {
          setSelectId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

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
          <Card title="SALAS DE AULA" size="2xl">
            <div className="mx-4 mb-4">
              <ul ref={listRef}>
                <List
                  listOf={rooms.map((room) => ({
                    ...room,
                    id: room.room_id,
                  }))}
                  onSelected={(id: number | null) => setSelectId(id)}
                  selectedId={selectId} getItemLabel={getClassroomLabel} getItemId={getClassroomId}                />
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button
                onClick={() => {
                  if (selectId) {
                    // navigate(`/atualizar/${selectId}`);
                  }
                }}
              >
                ATUALIZAR
              </Button>
              <Button
                onClick={() => setShowModal(true)}
                color="utfpr_red"
                disabled={!selectId}
              >
                EXCLUIR
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
      <DeleteModal
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
