import superbaseClient from "@/utils/superbase";


export async function getJobs(token){
    const superbase= await superbaseClient(token);

    let query=superbase.from("jobs").select("*");

    const {data,error}=await query;
    if(error){
        throw error;
    }

    return data;
}