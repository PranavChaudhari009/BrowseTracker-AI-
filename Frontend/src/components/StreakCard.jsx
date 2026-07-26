import React from "react";
import { Flame, Trophy } from "lucide-react";

export default function StreakCard({ streakData }) {
  const current = streakData?.current_streak ?? 0;
  const longest = streakData?.longest_streak ?? 0;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-amber-500" /> Search Streak
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md">
            <Flame className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
              Current Streak
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {current} <span className="text-sm font-medium text-zinc-500">Days</span>
            </p>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <div className="p-3 bg-indigo-500 text-white rounded-xl shadow-md">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
              Longest Streak
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {longest} <span className="text-sm font-medium text-zinc-500">Days</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}