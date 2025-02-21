
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, UserIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="page-transition">
      <div className="text-center max-w-3xl mx-auto">
        <div className="glass-card p-8 mb-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Career Guidance</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connecting students with amazing career opportunities. Browse job listings,
            submit applications, or post new positions.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link to="/jobs">
              <Button size="lg" className="glass-button">
                <BriefcaseIcon className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
            </Link>
            <Link to="/submit-job">
              <Button size="lg" variant="secondary" className="glass-button">
                <UserIcon className="mr-2 h-5 w-5" />
                Post a Job
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">For Students</h2>
            <p className="text-gray-600 mb-4">
              Explore job opportunities and start your career journey with easy
              application process.
            </p>
            <Link to="/jobs">
              <Button variant="link">View Opportunities →</Button>
            </Link>
          </div>

          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold mb-4">For Employers</h2>
            <p className="text-gray-600 mb-4">
              Post job opportunities and connect with talented students from our
              institution.
            </p>
            <Link to="/submit-job">
              <Button variant="link">Post a Job →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
