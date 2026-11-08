"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Euro, ArrowRight, Sparkles } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    description: "Build scalable web applications and high-performance backend microservices",
    location: "Remote",
    type: "Full-time",
    salary: "€35–€55/hour",
  },
  {
    id: 3,
    title: "UI/UX Product Designer",
    description: "Design seamless user experiences and modern component design systems",
    location: "London, UK",
    type: "Remote",
    salary: "€30–€45/hour",
  },
  {
    id: 4,
    title: "Backend Developer",
    description: "Optimize database architectures, REST APIs, and server-side logic flows",
    location: "Berlin, Germany",
    type: "Hybrid",
    salary: "€28–€42/hour",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines, cloud infrastructure, and automated deployments",
    location: "Toronto, Canada",
    type: "Remote",
    salary: "€40–€60/hour",
  },
  {
    id: 6,
    title: "AI / ML Engineer",
    description: "Integrate intelligent LLM workflows, open-source models, and automation tools",
    location: "San Francisco, USA",
    type: "Full-time",
    salary: "€50–€75/hour",
  },
];

export function JobDiscoverySection() {
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
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold text-white">SMART JOB DISCOVERY</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            The roles you&apos;d never find by searching
          </h2>
        </motion.div>

        {/* 6 Grid Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between p-7 bg-[#121215]/80 border border-neutral-800/80 rounded-2xl backdrop-blur-md shadow-xl hover:border-neutral-700 hover:bg-[#16161a] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {job.description}
                </p>

                {/* Details Badges (Location, Type, Salary) */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg">
                    <Euro className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Apply Action */}
              <div className="pt-8 border-t border-neutral-800/60 mt-6 flex items-center justify-between">
                <Link
                  href="#apply"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Job Open Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-6"
        >
          <Link
            href="#all-jobs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#161619] hover:bg-[#1e1e24] border border-neutral-800 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            View all job open
          </Link>
        </motion.div>

      </div>
    </section>
  );
}