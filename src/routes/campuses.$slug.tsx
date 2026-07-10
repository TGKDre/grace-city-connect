import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/campuses/$slug")({
  component: CampusDetail,
  loader: async ({ params }) => {
    const { slug } = params;
    const [cRes, fRes] = await Promise.all([
      supabase.from("campuses").select("*").eq("slug", slug).single(),
      supabase.from("fellowships").select("*"),
    ]);
    return { campus: cRes.data, fellowships: fRes.data || [] };
  },
});

function parseST(st: unknown) {
  if (typeof st === "string") try { return JSON.parse(st); } catch { return {}; }
  if (st && typeof st === "object") return st;
  return {};
}

function parseMeetingInfo(mi: string) {
  const phone = mi.match(/Phone:\s*([^\|]+)/)?.[1]?.trim();
  const email = mi.match(/Email:\s*([^\|]+)/)?.[1]?.trim();
  const info = mi.replace(/\s*\|\s*Phone:.*$/, "").trim();
  return { info, phone, email };
}

function CampusDetail() {
  const { campus, fellowships } = Route.useLoaderData();
  const { slug } = useParams({ from: "/campuses/$slug" });

  if (!campus) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Campus not found</h1>
        <Link to="/campuses" className="mt-4 inline-block text-grace">View all campuses &rarr;</Link>
      </div>
    );
  }

  const st = parseST(campus.service_times);
  const campusFellowships = fellowships.filter((f) => {
    if (f.campus_id) return f.campus_id === campus.id;
    return false;
  });

  const cName = campus.name.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="container-page py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link to="/campuses" className="text-sm text-ink-muted hover:text-grace">&larr; All Campuses</Link>
          <h1 className="font-display text-4xl text-ink mt-2 md:text-5xl">{campus.name}</h1>
          {campus.address && <p className="mt-2 text-ink-muted">{campus.address}</p>}
        </div>
        {campus.pastor_name && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-xs text-ink-muted">Pastor</p>
            <p className="font-display text-lg text-grace">{campus.pastor_name}</p>
          </div>
        )}
      </div>

      {/* Contact & Service Times */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Service Times */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-xl text-ink mb-4">Service Times</h2>
          <div className="space-y-3">
            {st.sunday && (
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ink-muted">Sunday</span>
                <span className="text-ink">{st.sunday}</span>
              </div>
            )}
            {st.wednesday && (
              <div className="flex justify-between">
                <span className="text-ink-muted">Wednesday</span>
                <span className="text-ink">{st.wednesday}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="font-display text-xl text-ink mb-4">Contact</h2>
          <div className="space-y-4 text-sm">
            {st.phone && (
              <div>
                <p className="text-xs text-ink-muted mb-1">Phone</p>
                <a href={`tel:${st.phone.replace(/\D/g, "")}`} className="text-grace hover:underline">{st.phone}</a>
              </div>
            )}
            {st.email && (
              <div>
                <p className="text-xs text-ink-muted mb-1">Email</p>
                <a href={`mailto:${st.email}`} className="text-grace hover:underline">{st.email}</a>
              </div>
            )}
            {(st.ig || campus.instagram) && (
              <div>
                <p className="text-xs text-ink-muted mb-1">Instagram</p>
                <a href={`https://instagram.com/${st.ig || campus.instagram}`} target="_blank" rel="noopener noreferrer" className="text-grace hover:underline">
                  @{st.ig || campus.instagram}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {campus.description && (
        <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <p className="text-ink-muted leading-relaxed">{campus.description}</p>
        </div>
      )}

      {/* Map placeholder */}
      <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-6">
        <h2 className="font-display text-xl text-ink mb-4">Location</h2>
        <div className="flex h-48 items-center justify-center rounded-lg bg-white/5 text-ink-muted text-sm">
          {campus.address ? `${campus.name} Campus` : "Map loading..."}
        </div>
      </div>

      {/* Fellowships at this campus */}
      {campusFellowships.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl text-ink mb-6">Fellowships at {campus.name}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campusFellowships.map((f) => {
              const { info, phone, email } = parseMeetingInfo(f.meeting_info || "");
              return (
                <div key={f.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h3 className="font-display text-lg text-ink">{f.name}</h3>
                  <p className="text-xs text-ink-muted mt-0.5">{f.school}</p>
                  {f.meeting_time && <p className="mt-3 text-sm text-ink-muted">{f.meeting_time}</p>}
                  {info && <p className="text-sm text-ink-muted mt-1">{info}</p>}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs">
                    {phone && <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-grace hover:underline">{phone}</a>}
                    {email && <a href={`mailto:${email}`} className="text-grace hover:underline">Email</a>}
                    {f.instagram && <a href={`https://instagram.com/${f.instagram}`} target="_blank" rel="noopener noreferrer" className="text-grace hover:underline">@{f.instagram}</a>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 flex flex-wrap gap-4">
        <Link to="/watch" className="inline-flex items-center gap-2 rounded-full bg-grace px-6 py-3 text-sm font-medium text-primary-foreground">
          Watch {campus.name} Live &rarr;
        </Link>
        <Link to="/next-steps" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-ink hover:border-grace hover:text-grace">
          Plan Your Visit &rarr;
        </Link>
      </div>
    </div>
  );
}
