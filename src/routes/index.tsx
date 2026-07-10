import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-grace)_0%,_transparent_60%)] opacity-20" />
        </div>
        <div className="container-page relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block rounded-full border border-grace/30 bg-grace/10 px-4 py-1.5 text-xs text-grace mb-6"
            >
              BLW Grace City &middot; Region 2
            </motion.span>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-7xl">
              One Church,<br /><span className="text-grace">Many Cities</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-ink-muted md:text-xl"
            >
              A Loveworld Campus Ministry raising a generation to walk in the
              reality of the Word. Five campuses. 23 states. One family.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/campuses" className="inline-flex items-center gap-2 rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-grace/20">
                Find a Campus &rarr;
              </Link>
              <Link to="/watch" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm text-ink transition-all hover:border-grace hover:text-grace hover:-translate-y-0.5">
                Watch Live &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Campuses */}
      <section className="container-page py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl text-ink md:text-4xl">Our Campuses</h2>
          <p className="mt-3 text-ink-muted">Choose a campus to find service times, directions, and contact info.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campuses.map((c, i) => (
            <motion.div
              key={c.slug || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to="/campuses/$slug"
                params={{ slug: c.slug }}
                className="group relative block overflow-hidden rounded-xl border border-white/5 transition-all hover:border-grace/30"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={c.image_url || "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=600&q=80"}
                    alt={c.name}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl text-white group-hover:text-grace transition-colors">{c.name}</h3>
                  <p className="text-sm text-white/70">{c.address || ""}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/5 bg-white/[0.01] py-24"
      >
        <div className="container-page text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Plan Your Visit</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-muted">
            New to Grace City? Check service times, find a campus near you, and let us know you&apos;re coming.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/next-steps" className="inline-flex items-center gap-2 rounded-full bg-grace px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-grace/20">
              Plan your visit &rarr;
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm text-ink transition-all hover:border-grace hover:text-grace hover:-translate-y-0.5">
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
