
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseIcon, UserIcon, MessageCircle, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Chatbot from "./Chatbot";
import { supabase } from "@/lib/supabase";
import { toast } from "./ui/use-toast";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 px-4 py-4 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-primary">
          Career Guidance
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/jobs">
            <Button variant="ghost" className="flex items-center space-x-2">
              <BriefcaseIcon className="w-5 h-5" />
              <span>Job Listings</span>
            </Button>
          </Link>
          
          <Link to="/submit-job">
            <Button variant="ghost" className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5" />
              <span>Employers</span>
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat Assistant</span>
          </Button>

          <Button
            variant="destructive"
            className="flex items-center space-x-2"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
      
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
};

export default Navbar;
