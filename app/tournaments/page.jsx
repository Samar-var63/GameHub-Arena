"use client";

import { useState, useEffect } from "react";

const INITIAL_TOURNAMENTS = [
  {
    id: "1",
    title: "Mova Legends Tournament",
    game: "Mova legend",
    prizePool: "₹20,000",
    registered: 5,
    maxSlots: 16,
    rules: "5v5 team match. Double elimination structure.",
    schedule: "29th July, 2026 at 5:00 PM IST",
  },
  {
    id: "2",
    title: "BGMI Championship 2026",
    game: "Battlegrounds Mobile India",
    prizePool: "₹50,000",
    registered: 12,
    maxSlots: 16,
    rules: "Squad matches, Erangel & Miramar maps. TPP mode only. No emulators allowed.",
    schedule: "Starts Tomorrow at 6:00 PM IST",
  },
  {
    id: "3",
    title: "Valorant Valor Clash",
    game: "Valorant",
    prizePool: "₹1,00,000",
    registered: 8,
    maxSlots: 32,
    rules: "5v5 Competitive ruleset. Single elimination bracket. All matches Bo3.",
    schedule: "30th July, 2026 at 4:00 PM IST",
  },
];

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Security Admin Auth States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const ADMIN_PASSWORD = "dpvs";

  // Load data from localStorage
  useEffect(() => {
    const savedTournaments = localStorage.getItem("gamehub_tournaments");
    if (savedTournaments) {
      try {
        setTournaments(JSON.parse(savedTournaments));
      } catch (e) {
        console.error("Error parsing tournaments", e);
      }
    }

    const savedRegs = localStorage.getItem("gamehub_registered_ids");
    if (savedRegs) {
      try {
        setRegisteredIds(JSON.parse(savedRegs));
      } catch (e) {
        console.error("Error parsing registered IDs", e);
      }
    }

    setIsLoaded(true);
  }, []);

  // Sync changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("gamehub_tournaments", JSON.stringify(tournaments));
    }
  }, [tournaments, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("gamehub_registered_ids", JSON.stringify(registeredIds));
    }
  }, [registeredIds, isLoaded]);

  const [newTournament, setNewTournament] = useState({
    title: "",
    game: "",
    prizePool: "",
    maxSlots: 16,
    rules: "Standard tournament rules apply.",
    schedule: "Upcoming",
  });

  const triggerAddAuth = () => {
    setPendingAction("ADD");
    setAdminPasswordInput("");
    setAuthErrorMessage("");
    setIsAdminAuthOpen(true);
  };

  const triggerDeleteAuth = (id) => {
    setTargetDeleteId(id);
    setPendingAction("DELETE");
    setAdminPasswordInput("");
    setAuthErrorMessage("");
    setIsAdminAuthOpen(true);
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthOpen(false);
      setAuthErrorMessage("");

      if (pendingAction === "ADD") {
        setIsAddModalOpen(true);
      } else if (pendingAction === "DELETE" && targetDeleteId) {
        setTournaments((prev) => prev.filter((t) => t.id !== targetDeleteId));
        if (selectedTournament?.id === targetDeleteId) {
          setSelectedTournament(null);
        }
        setTargetDeleteId(null);
      }
      setPendingAction(null);
    } else {
      setAuthErrorMessage("Invalid Admin Password! Access Denied.");
    }
  };

  const handleToggleRegister = (id) => {
    const isRegistered = registeredIds.includes(id);

    setTournaments((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            registered: isRegistered ? t.registered - 1 : t.registered + 1,
          };
        }
        return t;
      })
    );

    if (isRegistered) {
      setRegisteredIds(registeredIds.filter((regId) => regId !== id));
    } else {
      setRegisteredIds([...registeredIds, id]);
    }

    if (selectedTournament && selectedTournament.id === id) {
      setSelectedTournament((prev) => ({
        ...prev,
        registered: isRegistered ? prev.registered - 1 : prev.registered + 1,
      }));
    }
  };

  const handleAddTournament = (e) => {
    e.preventDefault();
    if (!newTournament.title || !newTournament.game || !newTournament.prizePool) return;

    const createdTournament = {
      ...newTournament,
      id: Date.now().toString(),
      registered: 0,
      maxSlots: Number(newTournament.maxSlots) || 16,
    };

    setTournaments([createdTournament, ...tournaments]);
    setIsAddModalOpen(false);
    setNewTournament({
      title: "",
      game: "",
      prizePool: "",
      maxSlots: 16,
      rules: "Standard tournament rules apply.",
      schedule: "Upcoming",
    });
  };

  return (
    <div className="min-h-screen p-8 bg-emerald-50/70 text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-950">
            Tournaments
          </h1>
          <p className="text-emerald-800 font-medium mt-1">
            Browse, manage, and join active esports competitions.
          </p>
        </div>

        <button
          onClick={triggerAddAuth}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition duration-200 cursor-pointer flex items-center gap-2"
        >
          🔒 <span>+ Add Tournament</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((t) => {
          const isUserRegistered = registeredIds.includes(t.id);
          return (
            <div
              key={t.id}
              className="p-6 bg-white border border-emerald-200 rounded-2xl flex flex-col justify-between shadow-sm relative hover:border-emerald-400 hover:shadow-md transition"
            >
              <button
                onClick={() => triggerDeleteAuth(t.id)}
                title="Admin Delete Tournament"
                className="absolute top-4 right-4 text-emerald-700 hover:text-red-600 p-1 rounded transition cursor-pointer"
              >
                🗑️
              </button>

              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                  {t.game}
                </span>
                <h2 className="text-2xl font-extrabold mt-3 text-slate-950 pr-6">{t.title}</h2>

                <div className="mt-4 flex justify-between text-sm text-slate-900 border-t border-emerald-100 pt-3">
                  <span>
                    Prize Pool: <strong className="text-emerald-700 font-bold">{t.prizePool}</strong>
                  </span>
                  <span>
                    Slots:{" "}
                    <strong
                      className={
                        t.registered >= t.maxSlots ? "text-red-600 font-bold" : "text-emerald-900 font-bold"
                      }
                    >
                      {t.registered}/{t.maxSlots}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setSelectedTournament(t)}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  View Details
                </button>
                {isUserRegistered && (
                  <span className="px-3 py-2 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl text-xs font-bold flex items-center">
                    Registered ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 1. View Details Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-emerald-200 p-6 rounded-2xl max-w-lg w-full text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setSelectedTournament(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
              {selectedTournament.game}
            </span>
            <h2 className="text-2xl font-extrabold mt-2 text-emerald-950 pr-6">
              {selectedTournament.title}
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-800">
              <p>
                <strong>Prize Pool:</strong>{" "}
                <span className="text-emerald-700 font-extrabold">{selectedTournament.prizePool}</span>
              </p>
              <p>
                <strong>Slots Filled:</strong>{" "}
                <span className="text-emerald-950 font-bold">
                  {selectedTournament.registered} / {selectedTournament.maxSlots}
                </span>
              </p>
              <p>
                <strong>Schedule:</strong> {selectedTournament.schedule}
              </p>
              <p>
                <strong>Rules:</strong> {selectedTournament.rules}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              {registeredIds.includes(selectedTournament.id) ? (
                <button
                  onClick={() => handleToggleRegister(selectedTournament.id)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 font-bold rounded-xl text-white transition cursor-pointer"
                >
                  Cancel Registration
                </button>
              ) : (
                <button
                  onClick={() => handleToggleRegister(selectedTournament.id)}
                  disabled={selectedTournament.registered >= selectedTournament.maxSlots}
                  className={`flex-1 py-2.5 font-bold rounded-xl text-white transition cursor-pointer ${
                    selectedTournament.registered >= selectedTournament.maxSlots
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {selectedTournament.registered >= selectedTournament.maxSlots
                    ? "Tournament Full"
                    : "Register Now"}
                </button>
              )}

              <button
                onClick={() => triggerDeleteAuth(selectedTournament.id)}
                className="py-2.5 px-4 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold rounded-xl transition cursor-pointer"
                title="Admin Delete"
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Admin Protection Modal */}
      {isAdminAuthOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-emerald-200 p-6 rounded-2xl max-w-sm w-full text-slate-900 shadow-2xl relative text-center">
            <button
              onClick={() => setIsAdminAuthOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
              🔒
            </div>

            <h2 className="text-xl font-bold text-slate-950">Admin Authentication</h2>
            <p className="text-xs text-slate-600 mt-1">
              Enter admin password to {pendingAction === "ADD" ? "add a new tournament" : "delete this tournament"}.
            </p>

            <form onSubmit={handleVerifyPassword} className="mt-5 space-y-3">
              <input
                type="password"
                placeholder="Enter Admin Password"
                autoFocus
                required
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-center text-sm focus:outline-none focus:border-emerald-600 text-slate-950 tracking-widest font-bold"
              />

              {authErrorMessage && (
                <p className="text-xs text-red-600 font-bold">{authErrorMessage}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 font-bold rounded-xl text-white transition cursor-pointer text-sm"
                >
                  Verify Admin
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminAuthOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-slate-800 transition cursor-pointer text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Tournament Form Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-emerald-200 p-6 rounded-2xl max-w-md w-full text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-emerald-950 mb-4">Add New Tournament</h2>

            <form onSubmit={handleAddTournament} className="space-y-4">
              <div>
                <label className="text-xs text-emerald-900 font-bold block mb-1">Tournament Title</label>
                <input
                  type="text"
                  placeholder="e.g. CS2 Showdown 2026"
                  required
                  value={newTournament.title}
                  onChange={(e) => setNewTournament({ ...newTournament, title: e.target.value })}
                  className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600 text-slate-950 font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-emerald-900 font-bold block mb-1">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g. Counter-Strike 2"
                  required
                  value={newTournament.game}
                  onChange={(e) => setNewTournament({ ...newTournament, game: e.target.value })}
                  className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600 text-slate-950 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-900 font-bold block mb-1">Prize Pool</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25,000"
                    required
                    value={newTournament.prizePool}
                    onChange={(e) => setNewTournament({ ...newTournament, prizePool: e.target.value })}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600 text-slate-950 font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-900 font-bold block mb-1">Max Slots</label>
                  <input
                    type="number"
                    placeholder="16"
                    value={newTournament.maxSlots}
                    onChange={(e) => setNewTournament({ ...newTournament, maxSlots: e.target.value })}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600 text-slate-950 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 font-bold rounded-xl text-white transition cursor-pointer"
                >
                  Create Tournament
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-slate-800 transition cursor-pointer"
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