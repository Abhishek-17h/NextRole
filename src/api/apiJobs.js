import superbaseClient from "@/utils/superbase";


export async function getJobs(token,{location,company_id,searchQuery}) {
    const superbase= await superbaseClient(token);

    let query=superbase.from("jobs").select("*,company:companies(name,logo_url),saved:saved_job(id)");
    if(location){
        query=query.eq("location",location);
    }
    if(company_id){
        query=query.eq("company_id",company_id);
    }
    if(searchQuery){
        query=query.ilike("title",`%${searchQuery}%`);
    }

    const {data,error}=await query;
    if(error){
        throw error;
    }

    return data;
}