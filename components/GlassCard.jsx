import React from "react";
import { theme } from "@/styles/theme";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`${theme.colors.glassBg} rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}