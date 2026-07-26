import React, { useState, useEffect } from "react";
import {
  fetchOverview,
  fetchTopWebsites,
  fetchCategories,
  fetchInsights,
  fetchStreak,
  fetchHourlyActivity,
} from "../services/analyticsApi";

import StatCard from "./StatCard";
import TopWebsitesChart from "./TopWebsitesChart";
import CategoriesChart from "./CategoriesChart";
import HourlyHeatmap from "./HourlyHeatmap";
import StreakCard from "./StreakCard";
import AiInsightsCard from "./AiInsightsCard";
import { SkeletonCard, SkeletonChart } from "./SkeletonLoader";

import { Eye, Globe, Search, Calendar, RefreshCw, AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [overview, setOverview] = useState(null);
  const [topWebsites, setTopWebsites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [streak, setStreak] = useState(null);
  const [hourlyActivity, setHourlyActivity] = useState([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ov, topWeb, cat, ins, str, hr] = await Promise.all([
        fetchOverview(),
        fetchTopWebsites(),
        fetchCategories(),
        fetchInsights(),
        fetchStreak(),
        fetchHourlyActivity(),
      ]);

      setOverview(ov);
      setTopWebsites(topWeb);
      setCategories(cat);
      setInsights(ins.insights || []);
      setStreak(str);
      setHourlyActivity(hr);
    } catch (err) {
      console.error("Failed to load analytics:", err);
      setError("Failed to connect to backend server. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Unable to load analytics</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-md">{error}</p>
        <button
          onClick={loadData}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time insights and activity metrics from your browser history
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
        </button>
      </div>

      {/* 1. Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard title="Total Visits" value={overview?.total_visits} icon={Eye} color="indigo" />
            <StatCard title="Unique Domains" value={overview?.unique_domains} icon={Globe} color="emerald" />
            <StatCard title="Searches" value={overview?.total_searches} icon={Search} color="amber" />
            <StatCard title="Active Days" value={overview?.active_days} icon={Calendar} color="purple" />
          </>
        )}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <TopWebsitesChart data={topWebsites} />
            <CategoriesChart data={categories} />
          </>
        )}
      </div>

      {/* 3. Hourly Activity Heatmap */}
      {loading ? <SkeletonChart height="h-64" /> : <HourlyHeatmap data={hourlyActivity} />}

      {/* 4. Search Streak */}
      {loading ? <SkeletonCard height="h-40" /> : <StreakCard streakData={streak} />}

      {/* 5. AI Insights */}
      {loading ? <SkeletonCard height="h-48" /> : <AiInsightsCard insights={insights} />}
    </div>
  );
}