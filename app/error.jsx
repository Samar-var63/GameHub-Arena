"use client";

import React, { useEffect } from "react";
import PageShell from "@/components/PageShell";
import PrimaryButton from "@/components/PrimaryButton";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Application runtime failure captured:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md border border-slate-900 bg-slate-900/20 backdrop-blur-xl rounded-2xl">
          <span className="text-5xl block mb-4">⚠</span>

          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            Arena Systems Disrupted
          </h2>

          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            An unexpected error occurred while processing arena matches or
            leaderboards.
          </p>

          <button
            onClick={() => reset()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all"
          >
            Attempt System Reset
          </button>
        </div>
      </body>
    </html>
  );
}