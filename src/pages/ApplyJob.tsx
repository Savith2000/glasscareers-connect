
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const ApplyJob = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement application submission logic
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
    });
  };

  return (
    <div className="page-transition">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-6">Apply for Position</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email address"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Your phone number"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Resume Link</label>
              <Input
                type="url"
                value={formData.resume}
                onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Cover Letter</label>
              <Textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Write your cover letter here..."
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
