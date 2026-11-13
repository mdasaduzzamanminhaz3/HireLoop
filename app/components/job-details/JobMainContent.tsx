import React from "react";
import {
  Code2,
  GitBranch,
  PenTool,
  Layout,
  ShieldCheck,
  CircleDollarSign,
  Laptop,
  Infinity as InfinityIcon,
} from "lucide-react";

interface JobMainContentProps {
  description?: string;
  responsibilities?: string[] | string; // স্ট্রিং বা অ্যারে যেকোনোটি হতে পারে
  skillTags?: string[];
  requirements?: string[] | string;
}

export default function JobMainContent({
  description = "",
  responsibilities = [],
  skillTags = [],
  requirements = [],
}: JobMainContentProps) {
  const tagIcons = [Code2, GitBranch, PenTool, Layout];

  const benefits = [
    { label: "Full Health & Dental", icon: ShieldCheck },
    { label: "Competitive 401k", icon: CircleDollarSign },
    { label: "Latest Hardware Stipend", icon: Laptop },
    { label: "Unlimited PTO", icon: InfinityIcon },
  ];

  const responsibilitiesList = Array.isArray(responsibilities)
    ? responsibilities
    : typeof responsibilities === "string" && responsibilities.trim() !== ""
    ? responsibilities.split(". ").filter(Boolean)
    : [];

  const requirementsList = Array.isArray(requirements)
    ? requirements
    : typeof requirements === "string" && requirements.trim() !== ""
    ? requirements.split("\n").map((req: string) => req.replace(/^[•\-*]\s*/, ""))
    : [];

  return (
    <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl p-6 md:p-8 space-y-8 shadow-lg">
      {/* Job Description */}
      <section className="space-y-3">
        <h2 className="text-base md:text-lg font-bold text-white">
          Job Description
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </section>

      {/* Responsibilities */}
      <section className="space-y-3">
        <h2 className="text-base md:text-lg font-bold text-white">
          Responsibilities
        </h2>
        <ul className="space-y-2.5 text-xs md:text-sm text-neutral-400">
          {responsibilitiesList.length > 0 ? (
            responsibilitiesList.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <p className="text-xs text-neutral-500">No responsibilities listed.</p>
          )}
        </ul>
      </section>

      {/* Requirements */}
      <section className="space-y-4">
        <h2 className="text-base md:text-lg font-bold text-white">
          Requirements
        </h2>

        {/* Skill Pills */}
        {skillTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillTags.map((tag, idx) => {
              const TagIcon = tagIcons[idx % tagIcons.length];
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181c] border border-neutral-800 text-xs font-medium text-neutral-300"
                >
                  <TagIcon className="w-3.5 h-3.5 text-neutral-400" />
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Requirement Bullet List */}
        <ul className="space-y-2.5 text-xs md:text-sm text-neutral-400 pt-1">
          {requirementsList.length > 0 ? (
            requirementsList.map((req, index) => (
              <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" />
                <span>{req}</span>
              </li>
            ))
          ) : (
            <p className="text-xs text-neutral-500">No requirements listed.</p>
          )}
        </ul>
      </section>

      {/* Benefits */}
      <section className="space-y-4 pt-2">
        <h2 className="text-base md:text-lg font-bold text-white">Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.label}
                className="flex items-center gap-3 text-xs md:text-sm font-medium text-neutral-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#18181c] border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{benefit.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}