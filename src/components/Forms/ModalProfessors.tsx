import React, { useState } from "react";
import Button from "../Button";

interface ProfessorModalProps {
  isVisible: boolean;
  onChangeClassrom: () => void;
  onCancelClass: () => void;
}

export default function ModalProfessor({
  isVisible,
  onChangeClassrom,
  onCancelClass,
}: ProfessorModalProps) {
  const [confirmAbsence, setConfirmAbsence] = useState(false);
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="relative bg-utfpr_dark_gray w-[500px] h-[300px] rounded-lg shadow-lg border-2 border-utfpr_yellow bg-opacity-85">
        <div className="relative z-10 flex flex-col justify-center items-center gap-4">
          {!confirmAbsence ? (
            <>
              <Button onClick={onChangeClassrom}>TROCAR SALA</Button>
              <Button onClick={() => setConfirmAbsence(true)}>
                DECLARAR AUSÊNCIA
              </Button>
            </>
          ) : (
            <>
              <p className="text-utfpr_white">Tem certeza que deseja se ausentar?</p>
              <Button onClick={onCancelClass}>SIM</Button>
              <Button color="utfpr_red" onClick={() => setConfirmAbsence(false)}>NÃO</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
