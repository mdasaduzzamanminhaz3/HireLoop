'use server'
import { JobFormData } from "@/app/dashboard/recruiter/jobs/create-job/page";
import { protectedMutation } from "../core/server";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
export const createJob = async(data:JobFormData) => {
  const api =`${BASE_URL}/job/create`
  const res =await protectedMutation(api,"POST",data);
    return res.json();
}


export const deleteJob = async (jobId:string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method:'DELETE'
    })
    return res.json()
}


