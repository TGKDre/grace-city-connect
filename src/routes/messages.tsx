import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl mb-4">
        Messages
      </h1>
      <p className="text-ink-muted text-lg mb-10">
        Watch our latest messages from Grace City campuses
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-grace/30 hover:bg-white/[0.04]"
          >
            <div className="mb-4 aspect-video w-full rounded-lg bg-gradient-to-br from-grace/20 to-grace/5 flex items-center justify-center">
              <span className="text-4xl text-grace/60">&#9654;</span>
            </div>
            <h2 className="font-display text-lg text-ink mb-1">
              Featured Message {i}
            </h2>
            <p className="text-sm text-ink-muted">
              Coming soon &mdash; check back for the latest messages from our
              campuses.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center">
        <h2 className="font-display text-2xl text-grace mb-3">
          Stay Connected
        </h2>
        <p className="text-ink-muted mb-6">
          Follow us on social media and subscribe to our YouTube channel for the
          latest messages, devotionals, and ministry updates.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-grace px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Visit Homepage &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
