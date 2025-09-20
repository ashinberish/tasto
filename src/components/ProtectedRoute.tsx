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

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
