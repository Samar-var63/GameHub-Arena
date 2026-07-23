"use client";
import React from "react";
import GlassCard from "@/components/GlassCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <GlassCard className="p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Login to GameHub</h1>
        <p className="text-slate-400 text-sm mb-6">
          Access your tournament dashboard and matches.
        </p>
        <a 
          href="/dashboard"
          className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors text-center"
        >
          Sign In
        </a>
      </GlassCard>
    </div>
  );
}