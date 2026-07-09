import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AttendanceForm({ campusSlug }: { campusSlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", is_new_visitor: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await supabase.from("attendance").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      campus_slug: campusSlug,
      service_date: new Date().toISOString().split("T")[0],
      message: form.message,
      is_new_visitor: form.is_new_visitor,
    });
    setSending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="font-display text-xl text-grace">Thank you!</p>
        <p className="mt-2 text-sm text-ink-muted">We're glad you joined us. God bless you!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h3 className="font-display text-lg text-ink">Let us know you were here</h3>
      <p className="text-sm text-ink-muted">Fill this in so we can stay connected with you.</p>
      
      <div>
        <label className="block text-xs text-ink-muted mb-1">Your Name *</label>
        <input required className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs text-ink-muted mb-1">Email</label>
        <input type="email" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs text-ink-muted mb-1">Phone</label>
        <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs text-ink-muted mb-1">Prayer request or message</label>
        <textarea rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input type="checkbox" checked={form.is_new_visitor} onChange={(e) => setForm({ ...form, is_new_visitor: e.target.checked })} className="rounded border-white/20" />
        I'm visiting for the first time
      </label>
      <button type="submit" disabled={sending} className="w-full rounded-full bg-grace py-3 text-sm font-medium text-primary-foreground">
        {sending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
