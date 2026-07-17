import React from "react";

export default function Badge({ status }) {
  const statusStyles = {
    Upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Ongoing: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  const style = statusStyles[status] || statusStyles.Upcoming;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      {status}
    </span>
  );
}