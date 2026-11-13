"use client";

import React, { useState } from "react";
import FilterChecklist from "./FilterChecklist";

export default function JobFilters() {
  const [filters, setFilters] = useState({
    jobType: "",
    category: "",
    remote: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    
    console.log({ ...filters, [name]: value });
  };

  const handleReset = () => {
    setFilters({ jobType: "", category: "", remote: "" });
  };

  return (
    <div className="h-fit space-y-6 rounded-2xl border border-neutral-800/80 bg-[#121216] p-6 lg:col-span-1">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="cursor-pointer text-[11px] text-indigo-400 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* 1. Job Type */}
      <FilterChecklist
        title="Job Type"
        name="jobType"
        items={["Full-time", "Part-time", "Contract", "Internship"]}
        selected={filters.jobType}
        onSelect={handleFilterChange}
      />

      {/* 2. Job Category */}
      <FilterChecklist
        title="Job Category"
        name="category"
        items={[
          "Engineering & Tech",
          "Design & UX",
          "Product Management",
          "Marketing",
        ]}
        selected={filters.category}
        onSelect={handleFilterChange}
      />

      {/* 3. Work Arrangement */}
      <FilterChecklist
        title="Work Arrangement"
        name="remote"
        items={["Remote Work Only"]}
        selected={filters.remote}
        onSelect={handleFilterChange}
      />
    </div>
  );
}