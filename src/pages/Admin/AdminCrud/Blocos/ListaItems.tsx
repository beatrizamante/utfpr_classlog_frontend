import React, { useEffect, useRef, useState } from "react";
import background from "../../../../assets/images/background.png";
import { useNavigate } from "react-router";
import { Block } from "../../../../interfaces/AdmInterfaces";
import Header from "../../../../components/Header";
import Card from "../../../../components/Forms/Card";
import List from "../../../../components/List/List";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import Modal from "../../../../components/Modal";

export default function Listas() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const handleDelete = async () => {
    console.log(selectId);
    try {
      if (selectId != null) {
        // await apiClient.deleteblock(selectId.toString());
        console.log("Deletion successful");
        setShowModal(false);
        setSelectId(null);
        handleList();

        setBlocks((prevblocks) =>
          prevblocks.filter((block) => block.block_id !== selectId)
        );
      } else {
        console.error("Classblock ID is missing!");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const handleList = async () => {
    try {
      // const response = await apiClient.getClassblocks();
      // setBlocks(response.data);
      setBlocks([]);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const getClassblockLabel = (item: Block): string => item.identificacao;
  const getMappedItemId = (
    item: Block & { id: number | null }
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
      <div className="absolute inset-0 bg-utfpr_dark_gray opacity-40 z-0"></div>
      <Header />
      <div className="flex justify-center pb-8 relative flex-grow pt-12">
        <div className="flex flex-col items-center justify-between pt-6 pb-6 relative z-10 space-y-4">
          <Card title="SALAS DE AULA" size="2xl">
            <div className="mx-4 mb-4">
              <ul ref={listRef}>
                <List
                  listOf={blocks.map((block) => ({
                    ...block,
                    id: block.block_id,
                  }))}
                  onSelected={(id: number | null) => {
                    setSelectId(id);
                  }}
                  selectedId={selectId}
                  getItemLabel={getClassblockLabel}
                  getItemId={getMappedItemId}
                />
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button
                onClick={() => {
                  if (selectId) {
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
      </div>
      <Footer />
      <Modal
        message="Tem certeza que deseja deletar essas informações?"
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
