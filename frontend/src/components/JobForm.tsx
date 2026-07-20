import React, { FormEvent } from "react";

export default function JobForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm sticky top-24">
      <h2 className="font-bold text-lg mb-5">Add New Application</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. Microsoft"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
            Job Title / Role
          </label>
          <input
            type="text"
            placeholder="e.g. Full Stack Developer"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
              Job Type
            </label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm">
              <option>Full-time</option>
              <option>Remote</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
              Status
            </label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm">
              <option>Pending</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all mt-2 text-sm"
        >
          Save Application
        </button>
      </form>
    </div>
  );
}
