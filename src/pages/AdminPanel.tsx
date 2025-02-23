
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  status: "draft" | "open" | "closed";
  created_at: string;
}

interface Application {
  id: string;
  job_id: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  created_at: string;
  jobs: {
    title: string;
    company: string;
  };
  profiles: {
    full_name: string;
  };
}

const AdminPanel = () => {
  const queryClient = useQueryClient();

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Job[];
    }
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs:job_id (
            title,
            company
          ),
          profiles:applicant_id (
            full_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Application[];
    }
  });

  const updateJobStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Job['status'] }) => {
      const { error } = await supabase
        .from('jobs')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      toast.success("Job status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update job status");
    }
  });

  const updateApplicationStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Application['status'] }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      toast.success("Application status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update application status");
    }
  });

  const renderJobsList = () => {
    if (jobsLoading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {jobs?.map((job) => (
          <div key={job.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <span className={`text-sm ${
                  job.status === "open" ? "text-green-600" :
                  job.status === "closed" ? "text-red-600" :
                  "text-yellow-600"
                }`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                {job.status === "draft" && (
                  <Button
                    variant="outline"
                    onClick={() => updateJobStatus.mutate({ id: job.id, status: "open" })}
                  >
                    Approve
                  </Button>
                )}
                {job.status === "open" && (
                  <Button
                    variant="outline"
                    onClick={() => updateJobStatus.mutate({ id: job.id, status: "closed" })}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {jobs?.length === 0 && (
          <p className="text-center text-gray-600">No jobs found.</p>
        )}
      </div>
    );
  };

  const renderApplicationsList = () => {
    if (applicationsLoading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {applications?.map((application) => (
          <div key={application.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{application.jobs.title}</h3>
                <p className="text-sm text-gray-600">
                  {application.jobs.company} • Applicant: {application.profiles.full_name}
                </p>
                <span className={`text-sm ${
                  application.status === "accepted" ? "text-green-600" :
                  application.status === "rejected" ? "text-red-600" :
                  application.status === "reviewed" ? "text-blue-600" :
                  "text-yellow-600"
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                {application.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => updateApplicationStatus.mutate({ 
                        id: application.id, 
                        status: "accepted" 
                      })}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateApplicationStatus.mutate({ 
                        id: application.id, 
                        status: "rejected" 
                      })}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {applications?.length === 0 && (
          <p className="text-center text-gray-600">No applications found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          
          <Tabs defaultValue="jobs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-4">
              {renderJobsList()}
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {renderApplicationsList()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
