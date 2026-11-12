import React from 'react';
import { getJobs } from '@/lib/api/jobs';
import JobFilters from '@/app/components/JobFilters';
import JobCard from '@/app/components/JobCard';
import JobSearchBox from '@/app/components/JobSearchBox';

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();
  
  const jobs = await getJobs(query);


  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white pt-24 px-6 md:px-10 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Section (Navbar-এর নিচে একদম ঠিক পজিশনে) */}
        <div className="space-y-2 border-b border-neutral-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Explore & Browse Jobs</h1>
          <p className="text-xs md:text-sm text-neutral-400">
            Find your next career opportunity across our global network.
          </p>
        </div>

        {/* Search Bar Form */}
        <JobSearchBox/>
        {/* Main Content Layout: Sidebar Filters + Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filters Component */}
          <JobFilters />

          {/* Right Section: Job Cards List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-neutral-400">
                Found <span className="text-white font-semibold">{jobs?.length || 0}</span> Professional Jobs
              </p>
            </div>

            <div className="space-y-4">
              {jobs && jobs.length > 0 ? (
                jobs.map((job: any) => <JobCard key={job._id} job={job} />)
              ) : (
                <div className="bg-[#121216] border border-neutral-800 p-12 text-center rounded-2xl text-neutral-400 text-sm">
                  No job posts found matching your criteria.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BrowseJobsPage;