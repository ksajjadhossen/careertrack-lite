export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  source: string;
  applicationDate: string;
  status:
    | "Saved"
    | "Applied"
    | "Assessment"
    | "Interview"
    | "Rejected"
    | "Offer";
  notes?: string;
}

export interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (id: string, updatedJob: Partial<Job>) => void;
  deleteJob: (id: string) => void;
}
