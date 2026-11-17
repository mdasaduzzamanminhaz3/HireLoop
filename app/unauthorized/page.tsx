import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0c0c0e] p-6 text-white md:p-10 overflow-hidden">
      
      {/* Background Subtle Glow Effect */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-md w-full text-center space-y-8 rounded-3xl border border-neutral-800/80 bg-[#121216] p-8 shadow-2xl md:p-12">
        
        {/* Top Icon Badge with Pulse Effect */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 shadow-inner">
          <ShieldAlert className="h-10 w-10 text-red-400 animate-pulse" />
        </div>

        {/* Heading & Description */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-medium text-red-400">
            <Lock className="h-3 w-3" />
            Access Restricted
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-white">
            Unauthorized Access
          </h1>
          
          <p className="text-xs text-neutral-400 md:text-sm leading-relaxed">
            You don’t have the necessary permissions to view this page. If you believe this is a mistake, please contact your system administrator or switch to an authorized account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black shadow-sm transition-all hover:bg-neutral-200 md:text-sm"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-700/60 bg-neutral-800 px-5 py-3 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700 md:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

        {/* Footer Help text */}
        <div className="border-t border-neutral-800/80 pt-6 text-[11px] text-neutral-500 font-mono">
          HireLoop Security Protocol • Error 403
        </div>

      </div>
    </div>
  );
}