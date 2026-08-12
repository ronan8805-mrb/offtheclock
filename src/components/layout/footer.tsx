import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <Logo className="h-9" />
          <p className="text-sm leading-relaxed text-fg-muted">
            Private social rooms in Dublin. Your space. Your friends. Your time.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg hover:border-border-strong"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="mailto:hello@offtheclock.ie"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg hover:border-border-strong"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-fg-muted">
            <li>
              <Link to="/rooms" className="hover:text-fg transition-colors">
                Rooms
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-fg transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/treats" className="hover:text-fg transition-colors">
                Treats & Packages
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:text-fg transition-colors">
                Book
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
            Info
          </h3>
          <ul className="space-y-2.5 text-sm text-fg-muted">
            <li>
              <Link
                to="/how-it-works"
                className="hover:text-fg transition-colors"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-fg transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-fg transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-fg transition-colors">
                Privacy & Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
            Visit
          </h3>
          <ul className="space-y-3 text-sm text-fg-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
              <span>Dublin city centre · Ireland</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
              <a href="tel:+35318000000" className="hover:text-fg">
                +353 1 800 0000
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
              <a href="mailto:hello@offtheclock.ie" className="hover:text-fg">
                hello@offtheclock.ie
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Off The Clock. All rights reserved.</p>
          <p>18+ private social rooms · Dublin</p>
        </div>
      </div>
    </footer>
  );
}
