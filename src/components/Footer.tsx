import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      "Guest Posts",
      "Insertions de Liens",
      "Forfaits Agences",
      "Audit SEO",
    ],
  },
  {
    title: "Ressources",
    links: ["Blog", "Études de cas", "FAQ"],
  },
  {
    title: "Légal",
    links: ["CGV", "Politique de confidentialité"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Columns + Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-text-primary mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter — 4th column */}
          <div>
            <p className="text-sm font-semibold text-text-primary mb-4">
              Le Bulletin des Experts SEO
            </p>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Analyses algorithmiques, études de cas internes et opportunités de liens exclusives.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Adresse email professionnelle"
                className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-brand text-bg-base font-semibold px-4 py-2 rounded-lg hover:bg-brand-hover transition-colors text-sm"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-subtle pt-6">
          <p className="text-xs text-text-tertiary">
            © 2026 Maitre SEO. Votre partenaire technique en netlinking.
          </p>
          <div className="flex gap-6">
            {["LinkedIn", "Twitter/X", "YouTube"].map((s) => (
              <Link
                key={s}
                href="#"
                className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
