import { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    fn: fetchJobs,
    data: jobsData,
    loading
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery
  });

  const {
    fn: fnCompanies,
    data: companiesData,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [isLoaded, company_id, location, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  }
  const clearFilters = () => {
    setLocation("");
    setCompanyId("");
    setSearchQuery("");
  };

  return (
    <div className="px-5">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSearch} className="flex h-12 w-full gap-2 items-center ">
        <Input type="text" placeholder="Search Jobs by Title.." name="search-query" className="h-full flex-1 px-4 py-3" />
        <Button type="submit" className="h-full sm:w-28" variant="blue"> Search </Button>
      </form>

      <div className="flex w-full mt-4 gap-4 ">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companiesData?.map(({ name,id}) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="destructive" onClick={clearFilters}>Clear Filters</Button>
      </div>

      {loading &&
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      }

      {loading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
