// Applications API (real backend, hireloop-server).
// GET  /applications?jobId=...  — list applications for a job
// PATCH /applications/:id       — update an application's status

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const APPLICATION_STATUSES = [
  "applied",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

// Shape of an application document as stored by the seeker apply flow
// (JobHeaderCard). Fields beyond those are optional extras.
export interface RecruiterApplication {
  _id: string;
  jobId: string;
  userId: string;
  applicantName?: string; // not stored on the document — enriched from /users
  email: string;
  jobTitle: string;
  companyName?: string;
  jobType?: string;
  isRemote?: boolean;
  location?: string;
  experience?: string;
  expectedSalary?: string;
  skills?: string[];
  minSalary?: string;
  maxSalary?: string;
  salaryFrequency?: string;
  deadline?: string;
  applyDate?: string;
  archived?: boolean;
  status: ApplicationStatus;
}

export const getApplicationsByJob = async (
  jobId: string
): Promise<RecruiterApplication[]> => {
  const res = await fetch(`${BASE_URL}/applications?jobId=${jobId}`);
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map(
    (app: Record<string, unknown>) => {
      const rawId = app._id;
      return {
        ...app,
        // _id may arrive as a string or a { $oid: "..." } object depending on
        // serialization — normalize to a plain string (used as React key and
        // in the PATCH url).
        _id:
          typeof rawId === "object" && rawId !== null
            ? ((rawId as { $oid?: string }).$oid ?? String(rawId))
            : String(rawId),
        status: (app.status as ApplicationStatus) ?? "applied",
      };
    }
  ) as RecruiterApplication[];
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<{ ok: boolean }> => {
  // Backend contract (hireloop-server/index.js, PATCH /applications/:id):
  //   200 { success: true, result }    — status updated
  //   400 { success: false, message }  — invalid id or status value
  //   404 { success: false, message }  — no application with this id
  const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return { ok: res.ok };
};
