import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events | Upcoming & Past Culinary Events",
  description:
    "Discover Chef Harrizona's upcoming pop-up dinners, cooking classes and past events in Nairobi.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.type === "upcoming");
  const past = events.filter((e) => e.type === "past");

  return (
    <>
      <section
        className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center"
        aria-label="Events header"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">
            Calendar
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Chef's <span className="text-gold-gradient">Events</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            From intimate pop-up dinners to group cooking classes, join Chef
            Harrizona at one of his upcoming events.
          </p>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section
          className="pb-20 px-4 sm:px-6 lg:px-8"
          aria-label="Upcoming events"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="On the Calendar"
              title="Upcoming Events"
              centered={false}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute top-3 left-3">
                      <Badge variant="gold">{event.category}</Badge>
                    </span>
                    {event.spotsLeft !== undefined &&
                      event.spots !== undefined && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                          {event.spotsLeft} / {event.spots} spots left
                        </span>
                      )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-display font-semibold text-lg mb-3 group-hover:text-[hsl(45_90%_52%)] transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed mb-4 flex-1">
                      {event.description}
                    </p>
                    <dl className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_60%)]">
                        <Calendar
                          size={14}
                          className="shrink-0 text-[hsl(45_90%_52%)]"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">Date</dt>
                        <dd>
                          <time dateTime={event.date}>
                            {formatDate(event.date)}
                          </time>
                        </dd>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_60%)]">
                        <MapPin
                          size={14}
                          className="shrink-0 text-[hsl(45_90%_52%)]"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">Location</dt>
                        <dd>{event.location}</dd>
                      </div>
                      {event.spots && (
                        <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_60%)]">
                          <Users
                            size={14}
                            className="shrink-0 text-[hsl(45_90%_52%)]"
                            aria-hidden="true"
                          />
                          <dt className="sr-only">Capacity</dt>
                          <dd>{event.spots} seats</dd>
                        </div>
                      )}
                    </dl>
                    <ButtonLink
                      href="/book"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                    >
                      Reserve a Spot <ArrowRight size={14} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(0_0%_8%)]"
          aria-label="Past events"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Archive"
              title="Past Events"
              centered={false}
            />
            <div className="space-y-4">
              {past.map((event) => (
                <article
                  key={event.id}
                  className="flex flex-col sm:flex-row gap-5 items-start rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-5"
                >
                  <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover opacity-75"
                      sizes="176px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="muted">{event.category}</Badge>
                      <Badge variant="muted">Past Event</Badge>
                    </div>
                    <h2 className="font-display font-semibold text-lg mb-1">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-[hsl(0_0%_55%)]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} aria-hidden="true" />
                        <time dateTime={event.date}>
                          {formatDate(event.date)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} aria-hidden="true" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        aria-label="Private event enquiry"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Want a Private Event?
          </h2>
          <p className="text-[hsl(0_0%_65%)] mb-8">
            Can't make it to a public event? Chef Harrizona creates entirely
            private experiences tailored to your date, location and vision.
          </p>
          <ButtonLink href="/book" size="lg" variant="primary">
            Book a Private Experience
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
