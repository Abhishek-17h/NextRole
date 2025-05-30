import React, { useEffect } from "react";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const JobListing = () => {
  const {
    fetchData: fetchJobs,
    data: jobsData,
    loading,
    error,
  } = useFetch(getJobs, {});

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log("Jobs Data:", jobsData);

  return (
    <div>
      <h2>Job Listings 2</h2>
      {loading && <p>Loading...</p>}
      {jobsData &&
        jobsData.map((job) => (
          <div key={job.id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
          </div>
        ))}
    </div>
  );
};

export default JobListing;
