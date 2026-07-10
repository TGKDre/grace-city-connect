import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => {
    const { data } = await supabase.from("campuses").select("*").order("order_index");
    return { campuses: data || [] };
  },
});

function HomePage() {
  const { campuses } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-ink">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-worship.jpg"
            alt=""
            width="1920"
            height="1280"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>
        <div className="container-page relative flex min-h-[92vh] flex-col justify-end pb-16 pt-32 md:min-h-[100vh] md:pb-24">
          <p className="eyebrow">One church &middot; Many cities</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.95] text-ink sm:text-7xl md:text-[7.5rem]">
            The Word,<br /><span className="italic text-grace">alive</span> in every city.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            Grace City is a Loveworld Campus Ministry family raising a generation of world-changers across the United States. Wherever you are, there is a house of grace ready to receive you.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/next-steps" className="group inline-flex items-center gap-3 rounded-full bg-grace px-7 py-4 text-base font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Plan your visit
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link to="/messages" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-base text-ink transition-colors hover:bg-white/5">
              <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-grace/20 text-xs text-grace">&#9654;</span>
              Watch latest message
            </Link>
          </div>
        </div>
      </section>

      {/* CAMPUSES */}
      <section className="relative border-t border-white/5 bg-background">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Find your city</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-6xl">
                Five campuses.<br />One family of grace.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              Every Grace City campus carries the same Word, the same Spirit, the same mission. Pick the one closest to you &mdash; or the one you&apos;ll be in this weekend.
            </p>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {campuses.map((c, i) => (
              <li key={c.slug}>
                <Link
                  to="/campuses/$slug"
                  params={{ slug: c.slug }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:border-grace/40 hover:bg-surface-2"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-grace/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    {i === 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-grace/30 bg-grace/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-grace">
                        Main campus
                      </span>
                    )}
                  </div>
                  <div className="mt-16">
                    <p className="font-display text-3xl leading-none text-ink transition-colors group-hover:text-grace">{c.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-ink-muted">{c.address || ""}</p>
                    <p className="mt-6 text-sm leading-relaxed text-ink-muted">Service times</p>
                    <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink transition-colors group-hover:text-grace">
                      Visit this campus <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PLAN YOUR VISIT */}
      <section className="relative border-t border-white/5 bg-background">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Plan your visit</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-6xl">
                First time? <span className="italic text-grace">You belong here.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              No pressure, no performance. Three simple steps and we&apos;ll see you this Sunday.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Pick your campus",
                desc: "Houston, Dallas, Los Angeles, Boca Raton or College Station &mdash; every house carries the same Word and the same Spirit.",
              },
              {
                num: "02",
                title: "Know when to come",
                desc: "Sunday Grace Service and midweek Word &amp; Prayer at every campus.",
              },
              {
                num: "03",
                title: "Walk in expecting more",
                desc: "Come as you are. You&apos;ll be received as family, prayed for, and sent out full of the Word.",
              },
            ].map((step) => (
              <li key={step.num} className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-8">
                <span className="font-display text-5xl leading-none text-grace">{step.num}</span>
                <h3 className="font-display mt-10 text-2xl leading-tight text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted" dangerouslySetInnerHTML={{ __html: step.desc }} />
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/campuses" className="inline-flex items-center gap-3 rounded-full bg-grace px-7 py-4 text-base font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Choose your campus &rarr;
            </Link>
            <Link to="/next-steps" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-base text-ink transition-colors hover:bg-white/5">
              What to expect
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative border-t border-white/5 bg-surface">
        <div className="container-page grid gap-14 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <p className="eyebrow">Who we are</p>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-3xl leading-[1.15] text-ink md:text-5xl">
              We are a people of the Word &mdash; carrying the reality of who we are in Christ into every campus, every city, and every sphere of life. Not a religion. <span className="italic text-grace">A family.</span>
            </p>
            <Link to="/about" className="mt-10 inline-flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-grace">
              The Grace City story <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST MESSAGE */}
      <section className="relative border-t border-white/5 bg-background">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Latest message</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-5xl">This week from the pulpit.</h2>
            </div>
            <Link to="/messages" className="text-sm text-ink-muted transition-colors hover:text-grace">
              All messages &rarr;
            </Link>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Link to="/messages" className="group relative col-span-1 grid overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors hover:border-grace/30 lg:col-span-2 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <img src="/message-bible.jpg" alt="" loading="lazy" width="1600" height="1000" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
                <span className="absolute bottom-6 left-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-grace text-primary-foreground shadow-[0_0_40px_var(--color-grace)]">
                  <span aria-hidden="true" className="ml-1 text-lg">&#9654;</span>
                </span>
              </div>
              <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                <div>
                  <p className="text-xs uppercase tracking-widest text-grace">Message of the week</p>
                  <h3 className="font-display mt-5 text-3xl leading-[1.1] text-ink md:text-4xl">Walking in the reality of your redemption.</h3>
                  <p className="mt-6 text-sm leading-relaxed text-ink-muted">A word for every believer stepping into a new season &mdash; knowing who you are, whose you are, and the authority you carry in Christ Jesus.</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-ink-muted">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 font-display text-base text-grace">GC</span>
                  <span>Grace City &middot; Sunday pulpit</span>
                </div>
              </div>
            </Link>

            <Link to="/watch" className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface via-surface-2 to-surface p-8 transition-colors hover:border-grace/40">
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-grace/15 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grace/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grace" />
                </span>
                <span className="text-xs uppercase tracking-widest text-grace">Live &middot; Sundays</span>
              </div>
              <div className="relative mt-16">
                <h3 className="font-display text-3xl leading-[1.05] text-ink">Watch the Sunday livestream.</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">Streaming from Grace City Houston to every campus and every city. Join in wherever you are.</p>
                <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink transition-colors group-hover:text-grace">
                  Open livestream &rarr;
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT'S ON */}
      <section className="relative border-t border-white/5 bg-background">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">What&apos;s on</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-5xl">Come and be a part.</h2>
            </div>
            <Link to="/events" className="text-sm text-ink-muted transition-colors hover:text-grace">
              All events &rarr;
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { tag: "All campuses", title: "Sunday Grace Service", meta: "Every Sunday &middot; in-person + online" },
              { tag: "Midweek", title: "Word &amp; Prayer Night", meta: "Weekly &middot; at your local campus" },
              { tag: "Featured", title: "Campus Fellowship Nights", meta: "See what&apos;s happening in your city" },
            ].map((e) => (
              <li key={e.title} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 transition-colors hover:border-grace/30">
                <p className="text-xs uppercase tracking-widest text-grace">{e.tag}</p>
                <div className="mt-16">
                  <h3 className="font-display text-3xl leading-[1.05] text-ink" dangerouslySetInnerHTML={{ __html: e.title }} />
                  <p className="mt-4 text-sm text-ink-muted" dangerouslySetInnerHTML={{ __html: e.meta }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="relative border-t border-white/5 bg-background">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Leadership</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-6xl">
                Under the vision of our <span className="italic text-grace">man of God</span>.
              </h2>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-muted">
                Grace City is a Loveworld Campus Ministry family, standing in the vision and teachings of Rev. Dr. Chris Oyakhilome, and pastored across America by leaders raised in that same grace.
              </p>
              <Link to="/about" className="mt-8 inline-flex items-center gap-3 text-sm text-ink transition-colors hover:text-grace">
                Meet the leadership &rarr;
              </Link>
            </div>
            <ul className="md:col-span-7 grid gap-4 sm:grid-cols-2">
              {campuses.map((c) => (
                <li key={c.slug} className="rounded-2xl border border-white/10 bg-surface p-6">
                  <p className="text-xs uppercase tracking-widest text-grace">{c.name} &middot; {c.address || ""}</p>
                  <p className="font-display mt-6 text-2xl leading-tight text-ink">{c.pastor_name || "[Add campus pastor]"}</p>
                  <p className="mt-2 text-sm text-ink-muted">Pastor &middot; Grace City {c.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="relative border-t border-white/5 bg-surface">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Next steps</p>
              <h2 className="font-display mt-4 text-4xl leading-[1.02] text-ink md:text-6xl">However you got here, there&apos;s a next step for you.</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {[
                  { label: "I&apos;m new here", href: "/next-steps" },
                  { label: "Salvation", href: "/next-steps" },
                  { label: "Get baptized", href: "/next-steps" },
                  { label: "Join a fellowship", href: "/fellowships" },
                  { label: "Serve with us", href: "/next-steps" },
                  { label: "Give", href: "/next-steps" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.href as any} className="group flex items-center justify-between py-5 text-lg text-ink transition-colors hover:text-grace">
                      <span className="font-display text-2xl md:text-3xl" dangerouslySetInnerHTML={{ __html: item.label }} />
                      <span aria-hidden="true" className="text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-grace">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE MOVEMENT */}
      <section className="relative isolate overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 -z-10">
          <img src="/story-cities.jpg" alt="" loading="lazy" width="1920" height="1080" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="container-page grid gap-14 py-28 md:grid-cols-12 md:py-40">
          <div className="md:col-span-7">
            <p className="eyebrow">The movement</p>
            <h2 className="font-display mt-6 text-4xl leading-[1.02] text-ink md:text-7xl">From Houston to Los Angeles &mdash; a generation on fire for the gospel.</h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted">
              Grace City is not a franchise. It&apos;s one Spirit-filled family expressed in five American cities, standing together in the vision of our man of God and raising believers who carry the Word into their world.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-ink transition-colors hover:bg-white/5">
                Our story
              </Link>
              <Link to="/campuses" className="inline-flex items-center gap-2 rounded-full bg-grace px-6 py-3 text-sm font-medium text-primary-foreground">
                See every campus &rarr;
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img src="/fellowship.jpg" alt="" loading="lazy" width="1600" height="1200" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
