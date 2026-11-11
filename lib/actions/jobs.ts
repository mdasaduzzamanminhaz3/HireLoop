import { JobFormData } from "@/app/dashboard/recruiter/jobs/create-job/page";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
export const createJob = async(data:JobFormData) => {
    const res =await fetch(`${BASE_URL}/job/create`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    });
    return res.json();
}


export const deleteJob = async (jobId:string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method:'DELETE'
    })
    return res.json()
}