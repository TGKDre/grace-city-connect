import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Campus } from "@/lib/database.types";

type Props = {
  campuses: Campus[];
  onSaved: () => void;
};

type ServiceTimes = {
  sunday?: string;
  wednesday?: string;
  phone?: string;
  email?: string;
  ig?: string;
};

export function CampusManager({ campuses, onSaved }: Props) {
  const [editing, setEditing] = useState<Campus | null>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    stream_url: "",
    instagram: "",
    pastor_name: "",
    sunday: "",
    wednesday: "",
    phone: "",
    email: "",
    ig: "",
  });
  const [saving, setSaving] = useState(false);

  function startEdit(c: Campus) {
    let st: ServiceTimes = {};
    if (typeof c.service_times === "string") {
      try { st = JSON.parse(c.service_times); } catch {}
    } else if (c.service_times && typeof c.service_times === "object") {
      st = c.service_times as ServiceTimes;
    }
    setForm({
      name: c.name,
      address: c.address || "",
      stream_url: c.stream_url || "",
      instagram: c.instagram || "",
      pastor_name: c.pastor_name || "",
      sunday: st.sunday || "",
      wednesday: st.wednesday || "",
      phone: st.phone || "",
      email: st.email || "",
      ig: st.ig || "",
    });
    setEditing(c);
  }

  async function save() {
    setSaving(true);
    const service_times: ServiceTimes = {
      sunday: form.sunday,
      wednesday: form.wednesday,
      phone: form.phone,
      email: form.email,
      ig: form.ig,
    };
    if (editing) {
      await supabase
        .from("campuses")
        .update({
          name: form.name,
          address: form.address,
          stream_url: form.stream_url,
          instagram: form.instagram,
          pastor_name: form.pastor_name,
          service_times,
        })
        .eq("id", editing.id);
    }
    setSaving(false);
    setEditing(null);
    onSaved();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {campuses.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-display text-lg text-ink">{c.name}</p>
              <p className="text-sm text-ink-muted">{c.address || "No address set"}</p>
            </div>
            <button
              onClick={() => startEdit(c)}
              className="rounded-md bg-grace px-4 py-1.5 text-sm text-primary-foreground"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-background p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-ink mb-4">Edit {editing.name}</h3>
            <div className="space-y-3">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
              <Field label="Stream URL" value={form.stream_url} onChange={(v) => setForm({ ...form, stream_url: v })} />
              <Field label="Instagram Handle" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
              <Field label="Pastor Name" value={form.pastor_name} onChange={(v) => setForm({ ...form, pastor_name: v })} />
              <hr className="border-white/10" />
              <p className="text-xs text-ink-muted uppercase tracking-wider">Contact Info</p>
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(713) 555-0100" />
              <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="houston@gracecity.church" />
              <Field label="Instagram (for footer link)" value={form.ig} onChange={(v) => setForm({ ...form, ig: v })} placeholder="gracecityhouston" />
              <hr className="border-white/10" />
              <p className="text-xs text-ink-muted uppercase tracking-wider">Service Times</p>
              <Field label="Sunday" value={form.sunday} onChange={(v) => setForm({ ...form, sunday: v })} placeholder="10:00 AM CST" />
              <Field label="Wednesday" value={form.wednesday} onChange={(v) => setForm({ ...form, wednesday: v })} placeholder="7:00 PM CST" />
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setEditing(null)}
                className="rounded-md border border-white/10 px-4 py-2 text-sm text-ink-muted"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-md bg-grace px-4 py-2 text-sm text-primary-foreground"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-ink-muted mb-1">{label}</label>
      <input
        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
