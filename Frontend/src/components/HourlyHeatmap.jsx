import React from "react";
import { Clock } from "lucide-react";

export default function HourlyHeatmap({ data = [] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const getHourLabel = (hour) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  const getColorIntensity = (count) => {
    if (count === 0) return "bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-400";
    const ratio = count / maxCount;
    if (ratio < 0.25) return "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900";
    if (ratio < 0.5) return "bg-indigo-300 dark:bg-indigo-800/70 text-indigo-900 dark:text-indigo-100 border-indigo-400 dark:border-indigo-700";
    if (ratio < 0.75) return "bg-indigo-500 dark:bg-indigo-600 text-white border-indigo-600 dark:border-indigo-500 shadow-sm";
    return "bg-indigo-600 dark:bg-indigo-500 text-white font-bold border-indigo-700 dark:border-indigo-400 shadow-md ring-2 ring-indigo-400/30";
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Hourly Activity Heatmap</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Browsing volume distribution by hour (0 - 23)</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3.5 h-3.5 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-200 dark:bg-indigo-950" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-400 dark:bg-indigo-700" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-600 dark:bg-indigo-500" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Grid of 24 hours */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
        {data.map((item) => {
          const hourLabel = getHourLabel(item.hour);
          return (
            <div
              key={item.hour}
              className="group relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 hover:scale-105 cursor_pointer"
            >
              <div className={`w-full py-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${getColorIntensity(item.count)}`}>
                {item.count}
              </div>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                {hourLabel}
              </span>

              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 bg-zinc-900 text-white text-xs py-1 px-2.5 rounded-md shadow-xl border border-zinc-700 whitespace-nowrap">
                <span className="font-bold text-indigo-400">{hourLabel}</span>: {item.count} visits
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}