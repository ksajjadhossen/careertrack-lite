import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Sun, Moon, Briefcase, LayoutDashboard, LogOut } from "lucide-react";
import DashboardStats from "./components/DashboardStats";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

type TabType = "dashboard" | "jobs";

function DashboardLayout() {
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 font-sans">
        <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
          <div>
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="bg-indigo-600 text-white p-2 rounded-xl">
                <Briefcase size={22} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                CareerTrack
              </span>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "dashboard" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "jobs" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <Briefcase size={18} /> My Applications
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <div className="md:pl-64 flex flex-col min-h-screen">
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-amber-500 dark:text-indigo-400"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div
                title={user?.email || "User"}
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm"
              >
                {userInitial}
              </div>
            </div>
          </header>

          <main className="p-6 flex-1 space-y-8 max-w-7xl w-full mx-auto">
            {activeTab === "dashboard" ? (
              <>
                <DashboardStats />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <JobList previewOnly={true} />
                  </div>
                  <div>
                    <JobForm />
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <JobList previewOnly={false} />
                </div>
                <div>
                  <JobForm />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
