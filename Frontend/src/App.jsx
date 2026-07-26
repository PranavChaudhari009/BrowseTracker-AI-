import React, { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import AnalyticsPage from "./components/AnalyticsPage";
import { MessageSquare, BarChart3, Sun, Moon } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark class with document.documentElement (html element)
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl font-black text-sm tracking-wider shadow-xs">
            AI
          </div>
          <span className="font-bold text-base hidden sm:inline text-zinc-900 dark:text-zinc-50">
            Browser Tracker
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            AI Chat Assistant
          </button>
        </div>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700 flex items-center gap-2 text-xs font-semibold"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main View Area with Preserved State */}
      <main className="flex-1 py-6 px-4 sm:px-6">
        {/* Analytics Tab View */}
        <div className={activeTab === "analytics" ? "block" : "hidden"}>
          <AnalyticsPage />
        </div>

        {/* Chatbot Tab View */}
        <div className={activeTab === "chat" ? "block" : "hidden"}>
          <div className="py-4">
            <ChatBox />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;