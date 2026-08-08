"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Gamer_Pro",
    tagline: "Pro Esports Athlete & Team Captain",
    role: "Assaulter / IGL",
    joinedDate: "Jan 2026",
    bgmiId: "551234981",
    valTag: "GamerPro#IN1",
    teamName: "India Esports",
    tournamentsPlayed: 12,
    victories: 4,
    currentRank: "#2",
    winRate: "33.3%",
  });

  const [editForm, setEditForm] = useState({ ...userProfile });

  // Handle Profile Update
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ ...editForm });
    setIsEditModalOpen(false);
  };

  // Sample Recent Activity / Match History
  const recentActivity = [
    {
      id: 1,
      tournament: "BGMI Champions Cup 2026",
      game: "BGMI",
      position: "🥇 1st Place",
      date: "24 Jul 2026",
      points: "+45 pts",
    },
    {
      id: 2,
      tournament: "Valorant India Showdown",
      game: "Valorant",
      position: "🥈 2nd Place",
      date: "18 Jul 2026",
      points: "+30 pts",
    },
    {
      id: 3,
      tournament: "CS2 Arena Masters",
      game: "CS2",
      position: "🎖️ Top 8",
      date: "05 Jul 2026",
      points: "+15 pts",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-6xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Avatar Circle */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg border border-indigo-400/30">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                  {userProfile.name}
                </h1>
                <p className="text-indigo-400 text-sm font-medium mt-0.5">
                  {userProfile.tagline}
                </p>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => {
                  setEditForm({ ...userProfile });
                  setIsEditModalOpen(true);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition cursor-pointer shadow-md self-center md:self-start"
              >
                ✏️ Edit Profile
              </button>
            </div>

            {/* Badges / Roles */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4 text-xs">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                🎮 {userProfile.role}
              </span>
              <span className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium">
                🛡️ Team: {userProfile.teamName}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">
                📅 Member since {userProfile.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* In-Game IDs Banner */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 font-medium">BGMI Character ID:</span>
            <span className="text-slate-200 font-bold tracking-wider">{userProfile.bgmiId}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 font-medium">Riot Tag (Valorant):</span>
            <span className="text-slate-200 font-bold tracking-wider">{userProfile.valTag}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-extrabold text-indigo-400 block">
            {userProfile.tournamentsPlayed}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1 block">
            Tournaments Played
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-extrabold text-emerald-400 block">
            {userProfile.victories}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1 block">
            Tournament Wins
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-extrabold text-yellow-400 block">
            {userProfile.currentRank}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1 block">
            Arena Rank
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center shadow-lg">
          <span className="text-3xl font-extrabold text-purple-400 block">
            {userProfile.winRate}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1 block">
            Win Rate
          </span>
        </div>
      </div>

      {/* Grid: Badges & Tournament History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievements / Badges */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            🏆 Achievements & Badges
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <span className="text-2xl">🥇</span>
              <div>
                <strong className="text-slate-200 block">Champion Title</strong>
                <span className="text-slate-400">Won 4 GameHub arena tournaments</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong className="text-slate-200 block">MVP Assaulter</strong>
                <span className="text-slate-400">Highest finish kills in BGMI Cup</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <strong className="text-slate-200 block">Top 3 Veteran</strong>
                <span className="text-slate-400">Ranked #2 on official leaderboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tournament History */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            ⚔️ Recent Tournament History
          </h2>
          <div className="space-y-3">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <strong className="text-slate-200 text-sm block">{act.tournament}</strong>
                  <span className="text-slate-400">{act.game} • {act.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-semibold">
                    {act.position}
                  </span>
                  <span className="text-indigo-400 font-bold">{act.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-indigo-400 mb-4">Edit Profile</h2>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Gamer Handle / Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Bio / Tagline</label>
                <input
                  type="text"
                  value={editForm.tagline}
                  onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">In-Game Role</label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Team Name</label>
                  <input
                    type="text"
                    value={editForm.teamName}
                    onChange={(e) => setEditForm({ ...editForm, teamName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">BGMI Character ID</label>
                  <input
                    type="text"
                    value={editForm.bgmiId}
                    onChange={(e) => setEditForm({ ...editForm, bgmiId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Valorant Tag</label>
                  <input
                    type="text"
                    value={editForm.valTag}
                    onChange={(e) => setEditForm({ ...editForm, valTag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer text-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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