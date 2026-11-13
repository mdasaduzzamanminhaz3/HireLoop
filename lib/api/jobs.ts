const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getJobs = async(query='') => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
}


export const getJobById = async(jobId:string)=> {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
    return res.json()
}

export const getApplications = async(query="") => {
    const res = await fetch(`${BASE_URL}/applications?${query}`)
    return res.json()
}