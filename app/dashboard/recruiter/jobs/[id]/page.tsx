import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { getJobById } from "@/lib/api/jobs";

const formatDate = (date?: string) => 
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

const fallbackJob = {
  _id: "",
  title: "Frontend Developer",
  companyName: "HirePulse Network",
  category: "Engineering & Tech",
  jobType: "Full-time",
  location: "Berlin, Germany",
  isRemote: true,
  minSalary: "25",
  maxSalary: "40",
  salaryFrequency: "per hour",
  deadline: "2026-12-31",
  status: "Active",
  applicants: 7,
  responsibilities: "Own the end-to-end delivery of user-facing features.",
  requirements: "• 3+ years of experience with React and TypeScript",
};

// healper function
const toList = (data?: string | string[]) =>
  Array.isArray(data) 
    ? data 
    : (data?.split(/\r?\n|\.\s+/) || []).map(s => s.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean);

const JobDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const job = await getJobById(id).catch(() => null);
  const jobData = job ?? fallbackJob;

  const isActive = jobData.status === "Active" && (!jobData.deadline || new Date(jobData.deadline) > new Date());
  const freq = jobData.salaryFrequency?.replace("per ", "") || "hr";
  const salaryRange = jobData.minSalary && jobData.maxSalary ? `$${jobData.minSalary} – $${jobData.maxSalary} / ${freq}` : "Competitive";

  const responsibilities = toList(jobData.responsibilities);
  const requirements = toList(jobData.requirements);
  return (
    <div className="w-full flex-1 min-h-screen bg-[#0c0c0e] p-6 text-white md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="space-y-1.5 border-b border-neutral-800 pb-6">
          <div className="text-xs text-neutral-400">
            <Link href="/dashboard/recruiter/jobs" className="transition-colors hover:text-white">
              Manage Jobs
            </Link>
            <span className="mx-1">&gt;</span>
            <span className="font-medium text-white">{jobData.title}</span>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {jobData.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {jobData.companyName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {jobData.isRemote ? "Remote" : jobData.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {jobData.applicants ?? 0} applicants
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Deadline {formatDate(jobData.deadline)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                isActive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-neutral-700 bg-neutral-800 text-neutral-400"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"}`} />
                {isActive ? "Active" : "Expired"}
              </span>

              <Link
                href={`/dashboard/recruiter/jobs/${id}/applications`}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 md:text-sm"
              >
                <span>View Applications</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Salary Range</div>
            <div className="text-sm font-semibold text-white">{salaryRange}</div>
          </div>
          <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Location</div>
            <div className="text-sm font-semibold text-white">{jobData.isRemote ? "Remote" : jobData.location}</div>
          </div>
          <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Job Type</div>
            <div className="text-sm font-semibold text-white">
              {jobData.jobType}
              {jobData.category && <span className="ml-2 text-[11px] font-normal text-neutral-400">{jobData.category}</span>}
            </div>
          </div>
        </div>

        {/* Responsibilities & Requirements */}
        <div className="space-y-8 rounded-2xl border border-neutral-800/80 bg-[#121216] p-6 shadow-lg md:p-8">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-white md:text-lg">Key Responsibilities</h2>
            <ul className="space-y-2.5 text-xs text-neutral-400 md:text-sm">
              {responsibilities.length > 0 ? (
                responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-500">No responsibilities listed.</li>
              )}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-white md:text-lg">Qualifications & Requirements</h2>
            <ul className="space-y-2.5 text-xs text-neutral-400 md:text-sm">
              {requirements.length > 0 ? (
                requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
                    <span>{req}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-500">No requirements listed.</li>
              )}
            </ul>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/dashboard/recruiter/jobs/${id}/applications`}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 md:text-sm"
          >
            <span>Review Applications ({jobData.applicants ?? 0})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard/recruiter/jobs"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-700/60 bg-neutral-800 px-5 py-2.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700 md:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Manage Jobs</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default JobDetailPage;