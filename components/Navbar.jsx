import React from "react";
import Link from "next/link";
import Image from "next/image";
import { theme } from "@/styles/theme";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* 🔥 LOGO (replaces text) */}
     <Link href="/">
  <div className="flex items-center gap-3 cursor-pointer">

    {/* ✅ Square Logo */}
    <div className="w-10 h-10 overflow-hidden rounded-lg shadow-[0_0_10px_#22c55e]">
      <Image
        src="/logo.png"
        alt="GameHub Arena"
        width={40}
        height={40}
        className="w-full h-full object-cover"
      />
    </div>

    {/* ✅ Text */}
    <div className="text-xl font-bold text-indigo-500 tracking-wider">
      GAMEHUB ARENA
    </div>

  </div>
</Link>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/tournaments" className="text-slate-300 hover:text-white transition">
            Tournaments
          </Link>
          <Link href="/teams" className="text-slate-300 hover:text-white transition">
            Teams
          </Link>
          <Link href="/leaderboard" className="text-slate-300 hover:text-white transition">
            Leaderboard
          </Link>
          <Link href="/profile" className="text-slate-300 hover:text-white transition">
            Profile
          </Link>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md font-medium transition"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}