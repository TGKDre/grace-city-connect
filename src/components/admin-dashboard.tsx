import { supabase } from "@/lib/supabase";
import type { Campus, Fellowship, Event } from "@/lib/database.types";
import { useEffect, useState } from "react";
import { CampusManager } from "@/components/campus-manager";

type Tab = "campuses" | "fellowships" | "events" | "attendance";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("campuses");
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [fellowships, setFellowships] = useState<Fellowship[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    const [c, f, e, a] = await Promise.all([
      supabase.from("campuses").select("*").order("order_index"),
      supabase.from("fellowships").select("*"),
      supabase.from("events").select("*").order("date", { ascending: false }).limit(50),
      supabase.from("attendance").select("id", { count: "exact", head: true }),
    ]);
    if (c.data) setCampuses(c.data);
    if (f.data) setFellowships(f.data);
    if (e.data) setEvents(e.data);
    setAttendanceCount(a.count ?? 0);
    setLoading(false);
  }

  useEffect(() => { loadAll(); }, []);

  const tabs: { key: Tab; label: string }[] = [
    { key: "campuses", label: "Campuses" },
    { key: "fellowships", label: "Fellowships" },
    { key: "events", label: "Events" },
    { key: "attendance", label: `Attendance (${attendanceCount})` },
  ];

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink mb-8">Admin Dashboard</h1>

      {/* Tab nav */}
      <div className="flex gap-1 mb-8 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === t.key ? "text-grace border-b-2 border-grace" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink-muted">Loading...</p>
      ) : (
        <>
          {tab === "campuses" && <CampusManager campuses={campuses} onSaved={loadAll} />}
          
          {tab === "fellowships" && (
            <div className="space-y-4">
              {fellowships.length === 0 && <p className="text-ink-muted">No fellowships yet.</p>}
              {fellowships.map((f) => (
                <div key={f.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-lg text-ink">{f.name}</p>
                  <p className="text-sm text-ink-muted">{f.school} &middot; {f.city}, {f.state}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "events" && (
            <div className="space-y-4">
              {events.length === 0 && <p className="text-ink-muted">No events yet.</p>}
              {events.map((e) => (
                <div key={e.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-lg text-ink">{e.title}</p>
                  <p className="text-sm text-ink-muted">{e.date} &middot; {e.time || "TBD"}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "attendance" && (
            <p className="text-ink-muted">
              Total attendance records: <span className="text-grace font-display text-lg">{attendanceCount}</span>
            </p>
          )}
        </>
      )}
    </div>
  );
}
