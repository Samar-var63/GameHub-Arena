"use client";

import React from "react";
import GlassCard from "./GlassCard";

export default function MatchTimelineLogs({ logs }) {
  // Fallback logs array till continuous streaming backend integration
  const sampleLogs = logs || [
    {
      id: 1,
      time: "10 mins ago",
      event: "Match T-101-R1-M1 marked as DISPUTED due to score mismatch.",
    },
    {
      id: 2,
      time: "25 mins ago",
      event: "Team 'Soul Trigger' advanced to Semifinals round automatically.",
    },
    {
      id: 3,
      time: "1 hour ago",
      event:
        "Captain of 'Hydra Clan' submitted a score report of 16-14.",
    },
  ];

  return (
    <GlassCard className="p-6 border border-slate-800 bg-slate-950/60 max-w-lg">
      <h3 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Live Arena Event Stream
      </h3>

      <div className="relative border-l border-slate-800 pl-4 space-y-6">
        {sampleLogs.map((log) => (
          <div key={log.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-slate-800 group-hover:bg-indigo-500 border border-slate-950 transition-colors"></div>

            <span className="text-[11px] font-mono text-slate-500 block mb-1">
              {log.time}
            </span>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {log.event}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}