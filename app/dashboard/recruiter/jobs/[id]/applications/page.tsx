import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { getJobById } from "@/lib/api/jobs";
import { getApplicationsByJob } from "@/lib/api/applications";
import RecruiterApplicationsView from "@/app/components/applications/RecruiterApplicationsView";

const fallbackJob = {
  title: "Job Applications",
  companyName: "HirePulse Network",
  isRemote: true,
  location: "Remote",
};

const JobApplicationsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  //  promise use kore call korar karone eksathe 2tai fetch hocche alada alada kore fetch korar smy lagche na extra 
  const [job, applications] = await Promise.all([
    getJobById(id).catch(() => null),
    getApplicationsByJob(id),
  ]);

  const jobData = job ?? fallbackJob;

  return (
    <div className="w-full flex-1 min-h-screen bg-[#0c0c0e] p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="space-y-1.5 border-b border-neutral-800 pb-6">
          <div className="text-xs text-neutral-400">
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-white"
            >
              Manage Jobs
            </Link>
            <span className="mx-1">&gt;</span>
            <span className="font-medium text-white">Applications</span>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {jobData.title || "Job Applications"}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {jobData.companyName}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {jobData.isRemote ? "Remote" : jobData.location}
                </span>
              </div>
            </div>

            <Link
              href="/dashboard/recruiter/jobs"
              className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-neutral-700/60 bg-neutral-800 px-4 py-2.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700 md:self-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Jobs</span>
            </Link>
          </div>
        </div>

        {/* Applications View Component */}
        <RecruiterApplicationsView applications={applications} />
      </div>
    </div>
  );
};

export default JobApplicationsPage;