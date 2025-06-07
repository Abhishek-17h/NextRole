import superbaseClient from "@/utils/superbase";


export async function getJobs(token, { location, company_id, searchQuery }) {
    const superbase =await superbaseClient(token);

    let query = superbase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_job(id)");
    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
        throw error;
    }

    return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
    const superbase =await superbaseClient(token);

    if (alreadySaved) {
        const { data, error: deleteError } = await superbase
            .from("saved_job")
            .delete()
            .eq("job_id", saveData.job_id);

        if (deleteError) {
            throw deleteError;
        }
        return data;
    }
    else{
        const { data, error: insertError } = await superbase
            .from("saved_job")
            .insert([saveData])
            .select();

        if (insertError) {
            throw insertError;
        }
        return data;
    }

}

export async function getSingleJob(token, { job_id }) {
  const supabase = await superbaseClient(token);
  
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)       
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id },isOpen) {
  const supabase = await superbaseClient(token);
  
  let query = supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)       
    .select();

  const { data, error } = await query;

  if (error) {
    console.error("Error updating Status:", error);
    return null;
  }

  return data;
}
export async function addNewJob(token, _, jobData) {
  const supabase = await superbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
export async function getSavedJobs(token) {
  const supabase = await superbaseClient(token);
  const { data, error } = await supabase
    .from("saved_job")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await superbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await superbaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}

