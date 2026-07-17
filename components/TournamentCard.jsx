import React from "react";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import Badge from "@/components/Badge";

export default function TournamentCard({
  title,
  gameName,
  status,
  maxTeams,
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-indigo-400 font-medium">{gameName}</p>
        </div>

        <Badge status={status} />
      </div>

      <div className="text-slate-400 text-sm mt-2">
        <p>
          Max Teams:{" "}
          <span className="text-white font-semibold">{maxTeams}</span>
        </p>
      </div>

      <div className="mt-4">
        <PrimaryButton className="w-full">
          View Details
        </PrimaryButton>
      </div>
    </GlassCard>
  );
}