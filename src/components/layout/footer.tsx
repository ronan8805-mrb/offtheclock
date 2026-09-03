import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { STUDIO } from "@/data/venue";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-fg-muted">
            Off The Clock is the studio. Ronan Buckley is the one who ships.
            Web, apps, campaigns, worlds — always on.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">Explore</h3>
          <ul className="space-y-2.5 text-sm text-fg-muted">
            <li><Link to="/rooms" className="hover:text-fg transition-colors">Work</Link></li>
            <li><Link to="/pricing" className="hover:text-fg transition-colors">Services</Link></li>
            <li><Link to="/treats" className="hover:text-fg transition-colors">Lab</Link></li>
            <li><Link to="/book" className="hover:text-fg transition-colors">Start a brief</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">Studio</h3>
          <ul className="space-y-2.5 text-sm text-fg-muted">
            <li><Link to="/how-it-works" className="hover:text-fg transition-colors">Process</Link></li>
            <li><Link to="/faq" className="hover:text-fg transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-fg transition-colors">Contact</Link></li>
            <li><Link to="/legal" className="hover:text-fg transition-colors">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">Reach</h3>
          <ul className="space-y-3 text-sm text-fg-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
              <span>{STUDIO.location}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
              <a href={`mailto:${STUDIO.email}`} className="hover:text-fg">{STUDIO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Ronan Buckley · Off The Clock</p>
          <p>Dublin · Spain · the internet</p>
        </div>
      </div>
    </footer>
  );
}
