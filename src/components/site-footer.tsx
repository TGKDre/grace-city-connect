import { Link } from "@tanstack/react-router";
import { campuses } from "@/lib/campuses";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-grace shadow-[0_0_20px_var(--color-grace)]"
              />
              <span className="font-display text-2xl text-ink">Grace City</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              One church, many cities. A Loveworld Campus Ministry family
              raising a generation to walk in the reality of the Word.
            </p>
          </div>

          <div className="md:col-span-5">
            <p className="eyebrow">Campuses</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {campuses.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/campuses/$slug"
                    params={{ slug: c.slug }}
                    className="text-ink-muted transition-colors hover:text-grace"
                  >
                    {c.city}
                    <span className="ml-1 text-ink-muted/60">
                      {c.state === "Texas"
                        ? "TX"
                        : c.state === "California"
                          ? "CA"
                          : "FL"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/fellowships", label: "Fellowships" },
                { to: "/watch", label: "Watch live" },

                { to: "/messages", label: "Messages" },
                { to: "/events", label: "Events" },
                { to: "/next-steps", label: "Next Steps" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink-muted transition-colors hover:text-grace"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-ink-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} BLW Grace City · A Loveworld Campus
            Ministry
          </p>
          <p className="font-display text-sm italic text-ink-muted/80">
            Changing lives. Changing nations.
          </p>
        </div>
      </div>
    </footer>
  );
}
