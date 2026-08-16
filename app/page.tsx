import Link from "next/link";

export default function Home() {
  return (
   <main className="min-h-screen text-white flex flex-col items-center justify-center p-8 text-center">
  <h1 className="text-5xl font-extrabold text-indigo-500 mb-4 tracking-tight">
        GAMEHUB ARENA
      </h1>
      <p className="text-slate-400 max-w-md mb-8 text-lg">
        The ultimate platform for competitive gaming, tournaments, and team leaderboards.
      </p>
      <div className="flex gap-4">
        <Link
          href="/tournaments"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl transition text-white"
        >
          View Tournaments
        </Link>
        <Link
          href="/teams"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 font-semibold rounded-xl text-slate-200 transition"
        >
          Explore Teams
        </Link>
      </div>
    </main>
  );
}