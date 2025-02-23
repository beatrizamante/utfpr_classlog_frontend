import React from "react";

interface ItemProps {
  label: string; 
  isSelected: boolean;
  onClick: () => void;
  additionalInfo?: string; 
}

export default function Item({ label, isSelected, onClick, additionalInfo }: ItemProps) {
  return (
    <li
      onClick={onClick}
      className={`px-2 py-2 w-[325px] h-[63px] text-xl flex flex-col items-center justify-center border-4 rounded-sm font-bold ${
        isSelected ? "border-utfpr_white text-white" : "border-utfpr_yellow text-utfpr_yellow"
      }`}
    >
      <h6 className="text-ellipsis">{label}</h6>
      {additionalInfo && (
        <span className="text-sm text-gray-500 mt-1">{additionalInfo}</span>
      )}
    </li>
  );
}
