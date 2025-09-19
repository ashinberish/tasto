"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AppNavigation } from "@/components/AppNavigation";
import RecipeFeedWrapper from "@/components/RecipeFeedWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthProtection } from "@/hooks/useAuthProtection";

export default function FeedsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthProtection();

  const handleLogout = async () => {
    try {
      // Clear custom auth token
      document.cookie =
        "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Sign out from NextAuth
      await signOut({ redirect: false });

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: just redirect to login
      router.push("/login");
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, the hook will handle redirecting
  if (!isAuthenticated || !user) {
    return <LoadingSpinner />;
  }

  const currentUser = {
    name: user.name,
    avatarUrl: user.avatarUrl || "",
    email: user.email,
  };

  return (
    <>
      <AppNavigation
        currentUser={currentUser}
        onNewRecipe={() => {}}
        onSearch={() => {}}
        onLogout={handleLogout}
      />
      <RecipeFeedWrapper />
    </>
  );
}
