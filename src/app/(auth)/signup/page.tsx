"use client";
import { SignupForm } from "@/components/SignupForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSwitchToLogin = () => {
    router.push("/login");
  };

  return <SignupForm onSwitchToLogin={handleSwitchToLogin} />;
}
