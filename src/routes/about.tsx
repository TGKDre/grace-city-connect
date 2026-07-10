import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-ink py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display text-center mb-8 text-grace">
          About Grace City
        </h1>

        <p className="text-lg text-ink-muted mb-12 text-center max-w-3xl mx-auto leading-relaxed">
          A Loveworld Campus Ministry raising a generation to walk in the reality
          of the Word. We are one church in multiple cities across the United
          States &mdash; reaching, teaching, and training.
        </p>

        {/* Core Values */}
        <h2 className="text-3xl font-display text-center mb-8 text-grace">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30 hover:bg-white/[0.04]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-2xl text-grace">
              📖
            </div>
            <h3 className="font-display text-lg text-ink mb-2">The Word</h3>
            <p className="text-sm text-ink-muted">
              Building our lives on the solid foundation of God's Word
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30 hover:bg-white/[0.04]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-2xl text-grace">
              🤝
            </div>
            <h3 className="font-display text-lg text-ink mb-2">Community</h3>
            <p className="text-sm text-ink-muted">
              Building authentic relationships and doing life together
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30 hover:bg-white/[0.04]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-2xl text-grace">
              🌍
            </div>
            <h3 className="font-display text-lg text-ink mb-2">Evangelism</h3>
            <p className="text-sm text-ink-muted">
              Reaching every city with the love of Christ
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-grace/30 hover:bg-white/[0.04]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-grace/10 text-2xl text-grace">
              ✨
            </div>
            <h3 className="font-display text-lg text-ink mb-2">Excellence</h3>
            <p className="text-sm text-ink-muted">
              Doing everything with quality, passion, and purpose
            </p>
          </div>
        </div>

        {/* History */}
        <h2 className="text-3xl font-display text-center mb-8 text-grace">
          Our History
        </h2>
        <div className="mx-auto max-w-3xl space-y-4 text-ink-muted leading-relaxed">
          <p>
            Grace City Campus Ministry was founded as part of the Believers'
            Loveworld (Christ Embassy) ministry network, carrying forward a
            vision of raising a generation of believers who walk in the reality
            of God's Word. From humble beginnings, the ministry has grown into a
            vibrant, multi-campus church reaching college students and young
            professionals across the United States.
          </p>
          <p>
            What started as small fellowship gatherings has blossomed into five
            active campus locations spanning multiple states. Each campus
            carries the same DNA &mdash; passionate worship, sound teaching of
            the Word, and a strong commitment to soul-winning and discipleship.
          </p>
          <p>
            Today, Grace City continues to expand, driven by the mandate to
            reach, teach, and train this generation for Christ.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/campuses"
            className="inline-flex items-center gap-2 rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore Our Campuses &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
