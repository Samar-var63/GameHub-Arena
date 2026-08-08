"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [game, setGame] = useState("BGMI");
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Wallet & Toast State
  const [walletBalance, setWalletBalance] = useState(2500);
  const [copyToast, setCopyToast] = useState("");

  // Modal & Tab State
  const [selectedArena, setSelectedArena] = useState(null);
  const [modalTab, setModalTab] = useState("room"); // "room" | "stream" | "standings"

  // Live Timer State (In Seconds)
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}h : ${m}m : ${s}s`;
  };

  // Mock LFG (Looking for Group) Requests
  const lfgPosts = [
    { id: 1, role: "+1 Assaulter Needed", game: "BGMI", rank: "Tier 2", time: "2m ago" },
    { id: 2, role: "Duelist looking for Squad", game: "Valorant", rank: "Ascendant", time: "5m ago" },
    { id: 3, role: "Sniper available for Customs", game: "CS2", rank: "Faceit Lvl 8", time: "12m ago" },
  ];

  // Featured Live Arenas Data
  const liveArenas = [
    {
      id: "1",
      title: "BGMI Masters Series 2026",
      game: "BGMI",
      status: "LIVE NOW",
      prizePool: "₹50,000",
      teamsCount: "16/20 Teams",
      roomId: "BGMI-8849-ROOM",
      pass: "77812",
      map: "Erangel (Custom Match)",
      time: "11:00 AM IST",
      youtubeEmbedId: "jfKfPfyJRdk",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
      standings: [
        { rank: 1, team: "GodLike Esports", kills: 18, points: 33 },
        { rank: 2, team: "Team SouL", kills: 14, points: 26 },
        { rank: 3, team: "Global Esports", kills: 9, points: 19 },
        { rank: 4, team: "Blind Esports", kills: 7, points: 15 },
      ],
    },
    {
      id: "2",
      title: "Valorant India Showdown",
      game: "Valorant",
      status: "Starts Soon",
      prizePool: "₹30,000",
      teamsCount: "12/16 Teams",
      roomId: "VALO-ASIA-HUB",
      pass: "VALO2026",
      map: "Ascent (Best of 3)",
      time: "01:00 PM IST",
      youtubeEmbedId: "o9J_l_L2U0s",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      standings: [
        { rank: 1, team: "Orangutan", kills: 42, points: 50 },
        { rank: 2, team: "Reckoning Esports", kills: 35, points: 41 },
        { rank: 3, team: "Velocity Gaming", kills: 28, points: 32 },
      ],
    },
    {
      id: "3",
      title: "CS2 Pro Championship",
      game: "CS2",
      status: "Upcoming",
      prizePool: "₹25,000",
      teamsCount: "8/16 Teams",
      roomId: "CS2-SERVER-09",
      pass: "CSPRO99",
      map: "Mirage",
      time: "04:00 PM IST",
      youtubeEmbedId: "N1S6B9U8c60",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      standings: [
        { rank: 1, team: "True Rippers", kills: 22, points: 28 },
        { rank: 2, team: "Gods Reign", kills: 19, points: 24 },
      ],
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

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`${label} Copied to Clipboard!`);
    setTimeout(() => setCopyToast(""), 3000);
  };

  const handleOpenArena = (arena) => {
    setSelectedArena(arena);
    setModalTab("room");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Toast Notification */}
        {copyToast && (
          <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl animate-bounce text-xs flex items-center gap-2">
            <span>✓</span> {copyToast}
          </div>
        )}

        {/* Header Banner & Wallet Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
              Arena Command Dashboard
            </h1>
            <p className="text-slate-400 mt-1 text-xs sm:text-sm">
              Monitor live tournaments, manage esports rosters, and track live standings.
            </p>
          </div>

          {/* Wallet & Payout Bar */}
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 px-5 rounded-2xl flex items-center gap-4 shadow-xl">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Esports Wallet</span>
              <span className="text-xl font-extrabold text-emerald-400">₹{walletBalance.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => handleCopyText("₹2,500 Payout Request Initiated", "Withdrawal Status")}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
            >
              Withdraw
            </button>
          </div>
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
            <span className="text-xs text-slate-400 font-medium uppercase">Next Custom Match</span>
            <p className="text-lg font-mono font-bold text-yellow-400 mt-1">{formatTime(timeLeft)}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-lg">
            <span className="text-xs text-slate-400 font-medium uppercase">Active Gamers</span>
            <p className="text-2xl font-extrabold text-purple-400 mt-1">180+ Pro Players</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Live Arenas */}
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
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        arena.game === "BGMI" ? "/games/bgmi.png" :
                        arena.game === "Valorant" ? "/games/valorant.png" :
                        arena.game === "CS2" ? "/games/cs2.png" :
                        "/games/bgmi.png"
                      }
                      alt={arena.game}
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 shrink-0"
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${arena.badgeColor}`}>
                          {arena.status}
                        </span>

                        <span className="flex items-center gap-1 text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                          {arena.game}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-100">{arena.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Prize Pool: <strong className="text-emerald-400">{arena.prizePool}</strong> • Roster Cap: {arena.teamsCount}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenArena(arena)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-md self-stretch sm:self-auto text-center active:scale-95"
                  >
                    Enter Match Hub 🎮
                  </button>
                </div>
              ))}
            </div>

            {/* LFG / Team Finder Widget */}
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>🔍</span> Scrims & Squad Finder (LFG)
                </h3>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">
                  Live Feed
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {lfgPosts.map((post) => (
                  <div key={post.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span className="text-indigo-400 font-bold">{post.game}</span>
                        <span>{post.time}</span>
                      </div>
                      <p className="font-bold text-slate-200">{post.role}</p>
                      <span className="text-[10px] text-slate-400">Req: {post.rank}</span>
                    </div>
                    <button 
                      onClick={() => handleCopyText(`Invited player for ${post.game}`, "Invite")}
                      className="mt-3 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold rounded-lg text-[11px] transition cursor-pointer"
                    >
                      Send Invite 📩
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Guild Control */}
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

        {/* Interactive Match Hub Modal */}
        {selectedArena && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full text-white shadow-2xl relative">
              <button
                onClick={() => setSelectedArena(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold cursor-pointer z-10"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${selectedArena.badgeColor}`}>
                  {selectedArena.status}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                  {selectedArena.game}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-100">{selectedArena.title}</h2>
              
              {/* Modal Tabs Header */}
              <div className="flex border-b border-slate-800 mt-4 mb-4 gap-4 text-xs font-bold">
                <button
                  onClick={() => setModalTab("room")}
                  className={`pb-2 transition cursor-pointer ${
                    modalTab === "room" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-slate-400"
                  }`}
                >
                  📋 Room Info
                </button>
                <button
                  onClick={() => setModalTab("stream")}
                  className={`pb-2 transition cursor-pointer ${
                    modalTab === "stream" ? "text-red-400 border-b-2 border-red-500" : "text-slate-400"
                  }`}
                >
                  🔴 Live Video Stream
                </button>
                <button
                  onClick={() => setModalTab("standings")}
                  className={`pb-2 transition cursor-pointer ${
                    modalTab === "standings" ? "text-emerald-400 border-b-2 border-emerald-500" : "text-slate-400"
                  }`}
                >
                  🏆 Points Table
                </button>
              </div>

              {/* TAB 1: Room Details */}
              {modalTab === "room" && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs mb-5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Map / Format:</span>
                    <span className="font-bold text-slate-200">{selectedArena.map}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Schedule Time:</span>
                    <span className="font-bold text-indigo-400">{selectedArena.time}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Custom Room ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-slate-900 px-2 py-1 rounded text-yellow-400 font-bold tracking-wider">
                        {selectedArena.roomId}
                      </span>
                      <button
                        onClick={() => handleCopyText(selectedArena.roomId, "Room ID")}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-semibold cursor-pointer"
                      >
                        Copy 📋
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Room Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-slate-900 px-2 py-1 rounded text-emerald-400 font-bold tracking-wider">
                        {selectedArena.pass}
                      </span>
                      <button
                        onClick={() => handleCopyText(selectedArena.pass, "Password")}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-semibold cursor-pointer"
                      >
                        Copy 📋
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Stream */}
              {modalTab === "stream" && (
                <div className="mb-5 overflow-hidden rounded-xl border border-red-500/40 shadow-lg bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedArena.youtubeEmbedId}?autoplay=1`}
                      title="Live Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* TAB 3: Standings */}
              {modalTab === "standings" && (
                <div className="mb-5 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                        <th className="pb-2">#</th>
                        <th className="pb-2">Team Name</th>
                        <th className="pb-2">Kills</th>
                        <th className="pb-2 text-right">Total Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {selectedArena.standings?.map((s) => (
                        <tr key={s.rank} className="hover:bg-slate-900/50">
                          <td className="py-2.5 text-indigo-400 font-bold">#{s.rank}</td>
                          <td className="py-2.5 text-slate-200 font-bold">{s.team}</td>
                          <td className="py-2.5 text-slate-400">{s.kills}</td>
                          <td className="py-2.5 text-right font-bold text-emerald-400">{s.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Modal Bottom Actions */}
              <div className="flex gap-3">
                <Link
                  href="/tournaments"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white text-center transition cursor-pointer text-xs"
                >
                  Go to Tournaments Brackets Page ➔
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}