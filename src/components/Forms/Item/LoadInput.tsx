import React, { ChangeEvent } from "react";
interface LoadInputProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  acceptedTypes?: string;
}

export default function LoadInput({
  label,
  name,
  onChange,
  acceptedTypes = "image/*",
}: LoadInputProps) {
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    onChange(file);
    console.log("File selected:", file?.name);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        <label
          htmlFor={name}
          className="flex items-center justify-between text-sm bg-transparent text-utfpr_white px-4 cursor-pointer w-[320px]"
        >
          {label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5 20h14v-2H5v2zm7-14l-5 5h3v4h4v-4h3l-5-5z" />
          </svg>
        </label>

        <input
          id={name}
          name={name}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleFileChange}
        />
      </div>
      <div className="w-full h-[1px] mt-1 bg-utfpr_white"></div>
    </div>
  );
}
