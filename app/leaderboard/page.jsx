"use client";

import React from "react";
import PageShell from "@/components/PageShell";
import GlassCard from "@/components/GlassCard";

export default function LeaderboardPage() {
  // Mocking static rank system till final dynamic wiring
  const leaderboards = [
    { rank: 1, name: "Soul Trigger", points: 2850, winRatio: "88%" },
    { rank: 2, name: "Hydra Clan", points: 2420, winRatio: "79%" },
    { rank: 3, name: "Entity Gaming", points: 2100, winRatio: "71%" },
  ];

  return (
    <PageShell className="py-10">
      <h1 className="text-3xl font-bold text-white mb-2">
        Global Arena Standings
      </h1>

      <p className="text-slate-400 mb-8">
        Top teams ranked by competitive circuit points.
      </p>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Team Name</th>
              <th className="px-6 py-4">Circuit Points</th>
              <th className="px-6 py-4">Win Ratio</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {leaderboards.map((team) => (
              <tr
                key={team.rank}
                className="hover:bg-slate-900/30 transition-all"
              >
                <td className="px-6 py-4 font-bold text-indigo-400">
                  #{team.rank}
                </td>

                <td className="px-6 py-4 text-white font-medium">
                  {team.name}
                </td>

                <td className="px-6 py-4 font-mono">
                  {team.points} XP
                </td>

                <td className="px-6 py-4 text-green-400 font-semibold">
                  {team.winRatio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </PageShell>
  );
}