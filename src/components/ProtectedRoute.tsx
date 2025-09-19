"use client";

import { ReactNode } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthProtection } from "@/hooks/useAuthProtection";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback = <LoadingSpinner />,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthProtection();

  // Show loading while checking authentication
  if (isLoading) {
    return <>{fallback}</>;
  }

  // If not authenticated, the hook will handle redirecting
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
