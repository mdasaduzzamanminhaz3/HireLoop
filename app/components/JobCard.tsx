import React from "react";
import { Bookmark, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-[#121216] border border-neutral-800/80 hover:border-neutral-700 p-5 md:p-6 rounded-2xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
          {job.title?.charAt(0) || "J"}
        </div>
        <Link href={`browse-jobs/${job._id}`}>
        <div className="space-y-1">
          <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-xs text-neutral-400">
            {job.companyName || job.company || "HirePulse Network"} • <span className="text-neutral-300">{job.location}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 text-[11px] font-medium border border-neutral-700/50">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              {job.minSalary && job.maxSalary ? `€${job.minSalary} - €${job.maxSalary}` : "Competitive"}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 text-[11px] font-medium border border-neutral-700/50">
              <Briefcase className="w-3 h-3 text-indigo-400" />
              {job.jobType}
            </span>
            {job.isRemote && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                Remote
              </span>
            )}
          </div>
        </div>
        </Link>
      </div>

      <button className="p-2.5 rounded-xl bg-[#18181c] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors self-end md:self-center cursor-pointer">
        <Bookmark className="w-4 h-4" />
      </button>
    </div>
  );
}