import React from "react";

import { Send, Clock, CheckCircle, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
}

export default function DashboardStats() {
  const stats: StatItem[] = [
    {
      label: "Total Applied",
      count: 24,
      icon: Send,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Pending Response",
      count: 12,
      icon: Clock,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Interviews Scheduled",
      count: 5,
      icon: CheckCircle,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Rejected",
      count: 7,
      icon: XCircle,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm transition-all hover:scale-[1.02]"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold tracking-tight">
                {stat.count}
              </h3>
            </div>
            <div className={`p-3 rounded-xl border ${stat.color}`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
