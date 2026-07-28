
"use client";

import TournamentCard from "@/components/TournamentCard";

export default function TournamentsPage() {
  // Demo tournaments data (baad mein API se link kar sakte ho)
  const dummyTournaments = [
    {
      id: "1",
      title: "BGMI Championship 2026",
      game: "Battlegrounds Mobile India",
      prizePool: "₹50,000",
      status: "Registration Open",
      teamsCount: "12/16",
    },
    {
      id: "2",
      title: "Valorant Valor Clash",
      game: "Valorant",
      prizePool: "₹1,00,000",
      status: "Upcoming",
      teamsCount: "8/32",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
            Tournaments
          </h1>
          <p className="text-slate-400 mt-1">
            Browse and join active esports competitions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyTournaments.map((t) => (
          <div key={t.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">
              {t.game}
            </span>
            <h2 className="text-2xl font-bold mt-3">{t.title}</h2>
            <div className="mt-4 flex justify-between text-sm text-slate-400 border-t border-slate-800 pt-3">
              <span>Prize Pool: <strong className="text-green-400">{t.prizePool}</strong></span>
              <span>Slots: {t.teamsCount}</span>
            </div>
            <button className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}