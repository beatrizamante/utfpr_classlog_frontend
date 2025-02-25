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
      <div className="relative bg-utfpr_dark_gray w-[400px] h-[300px] rounded-lg shadow-lg border-2 border-utfpr_yellow bg-opacity-85 flex flex-col items-center justify-center gap-4">
        <div className="text-lg text-center">{description}</div>
        <Button onClick={onClose} color="utfpr_red">
          FECHAR
        </Button>
      </div>
    </div>
  );
}
