"use client";

export default function LeaderboardPage() {
  const dummyLeaderboard = [
    { rank: 1, team: "Soul Esports", played: 10, wins: 8, points: 185 },
    { rank: 2, team: "Team XSpark", played: 10, wins: 6, points: 152 },
    { rank: 3, team: "GodLike Esports", played: 10, wins: 5, points: 140 },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-amber-400 mb-2">
        Leaderboard
      </h1>
      <p className="text-slate-400 mb-8">Top teams ranked by total tournament points.</p>

      <div className="overflow-hidden border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 text-sm">
              <th className="p-4">Rank</th>
              <th className="p-4">Team</th>
              <th className="p-4">Matches</th>
              <th className="p-4">Wins</th>
              <th className="p-4 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {dummyLeaderboard.map((row) => (
              <tr key={row.rank} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition">
                <td className="p-4 font-bold text-amber-400">#{row.rank}</td>
                <td className="p-4 font-semibold text-slate-100">{row.team}</td>
                <td className="p-4 text-slate-400">{row.played}</td>
                <td className="p-4 text-green-400">{row.wins}</td>
                <td className="p-4 text-right font-mono font-bold text-indigo-400">{row.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}