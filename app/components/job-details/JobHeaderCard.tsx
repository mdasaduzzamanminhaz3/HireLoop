"use client";

import React from "react";
import { Bookmark, CheckCircle2, Layers } from "lucide-react";

interface JobHeaderProps {
  title: string;
  company: string;
  isVerified?: boolean;
}

export default function JobHeaderCard({
  title,
  company,
  isVerified = true,
}: JobHeaderProps) {
  return (
    <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
      {/* Left: Logo & Title Info */}
      <div className="flex items-center gap-4 md:gap-5">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#1a1a20] border border-neutral-800 flex items-center justify-center shrink-0 shadow-inner">
          <Layers className="w-7 h-7 text-neutral-300" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-neutral-400">
            <span className="font-medium text-neutral-300">{company}</span>
            <span>•</span>
            {isVerified && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Employer
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Bookmark & Apply Now CTA */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button
          type="button"
          aria-label="Save Job"
          className="p-2.5 md:p-3 rounded-xl bg-[#18181c] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
        >
          <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          type="button"
          className="flex-1 md:flex-initial px-6 py-2.5 md:py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs md:text-sm transition-all shadow-sm cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}