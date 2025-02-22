import React from "react";

interface InputProps {
  name: string;
}

export default function Input({ name }: InputProps) {
  return (
    <div className="text-utfpr_yellow text-center py-4 relative">{name}</div>
  );
}
