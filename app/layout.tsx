import "./globals.css";
import React, { ReactNode } from "react";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-transparent min-h-screen text-white">
        <VideoBackground />
        <Navbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}