
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, UserIcon } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const role = session.user.user_metadata.role;
        if (role === 'business') {
          navigate('/submit-job');
        } else if (role === 'student') {
          navigate('/jobs');
        } else if (role === 'admin') {
          navigate('/admin');
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (session) return null;

  return (
    <div className="page-transition">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Career Guidance</h1>
          <p className="text-lg text-gray-600">
            Connecting students with amazing career opportunities. Sign in or create an account
            to get started.
          </p>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <Button
              variant={view === 'sign-in' ? 'default' : 'ghost'}
              onClick={() => setView('sign-in')}
            >
              Sign In
            </Button>
            <Button
              variant={view === 'sign-up' ? 'default' : 'ghost'}
              onClick={() => setView('sign-up')}
            >
              Create Account
            </Button>
          </div>
        </div>

        <AuthForm view={view} />
      </div>
    </div>
  );
};

export default Home;
