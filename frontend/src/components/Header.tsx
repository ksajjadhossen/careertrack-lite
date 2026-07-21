import React from "react";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userEmail?: string;
  userInitial: string;
}

export default function Header({
  activeTab,
  darkMode,
  setDarkMode,
  userEmail,
  userInitial,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 transition-colors">
      <h1 className="text-lg font-bold tracking-tight capitalize text-slate-900 dark:text-slate-50">
        {activeTab === "dashboard" ? "Overview" : "Applications Workspace"}
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-amber-600 dark:text-amber-400 font-medium"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div
          title={userEmail || "User"}
          className="h-8 w-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm"
        >
          {userInitial}
        </div>
      </div>
    </header>
  );
}
