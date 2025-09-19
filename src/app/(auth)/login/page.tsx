"use client";
import { LoginForm } from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSwitchToSignup = () => {
    router.push("/signup");
  };

  const handleSwitchToForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log("Forgot password clicked");
  };

  return (
    <LoginForm
      onSwitchToSignup={handleSwitchToSignup}
      onSwitchToForgotPassword={handleSwitchToForgotPassword}
    />
  );
}
