"use client";

import React from "react";

export default function JobFilters() {
  return (
    <div className="lg:col-span-1 space-y-6 bg-[#121216] p-6 rounded-2xl border border-neutral-800/80 h-fit">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <h2 className="text-sm font-semibold tracking-wide text-white uppercase">Filters</h2>
        <button className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
          Reset All
        </button>
      </div>

      {/* 1. Job Type */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-neutral-400">Job Type</label>
        <div className="space-y-2">
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <label key={type} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-neutral-700 bg-[#18181c] text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Job Category */}
      <div className="pt-4 border-t border-neutral-800 space-y-3">
        <label className="text-xs font-medium text-neutral-400">Job Category</label>
        <div className="space-y-2">
          {["Engineering & Tech", "Design & UX", "Product Management", "Marketing"].map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-neutral-700 bg-[#18181c] text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Salary Period */}
      <div className="pt-4 border-t border-neutral-800 space-y-3">
        <label className="text-xs font-medium text-neutral-400">Salary Period</label>
        <div className="space-y-2">
          {["per hour", "per month", "per year"].map((period) => (
            <label key={period} className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-neutral-700 bg-[#18181c] text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span className="capitalize">{period}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Work Arrangement */}
      <div className="pt-4 border-t border-neutral-800 space-y-3">
        <label className="text-xs font-medium text-neutral-400">Work Arrangement</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-neutral-700 bg-[#18181c] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span>Remote Work Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}