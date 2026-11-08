"use client";

import React from "react";
import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Job discovery", href: "#job-discovery" },
    { name: "Worker AI", href: "#worker-ai" },
    { name: "Companies", href: "#companies" },
    { name: "Salary data", href: "#salary-data" },
  ],
  navigations: [
    { name: "Help center", href: "#help-center" },
    { name: "Career library", href: "#career-library" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Brand Guideline", href: "#brand-guideline" },
    { name: "Newsroom", href: "#newsroom" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] text-white border-t border-neutral-900/60 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-16">
        
        {/* Top Section: Brand Info & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1 group">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                hire
              </span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-sky-400 border-t-transparent animate-spin [animation-duration:4s]" />
                <div className="absolute inset-1 rounded-full border-2 border-orange-500 border-b-transparent animate-spin [animation-duration:2s]" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                loop
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Product Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-indigo-400 tracking-wide">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigations Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-indigo-400 tracking-wide">
                Navigations
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigations.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-indigo-400 tracking-wide">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Social Icons & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-900/80">
          
          {/* Social Icons (Custom Clean SVGs) */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#141416] border border-neutral-800/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-200"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.412 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>

            {/* Pinterest (Highlighted) */}
            <Link
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              aria-label="Pinterest"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#141416] border border-neutral-800/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>

          {/* Copyright & Terms */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-neutral-500">
            <span>Copyright 2024 —Programming Hero</span>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-800" />
            <Link href="#terms" className="hover:text-neutral-300 transition-colors">
              Terms & Policy - Privacy Guideline
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}