import React from "react";
import { theme } from "@/styles/theme";

export default function PageShell({ children, className = "" }) {
  return (
    <main className={`${theme.layouts.container} py-8 ${className}`}>
      {children}
    </main>
  );
}