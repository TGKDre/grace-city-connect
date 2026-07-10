import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export const Route = createFileRoute("/fellowships")({
  component: FellowshipsPage,
  loader: async () => {
    const [fRes, cRes] = await Promise.all([
      supabase.from("fellowships").select("*"),
      supabase.from("campuses").select("id,name,slug"),
    ]);
    return { fellowships: fRes.data || [], campuses: cRes.data || [] };
  },
});

function parseMeetingInfo(mi: string) {
  const phone = mi.match(/Phone:\s*([^\|]+)/)?.[1]?.trim();
  const email = mi.match(/Email:\s*([^\|]+)/)?.[1]?.trim();
  const info = mi.replace(/\s*\|\s*Phone:.*$/, "").trim();
  return { info, phone, email };
}

function FellowshipsPage() {
  const { fellowships, campuses } = Route.useLoaderData();
  const [search, setSearch] = useState("");

  const campusMap: Record<string, { name: string; slug: string }> = {};
  campuses.forEach((c) => {
    campusMap[c.id] = { name: c.name, slug: c.slug };
  });

  const filtered = fellowships.filter((f) => {
    const q = search.toLowerCase();
    const campus = campusMap[f.campus_id];
    return (
      f.name.toLowerCase().includes(q) ||
      (campus && campus.name.toLowerCase().includes(q)) ||
      f.school?.toLowerCase().includes(q) ||
      f.city?.toLowerCase().includes(q)
    );
  });

  // Group by campus
  const grouped: Record<string, typeof fellowships> = {};
  filtered.forEach((f) => {
    const key = f.campus_id || "other";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(f);
  });

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Fellowship Finder</h1>
      <p className="mt-2 text-ink-muted">
        Find a campus fellowship near your school. We have groups across Region 2.
      </p>

      <input
        type="text"
        placeholder="Search by fellowship name, school, or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50"
      />

      {Object.entries(grouped).map(([campusId, fws]) => {
        const campus = campusMap[campusId];
        return (
          <div key={campusId} className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block h-2 w-2 rounded-full bg-grace" />
              <h2 className="font-display text-2xl text-ink">
                <Link to="/campuses/$slug" params={{ slug: campus?.slug || "" }} className="hover:text-grace transition-colors">
                  {campus?.name || "Other"}
                </Link>
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {fws.map((f) => {
                const { info, phone, email } = parseMeetingInfo(f.meeting_info || "");
                return (
                  <div key={f.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                    <h3 className="font-display text-lg text-ink">{f.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{f.school} &middot; {f.city}, {f.state}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      {info && <p className="text-ink-muted">{info}</p>}
                      {f.meeting_time && <p className="text-ink-muted">{f.meeting_time}</p>}
                      {phone && (
                        <p>
                          <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-grace hover:underline">{phone}</a>
                        </p>
                      )}
                      {email && (
                        <p>
                          <a href={`mailto:${email}`} className="text-grace hover:underline">{email}</a>
                        </p>
                      )}
                      {f.instagram && (
                        <p>
                          <a href={`https://instagram.com/${f.instagram}`} target="_blank" rel="noopener noreferrer" className="text-grace hover:underline">
                            @{f.instagram}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-muted">No fellowships match your search.</p>
      )}
    </div>
  );
}
