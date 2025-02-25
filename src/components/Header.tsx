import React from "react";
import logo from "../assets/images/utfpr_logo.png";
import { ReactComponent as MenuIcon } from "../assets/icons/power-off.svg";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { openLogoutModal } = useAuth();

  return (
    <div className="h-[105px] w-full bg-utfpr_dark_gray flex flex-row justify-between px-4 z-10">
      <img src={logo} alt="Logo" className="w-[180px] h-[85px] pt-4" />
      <button onClick={openLogoutModal}>
        <MenuIcon />
      </button>
    </div>
  );
}
