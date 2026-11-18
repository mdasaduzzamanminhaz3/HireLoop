"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Lock, Mail, User, AlertCircle, Briefcase, UserCheck, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { FaTrashAlt } from "react-icons/fa";

const roles = [
  { id: "seeker", label: "Job Seeker", icon: UserCheck, desc: "Find curated jobs" },
  { id: "recruiter", label: "Recruiter", icon: Briefcase, desc: "Hire top talent" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("seeker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // ইমেজ আপলোড হওয়ার সময় লোডিং দেখানোর জন্য

  // Profile image states
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrl = "";

      if (profileImageFile) {
        setUploadingImage(true);
        const imgFormData = new FormData();
        imgFormData.append("image", profileImageFile);

        const imagebbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`;
        const res = await fetch(imagebbAPI, {
          method: "POST",
          body: imgFormData,
        });
        const result = await res.json();
        if (result.success) {
          uploadedImageUrl = result.data.url;
          
        } else {
          setError("Failed to upload profile image. Please try again.");
          setLoading(false);
          setUploadingImage(false);
          return;
        }
        setUploadingImage(false);
      }
      
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role: selectedRole, 
        image: uploadedImageUrl, // ImgBB final url
      }); 

      if (authError) {
        setError(authError.message || "Something went wrong during sign up.");
        setLoading(false);
        return;
      }

      router.refresh();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0c] text-white flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Background Globe Image */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40">
        <Image
          src="/images/globe.png"
          alt="Background Overlay"
          fill
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

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-[#121215]/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6 my-12"
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
              Create an account
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400">
              Join HireLoop and choose your account type to get started
            </p>
          </div>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Selection Tabs */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">
              Joining HireLoop as
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                        : "bg-[#16161a] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-neutral-800 text-neutral-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-white">{r.label}</span>
                      <span className="block text-[10px] text-neutral-400">{r.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Photo Upload Field */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">
              Profile photo <span className="text-neutral-500">(optional)</span>
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full bg-[#16161a] border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0 group">
                {imagePreview ? (
                  <>
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                      title="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <User className="w-5 h-5 text-neutral-400" />
                )}
              </div>

              <label className="flex-1 flex items-center justify-center gap-2 bg-[#16161a] border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-neutral-400" />
                <span>{imagePreview ? "Change image" : "Upload image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors underline px-1"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">Full name</Label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <Input
                type="text"
                required
                placeholder="Jane Doe"
                name="name"
                className="w-full bg-[#16161a] border-neutral-800 rounded-xl pl-10 pr-4 py-5 text-sm text-white placeholder-neutral-500 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">Email address</Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                name="email"
                className="w-full bg-[#16161a] border-neutral-800 rounded-xl pl-10 pr-4 py-5 text-sm text-white placeholder-neutral-500 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">Password</Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="At least 8 characters"
                name="password"
                className="w-full bg-[#16161a] border-neutral-800 rounded-xl pl-10 pr-10 py-5 text-sm text-white placeholder-neutral-500 focus-visible:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-neutral-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-neutral-300">Confirm Password</Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                name="confirmPassword"
                className="w-full bg-[#16161a] border-neutral-800 rounded-xl pl-10 pr-10 py-5 text-sm text-white placeholder-neutral-500 focus-visible:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-neutral-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl py-5 font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploadingImage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading image...</span>
              </>
            ) : loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-neutral-400 pt-2">
          Already have an account?{" "}
          <Link
            href="/login" 
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}