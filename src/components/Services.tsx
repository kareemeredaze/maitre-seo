import { FileText, Link2, Package, ArrowRight } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Guest Posts Stratégiques",
    description:
      "Création et publication de contenus exclusifs sur des sites à forte autorité (DR/DA élevé) et trafic vérifié. Idéal pour lancer un site ou renforcer la thématique sémantique d’un client. Rédaction incluse et optimisée pour l’intention de recherche.",
  },
  {
    icon: Link2,
    title: "Insertions de Liens (Niche Edits)",
    description:
      "Placement de liens contextuels dans des articles existants, déjà indexés et positionnés sur Google. Coup de pouce rapide sur des mots-clés stratégiques : le transfert d’autorité est immédiat.",
  },
  {
    icon: Package,
    title: "Forfaits Agences et Sur Mesure",
    description:
      "Offres groupées personnalisables selon les besoins de vos clients (e-commerce, SaaS, local). Définissez un budget mensuel, et nous optimisons l’allocation entre Guest Posts et Insertions pour maximiser le ROI client.",
  },
];

export default function Services() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <a
            key={service.title}
            href="#"
            className="group bg-bg-card border border-border-subtle rounded-xl p-8 hover:border-brand/30 hover:shadow-[0_0_30px_rgba(0,255,157,0.05)] transition-all duration-300"
          >
            <service.icon className="w-8 h-8 text-brand mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-1 text-brand text-sm font-medium group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
