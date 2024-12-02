import { useState, useRef, useEffect } from "react";
import { ReactComponent as DropMenuDown } from "../assets/icons/dropdown.svg";

interface SingleLevelDropdownMenuProps {
  buttonLabel: string;
  items: {
    title: string;
    url?: string;
    icon?: JSX.Element;
    action?: () => void;
  }[];
}

export const DropdownMenu = ({
  buttonLabel,
  items,
}: SingleLevelDropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(buttonLabel);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleOptionClick = (title: string, action?: () => void) => {
    setSelectedLabel(title);
    setOpen(false);
    if (action) action();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-between w-[320px] text-utfpr_white h-10 px-4 py-2"
        onClick={handleToggle}
      >
        {selectedLabel}
        <span className="ml-2 flex items-center">
          <DropMenuDown />
        </span>
      </button>
      <div className="w-full h-[1px] bg-utfpr_white mt-1"></div>
      {open && (
        <div className="absolute left-0 top-12 w-full bg-utfpr_black shadow-md z-10">
          <ul className="w-full h-auto p-1">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(item.title, item.action)}
                className="relative flex items-center justify-between px-4 py-2 text-sm text-utfpr_white hover:text-utfpr_yellow rounded-md cursor-pointer"
              >
                {item.title}
                {item.icon && <span>{item.icon}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
