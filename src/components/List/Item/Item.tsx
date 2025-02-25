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
        isSelected ? "border-utfpr_white text-utfpr_gray" : "border-utfpr_yellow text-utfpr_yellow"
      }`}
    >
      <h6 className="w-full text-ellipsis whitespace-nowrap overflow-hidden pl-2 pr-2">{label}</h6>
      {additionalInfo && (
        <span className="text-sm text-gray-500 mt-1">{additionalInfo}</span>
      )}
    </li>
  );
}
