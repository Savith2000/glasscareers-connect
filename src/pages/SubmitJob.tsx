
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const SubmitJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement job submission logic
    toast({
      title: "Job Posted",
      description: "Your job posting has been submitted for review.",
    });
  };

  return (
    <div className="page-transition">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-6">Submit a Job Posting</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Title</label>
              <Input
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Company</label>
              <Input
                value={jobData.company}
                onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                placeholder="Your company name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                placeholder="Job description and requirements"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                placeholder="e.g. New York, NY"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Salary Range</label>
              <Input
                value={jobData.salary}
                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                placeholder="e.g. $50,000 - $70,000"
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Job Posting</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitJob;
