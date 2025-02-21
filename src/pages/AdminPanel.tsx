
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  status: "pending" | "approved" | "rejected";
}

const AdminPanel = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Software Engineer",
      company: "Tech Corp",
      status: "pending",
    },
    // Add more mock data as needed
  ]);

  const handleApprove = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: "approved" as const } : job
    ));
    toast({
      title: "Job Approved",
      description: "The job posting has been approved and is now visible to students.",
    });
  };

  const handleReject = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: "rejected" as const } : job
    ));
    toast({
      title: "Job Rejected",
      description: "The job posting has been rejected.",
    });
  };

  return (
    <div className="page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <span className={`text-sm ${
                    job.status === "approved" ? "text-green-600" :
                    job.status === "rejected" ? "text-red-600" :
                    "text-yellow-600"
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleApprove(job.id)}
                    disabled={job.status !== "pending"}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(job.id)}
                    disabled={job.status !== "pending"}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
