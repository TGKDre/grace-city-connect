import { createFileRoute, Link } from "@tanstack/react-router";
import { campuses } from "../lib/campuses";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-grace)_0%,_transparent_60%)] opacity-20" />
        <div className="container-page relative z-10 flex min-h-[80vh] flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full border border-grace/30 bg-grace/10 px-4 py-1.5 text-xs text-grace mb-6">
              BLW Grace City &middot; Region 2
            </span>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-7xl">
              One Church,<br /><span className="text-grace">Many Cities</span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted md:text-xl">
              A Loveworld Campus Ministry raising a generation to walk in the
              reality of the Word. Five campuses. 23 states. One family.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/campuses" className="inline-flex items-center gap-2 rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Find a Campus &rarr;
              </Link>
              <Link to="/watch" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm text-ink transition-colors hover:border-grace hover:text-grace">
                Watch Live &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campuses Grid */}
      <section className="container-page py-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Our Campuses</h2>
          <p className="mt-3 text-ink-muted">Choose a campus to find service times, directions, and contact info.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campuses.map((c) => {
            const stateAbbr = c.slug === "los-angeles" ? "CA" : c.state === "Texas" ? "TX" : c.state === "California" ? "CA" : "FL";
            return (
              <Link key={c.slug} to="/campuses/$slug" params={{ slug: c.slug }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-grace/30 hover:bg-white/[0.04]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-grace">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl text-ink group-hover:text-grace transition-colors">{c.city}</h3>
                <p className="mt-2 text-sm text-ink-muted">{stateAbbr}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-white/[0.01] py-24">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Plan Your Visit</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-muted">
            New to Grace City? Check service times, find a campus near you, and let us know you&apos;re coming.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/next-steps" className="inline-flex items-center gap-2 rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Plan your visit &rarr;
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm text-ink transition-colors hover:border-grace hover:text-grace">
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
