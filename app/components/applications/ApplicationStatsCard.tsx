import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export default function ApplicationStatsCard({
  title,
  value,
  valueColor = "text-white",
}: StatsCardProps) {
  return (
    <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl p-5 space-y-2 shadow-lg">
      <div className="text-xs font-medium text-neutral-400">{title}</div>
      <div className={`text-2xl md:text-3xl font-bold tracking-tight ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}