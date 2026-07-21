import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { Job, JobContextType } from "../types/job";
import {
  fetchJobsAPI,
  addJobAPI,
  updateJobAPI,
  deleteJobAPI,
} from "../services/api";

export type { Job };

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetchJobsAPI()
      .then((data) => {
        if (isMounted) {
          setJobs(Array.isArray(data) ? data : data.applications || []);
        }
      })
      .catch((error) => console.error("Error loading jobs:", error));

    return () => {
      isMounted = false;
    };
  }, []);

  const addJob = useCallback(async (jobData: Omit<Job, "id">) => {
    try {
      const res = await addJobAPI(jobData);
      const newJob = res.application || res;
      setJobs((prev) => [newJob, ...prev]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  }, []);

  const updateJob = useCallback(
    async (id: string, updatedJob: Partial<Job>) => {
      try {
        const res = await updateJobAPI(id, updatedJob);
        const updatedData = res.application || updatedJob;
        setJobs((prev) =>
          prev.map((job) => (job.id === id ? { ...job, ...updatedData } : job)),
        );
      } catch (error) {
        console.error("Error updating job:", error);
      }
    },
    [],
  );

  const deleteJob = useCallback(async (id: string) => {
    try {
      await deleteJobAPI(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
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
