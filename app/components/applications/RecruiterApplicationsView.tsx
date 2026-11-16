"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationStatsCard from "./ApplicationStatsCard";
import {
  APPLICATION_STATUSES,
  updateApplicationStatus,
  type ApplicationStatus,
  type RecruiterApplication,
} from "@/lib/api/applications";
import { toast } from "@/components/ui/toast";

const statusStyles: Record<ApplicationStatus, string> = {
  applied: "border-neutral-700 bg-neutral-800/80 text-neutral-300",
  shortlisted: "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
  interview: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  rejected: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  hired: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "Recently";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function RecruiterApplicationsView({
  applications,
}: {
  applications: RecruiterApplication[];
}) {
  const router = useRouter();
  const [savingId, setSavingId] = useState<string | null>(null);

  const counts = {
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interview: applications.filter((a) => a.status === "interview").length,
    hired: applications.filter((a) => a.status === "hired").length,
  };

  const handleStatusChange = async (
    id: string,
    applicantName: string,
    status: ApplicationStatus
  ) => {
    setSavingId(id);
    const res = await updateApplicationStatus(id, status);
    setSavingId(null);

    if (res.ok) {
      toast.add({
        title: "Status updated",
        description: `${applicantName} moved to "${status}"`,
      });
      // সার্ভার থেকে ফ্রেশ ডাটা রিলোড করে UI আপডেট করবে
      router.refresh();
    } else {
      toast.add({
        title: "Update failed",
        description: "Could not update the applicant status. Please try again.",
      });
    }
  };

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/80 bg-[#121216] p-12 text-center text-sm text-neutral-400 shadow-lg">
        No applications received for this job yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ApplicationStatsCard title="Total Applicants" value={applications.length} />
        <ApplicationStatsCard
          title="Shortlisted"
          value={counts.shortlisted}
          valueColor="text-indigo-400"
        />
        <ApplicationStatsCard
          title="In Interview"
          value={counts.interview}
          valueColor="text-amber-400"
        />
        <ApplicationStatsCard
          title="Hired"
          value={counts.hired}
          valueColor="text-emerald-400"
        />
      </div>

      {/* Applications Table Container */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#121216] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-[#141418] text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Applied</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Skills</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="group transition-colors hover:bg-[#16161a]/60"
                >
                  {/* Applicant */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-600/10 text-xs font-bold text-indigo-400">
                        {(app.applicantName || app.email)?.charAt(0) || "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white transition-colors group-hover:text-indigo-400 md:text-sm">
                          {app.applicantName || app.email}
                        </div>
                        {app.applicantName && (
                          <div className="mt-0.5 truncate text-[11px] text-neutral-400">
                            {app.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-4 text-xs whitespace-nowrap text-neutral-400">
                    {formatDate(app.applyDate)}
                  </td>

                  {/* Experience */}
                  <td className="px-6 py-4 text-xs font-medium text-neutral-200">
                    {app.experience || "—"}
                    {app.expectedSalary && (
                      <div className="mt-0.5 text-[11px] font-normal text-neutral-400">
                        Expected {app.expectedSalary}
                      </div>
                    )}
                  </td>

                  {/* Skills */}
                  <td className="px-6 py-4">
                    <div className="flex max-w-xs flex-wrap gap-1.5">
                      {(app.skills || []).slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-lg border border-neutral-700/50 bg-neutral-800 px-2 py-1 text-[11px] font-medium text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {(app.skills?.length || 0) > 3 && (
                        <span className="inline-flex items-center rounded-lg border border-neutral-700/50 bg-neutral-800 px-2 py-1 text-[11px] font-medium text-neutral-400">
                          +{(app.skills?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Select */}
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      disabled={savingId === app._id}
                      onChange={(e) =>
                        handleStatusChange(
                          app._id,
                          app.applicantName || app.email,
                          e.target.value as ApplicationStatus
                        )
                      }
                      className={`w-full min-w-32 cursor-pointer appearance-none rounded-lg border px-2.5 py-1.5 text-[11px] font-medium capitalize transition-colors focus:border-indigo-500 focus:outline-none disabled:cursor-wait disabled:opacity-50 ${
                        statusStyles[app.status]
                      }`}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-[#18181c] text-white capitalize"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-neutral-800 px-6 py-4 text-xs text-neutral-400">
          Showing {applications.length} application
          {applications.length === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}