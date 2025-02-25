import React, { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text", 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputType = type === "number" ? "text" : type; 
  const inputMode = type === "number" ? "numeric" : type === "date" ? undefined : "text";

  return (
    <div className="relative flex flex-col justify-center">
      <div>
        <input
          className="h-[25px] block px-2.5 w-[320px] text-sm bg-transparent bg-opacity-80 appearance-none focus:outline-none disabled:bg-disabled-100 disabled:cursor-not-allowed disabled:text-disabled-100 peer text-utfpr_white"
          type={inputType} 
          inputMode={inputMode} 
          placeholder=""
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <label
          className={`pointer-events-none select-none absolute cursor-text text-sm duration-300 px-1.5 bg-background left-1 top-1/2 -translate-y-1/2 z-[5] origin-[0]
            ${value || isFocused ? 'top-2 scale-75 -translate-y-5 bg-background text-utfpr_yellow' : 'text-utfpr_white'}
            peer-focus:px-1.5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-utfpr_yellow peer-focus:bg-background`}
          htmlFor={name}
        >
          {label}
        </label>
        <div className={`w-full h-[1px] mt-1 ${value || isFocused ? 'bg-utfpr_yellow' : 'bg-utfpr_white'} peer-focus:bg-utfpr_yellow`}></div>
      </div>
    </div>
  );
}
