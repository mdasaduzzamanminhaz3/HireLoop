import CompanyOverviewCard from "@/app/components/job-details/CompanyOverviewCard";
import JobHeaderCard from "@/app/components/job-details/JobHeaderCard";
import JobHighlightsGrid from "@/app/components/job-details/JobHighlightsGrid";
import JobMainContent from "@/app/components/job-details/JobMainContent";
import { getJobById } from "@/lib/api/jobs";
import React from "react";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] text-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">Job post not found or loading...</p>
      </div>
    );
  }
const frequency = job?.salaryFrequency ? job.salaryFrequency.replace("per ", "") : "hr";
  const jobData = {
    title: job.title,
    company: job.companyName || "HirePulse Network",
    isVerified: true,
    salaryRange: job?.minSalary && job?.maxSalary 
    ? `€${job.minSalary} – €${job.maxSalary} / ${frequency}` 
    : "Competitive",
    location: job.isRemote ? "Remote" : job.location,
    jobType: job.jobType,
    
    description: job.responsibilities, 
    responsibilities: typeof job.responsibilities === "string" 
      ? job.responsibilities.split(". ").filter(Boolean) 
      : job.responsibilities,
      
    skillTags: [job.category, job.jobType, job.isRemote ? "Remote" : "On-site"],
    
    requirements: typeof job.requirements === "string"
      ? job.requirements.split("\n").map((req: string) => req.replace(/^[•\-*]\s*/, ""))
      : job.requirements,
      
    companyInfo: {
      size: "250 - 500 Employees",
      industry: job.category,
      websiteUrl: "https://example.com",
    },
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Job Header Card */}
        <JobHeaderCard
          title={jobData.title}
          company={jobData.company}
          isVerified={jobData.isVerified}
        />

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: 4 Highlight Cards + Main Details Card */}
          <div className="lg:col-span-2 space-y-6">
            <JobHighlightsGrid
              salaryRange={jobData.salaryRange}
              location={jobData.location}
              jobType={jobData.jobType}
            />

            <JobMainContent
              description={job.responsibilities}
              responsibilities={jobData.responsibilities}
              skillTags={jobData.skillTags}
              requirements={jobData.requirements}
            />
          </div>

          {/* Right Column: Company Overview Sidebar */}
          <div className="lg:col-span-1">
            <CompanyOverviewCard
              size={jobData.companyInfo.size}
              industry={jobData.companyInfo.industry}
              websiteUrl={jobData.companyInfo.websiteUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;