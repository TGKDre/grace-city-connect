import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/campuses")({
  component: CampusesPage,
  loader: async () => {
    const { data } = await supabase.from("campuses").select("*").order("order_index");
    return { campuses: data || [] };
  },
});

function parseST(st: unknown) {
  if (typeof st === "string") try { return JSON.parse(st); } catch { return {}; }
  if (st && typeof st === "object") return st;
  return {};
}

function CampusesPage() {
  const { campuses } = Route.useLoaderData();

  return (
    <div className="container-page py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl text-ink md:text-4xl"
      >
        Our Campuses
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-2 text-ink-muted"
      >
        Choose a campus for service times, contact info, and directions.
      </motion.p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campuses.map((c, i) => {
          const st = parseST(c.service_times);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to="/campuses/$slug"
                params={{ slug: c.slug }}
                className="group block overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:border-grace/30"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  {c.image_url ? (
                    <img
                      src={c.image_url}
                      alt={c.name}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white/5 text-ink-muted">
                      <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl text-ink group-hover:text-grace transition-colors">{c.name}</h2>
                  {c.address && <p className="mt-1 text-sm text-ink-muted">{c.address}</p>}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {st.sunday && <span className="rounded-full border border-white/10 px-3 py-1 text-ink-muted">Sun {st.sunday}</span>}
                    {st.wednesday && <span className="rounded-full border border-white/10 px-3 py-1 text-ink-muted">Wed {st.wednesday}</span>}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
