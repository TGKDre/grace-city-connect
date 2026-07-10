import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  loader: async () => {
    const { data } = await supabase.from("events").select("*").order("date");
    return { events: data || [] };
  },
});

function EventsPage() {
  const { events } = Route.useLoaderData();

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl mb-10">
        Upcoming Events
      </h1>

      {events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-grace/30 hover:bg-white/[0.04]"
            >
              <h2 className="font-display text-xl text-grace mb-2">
                {event.name}
              </h2>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">
                {event.description}
              </p>
              <div className="space-y-1 text-sm text-ink-muted mb-4">
                <p>
                  <span className="font-semibold text-ink">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-semibold text-ink">Time:</span>{" "}
                  {event.time}
                </p>
                <p>
                  <span className="font-semibold text-ink">Location:</span>{" "}
                  {event.location}
                </p>
              </div>
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-grace px-5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-grace/90"
                >
                  Learn More &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-ink-muted text-lg">No upcoming events</p>
          <p className="mt-2 text-sm text-ink-muted">
            Check back soon for upcoming events and gatherings!
          </p>
        </div>
      )}
    </div>
  );
}
