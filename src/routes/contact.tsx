import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.message.length < 5)
      return;
    setSent(true);
  };

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="Contact"
        title="Talk to the team"
        description="Events, group bookings, press, or a quick question — we usually reply within a few hours."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <ContactRow
            icon={MapPin}
            label="Location"
            value="Dublin city centre · Ireland"
          />
          <ContactRow
            icon={Mail}
            label="Email"
            value="hello@offtheclock.ie"
            href="mailto:hello@offtheclock.ie"
          />
          <ContactRow
            icon={Phone}
            label="Phone"
            value="+353 1 800 0000"
            href="tel:+35318000000"
          />
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-fg-muted">
            <p className="font-medium text-fg">Opening hours</p>
            <p className="mt-2">Mon–Thu · 12:00 – 00:00</p>
            <p>Fri–Sat · 12:00 – 02:00</p>
            <p>Sun · 14:00 – 00:00</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center fade-up">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-fg">Message sent</h3>
              <p className="mt-2 text-sm text-fg-muted">
                Thanks — we'll get back to you shortly.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input
                  id="c-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="c-msg">Message</Label>
                <Textarea
                  id="c-msg"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="text-fg hover:underline">
      {value}
    </a>
  ) : (
    <span className="text-fg">{value}</span>
  );
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-fg-muted">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-fg-subtle">
          {label}
        </p>
        <p className="mt-0.5 text-sm">{content}</p>
      </div>
    </div>
  );
}
