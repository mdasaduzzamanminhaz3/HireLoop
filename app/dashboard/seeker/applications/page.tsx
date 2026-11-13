import React from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import ApplicationStatsCard from "@/app/components/applications/ApplicationStatsCard";
import ApplicationRow from "@/app/components/applications/ApplicationRow";

const MyApplicationsPage = async () => {
  // ডামি ডাটা (পরে ব্যাকএন্ড থেকে ফেচ করে বসাবেন)
  const applications = [
    {
      _id: "1",
      jobTitle: "Senior Frontend Engineer",
      companyName: "Stark Industries",
      jobType: "Full-time",
      appliedDate: "2 hours ago",
      status: "Applied",
    },
    {
      _id: "2",
      jobTitle: "Product Designer",
      companyName: "Cyberdyne Systems",
      jobType: "Contract",
      appliedDate: "1 day ago",
      status: "Review",
    },
    {
      _id: "3",
      jobTitle: "Lead Data Scientist",
      companyName: "Wayne Enterprises",
      jobType: "Full-time",
      appliedDate: "4 days ago",
      status: "Shortlisted",
    },
    {
      _id: "4",
      jobTitle: "Cloud Architect",
      companyName: "Oscorp Tech",
      jobType: "Full-time",
      appliedDate: "1 week ago",
      status: "Rejected",
    },
    {
      _id: "5",
      jobTitle: "AI Research Engineer",
      companyName: "Hooli Corp",
      jobType: "Full-time",
      appliedDate: "2 weeks ago",
      status: "Offered",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white pt-24 px-6 md:px-10 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar: Title & Export Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Applications</h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Active / Archived Tabs */}
            <div className="bg-[#121216] border border-neutral-800 p-1 rounded-xl flex items-center text-xs font-medium">
              <button className="px-3 py-1.5 rounded-lg bg-[#1a1a20] text-white shadow-sm">
                Active
              </button>
              <button className="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors">
                Archived
              </button>
            </div>

            {/* Export PDF Button */}
            <button className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ApplicationStatsCard title="Total Applied" value="24" />
          <ApplicationStatsCard title="Shortlisted" value="8" />
          <ApplicationStatsCard title="Interviews" value="3" />
          <ApplicationStatsCard title="Success Rate" value="12%" valueColor="text-emerald-400" />
        </div>

        {/* Applications Table Container */}
        <div className="bg-[#121216] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase bg-[#141418]">
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Applied</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {applications.map((app) => (
                  <ApplicationRow key={app._id} app={app} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-neutral-800 text-xs text-neutral-400">
            <div>Showing 1-5 of 24 applications</div>
            <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
              <button className="w-8 h-8 rounded-xl bg-[#18181c] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center shadow-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-xl bg-[#18181c] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-xl bg-[#18181c] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">
                3
              </button>
              <button className="w-8 h-8 rounded-xl bg-[#18181c] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyApplicationsPage;