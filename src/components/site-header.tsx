import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/campuses", label: "Campuses" },
  { to: "/fellowships", label: "Fellowships" },
  { to: "/watch", label: "Watch" },
  { to: "/about", label: "About" },
  { to: "/messages", label: "Messages" },
  { to: "/events", label: "Events" },
  { to: "/next-steps", label: "Next Steps" },
  { to: "/contact", label: "Contact" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-grace shadow-[0_0_20px_var(--color-grace)] transition-transform group-hover:scale-125"
          />
          <span className="font-display text-xl leading-none text-ink">
            Grace City
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/next-steps"
            className="inline-flex items-center gap-2 rounded-full bg-grace px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Plan your visit
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path
              d={open ? "M2 2l16 10M2 12L18 2" : "M0 1h20M0 7h20M0 13h20"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-background">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-ink-muted hover:bg-white/5 hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/next-steps"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-grace px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Plan your visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
