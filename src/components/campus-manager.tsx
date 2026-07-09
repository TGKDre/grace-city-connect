import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Campus } from "@/lib/database.types";

type Props = {
  campuses: Campus[];
  onSaved: () => void;
};

export function CampusManager({ campuses, onSaved }: Props) {
  const [editing, setEditing] = useState<Campus | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", address: "", stream_url: "", instagram: "", pastor_name: "", sunday_time: "", wednesday_time: "" });
  const [saving, setSaving] = useState(false);

  function startEdit(c: Campus) {
    setForm({
      name: c.name,
      slug: c.slug,
      address: c.address || "",
      stream_url: c.stream_url || "",
      instagram: c.instagram || "",
      pastor_name: c.pastor_name || "",
      sunday_time: (c.service_times as any)?.Sunday || "",
      wednesday_time: (c.service_times as any)?.Wednesday || "",
    });
    setEditing(c);
  }

  async function save() {
    setSaving(true);
    const service_times = { Sunday: form.sunday_time, Wednesday: form.wednesday_time };
    if (editing) {
      await supabase.from("campuses").update({
        name: form.name,
        address: form.address,
        stream_url: form.stream_url,
        instagram: form.instagram,
        pastor_name: form.pastor_name,
        service_times,
      }).eq("id", editing.id);
    }
    setSaving(false);
    setEditing(null);
    onSaved();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {campuses.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-display text-lg text-ink">{c.name}</p>
              <p className="text-sm text-ink-muted">{c.address || "No address set"}</p>
            </div>
            <button onClick={() => startEdit(c)} className="rounded-md bg-grace px-4 py-1.5 text-sm text-primary-foreground">
              Edit
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-background p-6">
            <h3 className="font-display text-xl text-ink mb-4">Edit {editing.name}</h3>
            <div className="space-y-3">
              {[
                { label: "Name", key: "name" },
                { label: "Address", key: "address" },
                { label: "Stream URL", key: "stream_url" },
                { label: "Instagram", key: "instagram" },
                { label: "Pastor Name", key: "pastor_name" },
                { label: "Sunday Service Time", key: "sunday_time" },
                { label: "Wednesday Service Time", key: "wednesday_time" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-ink-muted mb-1">{f.label}</label>
                  <input
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink"
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="rounded-md border border-white/10 px-4 py-2 text-sm text-ink-muted">Cancel</button>
              <button onClick={save} disabled={saving} className="rounded-md bg-grace px-4 py-2 text-sm text-primary-foreground">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
