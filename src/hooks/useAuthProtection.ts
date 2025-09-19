import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export function useAuthProtection() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check NextAuth session
        if (status === "loading") {
          return;
        }

        if (status === "authenticated" && session?.user) {
          const extendedUser = session.user as typeof session.user & {
            id?: string;
            role?: string;
          };
          setUser({
            id: extendedUser.id || "unknown",
            name: session.user.name || session.user.email || "User",
            email: session.user.email || "",
            avatarUrl: session.user.image || "",
            role: extendedUser.role || "USER",
          });
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // Fallback to check custom auth token
        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth-token="))
          ?.split("=")[1];

        if (authToken) {
          // Try to get user info from our custom auth endpoint
          try {
            const response = await fetch("/api/auth/check");
            const data = await response.json();

            if (data.isLoggedIn && data.hasAuthToken && data.userData) {
              // We have a valid auth token with user data
              setUser({
                id: data.userData.id,
                name: data.userData.name,
                email: data.userData.email,
                avatarUrl: data.userData.avatar || "",
                role: data.userData.role,
              });
              setIsAuthenticated(true);
            } else {
              // Invalid token or no user data, redirect to login
              router.push("/login");
              return;
            }
          } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login");
            return;
          }
        } else if (status === "unauthenticated") {
          // No auth token and no session, redirect to login
          router.push("/login");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [session, status, router]);

  return {
    isAuthenticated,
    isLoading,
    user,
    session,
  };
}
