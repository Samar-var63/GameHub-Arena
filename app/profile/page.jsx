"use client";

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white max-w-4xl mx-auto">
      <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/50 backdrop-blur">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
            G
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gamer_Pro</h1>
            <p className="text-slate-400">Pro Player • GameHub Arena Member</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 text-center">
          <div className="p-4 rounded-xl bg-slate-800/40">
            <span className="block text-2xl font-bold text-indigo-400">12</span>
            <span className="text-xs text-slate-400">Tournaments Played</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40">
            <span className="block text-2xl font-bold text-green-400">4</span>
            <span className="text-xs text-slate-400">Victories</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40">
            <span className="block text-2xl font-bold text-amber-400">#2</span>
            <span className="text-xs text-slate-400">Current Rank</span>
          </div>
        </div>
      </div>
    </div>
  );
}