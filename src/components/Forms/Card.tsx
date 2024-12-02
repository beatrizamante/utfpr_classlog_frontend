import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-utfpr_black w-[373px] opacity-95 px-6 py-6">
      <div className="pb-8">
        <span className="text-utfpr_yellow font-bold text-3xl ">
          {title}
          <div className={`w-full h-[4px] mt-1 bg-utfpr_yellow`}></div>
        </span>
        <div className="pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
