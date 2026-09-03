import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { SERVICES } from "@/data/studio";

export const Route = createFileRoute("/book")({
  component: BriefPage,
});

function BriefPage() {
  const [sent, setSent] = useState(false);
  const [lane, setLane] = useState(SERVICES[0].id);
  const [form, setForm] = useState({ name: "", email: "", budget: "", note: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@")) return;
    setSent(true);
  };
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader eyebrow="Start a project" title="Don't pitch me. Brief me." description="Tell me what you're making and who it's for." />
      {sent ? (
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-10 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-lime text-ink"><Check className="size-7" /></div>
          <h3 className="font-display text-2xl">Brief received.</h3>
          <p className="mt-2 text-sm text-fg-muted">I'll reply with next steps.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-fg-subtle">Lane</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button key={s.id} type="button" onClick={() => setLane(s.id)} className={`rounded-full border px-3 py-1.5 text-sm ${lane === s.id ? "border-lime/40 bg-lime text-ink" : "border-border text-fg-muted"}`}>
                  {s.id}
                </button>
              ))}
            </div>
          </div>
          <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div><Label htmlFor="budget">Budget range (optional)</Label><Input id="budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></div>
          <div><Label htmlFor="note">What are we making?</Label><Textarea id="note" rows={5} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div>
          <Button type="submit" className="w-full" size="lg">Send the brief</Button>
        </form>
      )}
    </Section>
  );
}
