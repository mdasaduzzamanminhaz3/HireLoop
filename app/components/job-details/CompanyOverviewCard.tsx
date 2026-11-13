import React from "react";

interface CompanyOverviewProps {
  size: string;
  industry: string;
  websiteUrl?: string;
}

export default function CompanyOverviewCard({
  size,
  industry,
  websiteUrl = "#",
}: CompanyOverviewProps) {
  return (
    <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl p-6 space-y-6 h-fit shadow-lg">
      <h2 className="text-base md:text-lg font-bold text-white">
        Company Overview
      </h2>

      {/* Office Banner Preview */}
      <div className="relative h-40 w-full rounded-xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-slate-900 via-[#161b22] to-neutral-950 flex items-center justify-center">
        <div className="w-28 h-20 rounded-lg border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm flex items-center justify-center">
          <div className="w-16 h-10 rounded border border-neutral-700/80 bg-neutral-900/90" />
        </div>
      </div>

      {/* Company Meta Details */}
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-2 border-b border-neutral-800/80">
          <span className="uppercase tracking-wider text-[10px] font-semibold text-neutral-500">
            SIZE
          </span>
          <span className="font-medium text-neutral-200">{size}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-neutral-800/80">
          <span className="uppercase tracking-wider text-[10px] font-semibold text-neutral-500">
            INDUSTRY
          </span>
          <span className="font-medium text-neutral-200">{industry}</span>
        </div>
      </div>

      {/* Visit Website CTA */}
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 px-4 rounded-xl bg-[#18181c] hover:bg-[#202026] border border-neutral-800 text-xs font-medium text-neutral-200 transition-colors"
      >
        Visit Website
      </a>
    </div>
  );
}