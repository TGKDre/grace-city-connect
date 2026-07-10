import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";
import { AttendanceForm } from "../components/attendance-form";
import { useState } from "react";

export const Route = createFileRoute("/watch")({
  component: WatchPage,
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

function WatchPage() {
  const { campuses } = Route.useLoaderData();
  const [selectedCampus, setSelectedCampus] = useState(campuses[0]?.slug || "");

  return (
    <div className="container-page py-12">
      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-grace/20 to-grace/5 border border-grace/20 p-10 text-center">
        <h1 className="font-display text-4xl text-ink md:text-5xl">Watch Live</h1>
        <p className="mt-3 text-lg text-ink-muted">Join us online from wherever you are.</p>
      </div>

      {/* Campus Selector + Stream */}
      <div className="mt-10 grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="font-display text-2xl text-ink mb-4">Choose a Campus</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {campuses.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCampus(c.slug)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedCampus === c.slug
                    ? "bg-grace text-primary-foreground"
                    : "border border-white/10 text-ink-muted hover:text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Stream placeholder */}
          <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center text-ink-muted border border-white/5">
            <div className="text-center">
              <svg className="mx-auto w-12 h-12 text-grace/60 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p className="text-sm">Live stream will appear here</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <AttendanceForm campusSlug={selectedCampus} />
        </div>
      </div>

      {/* Campus Service Times */}
      <div className="mt-16">
        <h2 className="font-display text-2xl text-ink mb-6">Service Times</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campuses.map((c) => {
            const st = parseST(c.service_times);
            return (
              <Link
                key={c.id}
                to="/campuses/$slug"
                params={{ slug: c.slug }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-grace/30 transition-colors"
              >
                <h3 className="font-display text-lg text-ink">{c.name}</h3>
                {st.sunday && <p className="mt-2 text-sm text-ink-muted">Sun: {st.sunday}</p>}
                {st.wednesday && <p className="text-sm text-ink-muted">Wed: {st.wednesday}</p>}
                {st.phone && <p className="mt-2 text-xs text-grace">{st.phone}</p>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
