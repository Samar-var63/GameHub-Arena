import React from "react";
import Link from "next/link";
import { theme } from "@/styles/theme";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-500 tracking-wider">
          GAMEHUB ARENA
        </div>

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
          <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}