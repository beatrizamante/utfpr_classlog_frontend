import React from "react";
import Button from "./Button";

interface AlertModalProps {
  isVisible: boolean;
  onClose: () => void;
  description: string;
}

export default function ModalAlert({
  isVisible,
  onClose,
  description,
}: AlertModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="relative bg-utfpr_dark_gray w-[500px] h-[300px] rounded-lg shadow-lg border-2 border-utfpr_yellow bg-opacity-85">
        <div className="relative z-10 flex flex-col justify-center items-center gap-4">
          {description}
        </div>
        <Button onClick={onClose} color="utfpr_red">
          FECHAR
        </Button>
      </div>
    </div>
  );
}
