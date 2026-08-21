"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const schema = z.object({
  email: z.email("Valid email required"),
  password: z.string().min(6, "Password required"),
});
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const locked = attempts >= 5;

  // Redirect if an HTTP-only admin session is already active.
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) router.replace("/admin/dashboard");
      })
      .catch(() => undefined);
  }, [router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) as any });

  async function onSubmit(data: FormData) {
    if (locked) return;
    setAuthError("");
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/admin/dashboard");
    } else {
      setAttempts((n) => n + 1);
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setAuthError(result?.error ?? "Unable to sign in. Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[hsl(0_0%_9%)]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex justify-center mb-4">
            <Logo size={64} rounded={false} className="shadow-lg" />
          </div>
          <h1 className="text-2xl font-display font-bold">
            Chef Harrizona Admin
          </h1>
          <p className="text-sm text-[hsl(0_0%_50%)] mt-1">
            Sign in to your dashboard
          </p>
        </div>

        <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-8">
          {locked ? (
            <div className="text-center py-4">
              <AlertCircle
                size={40}
                className="text-[hsl(0_72%_65%)] mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="font-semibold text-[hsl(0_72%_65%)]">
                Account temporarily locked
              </p>
              <p className="text-sm text-[hsl(0_0%_50%)] mt-2">
                Too many failed attempts. Please try again later or contact
                support.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              {authError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl bg-[hsl(0_72%_51%/0.1)] border border-[hsl(0_72%_51%/0.3)] px-4 py-3 text-sm text-[hsl(0_72%_70%)]"
                >
                  <AlertCircle size={16} aria-hidden="true" /> {authError}
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  placeholder="harrison@gmail.com"
                />
                {errors.email && (
                  <p
                    role="alert"
                    className="mt-1 text-xs text-[hsl(0_72%_65%)]"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password")}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    className={`${inputClass} pr-11`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(0_0%_45%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p
                    role="alert"
                    className="mt-1 text-xs text-[hsl(0_72%_65%)]"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {attempts > 0 && !locked && (
                <p className="text-xs text-[hsl(38_92%_65%)]">
                  {5 - attempts} attempt{5 - attempts !== 1 ? "s" : ""}{" "}
                  remaining before lockout.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-[hsl(0_0%_35%)] mt-6">
          This area is restricted to authorised personnel only.
        </p>
      </div>
    </div>
  );
}
