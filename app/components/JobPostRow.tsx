import { Building2, LucideIcon, MapPin, MoreVertical, Pencil, Trash2, Users } from "lucide-react"
import React from "react"
import DeleteJobDialog from "./DeleteJobDialog";
interface Job {
  _id: string;
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


const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const JobPostRow = ({ job }:{job:Job}) => {
  const IconComponent = job.icon || Building2;
  const isExpiredByDate = job.deadline ? new Date(job.deadline) < new Date() : false;
  const isActive = job.status === "Active" && !isExpiredByDate;
  return (
    <tr className="group transition-colors hover:bg-[#16161a]/60">
      {/* Job Title & Dept */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl border p-2.5 ${job.iconBg} flex items-center justify-center`}
          >
            {IconComponent && <IconComponent className="h-4 w-4" />}
          </div>
          <div>
            <div className="font-semibold text-white transition-colors group-hover:text-indigo-400">
              {job.title}
            </div>
            <div className="mt-0.5 text-[11px] text-neutral-400">
              {job.dept}
            </div>
          </div>
        </div>
      </td>

      {/* Company & Location */}
      <td className="px-6 py-4">
        <div className="font-medium text-neutral-200">{job.company}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-400">
          <MapPin className="h-3 w-3 text-neutral-500" />
          <span>{job.location}</span>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center rounded-lg border border-neutral-700/50 bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-300">
          {job.jobType}
        </span>
      </td>

      {/* Compensation */}
<td className="px-6 py-4 font-medium text-neutral-200">
        {job.salaryFrequency === "per hour" ? (
          
          `€${job.minSalary}-€${job.maxSalary}/${job.salaryFrequency}`
        ) : (
         
          `€${job.minSalary}k-€${job.maxSalary}k/${job.salaryFrequency}`
        )}
      </td>

      {/* Applicants */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-1.5 font-medium text-neutral-300">
          <Users className="h-3.5 w-3.5 text-neutral-400" />
          <span>{job.applicants}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {isActive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
            Expired
          </span>
        )}
      </td>

      {/* Deadline */}
<td className="px-6 py-4">
        <div className="font-medium text-neutral-200">{formatDate(job.deadline)}</div>
        <div className="mt-0.5 text-[10px] text-neutral-400">{job.posted}</div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-neutral-700/60 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700">
            <Pencil className="h-3.5 w-3.5 text-neutral-400" />
            <span>Update</span>
          </button>


            <DeleteJobDialog job={job}/>


          <button className="cursor-pointer rounded-xl border border-neutral-700/60 bg-neutral-800 p-1.5 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white">
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default JobPostRow
