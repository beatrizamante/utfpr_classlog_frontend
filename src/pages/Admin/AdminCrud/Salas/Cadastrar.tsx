import React, { useEffect, useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate } from "react-router";
import { classroomsApi } from "../../../../api/admin/apiClassroom";
import { blocksApi } from "../../../../api/admin/apiBlock";
import { Block } from "../../../../interfaces/AdmInterfaces";

type formDataInput = {
  block_id: number;
  name: string;
};

export default function NovaSala() {
  const [formData, setFormData] = useState<formDataInput>({
    block_id: 0,
    name: "",
  });
  const [blocks, setBlocks] = useState<Block[]>([]);

  const inputConfig = [
    {
      label: "Identificação",
      name: "name",
      value: formData.name,
    },
  ];

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "block_id" ? Number(value) : value,
    }));
  };

  const handleListBlocks = async () => {
    try {
      const response = await blocksApi.getBlocks();
      console.log(response.data);
      setBlocks(response.data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  useEffect(() => {
    handleListBlocks();
  }, []);

  const handleSave = async () => {
    try {
      if (formData.block_id && formData.name) {
        const newClassroom = {
          name: formData.name,
          block_id: Number(formData.block_id),
        };
        console.log("Create Room", newClassroom);

        await classroomsApi.createClassroom(newClassroom);
        console.log("Room successfully created.");
        setFormData({
          block_id: 0,
          name: "",
        });
      } else {
        console.error("All fields must be filled.");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      block_id: Number(event.target.value),
    }));
  };

  const onCancel = () => {
    setFormData({
      block_id: 0,
      name: "",
    });
    navigate(-1);
  };

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
          <Card title="NOVA SALA" size="2xl">
            <div className="flex flex-col space-y-6">
              {inputConfig.map((input) => (
                <Input
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  value={String(input.value)}
                  onChange={handleInputChange}
                />
              ))}
              <div>
                <select
                  name="block_id"
                  value={formData.block_id}
                  onChange={handleSelectChange}
                  className="text-utfpr_white mt-1 block w-full py-2 px-3 border-utfpr_yellow bg-utfpr_dark_gray rounded-md shadow-sm focus:outline-none focus:ring-1 focus:bg-utpr_dark_gray focus:border-utfpr_yellow "
                >
                  <option value={0}>Selecione o bloco</option>
                  {blocks.map((block) => (
                    <option key={block.id} value={String(block.id)}>
                      {block.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleSave}>SALVAR</Button>
              <Button onClick={onCancel} color="utfpr_red">
                CANCELAR
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
