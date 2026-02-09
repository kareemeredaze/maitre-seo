import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "MaitreSEO est devenu notre partenaire exclusif en netlinking. Nos clients gagnent en moyenne 40 positions. La qualité des backlinks est sans équivalent : de vrais sites éditoriaux, aucun PBN.",
    name: "Marie Lefèvre",
    role: "Directrice, Agence SEO Pulse",
  },
  {
    quote:
      "En tant qu’indépendant, j’ai besoin d’un prestataire fiable, sans micromanagement. MaitreSEO livre du trafic réel. Mes clients constatent des résultats en 3 à 6 semaines.",
    name: "Antoine Mercier",
    role: "Consultant SEO indépendant",
  },
  {
    quote:
      "La transparence des métriques et la sélection des domaines nous permettent de revendre le service avec une marge sereine. Notre taux de satisfaction client a fortement progressé.",
    name: "Camille Dubois",
    role: "Responsable SEO, Agence Digitale Neocom",
  },
  {
    quote:
      "La sélection des domaines est chirurgicale. Exactement ce qu’il faut pour un netlinking white-hat efficace, présentable en comité de direction.",
    name: "Pierre Moreau",
    role: "Co-fondateur, Agence SEO Rankify",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
          Ils nous font confiance
        </h2>
        <p className="text-text-secondary text-center mb-16">
          Agences SEO, consultants indépendants — pourquoi les professionnels nous choisissent.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-bg-card border border-border-subtle rounded-xl p-6"
            >
              <Quote className="w-6 h-6 text-brand mb-4" />
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t.name}
                </p>
                <p className="text-xs text-text-tertiary">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
