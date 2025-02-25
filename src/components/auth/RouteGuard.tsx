
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { UserRole } from '@/lib/supabase-types';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("RouteGuard - Session:", session);
      console.log("RouteGuard - User metadata:", session?.user?.user_metadata);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("RouteGuard - Auth state changed:", _event);
      console.log("RouteGuard - New session:", session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const userRole = user.user_metadata.role as UserRole;
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
