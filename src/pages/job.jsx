import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { updateHiringStatus } from "@/api/apiJobs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApplyJobDrawer from "@/components/apply-job";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const jobId = Number(id);

  const {
    loading: loadingJob,
    data: job,
    fn: fetchJob,
  } = useFetch(getSingleJob, { job_id: jobId });

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: jobId });

  const handleHiringStatus = async (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen)
      .then(() => {
        fetchJob();
      })
      .catch((error) => {
        console.error("Error updating hiring status:", error);
      });
  };

  useEffect(() => {
    fetchJob();
  }, [isLoaded, jobId]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (!job) {
    return <div>Job not found or failed to load.</div>;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 mx-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row items-center justify-between">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.company?.name} className="h-12" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon size={20} />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase size={20} />
          {job?.applications?.length || 0} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen size={20} />
              Open
            </>
          ) : (
            <>
              <DoorClosed size={20} />
              Closed
            </>
          )}
        </div>
      </div>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleHiringStatus} defaultValue={job?.isOpen ? "open" : "closed"}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">
        About the Job
      </h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown className="bg-transparent sm:text-lg"
        source={job?.requirements || "No requirements specified."}
      />
      {/* render applications*/}
      {job?.recruiter_id !== user?.id && (
          <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fetchJob}
          applied={job?.applications?.find((ap)=>ap.candidate_id === user?.id)}
          />
      )}
    </div>
  );
};

export default JobPage;
