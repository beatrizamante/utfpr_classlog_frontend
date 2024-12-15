interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  color?: string;
  height?: string;
  disabled?: boolean;
}

export default function Button({
  onClick,
  height = "52px",
  children,
  color = "utfpr_yellow",
  disabled
}: ButtonProps) {
  const borderColor =
    color === "utfpr_yellow"
      ? "border-utfpr_yellow text-utfpr_yellow"
      : color === "utfpr_red"
      ? "border-utfpr_red text-utfpr_red"
      : "border-gray-500 text-gray-500";

  return (
    <div>
      <button
       disabled={disabled}
        className={`px-2 py-2 w-[325px] h-[${height}] text-xl flex items-center justify-center border-4 rounded-sm font-bold ${borderColor}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
