"use client";

import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Euro, 
  ArrowRight, 
  Globe 
} from "lucide-react";
import { createJob } from "@/lib/actions/jobs";
import { toast } from "@/components/ui/toast";

export type JobFormData = {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  salaryFrequency: string;
  responsibilities: string;
  requirements: string;
  status: string;
  applicants: number;
  posted:string
};

export default function CreateJobPage() {
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
    formData.set("jobType", jobType);
    formData.set("isRemote", String(isRemote));
    formData.set("status", "Active");

    const rawData = Object.fromEntries(formData.entries());
    
    const jobData: JobFormData = {
      title: rawData.title as string,
      companyName: rawData.companyName as string,
      category: rawData.category as string,
      jobType: jobType, 
      isRemote: isRemote,
      location: rawData.location as string,
      deadline: rawData.deadline as string,
      minSalary: rawData.minSalary as string,
      maxSalary: rawData.maxSalary as string,
      salaryFrequency: rawData.salaryFrequency as string,
      responsibilities: rawData.responsibilities as string,
      requirements: rawData.requirements as string,
      status: "Active",
      applicants:0,
      posted:currentDate,
    };

    console.log("Submitting Job Data:", jobData);

    const result = await createJob(jobData);
    if (result.acknowledged === true) {
      toast.add({
        title: "Job Published successfully!",
      });
    }
    console.log(result);
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-[#0c0c0e] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="text-xs text-neutral-400 mb-1">
              Manage Jobs <span className="mx-1">&gt;</span> <span className="text-white font-medium">Create New Listing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Post a New Job</h1>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-neutral-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              1. Basic Information
            </h2>

            <div className="space-y-4 bg-[#121216] p-5 md:p-6 rounded-2xl border border-neutral-800/80 shadow-lg">
              {/* Job Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue="Frontend Developer"
                  className="w-full bg-[#18181c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Company Name & Job Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Building2 className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      name="companyName"
                      defaultValue="HirePulse Network"
                      className="w-full bg-[#18181c] border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Job Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    className="w-full bg-[#18181c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option>Engineering & Tech</option>
                    <option>Design & UX</option>
                    <option>Product Management</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>

              {/* Job Type Selector */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-neutral-300">
                  Job Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setJobType(type)}
                      className={`py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                        jobType === type
                          ? "bg-[#1d1d24] border-indigo-500/80 text-white shadow-sm"
                          : "bg-[#18181c] border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location, Compensation & Timeline */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-neutral-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              2. Location, Compensation & Timeline
            </h2>

            <div className="space-y-4 bg-[#121216] p-5 md:p-6 rounded-2xl border border-neutral-800/80 shadow-lg">
              
              {/* Remote Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 bg-[#18181c] rounded-xl border border-neutral-800">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-neutral-400" />
                  <div>
                    <div className="text-xs font-medium text-white">Remote Work Allowed</div>
                    <div className="text-[10px] text-neutral-400">Enable worldwide or distributed candidate applications</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    isRemote ? "bg-indigo-600" : "bg-neutral-800"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isRemote ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Location & Calendar Date Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-neutral-300">Job Location</label>
                    <span className="text-[10px] text-neutral-500">Required</span>
                  </div>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      name="location"
                      defaultValue="New York, USA"
                      className="w-full bg-[#18181c] border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-neutral-300">Application Deadline</label>
                  </div>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none z-10" />
                    <input
                      type="date"
                      name="deadline"
                      required
                      className="w-full bg-[#18181c] border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Salary & Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Min Salary / Rate</label>
                  <div className="relative flex items-center">
                    <Euro className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      name="minSalary"
                      defaultValue="25"
                      className="w-full bg-[#18181c] border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Max Salary / Rate</label>
                  <div className="relative flex items-center">
                    <Euro className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      name="maxSalary"
                      defaultValue="40"
                      className="w-full bg-[#18181c] border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Frequency</label>
                  <select
                    name="salaryFrequency"
                    className="w-full bg-[#18181c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option>per hour</option>
                    <option>per month</option>
                    <option>per year</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Responsibilities & Requirements */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-neutral-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              3. Responsibilities & Requirements
            </h2>

            <div className="space-y-4 bg-[#121216] p-5 md:p-6 rounded-2xl border border-neutral-800/80 shadow-lg">
              {/* Key Responsibilities */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Key Responsibilities <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  name="responsibilities"
                  defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                  className="w-full bg-[#18181c] border border-neutral-800 rounded-xl p-3.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              {/* Qualifications & Requirements */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Qualifications & Requirements <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  defaultValue="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Solid understanding of DOM performance and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                  className="w-full bg-[#18181c] border border-neutral-800 rounded-xl p-3.5 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <section>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm self-start md:self-auto cursor-pointer"
            >
              <span>Publish Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </form>

      </div>
    </div>
  );
}