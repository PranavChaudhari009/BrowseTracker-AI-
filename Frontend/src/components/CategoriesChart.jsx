import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6", "#64748B"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-zinc-900 text-zinc-100 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-700 shadow-xl">
        <span className="font-bold" style={{ color: data.color }}>
          {data.name}
        </span>
        : {data.value} visits ({data.payload.percent}%)
      </div>
    );
  }
  return null;
};

export default function CategoriesChart({ data }) {
  const total = data.reduce((acc, cur) => acc + cur.count, 0);

  const formattedData = data.map((item) => ({
    name: item.category || "Uncategorized",
    value: item.count,
    percent: total > 0 ? ((item.count / total) * 100).toFixed(1) : 0,
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
          <PieIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Search Categories</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Distribution by intent & topic</p>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}