"use client";

import { useState } from "react";

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initial Tournaments List
  const [tournaments, setTournaments] = useState([
    {
      id: "1",
      title: "BGMI Championship 2026",
      game: "Battlegrounds Mobile India",
      prizePool: "₹50,000",
      status: "Registration Open",
      teamsCount: "12/16",
      rules: "Squad matches, Erangel & Miramar maps. TPP mode only. No emulators allowed.",
      schedule: "Starts Tomorrow at 6:00 PM IST",
    },
    {
      id: "2",
      title: "Valorant Valor Clash",
      game: "Valorant",
      prizePool: "₹1,00,000",
      status: "Upcoming",
      teamsCount: "8/32",
      rules: "5v5 Competitive ruleset. Single elimination bracket. All matches Bo3.",
      schedule: "30th July, 2026 at 4:00 PM IST",
    },
  ]);

  // New Tournament Form State
  const [newTournament, setNewTournament] = useState({
    title: "",
    game: "",
    prizePool: "",
    teamsCount: "0/16",
    rules: "Standard tournament rules apply.",
    schedule: "Upcoming",
  });

  // Handle Adding New Tournament
  const handleAddTournament = (e) => {
    e.preventDefault();
    if (!newTournament.title || !newTournament.game || !newTournament.prizePool) return;

    const createdTournament = {
      ...newTournament,
      id: Date.now().toString(),
    };

    setTournaments([createdTournament, ...tournaments]);
    setIsAddModalOpen(false);
    setNewTournament({
      title: "",
      game: "",
      prizePool: "",
      teamsCount: "0/16",
      rules: "Standard tournament rules apply.",
      schedule: "Upcoming",
    });
  };

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
            Tournaments
          </h1>
          <p className="text-slate-400 mt-1">
            Browse, manage, and join active esports competitions.
          </p>
        </div>

        {/* Add Tournament Button for Judge Demo */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center gap-2"
        >
          <span>+</span> Add Tournament
        </button>
      </div>

      {/* Tournament Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur flex flex-col justify-between shadow-xl hover:border-slate-700 transition"
          >
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">
                {t.game}
              </span>
              <h2 className="text-2xl font-bold mt-3 text-slate-100">{t.title}</h2>
              <div className="mt-4 flex justify-between text-sm text-slate-400 border-t border-slate-800/80 pt-3">
                <span>
                  Prize Pool: <strong className="text-green-400">{t.prizePool}</strong>
                </span>
                <span>Slots: {t.teamsCount}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTournament(t)}
              className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* 1. View Details Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedTournament(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">
              {selectedTournament.game}
            </span>
            <h2 className="text-2xl font-extrabold mt-2 text-indigo-400">
              {selectedTournament.title}
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong>Prize Pool:</strong>{" "}
                <span className="text-green-400 font-bold">{selectedTournament.prizePool}</span>
              </p>
              <p>
                <strong>Schedule:</strong> {selectedTournament.schedule}
              </p>
              <p>
                <strong>Rules:</strong> {selectedTournament.rules}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  alert(`Registered for ${selectedTournament.title}!`);
                  setSelectedTournament(null);
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 font-bold rounded-xl text-white transition cursor-pointer"
              >
                Register Now
              </button>
              <button
                onClick={() => setSelectedTournament(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Add Tournament Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Add New Tournament</h2>

            <form onSubmit={handleAddTournament} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Tournament Title</label>
                <input
                  type="text"
                  placeholder="e.g. CS2 Showdown 2026"
                  required
                  value={newTournament.title}
                  onChange={(e) => setNewTournament({ ...newTournament, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g. Counter-Strike 2 / Free Fire"
                  required
                  value={newTournament.game}
                  onChange={(e) => setNewTournament({ ...newTournament, game: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Prize Pool</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25,000"
                    required
                    value={newTournament.prizePool}
                    onChange={(e) => setNewTournament({ ...newTournament, prizePool: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Slots (Count)</label>
                  <input
                    type="text"
                    placeholder="e.g. 0/16"
                    value={newTournament.teamsCount}
                    onChange={(e) => setNewTournament({ ...newTournament, teamsCount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer"
                >
                  Create Tournament
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer"
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