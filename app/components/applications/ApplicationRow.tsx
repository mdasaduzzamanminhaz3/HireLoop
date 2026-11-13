import React from "react";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface Application {
  _id: string;
  jobTitle: string;
  companyName: string;
  jobType: string;
  appliedDate: string;
  status: "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered" | string;
}

export default function ApplicationRow({ app }: { app: Application }) {
  // স্ট্যাটাস অনুযায়ী কালার ও স্টাইল নির্ধারণ
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-neutral-800/80 border-neutral-700 text-neutral-300";
      case "review":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "shortlisted":
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
      case "rejected":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "offered":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      default:
        return "bg-neutral-800 border-neutral-700 text-neutral-400";
    }
  };

  return (
    <tr className="group transition-colors hover:bg-[#16161a]/60 border-b border-neutral-800/60 last:border-none">
      {/* Job Title & Type */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-neutral-800 bg-[#18181c] p-2.5 text-neutral-300 flex items-center justify-center">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-white transition-colors group-hover:text-indigo-400 text-xs md:text-sm">
              {app.jobTitle}
            </div>
            <div className="mt-0.5 text-[11px] text-neutral-400">
              {app.jobType} • Remote
            </div>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-6 py-4 font-medium text-neutral-200 text-xs md:text-sm">
        {app.companyName}
      </td>

      {/* Applied Date */}
      <td className="px-6 py-4 text-xs text-neutral-400">
        {app.appliedDate || "2 hours ago"}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getStatusBadge(
            app.status
          )}`}
        >
          {app.status || "Applied"}
        </span>
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-right">
        <Link
          href={`/applications/${app._id}`}
          className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Details
        </Link>
      </td>
    </tr>
  );
}