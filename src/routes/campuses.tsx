import { createFileRoute, Link } from "@tanstack/react-router";
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

const STATE_ABBR: Record<string, string> = {
  Houston: "TX", Dallas: "TX", "Los Angeles": "CA", "Boca Raton": "FL", "College Station": "TX",
};

function CampusesPage() {
  const { campuses } = Route.useLoaderData();

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Our Campuses</h1>
      <p className="mt-2 text-ink-muted">
        Choose a campus for service times, contact info, and directions.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campuses.map((c) => {
          const st = parseST(c.service_times);
          return (
            <Link
              key={c.id}
              to="/campuses/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-grace/30 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-grace/10 text-grace mb-4">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
              </div>
              <h2 className="font-display text-xl text-ink group-hover:text-grace transition-colors">{c.name}</h2>
              <p className="mt-1 text-sm text-ink-muted">{c.address || STATE_ABBR[c.name] || ""}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {st.sunday && <span className="rounded-full border border-white/10 px-3 py-1 text-ink-muted">Sun {st.sunday}</span>}
                {st.wednesday && <span className="rounded-full border border-white/10 px-3 py-1 text-ink-muted">Wed {st.wednesday}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
