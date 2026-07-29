"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [game, setGame] = useState("BGMI");
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Featured Live Arenas
  const liveArenas = [
    {
      id: "1",
      title: "BGMI Masters Series 2026",
      game: "BGMI",
      status: "LIVE NOW",
      prizePool: "₹50,000",
      teamsCount: "16/20 Teams",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    {
      id: "2",
      title: "Valorant India Showdown",
      game: "Valorant",
      status: "Starts in 2 Hours",
      prizePool: "₹30,000",
      teamsCount: "12/16 Teams",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    {
      id: "3",
      title: "CS2 Pro Championship",
      game: "CS2",
      status: "Upcoming",
      prizePool: "₹25,000",
      teamsCount: "8/16 Teams",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
  ];

  const handleRegisterTeam = (e) => {
    e.preventDefault();
    if (!teamName || !captainName) return;

    const newTeam = {
      id: Date.now().toString(),
      name: teamName,
      captain: captainName,
      game: game,
    };

    setRegisteredTeams([newTeam, ...registeredTeams]);
    setSuccessMsg(`Team "${teamName}" registered successfully!`);
    setTeamName("");
    setCaptainName("");

    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
          Arena Command Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Monitor live tournaments, check ongoing matches, and manage your esports squad.
        </p>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <span className="text-xs text-slate-400 font-medium uppercase">Active Arenas</span>
          <p className="text-2xl font-extrabold text-indigo-400 mt-1">03 Live</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <span className="text-xs text-slate-400 font-medium uppercase">Total Prize Pool</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹1,05,000</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <span className="text-xs text-slate-400 font-medium uppercase">Registered Squads</span>
          <p className="text-2xl font-extrabold text-yellow-400 mt-1">36 Teams</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <span className="text-xs text-slate-400 font-medium uppercase">Active Gamers</span>
          <p className="text-2xl font-extrabold text-purple-400 mt-1">180+ Pro Players</p>
        </div>
      </div>

      {/* Main Grid: Live Arenas (Left) vs Guild Control (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Live Arenas & Tournaments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span> Live Arenas
            </h2>
            <span className="text-xs text-indigo-400 font-medium">Auto-updating live feeds</span>
          </div>

          <div className="space-y-4">
            {liveArenas.map((arena) => (
              <div
                key={arena.id}
                className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl backdrop-blur shadow-xl hover:border-slate-700 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${arena.badgeColor}`}>
                      {arena.status}
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {arena.game}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{arena.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Prize Pool: <strong className="text-emerald-400">{arena.prizePool}</strong> • Roster Cap: {arena.teamsCount}
                  </p>
                </div>

                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition cursor-pointer self-stretch sm:self-auto text-center">
                  Enter Match Hub
                </button>
              </div>
            ))}
          </div>

          {/* Quick Announcement Box */}
          <div className="p-5 bg-indigo-950/40 border border-indigo-800/50 rounded-2xl text-xs text-indigo-200 flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <div>
              <strong className="block text-sm text-indigo-300">Grand Finals Spectator Link Live!</strong>
              Matches are streaming live on GameHub Arena YouTube channel. Join the custom room early!
            </div>
          </div>
        </div>

        {/* Right Column: Guild Control / Team Registration */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-100">Guild Control</h2>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur shadow-xl">
            <h3 className="text-lg font-bold text-indigo-400 mb-1">Register New Team</h3>
            <p className="text-xs text-slate-400 mb-5">
              Quickly register your squad to join active tournament brackets.
            </p>

            <form onSubmit={handleRegisterTeam} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Team Name</label>
                <input
                  type="text"
                  placeholder="e.g. Soul Trigger"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Captain Name</label>
                <input
                  type="text"
                  placeholder="e.g. Vaibhav (C)"
                  required
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Target Game</label>
                <select
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                >
                  <option value="BGMI">BGMI</option>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                </select>
              </div>

              {successMsg && (
                <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 font-medium">
                  ✓ {successMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer text-sm mt-2"
              >
                Create Team
              </button>
            </form>

            {/* Quick View of Created Teams */}
            {registeredTeams.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Recently Created Teams ({registeredTeams.length})
                </span>
                {registeredTeams.map((t) => (
                  <div key={t.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between text-xs">
                    <span className="font-bold text-indigo-300">{t.name}</span>
                    <span className="text-slate-400">{t.captain} • {t.game}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}