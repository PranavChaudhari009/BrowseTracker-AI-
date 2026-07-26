import React from "react";

export default function StatCard({ title, value, icon: Icon, color = "indigo" }) {
  const colorStyles = {
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <p className="text-3xl font-extrabold mt-2 text-zinc-900 dark:text-zinc-50 tracking-tight">
          {value?.toLocaleString() ?? 0}
        </p>
      </div>
      <div className={`p-3.5 rounded-xl border ${colorStyles[color] || colorStyles.indigo}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}