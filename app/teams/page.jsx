"use client";

import { useState } from "react";
import LeaveTeamButton from '@/components/LeaveTeamButton';

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Security Admin Auth States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  // Join Team States
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinPasswordInput, setJoinPasswordInput] = useState("");
  const [joinErrorMessage, setJoinErrorMessage] = useState("");

  // Admin Security Password
  const ADMIN_PASSWORD = "dpvs";

  // Dummy Data with Password added (Default password is "1234" for testing)
  const [teams, setTeams] = useState([
    {
      id: "1",
      name: "India Esports",
      game: "BGMI",
      captain: "Deepika (C)",
      rank: "#1",
      winRate: "82%",
      matchesPlayed: 34,
      membersCount: "4/5",
      members: ["Deepika (Captain)", "Samar", "Parth", "Vaibhav"],
      password: "1234",
    },
    {
      id: "2",
      name: "Phoenix",
      game: "Valorant",
      captain: "Samar (C)",
      rank: "#3",
      winRate: "75%",
      matchesPlayed: 28,
      membersCount: "5/5",
      members: ["Samar (Captain)", "Aarav", "Rohan", "Karan", "Simran"],
      password: "1234",
    },
    {
      id: "3",
      name: "PixelPulse",
      game: "CS2",
      captain: "Parth (C)",
      rank: "#5",
      winRate: "68%",
      matchesPlayed: 20,
      membersCount: "4/5",
      members: ["Parth (Captain)", "Vikas", "Neha", "Rahul"],
      password: "1234",
    },
    {
      id: "4",
      name: "SoulTrigger",
      game: "BGMI",
      captain: "Vaibhav (C)",
      rank: "#2",
      winRate: "79%",
      matchesPlayed: 30,
      membersCount: "4/5",
      members: ["Vaibhav (Captain)", "Amit", "Siddharth", "Priya"],
      password: "1234",
    },
  ]);

  const [newTeam, setNewTeam] = useState({
    name: "",
    game: "BGMI",
    captain: "",
    membersInput: "",
    password: "", // Password field
  });

  // Open Auth Modal for Create Team
  const triggerCreateAuth = () => {
    setAdminPasswordInput("");
    setAuthErrorMessage("");
    setIsAdminAuthOpen(true);
  };

  // Verify Admin Password
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthOpen(false);
      setAuthErrorMessage("");
      setIsCreateModalOpen(true);
    } else {
      setAuthErrorMessage("Invalid Admin Password! Access Denied.");
    }
  };

  // Handle Team Creation
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.captain || !newTeam.password) return;

    const formattedCaptain = newTeam.captain.includes("(C)")
      ? newTeam.captain
      : `${newTeam.captain} (C)`;

    const memberList = newTeam.membersInput
      ? newTeam.membersInput.split(",").map((m) => m.trim())
      : [`${newTeam.captain} (Captain)`];

    const createdTeam = {
      id: Date.now().toString(),
      name: newTeam.name,
      game: newTeam.game,
      captain: formattedCaptain,
      rank: "New",
      winRate: "0%",
      matchesPlayed: 0,
      membersCount: `${memberList.length}/5`,
      members: memberList,
      password: newTeam.password,
    };

    setTeams([createdTeam, ...teams]);
    setIsCreateModalOpen(false);
    setNewTeam({ name: "", game: "BGMI", captain: "", membersInput: "", password: "" });
  };

  // Join Team Logic
  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (joinPasswordInput === selectedTeam.password) {
      alert(`Successfully joined ${selectedTeam.name}! (Backend API can be connected here)`);
      setIsJoinModalOpen(false);
      setJoinPasswordInput("");
      setJoinErrorMessage("");
      setSelectedTeam(null);
    } else {
      setJoinErrorMessage("Incorrect Team Password!");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">Teams</h1>
          <p className="text-slate-400 mt-1">Registered Teams & Esports Rosters in GameHub Arena</p>
        </div>
        <button
          onClick={triggerCreateAuth}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
        >
          🔒 <span>+ Create / Join Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur flex flex-col justify-between shadow-xl hover:border-slate-700 transition">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">{team.game}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Rank {team.rank}</span>
              </div>
              <h2 className="text-2xl font-bold mt-3 text-slate-100">{team.name}</h2>
              <p className="text-sm text-slate-400 mt-1">
                Captain: <strong className="text-indigo-300 font-semibold">{team.captain}</strong>
              </p>
              
              <div className="mt-4 grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-center text-xs">
                <div>
                  <span className="text-slate-500 block">Roster</span>
                  <strong className="text-slate-200">{team.membersCount}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Win Rate</span>
                  <strong className="text-green-400">{team.winRate}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Matches</span>
                  <strong className="text-indigo-300">{team.matchesPlayed}</strong>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedTeam(team)}
              className="w-full mt-5 py-2.5 bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer text-sm"
            >
              View Roster / Team Details
            </button>
          </div>
        ))}
      </div>

      {/* 1. View Roster / Team Details Modal */}
      {selectedTeam && !isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl relative">
            <button onClick={() => setSelectedTeam(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">✕</button>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">{selectedTeam.game}</span>
            <h2 className="text-2xl font-extrabold mt-2 text-indigo-400">{selectedTeam.name}</h2>
            
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p><strong>Team Captain:</strong> <span className="text-indigo-300 font-semibold">{selectedTeam.captain}</span></p>
              <p><strong>Rank & Performance:</strong> <span className="text-yellow-400 font-bold">Rank {selectedTeam.rank}</span> (Win Rate: <span className="text-green-400 font-bold">{selectedTeam.winRate}</span>)</p>
            </div>

            <div className="mt-5 border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Squad Roster ({selectedTeam.members.length} Players)</h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {selectedTeam.members.map((m, idx) => (
                  <li key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-sm flex items-center gap-2.5">
                    <span className="text-indigo-400 text-base">🎮</span>
                    <span className="font-medium text-slate-200">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition cursor-pointer text-sm shadow-md"
              >
                Join this Team 🤝
              </button>
              
              <div className="w-full">
                <LeaveTeamButton teamId={selectedTeam.id} userId="dummy_user_id" />
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Join Team Password Prompt Modal */}
      {isJoinModalOpen && selectedTeam && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-white shadow-2xl relative text-center">
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                setJoinErrorMessage("");
                setJoinPasswordInput("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">🛡️</div>
            <h2 className="text-xl font-bold text-slate-100">Private Team</h2>
            <p className="text-xs text-slate-400 mt-1">Enter the secret password to join <strong>{selectedTeam.name}</strong>.</p>
            <form onSubmit={handleJoinTeam} className="mt-5 space-y-3">
              <input
                type="password"
                placeholder="Team Password"
                autoFocus
                required
                value={joinPasswordInput}
                onChange={(e) => setJoinPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-center text-sm focus:outline-none focus:border-emerald-500 text-white tracking-widest"
              />
              {joinErrorMessage && <p className="text-xs text-red-400 font-medium">{joinErrorMessage}</p>}
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition cursor-pointer text-sm mt-2">
                Verify & Join
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Admin Authentication Modal */}
      {isAdminAuthOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-white shadow-2xl relative text-center">
            <button onClick={() => setIsAdminAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">✕</button>
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">🔒</div>
            <h2 className="text-xl font-bold text-slate-100">Admin Security Access</h2>
            <p className="text-xs text-slate-400 mt-1">Enter admin password to create a new team roster.</p>
            <form onSubmit={handleVerifyPassword} className="mt-5 space-y-3">
              <input type="password" placeholder="Enter Admin Password" required value={adminPasswordInput} onChange={(e) => setAdminPasswordInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-center text-sm focus:outline-none focus:border-indigo-500 text-white tracking-widest" />
              {authErrorMessage && <p className="text-xs text-red-400 font-medium">{authErrorMessage}</p>}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer text-sm">Verify Admin</button>
                <button type="button" onClick={() => setIsAdminAuthOpen(false)} className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl relative my-8">
            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">✕</button>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Create Team</h2>
            
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Team Name</label>
                <input type="text" required value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} placeholder="e.g. India Esports" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" />
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Captain Name</label>
                <input type="text" required value={newTeam.captain} onChange={(e) => setNewTeam({ ...newTeam, captain: e.target.value })} placeholder="e.g. Deepika" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Primary Game</label>
                <select value={newTeam.game} onChange={(e) => setNewTeam({ ...newTeam, game: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-200">
                  <option value="BGMI">BGMI</option>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                  <option value="Free Fire">Free Fire</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Squad Roster Members (Comma Separated)</label>
                <input type="text" value={newTeam.membersInput} onChange={(e) => setNewTeam({ ...newTeam, membersInput: e.target.value })} placeholder="Deepika, Samar, Parth, Vaibhav" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-400 block mb-1">Set Team Password (For new members)</label>
                <input type="text" required value={newTeam.password} onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })} placeholder="Create a secret code" className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white tracking-widest" />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition cursor-pointer text-sm shadow-md">Create Team</button>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 font-medium rounded-xl text-slate-300 transition cursor-pointer text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}