"use client";

import { useRef, useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";

const services = [
  "Private Dining",
  "Wedding Catering",
  "Corporate Catering",
  "Private Events",
  "Cooking Class",
  "Meal Preparation",
  "Other",
];

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function submitReview(formData: FormData) {
    setMessage(null);
    if (!rating) {
      setMessage("Please select a star rating.");
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        service: formData.get("service"),
        rating,
        review: formData.get("review"),
      }),
    });
    const data = (await response.json()) as { error?: string };
    setSubmitting(false);

    if (!response.ok) {
      setMessage(
        data.error ?? "We could not submit your review. Please try again.",
      );
      return;
    }

    setMessage(
      "Thank you! Your review has been received and will appear after approval.",
    );
    setRating(0);
    formRef.current?.reset();
  }

  return (
    <section
      className="pb-24 px-4 sm:px-6 lg:px-8"
      aria-label="Submit a review"
    >
      <div className="mx-auto max-w-2xl rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 sm:p-8">
        <h2 className="text-2xl font-display font-bold">
          Share Your Experience
        </h2>
        <p className="mt-2 text-sm text-[hsl(0_0%_55%)]">
          Your feedback helps other guests. Reviews are checked before being
          published.
        </p>
        <form ref={formRef} action={submitReview} className="mt-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium">
              Your Name
              <input
                name="name"
                required
                maxLength={80}
                className="mt-1.5 w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-medium">
              Service
              <select
                name="service"
                required
                defaultValue=""
                className="mt-1.5 w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-1"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    size={28}
                    className={
                      value <= rating
                        ? "fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]"
                        : "text-[hsl(0_0%_35%)]"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-medium">
            Your Review
            <textarea
              name="review"
              required
              minLength={20}
              maxLength={1000}
              rows={5}
              className="mt-1.5 w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm"
              placeholder="Tell us about your experience..."
            />
          </label>
          {message && (
            <p role="status" className="text-sm text-[hsl(45_90%_52%)]">
              {message}
            </p>
          )}
          <Button type="submit" variant="primary" loading={submitting}>
            {submitting ? "Submitting…" : "Submit Review"}
          </Button>
        </form>
      </div>
    </section>
  );
}
