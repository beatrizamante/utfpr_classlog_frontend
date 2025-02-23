import React from "react";
import Button from "./Button";

interface DeleteModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void; 
  message: string;
}

export default function Modal({ isVisible, onCancel, onConfirm, message }: DeleteModalProps) {
if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="relative bg-utfpr_dark_gray w-[500px] h-[300px] rounded-lg shadow-lg border-2 border-utfpr_yellow bg-opacity-85">
        <div className="relative z-10 w-full text-utfpr_white pt-8 text-xl text-center px-8 pb-20">
          <p>{message}</p>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center gap-4">
          <Button onClick={onConfirm}>Sim</Button>
          <Button onClick={onCancel} color="utfpr_red">Não</Button>
        </div>
      </div>
    </div>
  );
}
