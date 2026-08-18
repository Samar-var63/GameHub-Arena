"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeaveTeamButton({ teamId, userId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLeaveTeam = async () => {
    // User se confirmation lenge pehle
    if (!confirm("Are you sure you want to leave this team?")) return;

    setLoading(true);
    try {
      const res = await fetch('/api/team/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, userId })
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message); // Success message dikhayega
        router.refresh(); // Page ko refresh karega update dikhane ke liye
        router.push('/'); // User ko home ya dashboard par bhej dega
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLeaveTeam}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
    >
      {loading ? "Leaving..." : "Leave Team"}
    </button>
  );
}