import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Globe } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-700 shadow-xl">
        <p className="font-bold text-indigo-400">{data.domain}</p>
        <p>{data.count.toLocaleString()} visits</p>
      </div>
    );
  }
  return null;
};

export default function TopWebsitesChart({ data }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Top Visited Websites</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Most visited domains across your history</p>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="domain"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99, 102, 241, 0.05)" }} />
            <Bar dataKey="count" fill="#6366F1" radius={[0, 8, 8, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}