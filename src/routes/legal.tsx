import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
});

function LegalPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="Legal"
        title="Privacy & terms"
        description="A short summary of how Off The Clock handles your data and bookings. Full commercial terms apply at checkout."
      />
      <div className="mx-auto max-w-2xl space-y-8 text-sm leading-relaxed text-fg-muted">
        <div>
          <h2 className="mb-2 text-base font-semibold text-fg">Privacy</h2>
          <p>
            We collect the details you provide when booking (name, email, phone,
            party size) solely to manage your reservation and communicate about
            your visit. We do not sell personal data. Payment details on this
            demo site are simulated and never transmitted to a real processor.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-base font-semibold text-fg">Age policy</h2>
          <p>
            Off The Clock is an 18+ venue. By confirming age on entry to this
            site and on arrival, you represent that all guests meet this
            requirement.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-base font-semibold text-fg">Bookings</h2>
          <p>
            Room rates are as displayed at the time of booking. Peak pricing
            applies Friday–Sunday from 18:00 and bank holidays. Cancellations
            24+ hours in advance receive a full credit; inside 24 hours, room
            fees are non-refundable.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-base font-semibold text-fg">House rules</h2>
          <p>
            Respect the space, other guests in adjoining rooms, and staff.
            Outside alcohol is not permitted. Damage beyond normal wear may be
            charged. We reserve the right to refuse entry or end a session for
            behaviour that breaches these standards.
          </p>
        </div>
        <p className="text-xs text-fg-subtle">
          This page is a demo legal summary for the Off The Clock marketing
          site. Connect a real privacy policy and terms of service before
          production use.
        </p>
      </div>
    </Section>
  );
}
