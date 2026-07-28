"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard"; // ya "../../components/GlassCard"

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch("/api/teams");
        const data = await res.json();
        if (data.success) {
          setTeams(data.teams);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-2">Teams</h1>
      <p className="text-gray-400 mb-6">Registered Teams in GameHub Arena</p>

      {loading ? (
        <p className="text-gray-400">Loading teams...</p>
      ) : teams.length === 0 ? (
        <p className="text-gray-400">No teams registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="p-5 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur"
            >
              <h2 className="text-xl font-bold text-indigo-400">{team.name}</h2>
              <p className="text-sm text-gray-400 mt-1">
                Captain ID: {team.captain || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}