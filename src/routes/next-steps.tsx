import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/next-steps")({
  component: NextStepsPage,
});

function NextStepsPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl mb-10">
        Plan Your Visit
      </h1>

      {/* New Here */}
      <section className="mb-12 rounded-xl border border-white/5 bg-white/[0.02] p-8">
        <h2 className="font-display text-2xl text-grace mb-4">New Here?</h2>
        <p className="text-ink-muted leading-relaxed">
          Welcome to Grace City Church! We're so glad you're considering
          visiting us. Whether you're exploring faith for the first time or
          looking for a new church home, you'll find a warm community of
          believers passionate about God's Word and reaching this generation.
          We can't wait to meet you!
        </p>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="font-display text-2xl text-grace mb-6">
          Your Visit in 3 Simple Steps
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-lg text-grace font-bold">
              1
            </div>
            <h3 className="font-display text-lg text-ink mb-2">
              Find a Campus
            </h3>
            <p className="text-sm text-ink-muted mb-4">
              We have multiple campuses across the United States. Find the one
              closest to you.
            </p>
            <Link
              to="/campuses"
              className="text-sm text-grace hover:underline"
            >
              View Campuses &rarr;
            </Link>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-lg text-grace font-bold">
              2
            </div>
            <h3 className="font-display text-lg text-ink mb-2">
              Check Service Times
            </h3>
            <p className="text-sm text-ink-muted mb-4">
              Each campus has its own service schedule. Pick a time that works
              for you.
            </p>
            <Link
              to="/campuses"
              className="text-sm text-grace hover:underline"
            >
              See Times &rarr;
            </Link>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-lg text-grace font-bold">
              3
            </div>
            <h3 className="font-display text-lg text-ink mb-2">
              Let Us Know You're Coming
            </h3>
            <p className="text-sm text-ink-muted mb-4">
              Fill out the form below and we'll make sure you have a great
              first visit.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Form */}
      <section className="mb-12 rounded-xl border border-white/5 bg-white/[0.02] p-8">
        <h2 className="font-display text-2xl text-grace mb-6">
          Let Us Know You're Coming
        </h2>
        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-ink placeholder:text-ink-muted/50 focus:border-grace/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-ink placeholder:text-ink-muted/50 focus:border-grace/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="campus">
              Campus
            </label>
            <select
              id="campus"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-ink focus:border-grace/50 focus:outline-none"
            >
              <option value="">Select a campus</option>
              <option value="houston">Houston</option>
              <option value="dallas">Dallas</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="boca-raton">Boca Raton</option>
              <option value="college-station">College Station</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Any questions or special requests?"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-ink placeholder:text-ink-muted/50 focus:border-grace/50 focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Submit &rarr;
          </button>
        </form>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="font-display text-2xl text-grace mb-4">
          More Resources
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/campuses"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-ink transition-colors hover:border-grace hover:text-grace"
          >
            Our Campuses
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-ink transition-colors hover:border-grace hover:text-grace"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
