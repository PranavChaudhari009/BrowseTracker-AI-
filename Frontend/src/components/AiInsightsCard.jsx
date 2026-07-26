import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function AiInsightsCard({ insights = [] }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/10 via-white to-purple-900/10 dark:from-indigo-950/40 dark:via-zinc-900 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">AI Insights</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Automated pattern detection & browsing analytics</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/70 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/40 shadow-xs"
          >
            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 leading-relaxed">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}