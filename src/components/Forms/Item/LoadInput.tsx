import React from "react";

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
  type,
}: InputProps) {
  return (
    <div className="relative flex flex-col justify-center">
      <div className="">
        <input
          className="h-[25px] block px-2.5 w-[320px] text-sm bg-transparent bg-opacity-80 appearance-none focus:outline-none disabled:bg-disabled-100 disabled:cursor-not-allowed disabled:text-disabled-100 peer text-utfpr_white"
          type={type}
          placeholder=""
          name={name}
          value={value}
          onChange={onChange}
        />
        <label
          className={`absolute cursor-text text-sm duration-300 px-1.5 bg-background left-1 top-1/2 -translate-y-1/2 z-[5] origin-[0]`}
          htmlFor={name}
        >
          {label}
        </label>
        <div className={`w-full h-[1px] mt-1 bg-utfpr_white`}></div>
      </div>
    </div>
  );
}
