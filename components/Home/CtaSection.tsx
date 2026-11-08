"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0a0a0c] text-white py-28 px-4 overflow-hidden flex items-center justify-center">
      
      {/* Background Grid Image (cta-bg.png) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-80">
        <Image
          src="/images/cta-bg.png"
          alt="CTA Grid Background"
          fill
          className="object-cover object-center"
        />
        {/* Radial gradient overlay to seamlessly blend the bottom into dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Your next role is <br />
            already looking for you
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-normal max-w-md mx-auto leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          {/* Create a free account Button */}
          <Link
            href="#signup"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-sm font-semibold shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Create a free account
          </Link>

          {/* View pricing Button */}
          <Link
            href="#pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#161619]/90 hover:bg-[#202025] border border-neutral-800 text-white text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            View pricing
          </Link>
        </motion.div>

      </div>
    </section>
  );
}