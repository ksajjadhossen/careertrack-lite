import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { Job, JobContextType } from "../types/job";

export type { Job };

const JobContext = createContext<JobContextType | undefined>(undefined);

const INITIAL_JOBS: Job[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Engineer",
    jobUrl: "https://google.com/jobs",
    source: "LinkedIn",
    applicationDate: "2026-07-20",
    status: "Interview",
    notes: "HR screen completed",
  },
  {
    id: "2",
    companyName: "Netflix",
    jobTitle: "React Developer",
    jobUrl: "https://netflix.com/jobs",
    source: "Company Website",
    applicationDate: "2026-07-18",
    status: "Applied",
  },
  {
    id: "3",
    companyName: "Meta",
    jobTitle: "Software Engineer",
    source: "Referral",
    applicationDate: "2026-07-15",
    status: "Rejected",
  },
];

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem("careertrack_jobs");
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch (error) {
      console.error("Failed to parse jobs from localStorage:", error);
      return INITIAL_JOBS;
    }
  });

  useEffect(() => {
    localStorage.setItem("careertrack_jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = useCallback((jobData: Omit<Job, "id">) => {
    const newJob: Job = {
      ...jobData,
      id: crypto.randomUUID(),
    };
    setJobs((prev) => [newJob, ...prev]);
  }, []);

  const updateJob = useCallback((id: string, updatedJob: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updatedJob } : job)),
    );
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }, []);

  const value = useMemo(
    () => ({ jobs, addJob, updateJob, deleteJob }),
    [jobs, addJob, updateJob, deleteJob],
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
