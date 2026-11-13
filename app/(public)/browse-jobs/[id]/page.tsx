import CompanyOverviewCard from "@/app/components/job-details/CompanyOverviewCard";
import JobHeaderCard from "@/app/components/job-details/JobHeaderCard";
import JobHighlightsGrid from "@/app/components/job-details/JobHighlightsGrid";
import JobMainContent from "@/app/components/job-details/JobMainContent";
import React from "react";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // এখানে পরবর্তীতে আপনি আপনার API থেকে `id` দিয়ে ডাটা ফেচ করে বসাতে পারবেন
  const jobData = {
    id,
    title: "Senior Product Designer",
    company: "CloudScale AI",
    isVerified: true,
    salaryRange: "$140k – $180k",
    location: "Remote (US)",
    jobType: "Full-time",
    experience: "5+ Years",
    description:
      "At CloudScale AI, we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.",
    responsibilities: [
      "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.",
      "Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.",
      "Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.",
      "Conduct user research and usability testing to validate design decisions and iterate based on feedback.",
    ],
    skillTags: [
      "Figma Expertise",
      "System Thinking",
      "UI/UX Design",
      "Basic Frontend",
    ],
    requirements: [
      "5+ years of experience designing complex B2B SaaS products or data-heavy applications.",
      "A strong portfolio showcasing your design process and problem-solving skills.",
    ],
    companyInfo: {
      size: "250 - 500 Employees",
      industry: "SaaS / Artificial Intelligence",
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
              experience={jobData.experience}
            />

            <JobMainContent
              description={jobData.description}
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