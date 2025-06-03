import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    fetchData: fetchJobs,
    data: jobsData,
    loading
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery
  });

  useEffect(() => {
    if (isLoaded) fetchJobs(); 423
  }, [isLoaded, company_id, location, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {loading &&
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      }

      {loading === false && (
        <div className="mt-4 mx-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsData?.length ? (
            jobsData.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />;
            })) : (
            <div>Jobs not found</div>
          )}
        </div>
      )}

    </div>
  );
};

export default JobListing;
