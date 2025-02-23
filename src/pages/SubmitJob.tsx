
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const SubmitJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    location: "",
    salary_range: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to submit a job");
        return;
      }

      const { error } = await supabase
        .from('jobs')
        .insert({
          ...jobData,
          created_by: user.id,
          status: 'draft'
        });

      if (error) throw error;

      toast.success("Job posted successfully!");
      navigate('/jobs');
    } catch (error) {
      toast.error("Failed to submit job posting");
      console.error("Error submitting job:", error);
    } finally {
      setLoading(false);
    }
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
                placeholder="Job description"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Requirements</label>
              <Textarea
                value={jobData.requirements}
                onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                placeholder="Job requirements"
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
                value={jobData.salary_range}
                onChange={(e) => setJobData({ ...jobData, salary_range: e.target.value })}
                placeholder="e.g. $50,000 - $70,000"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Job Posting'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitJob;
