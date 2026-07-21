/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  source: string;
  status:
    | "Saved"
    | "Applied"
    | "Assessment"
    | "Interview"
    | "Rejected"
    | "Offer";
  applicationDate: string;
  notes?: string;
  createdAt?: string;
}

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  addJob: (jobData: Omit<Job, "id">) => Promise<void>;
  updateJob: (id: string, updatedData: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  fetchJobs: () => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const API_URL = `https://careertrack-lite-3tkk.onrender.com/api/applications`;

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const fetchJobs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let active = true;

    if (token) {
      (async () => {
        if (active) {
          await fetchJobs();
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [token, fetchJobs]);

  const addJob = async (jobData: Omit<Job, "id">) => {
    if (!token) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        setJobs((prevJobs) => [result.application, ...prevJobs]);
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const updateJob = async (id: string, updatedData: Partial<Job>) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setJobs((prevJobs) =>
          prevJobs.map((j) => (j.id === id ? { ...j, ...updatedData } : j)),
        );
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const deleteJob = async (id: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((j) => j.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <JobContext.Provider
      value={{ jobs, loading, addJob, updateJob, deleteJob, fetchJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
