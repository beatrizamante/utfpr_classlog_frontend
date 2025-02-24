import React, { useEffect, useState } from "react";
import Input from "../../../../components/Forms/Item/Input";
import LoadInput from "../../../../components/Forms/Item/LoadInput"; // Import the reusable InputLoad component
import Card from "../../../../components/Forms/Card";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import background from "../../../../assets/images/background.png";
import Header from "../../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { blocksApi } from "../../../../api/admin/apiBlock";

type FormDataInput = {
  name: string;
  photo: File | null;
};

export default function AtualizaBloco() {
  const { id } = useParams<{ id: string }>();
  const blockId = Number(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataInput>({
    name: "",
    photo: null,
  });

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        if (blockId) {
          const response = await blocksApi.getBlockById(blockId.toString());
          if (response.data) {
            setFormData({
              name: response.data.data.name,
              photo: null,
            });
          }
        }
      } catch (err) {
        console.error("An error occurred while fetching the block data:", err);
      }
    };

    fetchBlock();
  }, [blockId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!blockId || !formData) {
        console.error("Block ID or form data is missing.");
        return;
      }
  
      await blocksApi.updateBlock(blockId.toString(), { name: formData.name });
      console.log("Block information successfully updated.");
  
      if (formData.photo) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("photo", formData.photo);
  
        await blocksApi.uploadBlockImage(blockId.toString(), formDataToUpload);
        console.log("Block image successfully updated.");
      }
  
      navigate(-1);
    } catch (err) {
      console.error("An error occurred while updating the block:", err);
    }
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
          <Card title="ATUALIZAR" size="2xl">
            <div className="flex flex-col space-y-6">
              {[{ label: "Identificação", name: "name" }].map(
                (input) => (
                  <Input
                    key={input.name}
                    label={input.label}
                    name={input.name}
                    value={
                      formData[input.name as keyof FormDataInput] as string
                    }
                    onChange={handleInputChange}
                  />
                )
              )}
              <LoadInput
                label="Carregar Planta"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col items-center gap-4 w-full pt-10">
              <Button onClick={handleUpdate}>ATUALIZAR</Button>
              <Button onClick={() => navigate(-1)} color="utfpr_red">CANCELAR</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
