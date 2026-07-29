"use client";

import { useState } from "react";

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Admin Security States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  const ADMIN_PASSWORD = "dpvs";

  // Initial Leaderboard Data
  const [teams, setTeams] = useState([
    {
      id: "1",
      rank: 1,
      name: "Soul Esports",
      game: "BGMI",
      matches: 10,
      wins: 8,
      kills: 142,
      points: 185,
      streak: "🔥 3 Won",
    },
    {
      id: "2",
      rank: 2,
      name: "India Esports",
      game: "BGMI",
      matches: 10,
      wins: 7,
      kills: 128,
      points: 168,
      streak: "🔥 2 Won",
    },
    {
      id: "3",
      rank: 3,
      name: "Team XSpark",
      game: "Valorant",
      matches: 10,
      wins: 6,
      kills: 110,
      points: 152,
      streak: "1 Won",
    },
    {
      id: "4",
      rank: 4,
      name: "GodLike Esports",
      game: "BGMI",
      matches: 10,
      wins: 5,
      kills: 105,
      points: 140,
      streak: "1 Loss",
    },
    {
      id: "5",
      rank: 5,
      name: "PixelPulse",
      game: "CS2",
      matches: 10,
      wins: 5,
      kills: 98,
      points: 132,
      streak: "2 Won",
    },
  ]);

  const [newScore, setNewScore] = useState({
    name: "",
    game: "BGMI",
    matches: 10,
    wins: 0,
    kills: 0,
    points: 0,
  });

  // Filter Logic
  const filteredTeams = teams
    .filter((t) => selectedGame === "All" || t.game === selectedGame)
    .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.points - a.points);

  // Admin Password Verification
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthOpen(false);
      setAuthErrorMessage("");
      setIsUpdateModalOpen(true);
    } else {
      setAuthErrorMessage("Invalid Admin Password! Access Denied.");
    }
  };

  // Add / Update Team Score
  const handleAddScore = (e) => {
    e.preventDefault();
    if (!newScore.name || !newScore.points) return;

    const createdTeam = {
      id: Date.now().toString(),
      rank: teams.length + 1,
      name: newScore.name,
      game: newScore.game,
      matches: Number(newScore.matches) || 1,
      wins: Number(newScore.wins) || 0,
      kills: Number(newScore.kills) || 0,
      points: Number(newScore.points) || 0,
      streak: "New Entry",
    };

    setTeams([...teams, createdTeam]);
    setIsUpdateModalOpen(false);
    setNewScore({ name: "", game: "BGMI", matches: 10, wins: 0, kills: 0, points: 0 });
  };

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
            Leaderboard
          </h1>
          <p className="text-slate-400 mt-1">
            Top performing esports teams ranked by overall standings and total points.
          </p>
        </div>

        <button
          onClick={() => {
            setAdminPasswordInput("");
            setAuthErrorMessage("");
            setIsAdminAuthOpen(true);
          }}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2 text-sm"
        >
          🔒 <span>+ Update Scores / Add Team</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Game Filter Tabs */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1 w-full sm:w-auto">
          {["All", "BGMI", "Valorant", "CS2"].map((game) => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                selectedGame === game
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        {/* Live Search Bar */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search team name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-xs border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Team</th>
                <th className="py-4 px-6">Game</th>
                <th className="py-4 px-6 text-center">Matches</th>
                <th className="py-4 px-6 text-center">Wins</th>
                <th className="py-4 px-6 text-center">Finish Kills</th>
                <th className="py-4 px-6 text-right">Points</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {filteredTeams.map((team, index) => {
                const currentRank = index + 1;
                return (
                  <tr
                    key={team.id}
                    className="hover:bg-slate-800/40 transition duration-150"
                  >
                    {/* Rank Badge with Trophies */}
                    <td className="py-4 px-6 font-bold">
                      {currentRank === 1 ? (
                        <span className="inline-flex items-center gap-1 text-yellow-400 text-base">
                          🥇 #1
                        </span>
                      ) : currentRank === 2 ? (
                        <span className="inline-flex items-center gap-1 text-slate-300 text-base">
                          🥈 #2
                        </span>
                      ) : currentRank === 3 ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-base">
                          🥉 #3
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold pl-2">
                          #{currentRank}
                        </span>
                      )}
                    </td>

                    {/* Team Name & Streak */}
                    <td className="py-4 px-6 font-bold text-slate-100 flex items-center justify-between">
                      <span>{team.name}</span>
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                        {team.streak}
                      </span>
                    </td>

                    {/* Game Tag */}
                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                        {team.game}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center text-slate-300 font-medium">
                      {team.matches}
                    </td>

                    <td className="py-4 px-6 text-center font-bold text-green-400">
                      {team.wins}
                    </td>

                    <td className="py-4 px-6 text-center text-indigo-300 font-semibold">
                      {team.kills}
                    </td>

                    <td className="py-4 px-6 text-right font-extrabold text-indigo-400 text-base">
                      {team.points} <span className="text-xs text-slate-500 font-normal">pts</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredTeams.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No leaderboard rankings found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* 1. Admin Verification Modal */}
      {isAdminAuthOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-white shadow-2xl relative text-center">
            <button
              onClick={() => setIsAdminAuthOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
              🔒
            </div>

            <h2 className="text-xl font-bold text-slate-100">Admin Security Access</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter admin password to modify tournament leaderboard standings.
            </p>

            <form onSubmit={handleVerifyPassword} className="mt-5 space-y-3">
              <input
                type="password"
                placeholder="Enter Admin Password"
                autoFocus
                required
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-center text-sm focus:outline-none focus:border-indigo-500 text-white tracking-widest"
              />

              {authErrorMessage && (
                <p className="text-xs text-red-400 font-medium">{authErrorMessage}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer text-sm"
                >
                  Verify Admin
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminAuthOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Update / Add Score Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Add / Update Leaderboard Team</h2>

            <form onSubmit={handleAddScore} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Team Name</label>
                <input
                  type="text"
                  placeholder="e.g. Entity Gaming"
                  required
                  value={newScore.name}
                  onChange={(e) => setNewScore({ ...newScore, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Game Tag</label>
                  <select
                    value={newScore.game}
                    onChange={(e) => setNewScore({ ...newScore, game: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                  >
                    <option value="BGMI">BGMI</option>
                    <option value="Valorant">Valorant</option>
                    <option value="CS2">CS2</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Matches</label>
                  <input
                    type="number"
                    value={newScore.matches}
                    onChange={(e) => setNewScore({ ...newScore, matches: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Wins</label>
                  <input
                    type="number"
                    value={newScore.wins}
                    onChange={(e) => setNewScore({ ...newScore, wins: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Kills</label>
                  <input
                    type="number"
                    value={newScore.kills}
                    onChange={(e) => setNewScore({ ...newScore, kills: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Total Points</label>
                  <input
                    type="number"
                    required
                    value={newScore.points}
                    onChange={(e) => setNewScore({ ...newScore, points: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer text-sm"
                >
                  Save Standings
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}