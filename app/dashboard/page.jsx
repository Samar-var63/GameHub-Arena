import React from "react";
import PageShell from "@/components/PageShell";
import TournamentFeed from "@/components/TournamentFeed";
import CreateTeamForm from "@/components/CreateTeamForm";

export const metadata = {
  title: "Dashboard | GameHub Arena",
};

export default function DashboardPage() {
  return (
    <PageShell className="py-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Feed: Tournaments (M3 Component) */}
        <div className="xl:col-span-2">
          <h1 className="text-3xl font-bold text-white mb-8">Live Arenas</h1>
          <TournamentFeed />
        </div>

        {/* Sidebar Controls (M4 Component) */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Guild Control</h2>
          <CreateTeamForm />
        </div>

      </div>
    </PageShell>
  );
}