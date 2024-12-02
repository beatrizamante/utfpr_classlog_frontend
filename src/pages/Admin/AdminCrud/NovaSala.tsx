import React, { useRef } from "react";
import Input from '../../../components/Forms/Item/Input'
import LoadInput from '../../../components/Forms/Item/LoadInput';
import Card from "../../../components/Forms/Card";

type formDataInput = {
  identificacao: string;
  planta: string;
};

export default function NovaSala() {
  const formData = useRef<formDataInput>({ identificacao: "", planta: "" });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name in formData.current) {
      formData.current[name as keyof formDataInput] = value;
    }
  };

  return (
    <div>
      <Card title='NOVO BLOCO'>
      <Input
              label={"Identificação"}
              name={'identificacao'}
              value={formData.current.identificacao}
              onChange={handleInputChange}
            />
            <LoadInput label={"Planta"} name={"planta"} value={formData.current.planta} onChange={()=>{}}/>
      </Card>
  </div>
  )
}
