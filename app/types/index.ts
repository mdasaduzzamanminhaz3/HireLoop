export interface MongoId {
  $oid?: string;
}

export interface Application {
  _id: MongoId | string;
  jobId: string;
  userId: string;
  email: string;
  jobTitle: string;
  companyName: string;
  jobType?: string;
  applyDate?: string;    
  appliedDate?: string;  
  status?: "applied" | "review" | "shortlisted" | "rejected" | "offered" | string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "seeker" | "recruiter" | "admin";
}