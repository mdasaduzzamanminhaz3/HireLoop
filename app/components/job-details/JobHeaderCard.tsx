"use client"

import React from "react"
import { Bookmark, CheckCircle2, Layers } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { applyToAJob } from "@/lib/actions/applications"
import { toast } from "@/components/ui/toast"
import { getApplicationCount } from "@/lib/api/jobs"
import { getUserPRemiumById } from "@/lib/api/users";

export interface JobType {
  _id: string
  title: string
  companyName: string
  category?: string
  jobType?: string
  location?: string
  isRemote: boolean
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  deadline: string
}

export interface ApplicationPayload {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  applyDate?: Date | string
}

interface JobHeaderProps {
  title: string
  company: string
  isVerified?: boolean
  job: JobType
}
export default function JobHeaderCard({
  title,
  company,
  isVerified = true,
  job,
}: JobHeaderProps) {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    } else if (user.role === "seeker") {
      // is premium user
      const premiumResult = await getUserPRemiumById(user.id);
      console.log(premiumResult);
      
      // number of jobs applied by this user
      const countResult = await getApplicationCount(`applicantId=${user.id}`)
      if (!premiumResult.premium && countResult.count >= 2) {
        router.push("/checkout")
        return
      } else {
        // Todo: only send jobId and userId or email address for the application
        const application = {
          jobId: job._id,
          userId: user.id,
          email: user.email,
          jobTitle: job.title,
          companyName: job.companyName,
          jobType: job.jobType,
          isRemote: job.isRemote,
          minSalary: job.minSalary,
          maxSalary: job.maxSalary,
          location: job.location,
          salaryFrequency: job.salaryFrequency,
          deadline: job.deadline,
          applyDate: new Date(),
          status:"applied",
          archived:false,
        }
        const res = await applyToAJob(application)
        console.log(res)
        if (res.acknowledged === true) {
          toast.add({title:"Application submited",description:"Your application has been submited successfully"})
          router.push("/browse-jobs")
        }
      }
    } else {
      console.log("user is not a job seeker")
    }
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-neutral-800/80 bg-[#121216] p-6 shadow-lg md:flex-row md:items-center md:p-8">
      {/* Left: Logo & Title Info */}
      <div className="flex items-center gap-4 md:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-[#1a1a20] shadow-inner md:h-16 md:w-16">
          <Layers className="h-7 w-7 text-neutral-300" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 md:text-sm">
            <span className="font-medium text-neutral-300">{company}</span>
            <span>•</span>
            {isVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Employer
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Bookmark & Apply Now CTA */}
      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <button
          type="button"
          aria-label="Save Job"
          className="cursor-pointer rounded-xl border border-neutral-800 bg-[#18181c] p-2.5 text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white md:p-3"
        >
          <Bookmark className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        <button
          type="button"
          onClick={handleApplyNow}
          className="flex-1 cursor-pointer rounded-xl bg-white px-6 py-2.5 text-xs font-semibold text-black shadow-sm transition-all hover:bg-neutral-200 md:flex-initial md:py-3 md:text-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}
