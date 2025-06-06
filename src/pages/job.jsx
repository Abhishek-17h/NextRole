import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const jobId = Number(id);

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: jobId });

  useEffect(() => {
    fnJob();
  }, [isLoaded, jobId]);


  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (!job) {
    return <div>Job not found or failed to load.</div>;
  }

  return (

    <div>
      <div>
        <h1>{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.company?.name} className="h-12" />
      </div>
    </div>
  )
}

export default JobPage;
