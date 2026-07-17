"use client";

import React, { useEffect, useState } from "react";
import TournamentCard from "@/components/TournamentCard";

export default function TournamentFeed() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const res = await fetch("/api/tournaments");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load tournaments");
        }

        setTournaments(data.tournaments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400 text-center py-10 animate-pulse">
        Scanning arena for active tournaments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error}
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-slate-500 text-center py-10">
        No active tournaments live right now. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament._id}
          title={tournament.title}
          gameName={tournament.gameName}
          status={tournament.status}
          maxTeams={tournament.maxTeams}
        />
      ))}
    </div>
  );
}