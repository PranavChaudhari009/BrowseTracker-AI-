import React from "react";

export const SkeletonCard = ({ height = "h-28" }) => (
  <div className={`w-full ${height} bg-zinc-200 dark:bg-zinc-800/60 rounded-2xl animate-pulse p-5`} />
);

export const SkeletonChart = ({ height = "h-80" }) => (
  <div className={`w-full ${height} bg-zinc-200 dark:bg-zinc-800/60 rounded-2xl animate-pulse p-6`} />
);