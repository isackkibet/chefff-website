"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  ChefHat,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import AdminGuard from "@/components/admin/AdminGuard";
import StatCard from "@/components/admin/StatCard";
import BookingStatusBadge from "@/components/admin/BookingStatusBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { BookingStatus } from "@/lib/admin/store";

interface Booking {
  id: number;
  refNumber: string;
  fullName: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  status: BookingStatus;
  quotedAmount?: number | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = (await res.json()) as Booking[];
      setBookings(data);
    } catch {
      setError("Could not load bookings. Check your database connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then(async (res) =>
        res.ok ? (res.json() as Promise<{ email: string }>) : null,
      )
      .then((session) => {
        if (session) setAdminEmail(session.email);
      });
    fetchBookings();
  }, [fetchBookings]);

  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const revenue = bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.quotedAmount ?? 0), 0);

  const recent = bookings.slice(0, 5);

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wider mb-1">
                  Welcome back
                </p>
                <h1 className="text-2xl sm:text-3xl font-display font-bold">
                  Dashboard
                </h1>
                <p className="text-sm text-[hsl(0_0%_50%)] mt-1">
                  {adminEmail}
                </p>
              </div>
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 text-xs text-[hsl(0_0%_45%)] hover:text-[hsl(45_90%_52%)] transition-colors mt-1"
                aria-label="Refresh data"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                  aria-hidden="true"
                />
                Refresh
              </button>
            </div>

            {error && (
              <div
                className="mb-6 rounded-xl bg-[hsl(0_72%_51%/0.1)] border border-[hsl(0_72%_51%/0.3)] px-4 py-3 text-sm text-[hsl(0_72%_65%)]"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Bookings"
                value={loading ? "…" : bookings.length}
                Icon={Calendar}
                trend={{ value: "all time", positive: true }}
              />
              <StatCard
                title="Pending Review"
                value={loading ? "…" : pending}
                Icon={Clock}
                accent={pending > 0}
              />
              <StatCard
                title="Confirmed"
                value={loading ? "…" : confirmed}
                Icon={CheckCircle}
              />
              <StatCard
                title="Revenue (KES)"
                value={loading ? "…" : `${(revenue / 1000).toFixed(0)}K`}
                subtitle="Confirmed + completed"
                Icon={TrendingUp}
                accent
              />
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <StatCard
                title="Total Bookings"
                value={loading ? "…" : bookings.length}
                Icon={Calendar}
              />
              <StatCard title="Menu Items" value="—" Icon={ChefHat} />
              <StatCard title="Testimonials" value="—" Icon={Users} />
              <StatCard title="Blog Posts" value="—" Icon={Users} />
            </div>

            {/* Recent bookings */}
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] overflow-hidden mb-8">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(0_0%_16%)]">
                <h2 className="font-semibold">Recent Bookings</h2>
                <Link
                  href="/admin/bookings"
                  className="text-xs text-[hsl(45_90%_52%)] hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="md" />
                </div>
              ) : recent.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm text-[hsl(0_0%_45%)]">
                  No bookings yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    aria-label="Recent bookings"
                  >
                    <thead>
                      <tr className="border-b border-[hsl(0_0%_16%)]">
                        {[
                          "Ref",
                          "Guest",
                          "Event Type",
                          "Date",
                          "Guests",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs font-semibold text-[hsl(0_0%_45%)] uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(0_0%_14%)]">
                      {recent.map((b) => (
                        <tr
                          key={b.id}
                          className="hover:bg-[hsl(0_0%_13%)] transition-colors"
                        >
                          <td className="px-6 py-3.5 font-mono text-xs text-[hsl(45_90%_52%)] whitespace-nowrap">
                            <Link
                              href="/admin/bookings"
                              className="hover:underline"
                            >
                              #{b.refNumber}
                            </Link>
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap">
                            <p className="font-medium text-[hsl(42_30%_94%)]">
                              {b.fullName}
                            </p>
                            <p className="text-xs text-[hsl(0_0%_45%)]">
                              {b.email}
                            </p>
                          </td>
                          <td className="px-6 py-3.5 text-[hsl(0_0%_65%)] whitespace-nowrap">
                            {b.eventType}
                          </td>
                          <td className="px-6 py-3.5 text-[hsl(0_0%_65%)] whitespace-nowrap">
                            {new Date(b.eventDate).toLocaleDateString("en-KE", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-3.5 text-[hsl(0_0%_65%)] text-center">
                            {b.guestCount}
                          </td>
                          <td className="px-6 py-3.5">
                            <BookingStatusBadge status={b.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Manage Bookings",
                  href: "/admin/bookings",
                  desc: `${pending} pending review`,
                },
                {
                  label: "Update Menu",
                  href: "/admin/menu",
                  desc: "Add or edit dishes",
                },
                {
                  label: "Admin Settings",
                  href: "/admin/settings",
                  desc: "Business info & config",
                },
              ].map(({ label, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] px-5 py-4 hover:border-[hsl(45_90%_52%/0.4)] transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm text-[hsl(42_30%_94%)]">
                      {label}
                    </p>
                    <p className="text-xs text-[hsl(0_0%_45%)] mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[hsl(0_0%_35%)] group-hover:text-[hsl(45_90%_52%)] transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
