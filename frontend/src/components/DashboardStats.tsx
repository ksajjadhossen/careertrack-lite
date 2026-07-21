import React from "react";
import {
  Layers,
  Bookmark,
  Send,
  FileText,
  HelpCircle,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { useJobs } from "../context/JobContext";

export default function DashboardStats() {
  const { jobs } = useJobs();

  const getCount = (status?: string) => {
    if (!status) return jobs.length;
    return jobs.filter((j) => j.status === status).length;
  };

  const stats = [
    {
      label: "Total Applications",
      count: getCount(),
      icon: Layers,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Saved Jobs",
      count: getCount("Saved"),
      icon: Bookmark,
      color: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    },
    {
      label: "Applied Jobs",
      count: getCount("Applied"),
      icon: Send,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Assessments",
      count: getCount("Assessment"),
      icon: FileText,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Interviews",
      count: getCount("Interview"),
      icon: HelpCircle,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Rejections",
      count: getCount("Rejected"),
      icon: XCircle,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      label: "Offers",
      count: getCount("Offer"),
      icon: CheckCircle,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="flex-1 min-w-[240px] max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-lg flex items-center justify-between shadow-sm"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.count}
              </h3>
            </div>
            <div className={`p-2.5 rounded-lg border ${stat.color}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
