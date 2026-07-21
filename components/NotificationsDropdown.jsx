"use client";

import React, { useState } from "react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "Your match against 'Hydra Clan' starts in 15 mins.",
      time: "2m ago",
    },
    {
      id: 2,
      text: "Admin resolved your disputed match. You won!",
      time: "1h ago",
    },
    {
      id: 3,
      text: "+500 XP added to your global standings.",
      time: "2h ago",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
      >
        {/* Simple Bell Icon SVG */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-slate-900"></span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-800 bg-slate-950/50 text-sm font-semibold text-white">
            Notifications
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <p className="text-xs text-slate-300 leading-relaxed">
                  {n.text}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {n.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}