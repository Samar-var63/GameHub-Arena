import React from 'react';

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-slate-100">
      {/* Overview Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          About GameHub Arena
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          GameHub Arena is an all-in-one competitive gaming platform built for players, roster managers, 
          and tournament organizers. Whether you are looking to showcase your personal stats, build a 
          dominant squad, or compete on global leaderboards, GameHub Arena gives you the tools to track 
          your journey and rise through the ranks.
        </p>
      </section>

      {/* Detailed Features Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        
        {/* Tournaments */}
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/80 shadow-lg">
          <div className="text-3xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold mb-3 text-indigo-400">Tournaments</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Discover active and upcoming esports tournaments across multiple titles. View live match 
            schedules, track real-time tournament brackets, and register your team seamlessly to 
            compete for championship glory and prizes.
          </p>
        </div>

        {/* Teams */}
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/80 shadow-lg">
          <div className="text-3xl mb-3">⚔️</div>
          <h2 className="text-2xl font-bold mb-3 text-indigo-400">Teams & Rosters</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Form your own esports team or join existing rosters. Manage team lineups, assign player roles, 
            and coordinate with teammates to take on rival organizations across tournaments and scrims.
          </p>
        </div>

        {/* Leaderboards */}
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/80 shadow-lg">
          <div className="text-3xl mb-3">🥇</div>
          <h2 className="text-2xl font-bold mb-3 text-indigo-400">Leaderboards</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Track global rankings updated in real time. Compare your win rates, match counts, and overall points 
            against top players in the community to see who truly rules the arena.
          </p>
        </div>

        {/* Player Profile */}
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/80 shadow-lg">
          <div className="text-3xl mb-3">👤</div>
          <h2 className="text-2xl font-bold mb-3 text-indigo-400">Player Profile</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your personalized gamer identity hub. Display your career win/loss records, connected team info, 
            game achievements, and recent match histories on a clean, customizable dashboard.
          </p>
        </div>

        {/* Authentication */}
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/80 shadow-lg md:col-span-2">
          <div className="text-3xl mb-3">🔒</div>
          <h2 className="text-2xl font-bold mb-3 text-indigo-400">Secure Authentication</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Powered by NextAuth and Google OAuth, your account data stays safe and secure. Sign in instantly 
            using your Google account to access your personalized dashboard, manage teams, and enter tournaments 
            without needing complex passwords.
          </p>
        </div>

      </section>
    </main>
  );
}