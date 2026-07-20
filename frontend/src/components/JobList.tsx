import React from "react";
import { ExternalLink, MoreVertical } from "lucide-react";

// টাইপ ডিফাইন করা হলো যা ডাটাবেজ ইন্টিগ্রেশনে কাজে লাগবে
export interface Job {
  company: string;
  role: string;
  date: string;
  status: "Pending" | "Interview" | "Rejected";
  type: string;
}

interface JobListProps {
  previewOnly: boolean;
}

export default function JobList({ previewOnly }: JobListProps) {
  const jobs: Job[] = [
    {
      company: "Google",
      role: "Frontend Engineer",
      date: "20 July, 2026",
      status: "Interview",
      type: "Full-time",
    },
    {
      company: "Netflix",
      role: "React Developer",
      date: "18 July, 2026",
      status: "Pending",
      type: "Remote",
    },
    {
      company: "Meta",
      role: "Software Intern",
      date: "15 July, 2026",
      status: "Rejected",
      type: "Contract",
    },
  ];

  // Record টাইপ দিয়ে অবজেক্ট ম্যাপিং স্ট্রং করা হলো
  const statusColors: Record<Job["status"], string> = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Interview: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h2 className="font-bold text-lg">Recent Applications</h2>
        {previewOnly && (
          <button className="text-sm font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">
            View All
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-800/40 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4">Company & Role</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {jobs.map((job, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {job.company}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    {job.role} • <span className="opacity-70">{job.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{job.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusColors[job.status]}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
