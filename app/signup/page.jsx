"use client";
import React from "react";
import GoogleSignInButton from "@/components/Singin.google";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Sign Up Page</h1>
      <div className="w-full max-w-sm">
        <GoogleSignInButton />
      </div>
    </div>
  );
}