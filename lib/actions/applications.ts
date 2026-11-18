'use server'
import { ApplicationPayload } from "@/app/components/job-details/JobHeaderCard";
import { protectedMutation } from "../core/server";

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const applyToAJob = async(data:ApplicationPayload) => {
    const api = `${BASE_URL}/applications`;
    const res = await protectedMutation(api,"POST",data)
return res.json();
}


// export const updateApplicationStatus = async(id:string,data:{status:string}) => {
//     const res = await fetch(`${BASE_URL}/applications/${id}`,{
//         method:"PATCH",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(data)
//     })
//     return res.json()
// }