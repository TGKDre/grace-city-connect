import { supabase } from "@/lib/supabase";
import type { Campus, Fellowship, Event } from "@/lib/database.types";
import { useEffect, useState } from "react";
import { CampusManager } from "@/components/campus-manager";

type Tab = "campuses" | "fellowships" | "events" | "attendance";

const CAMPUS_OPTIONS: Record<string, string> = {
  houston: "Houston",
  dallas: "Dallas",
  "los-angeles": "Los Angeles",
  "boca-raton": "Boca Raton",
  "college-station": "College Station",
};

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("campuses");
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [fellowships, setFellowships] = useState<Fellowship[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [editFellowship, setEditFellowship] = useState<Partial<Fellowship> | null>(null);
  const [editEvent, setEditEvent] = useState<Partial<Event> | null>(null);

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

  async function saveFellowship() {
    if (!editFellowship) return;
    if (editFellowship.id) {
      await supabase.from("fellowships").update(editFellowship).eq("id", editFellowship.id);
    } else {
      await supabase.from("fellowships").insert(editFellowship);
    }
    setEditFellowship(null);
    loadAll();
  }

  async function saveEvent() {
    if (!editEvent) return;
    if (editEvent.id) {
      await supabase.from("events").update(editEvent).eq("id", editEvent.id);
    } else {
      await supabase.from("events").insert(editEvent);
    }
    setEditEvent(null);
    loadAll();
  }

  const StyledInput = ({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) => (
    <div>
      <label className="block text-xs text-ink-muted mb-1">{label}</label>
      <input
        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink mb-8">Admin Dashboard</h1>

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
              <button
                onClick={() => setEditFellowship({ name: "", school: "", city: "", state: "", meeting_info: "", meeting_day: "", meeting_time: "", phone: "", email: "", instagram: "", campus_slug: "houston" })}
                className="rounded-full bg-grace px-5 py-2 text-sm text-primary-foreground mb-4"
              >
                + Add Fellowship
              </button>
              {fellowships.map((f) => (
                <div key={f.id} className="rounded-lg border border-white/10 bg-white/5 p-4 flex justify-between items-start">
                  <div>
                    <p className="font-display text-lg text-ink">{f.name}</p>
                    <p className="text-xs text-ink-muted">{f.school} &middot; {f.city}, {f.state}</p>
                    {f.meeting_time && <p className="text-xs text-ink-muted mt-1">{f.meeting_day} {f.meeting_time}</p>}
                    <div className="flex gap-3 mt-2 text-xs">
                      {f.phone && <span className="text-ink-muted">{f.phone}</span>}
                      {f.email && <span className="text-ink-muted">{f.email}</span>}
                      {f.instagram && <span className="text-ink-muted">@{f.instagram}</span>}
                    </div>
                  </div>
                  <button onClick={() => setEditFellowship(f)} className="text-xs text-grace hover:underline">Edit</button>
                </div>
              ))}
              {fellowships.length === 0 && <p className="text-ink-muted">No fellowships yet. Add one!</p>}
            </div>
          )}

          {tab === "events" && (
            <div className="space-y-4">
              <button
                onClick={() => setEditEvent({ title: "", description: "", date: "", time: "", location: "", campus_slug: "houston" })}
                className="rounded-full bg-grace px-5 py-2 text-sm text-primary-foreground mb-4"
              >
                + Add Event
              </button>
              {events.map((e) => (
                <div key={e.id} className="rounded-lg border border-white/10 bg-white/5 p-4 flex justify-between items-start">
                  <div>
                    <p className="font-display text-lg text-ink">{e.title}</p>
                    <p className="text-xs text-ink-muted">{e.date} &middot; {e.time || "TBD"} &middot; {e.location}</p>
                    {e.description && <p className="text-sm text-ink-muted mt-1">{e.description}</p>}
                  </div>
                  <button onClick={() => setEditEvent(e)} className="text-xs text-grace hover:underline">Edit</button>
                </div>
              ))}
              {events.length === 0 && <p className="text-ink-muted">No events yet. Add one!</p>}
            </div>
          )}

          {tab === "attendance" && (
            <p className="text-ink-muted">
              Total attendance records: <span className="text-grace font-display text-lg">{attendanceCount}</span>
            </p>
          )}
        </>
      )}

      {/* Fellowship Edit Modal */}
      {editFellowship && !editFellowship.id && (
        <Modal title="New Fellowship" onClose={() => setEditFellowship(null)} onSave={saveFellowship}>
          <StyledInput label="Name" value={editFellowship.name} onChange={(v) => setEditFellowship({ ...editFellowship, name: v })} />
          <StyledInput label="School" value={editFellowship.school} onChange={(v) => setEditFellowship({ ...editFellowship, school: v })} />
          <StyledInput label="City" value={editFellowship.city} onChange={(v) => setEditFellowship({ ...editFellowship, city: v })} />
          <StyledInput label="State" value={editFellowship.state} onChange={(v) => setEditFellowship({ ...editFellowship, state: v })} />
          <StyledInput label="Meeting Info" value={editFellowship.meeting_info} onChange={(v) => setEditFellowship({ ...editFellowship, meeting_info: v })} />
          <StyledInput label="Meeting Day" value={editFellowship.meeting_day} onChange={(v) => setEditFellowship({ ...editFellowship, meeting_day: v })} />
          <StyledInput label="Meeting Time" value={editFellowship.meeting_time} onChange={(v) => setEditFellowship({ ...editFellowship, meeting_time: v })} />
          <StyledInput label="Phone" value={editFellowship.phone} onChange={(v) => setEditFellowship({ ...editFellowship, phone: v })} />
          <StyledInput label="Email" value={editFellowship.email} onChange={(v) => setEditFellowship({ ...editFellowship, email: v })} />
          <StyledInput label="Instagram" value={editFellowship.instagram} onChange={(v) => setEditFellowship({ ...editFellowship, instagram: v })} />
          <div>
            <label className="block text-xs text-ink-muted mb-1">Campus</label>
            <select
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink"
              value={editFellowship.campus_slug || "houston"}
              onChange={(e) => setEditFellowship({ ...editFellowship, campus_slug: e.target.value })}
            >
              {Object.entries(CAMPUS_OPTIONS).map(([slug, name]) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </Modal>
      )}

      {/* Event Edit Modal */}
      {editEvent && (
        <Modal title={editEvent.id ? "Edit Event" : "New Event"} onClose={() => setEditEvent(null)} onSave={saveEvent}>
          <StyledInput label="Title" value={editEvent.title} onChange={(v) => setEditEvent({ ...editEvent, title: v })} />
          <StyledInput label="Description" value={editEvent.description} onChange={(v) => setEditEvent({ ...editEvent, description: v })} />
          <StyledInput label="Date" value={editEvent.date} onChange={(v) => setEditEvent({ ...editEvent, date: v })} />
          <StyledInput label="Time" value={editEvent.time} onChange={(v) => setEditEvent({ ...editEvent, time: v })} />
          <StyledInput label="Location" value={editEvent.location} onChange={(v) => setEditEvent({ ...editEvent, location: v })} />
          <StyledInput label="Link" value={editEvent.link} onChange={(v) => setEditEvent({ ...editEvent, link: v })} />
          <div>
            <label className="block text-xs text-ink-muted mb-1">Campus</label>
            <select
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink"
              value={editEvent.campus_slug || "houston"}
              onChange={(e) => setEditEvent({ ...editEvent, campus_slug: e.target.value })}
            >
              {Object.entries(CAMPUS_OPTIONS).map(([slug, name]) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-background p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="font-display text-xl text-ink mb-4">{title}</h3>
        <div className="space-y-3">{children}</div>
        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={onClose} className="rounded-md border border-white/10 px-4 py-2 text-sm text-ink-muted">
            Cancel
          </button>
          <button onClick={onSave} className="rounded-md bg-grace px-4 py-2 text-sm text-primary-foreground">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
