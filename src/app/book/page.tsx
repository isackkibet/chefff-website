import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Culinary Experience | Chef Harrizona",
  description:
    "Book a private dining experience, event catering or cooking class with Chef Harrizona in Nairobi.",
};

export default function BookPage() {
  return (
    <>
      <section
        className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center"
        aria-label="Booking page header"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">
            Start Here
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Book Your <span className="text-gold-gradient">Experience</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed max-w-xl mx-auto">
            Fill in the details below and Chef Harrizona will get back to you
            within 24 hours with a tailored proposal.
          </p>
        </div>
      </section>
      <BookingClient />
    </>
  );
}
