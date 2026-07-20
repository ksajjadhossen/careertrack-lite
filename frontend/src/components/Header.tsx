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
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-lg font-bold tracking-tight capitalize text-slate-900 dark:text-white">
        {activeTab === "dashboard" ? "Overview" : "Applications Workspace"}
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-amber-500 dark:text-indigo-400"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div
          title={userEmail || "User"}
          className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm"
        >
          {userInitial}
        </div>
      </div>
    </header>
  );
}
