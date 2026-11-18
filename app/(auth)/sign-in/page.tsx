import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0c] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Background Globe Image */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40">
        <Image
          src="/images/globe.png"
          alt="Background Overlay"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 bg-[#141416]/80 px-3.5 py-2 rounded-xl border border-neutral-800 backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <Suspense fallback={<div className="text-xs text-neutral-400">Loading sign in...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}