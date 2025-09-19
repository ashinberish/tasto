import ProtectedRoute from "@/components/ProtectedRoute";

export default function FeedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">{children}</div>
    </ProtectedRoute>
  );
}
