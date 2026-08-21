import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | Chef Harrizona",
    template: "%s | Chef Harrizona Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: actual auth guard runs client-side inside each protected page
  // because we're using localStorage for demo. In production, use
  // middleware.ts with HTTP-only session cookies for server-side protection.
  return (
    <div className="min-h-screen bg-[hsl(0_0%_9%)] text-[hsl(47,5%,64%)]">
      {children}
    </div>
  );
}
