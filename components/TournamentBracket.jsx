"use client";

import React from "react";
import GlassCard from "./GlassCard";

export default function TournamentBracket({ matches }) {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center p-6 border border-slate-800 rounded-xl bg-slate-950/40">
      <h2 className="text-xl font-bold text-indigo-400">
        Round 1 Knockouts
      </h2>

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {matches?.map((match) => (
          <GlassCard
            key={match.matchId}
            className="border border-slate-700/50 p-4"
          >
            <div className="flex justify-between items-center text-sm mb-2 text-slate-300">
              <span>{match.teamA ? "Team A" : "TBD"}</span>
              <span className="font-bold text-white">{match.scoreA}</span>
            </div>

            <div className="border-t border-slate-800 my-2"></div>

            <div className="flex justify-between items-center text-sm text-slate-300">
              <span>{match.teamB ? "Team B" : "BYE"}</span>
              <span className="font-bold text-white">{match.scoreB}</span>
            </div>

            <div className="text-center mt-2 text-xs font-semibold text-yellow-500 tracking-wider">
              STATUS: {match.status}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}