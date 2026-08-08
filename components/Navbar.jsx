import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* 🔥 LOGO */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="relative h-12 w-44">
              <Image
                src="/logo1.png"
                alt="GameHub Arena"
                fill
                priority
                className="object-contain"
              />
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