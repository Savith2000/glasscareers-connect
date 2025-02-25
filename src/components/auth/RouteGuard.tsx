
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
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("RouteGuard - Current session:", session);
      if (session?.user) {
        const role = session.user.user_metadata.role as UserRole;
        console.log("RouteGuard - User role:", role);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("RouteGuard - Auth state changed:", _event);
      console.log("RouteGuard - New session:", session);
      if (session?.user) {
        const role = session.user.user_metadata.role as UserRole;
        console.log("RouteGuard - New user role:", role);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!userRole) {
    console.log("RouteGuard - No user role, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log("RouteGuard - User role not allowed:", userRole, "Allowed roles:", allowedRoles);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  console.log("RouteGuard - Access granted for role:", userRole);
  return <>{children}</>;
}
