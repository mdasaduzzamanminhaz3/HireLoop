"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"
import React from "react"

const JobSearchBox = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data) 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-800/80 bg-[#121216] p-4 shadow-lg md:flex-row"
    >
      <div className="relative flex w-full flex-1 items-center">
        <Search className="absolute left-4 h-4 w-4 text-neutral-400" />
        <Input
          type="text" 
          name="search" 
          placeholder="Search by job title, keywords..."
          className="w-full rounded-xl border border-neutral-800 bg-[#18181c] py-3 pr-4 pl-11 text-xs text-white transition-colors focus:border-indigo-500 focus:outline-none md:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 md:w-auto md:text-sm"
      >
        Search Jobs
      </button>
    </form>
  )
}

export default JobSearchBox