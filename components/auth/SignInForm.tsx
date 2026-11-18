"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; 
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);

  const handleSignInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
  };

  const handleSignInGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: redirectTo,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.refresh();
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 w-full max-w-md bg-[#121215]/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6 my-12"
    >
      {/* Brand Logo & Header */}
      <div className="text-center space-y-3">
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

        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Sign in to access your job dashboard & recommendations
          </p>
        </div>
      </div>

      {/* Error Message Alert Box */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Social Auth Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleSignInGoogle}
          type="button"
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#18181c] hover:bg-[#202026] border border-neutral-800 rounded-xl text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.4-.7-.6-1.5-.6-2.3z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={handleSignInGithub}
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#18181c] hover:bg-[#202026] border border-neutral-800 rounded-xl text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-800" />
        </div>
        <span className="relative px-3 bg-[#121215] text-[11px] font-mono uppercase text-neutral-500">
          or continue with
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              className="w-full bg-[#16161a] border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-neutral-300">
              Password
            </label>
            <Link
              href="#forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              placeholder="••••••••"
              className="w-full bg-[#16161a] border border-neutral-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl py-2.5 font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-neutral-400 pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
        >
          Create account
        </Link>
      </p>
    </motion.div>
  );
}