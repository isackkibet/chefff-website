import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions",
  description:
    "Answers to common questions about Chef Harrizona's private dining, event catering, bookings, deposits and services.",
};

export default function FAQPage() {
  return (
    <>
      <section
        className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center"
        aria-label="FAQ header"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">
            Got Questions?
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="text-gold-gradient">Questions</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0,3%,38%)] leading-relaxed">
            Can't find what you're looking for?{" "}
            <a
              href="/contact"
              className="text-[hsl(45_90%_52%)] hover:underline"
            >
              Contact us directly.
            </a>
          </p>
        </div>
      </section>
      <FAQClient />
    </>
  );
}
