"use client";

import { useState, useEffect } from "react";

export default function AdminLeaderboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/admin/leaderboard");
      if (!res.ok) {
        throw new Error("Failed to fetch teams. Make sure you are logged in as an Admin.");
      }
      const data = await res.json();
      setTeams(data.teams);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePoints = async (teamId, currentPoints) => {
    // Native browser prompt for quick input; can be swapped for a custom modal later
    const newPoints = prompt("Enter the new circuit points for this team:", currentPoints);
    
    if (newPoints === null || newPoints === "") return;

    try {
      const res = await fetch("/api/admin/leaderboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          teamId, 
          circuitPoints: Number(newPoints) 
        }),
      });

      if (!res.ok) throw new Error("Failed to update points. Check server logs.");

      // Refresh the table data to reflect the new sorting and points
      fetchTeams();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500 font-bold">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Leaderboard Control</h1>
      
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <table className="min-w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm uppercase font-semibold text-gray-400">Team Name</th>
              <th className="px-6 py-4 text-left text-sm uppercase font-semibold text-gray-400">Circuit Points</th>
              <th className="px-6 py-4 text-left text-sm uppercase font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {teams.map((team) => (
              <tr key={team._id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-medium">{team.name || "Unnamed Team"}</td>
                <td className="px-6 py-4 text-emerald-400 font-mono text-lg">{team.circuitPoints}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleUpdatePoints(team._id, team.circuitPoints)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Edit Points
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {teams.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No teams found in the database.
          </div>
        )}
      </div>
    </div>
  );
}