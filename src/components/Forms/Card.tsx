import React from "react";

interface CardProps {
  title: string;
  color?: string;
  size?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  color = "utfpr_yellow",
  size = "3xl",
  children,
}: CardProps) {
  return (
    <div className="bg-utfpr_black w-[373px] opacity-95 px-8 py-8">
      <div className="pb-8 text-center">
        <span
          className={`text-${color} font-bold ${
            size === "3xl"
              ? "text-3xl"
              : size === "2xl"
              ? "text-2xl"
              : "text-xl"
          }`}
        >
          {title}
          <div className={`w-full h-[4px] mt-1 bg-${color}`}></div>
        </span>
        <div className="flex flex-col items-center gap-2 pt-10">{children}</div>
      </div>
    </div>
  );
}
