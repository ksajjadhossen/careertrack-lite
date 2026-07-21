import React from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { useJobs, type Job } from "../context/JobContext";

interface JobListProps {
  previewOnly: boolean;
  searchTerm?: string;
  statusFilter?: string;
  sortBy?: string;
}

export default function JobList({
  previewOnly,
  searchTerm = "",
  statusFilter = "all",
  sortBy = "newest",
}: JobListProps) {
  const { jobs, updateJob, deleteJob } = useJobs();

  const statusColors: Record<Job["status"], string> = {
    Saved: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Assessment: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Interview: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Offer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.applicationDate).getTime();
      const dateB = new Date(b.applicationDate).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  const displayedJobs = previewOnly ? filteredJobs.slice(0, 5) : filteredJobs;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-lg shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex justify-between items-center">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white">
          Recent Applications
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-800/40 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800/80">
              <th className="px-6 py-4">Company & Role</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-sm">
            {displayedJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-400">
                  No applications found.
                </td>
              </tr>
            ) : (
              displayedJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {job.companyName}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      {job.jobTitle} •{" "}
                      <span className="opacity-70">{job.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {job.applicationDate}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateJob(job.id, {
                          status: e.target.value as Job["status"],
                        })
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border bg-transparent cursor-pointer outline-none ${statusColors[job.status]}`}
                    >
                      <option
                        value="Saved"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Saved
                      </option>
                      <option
                        value="Applied"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Applied
                      </option>
                      <option
                        value="Assessment"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Assessment
                      </option>
                      <option
                        value="Interview"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Interview
                      </option>
                      <option
                        value="Rejected"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Rejected
                      </option>
                      <option
                        value="Offer"
                        className="dark:bg-slate-900 text-slate-300"
                      >
                        Offer
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {job.jobUrl && (
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
