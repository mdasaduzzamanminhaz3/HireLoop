"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "@/lib/auth-client"



export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession();
  const navLinks = [
  { title: "Browse Jobs", href: "#browse-jobs" },
  { title: "Company", href: "#company" },
  { title: "Pricing", href: "#pricing" },
  { title: "Dashboard", href: `/dashboard/${session?.user.role || 'seeker'}` },

]
  // console.log(session?.user.name);
  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex justify-center p-4">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-neutral-800/80 bg-[#141416]/90 px-6 py-3 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-1">
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            hire
          </span>
          {/* Custom Animated Loop Icon representation */}
          <div className="relative flex h-6 w-6 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-sky-400 border-t-transparent [animation-duration:4s]" />
            <div className="absolute inset-1 animate-spin rounded-full border-2 border-orange-500 border-b-transparent [animation-duration:2s]" />
          </div>
          <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            loop
          </span>
        </Link>

        {/* Desktop Navigation Links & Action Buttons */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Divider line matching design */}
          <div className="h-4 w-[1px] bg-neutral-800" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <span>Welcome Mr. {session?.user.name}</span>
                <Button
                  onClick={handleSignOut}
                  className="rounded-xl border-0 bg-gradient-to-r from-rose-500 to-red-600 px-5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-rose-600 hover:to-red-700 active:scale-[0.98]"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-2 py-1 text-sm font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
                >
                  Sign In
                </Link>

                <Button className="rounded-xl border-0 bg-gradient-to-r from-indigo-500 to-blue-600 px-5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-blue-700 active:scale-[0.98]">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-neutral-400 hover:text-white focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="absolute top-20 right-4 left-4 z-40 flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-[#141416]/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-neutral-300 transition-colors hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="h-[1px] w-full bg-neutral-800" />

            <div className="flex flex-col gap-3">
              {session?.user ? (
                <>
                  <span>Welcome Mr. {session?.user.name}</span>
                  <Button
                    onClick={handleSignOut}
                    className="rounded-xl border-0 bg-gradient-to-r from-rose-500 to-red-600 px-5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-rose-600 hover:to-red-700 active:scale-[0.98]"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-center text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Sign In
                  </Link>
                  <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 font-medium text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-blue-700">
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
