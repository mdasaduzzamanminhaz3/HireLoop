"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  BarChart3,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: BarChart3,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: LineChart,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full bg-[#0a0a0c] text-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
        
        {/* Top Badge & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Section Small Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-[#161619]/90 px-4 py-1.5 text-xs font-mono tracking-wider text-neutral-300 shadow-xl backdrop-blur-md">
            <span className="text-indigo-400">■</span>
            <span className="font-semibold text-white tracking-widest">FEATURES JOB</span>
            <span className="text-indigo-400">■</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Everything you need <br /> to succeed
          </h2>
        </motion.div>

        {/* 8 Features Grid (4 columns on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between p-6 bg-[#121215]/80 border border-neutral-800/80 rounded-2xl backdrop-blur-md shadow-xl hover:border-neutral-700 hover:bg-[#16161a] transition-all duration-300"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-indigo-400 group-hover:border-neutral-700 transition-colors mb-6 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}