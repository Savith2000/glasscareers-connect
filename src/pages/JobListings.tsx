
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      salary: "$80,000 - $120,000",
      description: "We are looking for a talented software engineer...",
    },
    // Add more mock data as needed
  ]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
          <Input
            type="search"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {job.location} • {job.salary}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                <Link to={`/apply/${job.id}`}>
                  <Button>Apply Now</Button>
                </Link>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <p className="text-center text-gray-600">
                No jobs found matching your search criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
