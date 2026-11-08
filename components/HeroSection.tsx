"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Star,
  Sparkles,
} from "lucide-react";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Users,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export function HeroSection() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ jobTitle, location });
  };

  return (
    <section className="relative w-full bg-[#0a0a0c] text-white pt-24 pb-16 px-4 md:px-6 overflow-hidden flex flex-col items-center">
      {/* Background Globe Image */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-50 md:opacity-60">
        <Image
          src="/images/globe.png"
          alt="Globe Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle radial overlay for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-10 md:space-y-12">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-neutral-800 bg-[#161619]/90 px-3.5 py-1.5 text-[11px] md:text-xs font-mono tracking-wider text-neutral-300 shadow-xl backdrop-blur-md"
        >
          <span className="flex items-center gap-1 text-amber-500">
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>💼</span>
          </span>
          <span className="font-semibold text-white">50,000+</span>
          <span className="text-neutral-400">NEW JOBS THIS MONTH</span>
        </motion.div>

        {/* Main Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-3xl px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </motion.div>

        {/* Search Bar Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-3xl space-y-4"
        >
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center bg-[#121215]/95 border border-neutral-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl gap-2"
          >
            {/* Job Title Input */}
            <div className="flex items-center gap-3 px-3 py-2 w-full md:w-1/2">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Vertical Separator line (Desktop) */}
            <div className="hidden md:block h-6 w-[1px] bg-neutral-800" />
            <div className="block md:hidden h-[1px] w-full bg-neutral-800 my-1" />

            {/* Location Input */}
            <div className="flex items-center gap-3 px-3 py-2 w-full md:w-1/2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Search Action Button */}
            <button
              type="submit"
              className="w-full md:w-auto p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center shrink-0 active:scale-95"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Trending Positions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs md:text-sm text-neutral-400">
            <span className="mr-1 text-neutral-500 text-xs">Trending Position:</span>
            {trendingPositions.map((tag) => (
              <button
                key={tag}
                onClick={() => setJobTitle(tag)}
                className="px-3 py-1 rounded-full bg-[#18181c]/90 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Subheading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 md:pt-12 px-2"
        >
          <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-neutral-200 tracking-tight leading-snug">
            Assisting over <span className="text-white">15,000</span> job seekers
            <br className="hidden sm:block" /> find their dream positions.
          </h2>
        </motion.div>

        {/* 4 Cards Grid (Responsive: 1 col on very small screens, 2 cols on mobile/tablet, 4 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-2"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-row sm:flex-col justify-between sm:justify-between items-center sm:items-start p-5 sm:p-6 bg-[#121215]/80 border border-neutral-800/80 rounded-2xl backdrop-blur-md shadow-xl text-left hover:border-neutral-700 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 sm:mb-6">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-right sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}