import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface JobFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function JobFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: JobFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-4 rounded-lg shadow-sm">
      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by company or title..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Filter by Status */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
          <Filter size={16} />
        </span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Assessment">Assessment</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
          <ArrowUpDown size={16} />
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>
    </div>
  );
}
