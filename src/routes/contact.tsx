import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { SITE } from "@/data/studio";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.message.length < 5) return;
    setSent(true);
  };
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader eyebrow="Contact" title="Say the thing." description="New product, campaign, game world, or a site that has to outperform the last one." />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-fg-subtle">Location</p>
            <p className="mt-1 flex gap-2 text-fg"><MapPin className="mt-0.5 size-4 text-fg-subtle" />{SITE.location}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-fg-subtle">Email</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 flex gap-2 text-fg hover:text-lime">
              <Mail className="mt-0.5 size-4 text-fg-subtle" />{SITE.email}
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success"><Check className="size-7" /></div>
              <h3 className="text-xl font-semibold">Got it.</h3>
              <p className="mt-2 text-sm text-fg-muted">I'll come back fast.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
              <div><Label htmlFor="message">The brief</Label><Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></div>
              <Button type="submit" className="w-full">Send</Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
