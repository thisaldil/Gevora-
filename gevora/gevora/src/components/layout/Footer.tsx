import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/buy", label: "Buy" },
      { href: "/rent", label: "Rent" },
      { href: "/land", label: "Land" },
      { href: "/commercial", label: "Commercial" },
      { href: "/projects", label: "New projects" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools/mortgage-calculator", label: "Mortgage calculator" },
      { href: "/insights", label: "Market insights" },
      { href: "/compare", label: "Compare properties" },
      { href: "/agents", label: "Find an agent" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard", label: "Your dashboard" },
      { href: "/dashboard/saved", label: "Saved properties" },
      { href: "/dashboard/searches", label: "Saved searches" },
      { href: "/sell", label: "List your property" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Gevora" },
      { href: "#", label: "Help centre" },
      { href: "#", label: "Privacy policy" },
      { href: "#", label: "Terms of use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-mist bg-paper">
      <div className="louvre-divider" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink/65 hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-mist pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-lg font-semibold text-ink">Gevora</p>
          <p className="text-sm text-ink/60">
            Sri Lanka&rsquo;s property index — every listing, every suburb, one place.
          </p>
          <p className="text-xs text-ink/45">© {new Date().getFullYear()} Gevora. Built in Colombo.</p>
        </div>
      </div>
    </footer>
  );
}
