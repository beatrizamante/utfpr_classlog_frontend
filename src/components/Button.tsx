import React from 'react'

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode
    color? : string
}

export default function Button({ onClick, children, color = "utfpr_yellow" }: ButtonProps) {

  const borderColor =
  color === "utfpr_yellow"
    ? "border-utfpr_yellow text-utfpr_yellow"
    : color === "utfpr_red"
    ? "border-utfpr_red text-utfpr_red"
    : "border-gray-500 text-gray-500";

  return (
    <div>
        <button
            className={`px-2 py-2 w-[325px] h-[52px] text-xl flex items-center justify-center border-4 rounded-sm font-bold ${borderColor}`}
            onClick={onClick}>
            {children}
        </button>
    </div>
  )
}
