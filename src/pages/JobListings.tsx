
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string | null;
  description: string;
  requirements: string;
  status: "open" | "closed" | "draft";
}

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open');
      
      if (error) throw error;
      return data as Job[];
    }
  });

  const filteredJobs = jobs?.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {job.location} • {job.salary_range || 'Salary not specified'}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/apply/${job.id}`}>
                      <Button>Apply Now</Button>
                    </Link>
                    <span className="text-sm text-gray-500">
                      Requirements: {job.requirements}
                    </span>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <p className="text-center text-gray-600">
                  No jobs found matching your search criteria.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
