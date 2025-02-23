import React from "react";

interface ImageModalProps {
  isVisible: boolean;
  image: string | null;
  onClose: () => void;
}

export default function Modal({ isVisible, image, onClose }: ImageModalProps) {
  if (!isVisible || !image) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white w-[500px] h-[300px] rounded-lg shadow-lg border-2 border-utfpr_yellow">
        <button 
          className="absolute top-2 right-2 bg-utfpr_yellow text-utfpr_white px-2 py-1 rounded" 
          onClick={onClose}
        >
          X
        </button>
        <img src={image} alt="Planta Baixa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
