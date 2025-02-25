
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseIcon, UserIcon, MessageCircle, LogOutIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Chatbot from "./Chatbot";
import { supabase } from "@/lib/supabase";
import { toast } from "./ui/use-toast";
import type { UserRole } from "@/lib/supabase-types";

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session);
        console.log("User metadata:", session?.user?.user_metadata);
        if (session?.user) {
          setUserRole(session.user.user_metadata.role as UserRole);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting session:", error);
        setIsLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event);
      console.log("New session:", session);
      setUserRole(session?.user?.user_metadata.role as UserRole || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
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

  // Instead of returning null, show a loading state
  if (isLoading) {
    return (
      <nav className="glass-effect sticky top-0 z-50 px-4 py-4 mb-8">
        <div className="container mx-auto flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </nav>
    );
  }

  // Don't return null if there's no user role, show a minimal navbar for non-authenticated users
  return (
    <nav className="glass-effect sticky top-0 z-50 px-4 py-4 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-primary">
          Career Guidance
        </Link>
        
        <div className="flex items-center space-x-6">
          {userRole && (
            <>
              {/* Show Job Listings for students and admins */}
              {(userRole === 'student' || userRole === 'admin') && (
                <Link to="/jobs">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <BriefcaseIcon className="w-5 h-5" />
                    <span>Job Listings</span>
                  </Button>
                </Link>
              )}
              
              {/* Show Submit Job for business owners and admins */}
              {(userRole === 'business' || userRole === 'admin') && (
                <Link to="/submit-job">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5" />
                    <span>Submit Job</span>
                  </Button>
                </Link>
              )}
              
              {/* Show Admin Panel for admins only */}
              {userRole === 'admin' && (
                <Link to="/admin">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5" />
                    <span>Admin Panel</span>
                  </Button>
                </Link>
              )}
              
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
            </>
          )}
        </div>
      </div>
      
      {userRole && <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </nav>
  );
};

export default Navbar;
