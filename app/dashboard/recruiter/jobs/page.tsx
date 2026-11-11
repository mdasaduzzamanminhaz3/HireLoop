import JobPostRow from '@/app/components/JobPostRow';
import { getJobs } from '@/lib/api/jobs';
import { Plus,LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


export interface Job {
 _id:string;
  title: string;
  dept: string;
  company: string;
  location: string;
  jobType: string;
maxSalary:number;
  minSalary:number;
  applicants: number;
  salaryFrequency:string;
  status: "Active" | "Expired" | string;
  deadline: string;
  posted: string;
  icon: LucideIcon;
  iconBg: string;
}


const ManageJobPage = async() => {
    const jobs = await getJobs();
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
                {jobs.map((job:Job) => (
                  <JobPostRow key={job._id} job={job} />
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