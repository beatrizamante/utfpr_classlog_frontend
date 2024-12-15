import React from "react";

interface ItemProps {
  bloco: string;
  identificacao: string; 
  tamanho: string;
  tipo: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function Item({ bloco, identificacao, tamanho, tipo, onClick, isSelected }: ItemProps ) {
    
  return (
    <li
    onClick={onClick}
    className="px-2 py-2 w-[325px] h-[63px] text-xl flex items-center justify-center border-4 rounded-sm font-bold border-utfpr_yellow"
    >
      <h6 className="mx-4 mb-2 text-ellipsis">{bloco} - {identificacao}</h6>
    </li>
  );
}