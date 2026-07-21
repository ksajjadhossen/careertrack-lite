import type { Job } from "../types/job";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  `https://careertrack-lite-3tkk.onrender.com/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchJobsAPI = async () => {
  const response = await fetch(`${BASE_URL}/applications`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch jobs");
  }

  return response.json();
};

export const addJobAPI = async (jobData: Omit<Job, "id">) => {
  const data = jobData as Record<string, unknown>;

  const payload = {
    companyName: (data.companyName as string) || (data.company as string) || "",
    jobTitle: (data.jobTitle as string) || (data.title as string) || "",
    jobUrl: (data.jobUrl as string) || (data.url as string) || "",
    source: (data.source as string) || "LinkedIn",
    status: (data.status as string) || "Applied",
    applicationDate:
      (data.applicationDate as string) || new Date().toISOString(),
    notes: (data.notes as string) || "",
  };

  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add job");
  }

  return response.json();
};

export const updateJobAPI = async (id: string, updatedJob: Partial<Job>) => {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedJob),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update job");
  }

  return response.json();
};

export const deleteJobAPI = async (id: string) => {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job");
  }

  return response.json();
};
