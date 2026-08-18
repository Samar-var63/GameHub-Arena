"use client";

export default function LeaveTeamButton({ teamId, userId }) {
  const handleLeaveTeam = () => {
    if (confirm("Are you sure you want to abort mission and leave this squad?")) {
      alert("You have successfully left the team.");
      // Yahan aage chalke backend API ka call aayega
    }
  };

  return (
    <button
      onClick={handleLeaveTeam}
      className="px-6 py-2 bg-red-950/20 border border-red-900/50 hover:border-red-500 hover:bg-red-900/40 text-red-500 hover:text-red-400 font-bold tracking-widest text-[10px] uppercase rounded-lg transition-all shadow-[0_0_15px_-5px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]"
    >
      Leave Team
    </button>
  );
}