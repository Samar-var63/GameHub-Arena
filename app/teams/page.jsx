"use client";

import React, { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch("/api/teams");
        const data = await res.json();
        if (data.teams) {
          setTeams(data.teams);
        } else if (Array.isArray(data)) {
          setTeams(data);
        }
      } catch (err) {
        console.error("Failed to fetch teams", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Registered Teams</h1>

      {loading ? (
        <p className="text-slate-400">Loading teams from database...</p>
      ) : teams.length === 0 ? (
        <p className="text-slate-400">No teams found yet. Create one from the Dashboard!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <GlassCard key={team._id || index} className="p-6">
              <h3 className="text-xl font-bold text-indigo-400">{team.name}</h3>
              <p className="text-xs text-slate-500 mt-2">
                ID: {team._id ? team._id.substring(0, 10) + "..." : "Local"}
              </p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}