"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, TrendingUp, Zap, Plus, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    popular: false,
  },
  {
    name: "Growth",
    icon: TrendingUp,
    monthlyPrice: 17,
    yearlyPrice: 12, // 25% discount roughly
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    popular: true,
  },
  {
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 74,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

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
            <span className="font-semibold text-white tracking-widest">PRICING PLANS</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-sm md:text-base text-neutral-400">
            Choose the right plan to accelerate your job search journey.
          </p>
        </motion.div>

        {/* Monthly / Yearly Toggle Switch */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center p-1.5 bg-[#121215] border border-neutral-800 rounded-full shadow-lg"
        >
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !isYearly
                ? "bg-white text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isYearly
                ? "bg-white text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>Yearly</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              isYearly ? "bg-indigo-600 text-white" : "bg-indigo-600/20 text-indigo-400"
            }`}>
              25%
            </span>
          </button>
        </motion.div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full text-left">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between p-8 bg-[#121215]/90 border rounded-3xl backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  plan.popular
                    ? "border-indigo-500/50 shadow-indigo-500/10 bg-gradient-to-b from-[#16161c] to-[#121215]"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                {/* Top Info & Price */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        ${currentPrice}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        /month
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <div className="space-y-4 mb-8">
                    <p className="text-sm font-semibold text-neutral-300">
                      {plan.description}
                    </p>

                    <ul className="space-y-3.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm text-neutral-400">
                          <div className="w-5 h-5 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                            <Plus className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Choose Plan Button */}
                <div>
                  {plan.popular ? (
                    <button className="w-full group flex items-center justify-between px-6 py-3.5 rounded-2xl bg-white hover:bg-neutral-200 text-black text-sm font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]">
                      <span>Choose This Plan</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button className="w-full group flex items-center justify-between px-6 py-3.5 rounded-2xl bg-[#18181c] hover:bg-[#202026] border border-neutral-800 text-white text-sm font-semibold shadow-md transition-all duration-200 active:scale-[0.98]">
                      <span>Choose This Plan</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}