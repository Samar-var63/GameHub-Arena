import React from "react";
import { theme } from "@/styles/theme";

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${theme.colors.accent} px-4 py-2 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
}