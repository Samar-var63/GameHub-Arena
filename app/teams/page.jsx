"use client";

import { useState } from "react";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Join Team States
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinNameInput, setJoinNameInput] = useState(""); 
  const [joinPasswordInput, setJoinPasswordInput] = useState("");
  const [joinErrorMessage, setJoinErrorMessage] = useState("");

  const [teams, setTeams] = useState([
    {
      id: "1",
      name: "India Esports",
      game: "BGMI",
      captain: "Deepika (C)",
      rank: "1",
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
      rank: "3",
      winRate: "75%",
      matchesPlayed: 28,
      membersCount: "5/5",
      members: ["Samar (Captain)", "Aarav", "Rohan", "Karan", "Simran"],
      password: "1234",
    }
  ]);

  const [newTeam, setNewTeam] = useState({ name: "", game: "BGMI", captain: "", membersInput: "", password: "" });

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.captain || !newTeam.password) return;

    const formattedCaptain = newTeam.captain.includes("(C)") ? newTeam.captain : `${newTeam.captain} (C)`;
    const memberList = newTeam.membersInput ? newTeam.membersInput.split(",").map((m) => m.trim()) : [`${newTeam.captain} (Captain)`];

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

  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (!joinNameInput.trim()) {
      setJoinErrorMessage("ENTER PLAYER NAME TO ENLIST");
      return;
    }

    if (joinPasswordInput === selectedTeam.password) {
      const updatedTeams = teams.map((t) => {
        if (t.id === selectedTeam.id) {
          return { ...t, members: [...t.members, joinNameInput] };
        }
        return t;
      });
      setTeams(updatedTeams);
      alert(`Access Granted: Welcome to ${selectedTeam.name}, ${joinNameInput}!`);
      setIsJoinModalOpen(false);
      setJoinPasswordInput("");
      setJoinNameInput("");
      setJoinErrorMessage("");
      setSelectedTeam(null);
    } else {
      setJoinErrorMessage("ACCESS DENIED: INCORRECT PASSWORD");
    }
  };

  const handleLeaveTeam = () => {
    const leaveName = prompt("SYSTEM: Enter your Player Name to confirm extraction:");
    if (leaveName) {
      const updatedTeams = teams.map((t) => {
        if (t.id === selectedTeam.id) {
          // Check if player actually exists in the team
          const playerExists = t.members.some(m => m.toLowerCase() === leaveName.toLowerCase());
          if (!playerExists) {
            alert(`ERROR: Player '${leaveName}' not found in this unit.`);
            return t;
          }
          // Remove player and update list
          alert(`Extraction confirmed. ${leaveName} has left the squad.`);
          return { ...t, members: t.members.filter(m => m.toLowerCase() !== leaveName.toLowerCase()) };
        }
        return t;
      });
      
      setTeams(updatedTeams);
      // Update the currently open modal instantly
      setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-slate-200 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            TEAM ARENA
          </h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span> 
            Command & Control for your Esports Rosters
          </p>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="mt-4 md:mt-0 group relative px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all overflow-hidden tracking-widest text-sm">
          <span className="relative z-10 flex items-center gap-2">CREATE SQUAD</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="group relative p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all shadow-xl hover:shadow-indigo-900/20 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">{team.game}</span>
                <span className="text-[10px] font-bold text-yellow-500/70 border border-yellow-900/30 px-3 py-1 rounded-full bg-yellow-950/30">RANK #{team.rank}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">{team.name}</h2>
              <p className="text-sm text-slate-400 mb-6">Captain: <span className="text-indigo-300 font-bold">{team.captain}</span></p>
            </div>
            <button onClick={() => setSelectedTeam(team)} className="w-full py-3 bg-slate-800 hover:bg-indigo-600 text-white font-bold tracking-widest text-xs rounded-xl transition-all border border-slate-700 hover:border-indigo-400 mt-4 relative z-10">
              VIEW TACTICAL DATA
            </button>
          </div>
        ))}
      </div>

      {selectedTeam && !isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-indigo-500/30 p-8 rounded-3xl max-w-sm w-full shadow-[0_0_50px_-10px_rgba(79,70,229,0.3)]">
            <h2 className="text-3xl font-black text-white italic">{selectedTeam.name}</h2>
            <p className="text-indigo-400 font-bold mb-6 text-xs tracking-widest uppercase">{selectedTeam.game} UNIT ROSTER</p>
            <ul className="space-y-2 mb-8 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                {selectedTeam.members.map((m, idx) => (
                  <li key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-sm flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span className="font-bold text-slate-200">{m}</span>
                  </li>
                ))}
            </ul>
            <div className="space-y-3">
              <button onClick={() => setIsJoinModalOpen(true)} className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-black tracking-widest text-sm rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all">
                JOIN MISSION
              </button>
              
              {/* Centered tactical Abort button */}
              <div className="w-full flex justify-center py-1.5">
                <button
                  onClick={handleLeaveTeam}
                  className="px-6 py-2 bg-red-950/20 border border-red-900/50 hover:border-red-500 hover:bg-red-900/40 text-red-500 hover:text-red-400 font-bold tracking-widest text-[10px] uppercase rounded-lg transition-all shadow-[0_0_15px_-5px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]"
                >
                  ABORT / LEAVE TEAM
                </button>
              </div>

              <button onClick={() => setSelectedTeam(null)} className="w-full py-3 text-slate-500 hover:text-white font-bold tracking-widest text-xs transition">
                CLOSE TERMINAL
              </button>
            </div>
          </div>
        </div>
      )}

      {isJoinModalOpen && selectedTeam && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-emerald-500/30 p-8 rounded-3xl max-w-sm w-full shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)] text-center">
            <div className="text-emerald-400 font-mono tracking-widest text-xs mb-4 border border-emerald-500/20 bg-emerald-500/10 py-1.5 px-3 rounded-lg inline-block">SYSTEM LOCKED</div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">RESTRICTED AREA</h2>
            <p className="text-sm text-slate-400 mt-2">Enter credentials to enlist in <br/><strong className="text-emerald-400">{selectedTeam.name}</strong></p>
            <form onSubmit={handleJoinTeam} className="mt-6 space-y-4">
              <input type="text" placeholder="YOUR PLAYER NAME" autoFocus required value={joinNameInput} onChange={(e) => setJoinNameInput(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-center text-sm focus:outline-none focus:border-indigo-500 text-white tracking-widest uppercase" />
              <input type="password" placeholder="ACCESS CODE" required value={joinPasswordInput} onChange={(e) => setJoinPasswordInput(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-center text-lg focus:outline-none focus:border-emerald-500 text-white tracking-[0.3em] font-mono uppercase" />
              {joinErrorMessage && <p className="text-xs text-red-500 font-bold bg-red-500/10 py-2 rounded-lg">{joinErrorMessage}</p>}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold tracking-widest text-xs rounded-xl text-white transition-all">VERIFY & JOIN</button>
                <button type="button" onClick={() => { setIsJoinModalOpen(false); setJoinErrorMessage(""); setJoinPasswordInput(""); setJoinNameInput(""); }} className="py-3 px-6 bg-slate-800 hover:bg-slate-700 font-bold tracking-widest text-xs rounded-xl text-slate-300 transition-all">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-950 border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_-10px_rgba(79,70,229,0.3)] my-8">
            <h2 className="text-3xl font-black text-white italic mb-6 tracking-wide">DEPLOY SQUAD</h2>
            <form onSubmit={handleCreateTeam} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Squad Name</label>
                <input type="text" required value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} placeholder="e.g. India Esports" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Captain Name</label>
                <input type="text" required value={newTeam.captain} onChange={(e) => setNewTeam({ ...newTeam, captain: e.target.value })} placeholder="e.g. Deepika" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Primary Game</label>
                <select value={newTeam.game} onChange={(e) => setNewTeam({ ...newTeam, game: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white transition-colors">
                  <option value="BGMI">BGMI</option>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                  <option value="Free Fire">Free Fire</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Squad Roster (Comma Separated)</label>
                <input type="text" value={newTeam.membersInput} onChange={(e) => setNewTeam({ ...newTeam, membersInput: e.target.value })} placeholder="Player1, Player2..." className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-white transition-colors" />
              </div>
              <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                <label className="text-xs font-bold text-emerald-400 block mb-2 uppercase tracking-wider">Access Password</label>
                <input type="text" required value={newTeam.password} onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })} placeholder="CREATE AUTHORIZATION CODE" className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-400 text-white tracking-widest font-mono uppercase" />
                <p className="text-[10px] text-emerald-500/70 mt-2 tracking-wide uppercase">New members require this code to enlist.</p>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 font-black tracking-widest text-sm rounded-xl text-white transition-all shadow-lg">INITIALIZE</button>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="py-3 px-6 bg-slate-800 hover:bg-slate-700 font-bold tracking-widest text-xs rounded-xl text-slate-300 transition-all">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}