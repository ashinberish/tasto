"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated using our custom auth token
    const checkAuth = () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth-token="))
        ?.split("=")[1];

      if (authToken) {
        // User is logged in, redirect to feeds
        router.push("/feeds");
      } else {
        // User is not logged in, redirect to login
        router.push("/login");
      }
    };

    // Small delay to ensure the component is mounted
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [router]);

  // Show loading while determining auth status
  return <LoadingSpinner />;
}
