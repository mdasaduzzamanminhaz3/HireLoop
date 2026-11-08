"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Browse Jobs", href: "#browse-jobs" },
  { title: "Company", href: "#company" },
  { title: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="w-full max-w-7xl bg-[#141416]/90 backdrop-blur-md border border-neutral-800/80 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50 transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            hire
          </span>
          {/* Custom Animated Loop Icon representation */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-sky-400 border-t-transparent animate-spin [animation-duration:4s]" />
            <div className="absolute inset-1 rounded-full border-2 border-orange-500 border-b-transparent animate-spin [animation-duration:2s]" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            loop
          </span>
        </Link>

        {/* Desktop Navigation Links & Action Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Divider line matching design */}
          <div className="h-4 w-[1px] bg-neutral-800" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="#login"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 px-2 py-1"
            >
              Sign In
            </Link>

            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 border-0 rounded-xl px-5 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="#get-started">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-20 left-4 right-4 bg-[#141416]/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 shadow-2xl md:hidden z-40 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="h-[1px] w-full bg-neutral-800" />

            <div className="flex flex-col gap-3">
              <Link
                href="#login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign In
              </Link>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl font-medium"
              >
                <Link href="#get-started" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}