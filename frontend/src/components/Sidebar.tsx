import React from "react";
import { Briefcase, LayoutDashboard, LogOut } from "lucide-react";

interface SidebarProps {
  activeTab: "dashboard" | "jobs";
  setActiveTab: (tab: "dashboard" | "jobs") => void;
  logout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  logout,
}: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <Briefcase size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            CareerTrack
          </span>
        </div>

        <nav className="space-y-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "jobs"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Briefcase size={18} /> My Applications
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
