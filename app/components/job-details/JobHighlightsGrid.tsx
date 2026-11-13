import React from "react";
import { Banknote, MapPin, Clock, BarChart3 } from "lucide-react";

interface JobHighlightsProps {
  salaryRange: string;
  location: string;
  jobType: string;
  experience: string;
}

export default function JobHighlightsGrid({
  salaryRange,
  location,
  jobType,
  experience,
}: JobHighlightsProps) {
  const highlights = [
    {
      label: "SALARY RANGE",
      value: salaryRange,
      icon: Banknote,
    },
    {
      label: "LOCATION",
      value: location,
      icon: MapPin,
    },
    {
      label: "JOB TYPE",
      value: jobType,
      icon: Clock,
    },
    {
      label: "EXPERIENCE",
      value: experience,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {highlights.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-[#121216] border border-neutral-800/80 rounded-2xl p-4 md:p-5 space-y-2.5"
          >
            <Icon className="w-4 h-4 text-neutral-400" />
            <div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
                {item.label}
              </div>
              <div className="text-xs md:text-sm font-semibold text-white mt-0.5">
                {item.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}