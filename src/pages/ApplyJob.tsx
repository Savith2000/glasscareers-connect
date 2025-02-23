
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cover_letter: "",
    resume_url: "",
  });

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to apply");
        return;
      }

      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: id,
          applicant_id: user.id,
          ...formData,
        });

      if (error) throw error;

      toast.success("Application submitted successfully!");
      navigate('/jobs');
    } catch (error) {
      toast.error("Failed to submit application");
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800">Job not found</h2>
        <p className="text-gray-600 mt-2">This job posting may have been removed or is no longer available.</p>
        <Button onClick={() => navigate('/jobs')} className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <p className="text-sm text-gray-500 mb-4">{job.location}</p>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <h3 className="font-semibold mb-2">Requirements</h3>
            <p className="text-gray-700">{job.requirements}</p>
          </div>
        </div>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-6">Apply for Position</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Resume Link</label>
              <Input
                type="url"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Cover Letter</label>
              <Textarea
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                placeholder="Write your cover letter here..."
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
