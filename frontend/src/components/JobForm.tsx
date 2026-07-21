import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useJobs, type Job } from "../context/JobContext";

export default function JobForm() {
  const { addJob } = useJobs();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobUrl: "",
    source: "LinkedIn",
    applicationDate: new Date().toISOString().split("T")[0],
    status: "Applied" as Job["status"],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.jobTitle) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addJob(formData);
      setFormData({
        companyName: "",
        jobTitle: "",
        jobUrl: "",
        source: "LinkedIn",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        notes: "",
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-lg shadow-sm">
      <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
        <PlusCircle size={18} className="text-indigo-500" /> Add Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-400">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Enter company name"
            className="w-full mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400">
            Job Title *
          </label>
          <input
            type="text"
            required
            value={formData.jobTitle}
            onChange={(e) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
            placeholder="Enter job title  "
            className="w-full mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400">
              Source
            </label>
            <select
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              className="w-full mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Bdjobs">Bdjobs</option>
              <option value="Indeed">Indeed</option>
              <option value="Wellfound">Wellfound</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Job["status"],
                })
              }
              className="w-full mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="Saved">Saved</option>
              <option value="Applied">Applied</option>
              <option value="Assessment">Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all text-sm disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}
