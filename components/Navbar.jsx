"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const publicNavLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Tournaments", href: "/tournaments" },
    { name: "Teams", href: "/teams" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white relative z-50">
      {/* Logo */}
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
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        {publicNavLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-indigo-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {/* Profile Link (When Logged In) */}
        {session && (
          <Link
            href="/profile"
            className="hover:text-indigo-400 transition-colors text-indigo-300"
          >
            Profile
          </Link>
        )}
      </div>

      {/* Auth State & Action Buttons */}
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <span className="text-sm text-slate-400">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-sm font-medium hover:text-indigo-400 transition"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full border border-slate-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {session.user?.name?.[0] || "U"}
                </div>
              )}
              <span>{session.user?.name}</span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md font-medium transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}