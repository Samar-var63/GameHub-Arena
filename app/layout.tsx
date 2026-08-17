import "./globals.css";
import React, { ReactNode } from "react";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata = {
  title: "GameHub Arena",
  description: "Dynamic Tournament Bracket Tracker",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="text-white">
      <body className="relative bg-transparent min-h-screen w-full antialiased text-white">
        <Providers>
          <VideoBackground />
          <Navbar />
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}