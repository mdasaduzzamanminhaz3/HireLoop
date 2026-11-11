import JobPostRow from '@/app/components/JobPostRow';
import { Code,Sigma, Megaphone, Plus, Server, ShieldCheck, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


interface JobPost {
  id: number;
  title: string;
  dept: string;
  company: string;
  location: string;
  type: string;
  compensation: string;
  applicants: string;
  status: "Active" | "Expired" | string;
  deadline: string;
  posted: string;
  icon: LucideIcon;
  iconBg: string;
}

const jobPosts: JobPost[] = [
  {
    id: 1,
    title: "Frontend Developer",
    dept: "Engineering",
    company: "HirePulse Network",
    location: "Remote (New York, USA)",
    type: "Full-time",
    compensation: "€25 - €40 / hr",
    applicants: "34 Candidates",
    status: "Active",
    deadline: "May 30, 2025",
    posted: "Posted 4d ago",
    icon: Code,
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: 2,
    title: "Senior Product Designer",
    dept: "Design",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    compensation: "€90k - €115k / yr",
    applicants: "19 Candidates",
    status: "Active",
    deadline: "Jun 14, 2025",
    posted: "Posted 1w ago",
    icon: Sigma,
    iconBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    id: 3,
    title: "DevOps Specialist",
    dept: "Infrastructure",
    company: "HirePulse Platform",
    location: "Berlin, Germany",
    type: "Full-time",
    compensation: "€95k - €120k / yr",
    applicants: "12 Candidates",
    status: "Active",
    deadline: "Jun 30, 2025",
    posted: "Posted 2w ago",
    icon: Server,
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: 4,
    title: "Product Marketing Lead",
    dept: "Marketing",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    type: "Full-time",
    compensation: "€80k - €105k / yr",
    applicants: "27 Candidates",
    status: "Active",
    deadline: "Jul 15, 2025",
    posted: "Posted 5d ago",
    icon: Megaphone,
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: 5,
    title: "QA Automation Engineer",
    dept: "Quality",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    type: "Part-time",
    compensation: "€35 - €50 / hr",
    applicants: "8 Candidates",
    status: "Expired",
    deadline: "May 01, 2025",
    posted: "Closed",
    icon: ShieldCheck,
    iconBg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
];
const ManageJobPage = () => {
    return (
<div className="flex-1 w-full min-h-screen bg-[#0c0c0e] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="text-xs text-neutral-400">
                Manage Jobs <span className="mx-1">&gt;</span> <span className="text-white font-medium">Job Listings & Postings</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Job Posts</h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Review live listings, monitor applicants, and update job details across your organization.
            </p>
          </div>
          
          <Link
            href="/dashboard/recruiter/jobs/create-job"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Job Post</span>
          </Link>
        </div>

        {/* Jobs Table Container */}
        <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-[#16161a]/50">
                  <th className="py-4 px-6">Job Title & Dept</th>
                  <th className="py-4 px-6">Company & Location</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Compensation</th>
                  <th className="py-4 px-6">Applicants</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Deadline</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {jobPosts.map((job) => (
                  <JobPostRow key={job.id} job={job} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    );
};

export default ManageJobPage;