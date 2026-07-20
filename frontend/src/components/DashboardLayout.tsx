import React, { useState } from "react";
import DashboardStats from "../components/DashboardStats";
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";
import JobFilters from "../components/JobFilters";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

type TabType = "dashboard" | "jobs";

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 font-sans flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
        />

        <div className="md:pl-64 flex flex-col min-h-screen w-full">
          <Header
            activeTab={activeTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            userEmail={user?.email}
            userInitial={userInitial}
          />

          <main className="p-6 flex-1 space-y-6 max-w-7xl w-full mx-auto flex flex-col justify-between">
            <div className="space-y-6">
              {activeTab === "dashboard" ? (
                <>
                  <DashboardStats />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <JobList previewOnly={true} />
                    </div>
                    <div>
                      <JobForm />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <JobFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <JobList
                        previewOnly={false}
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        sortBy={sortBy}
                      />
                    </div>
                    <div>
                      <JobForm />
                    </div>
                  </div>
                </>
              )}
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
