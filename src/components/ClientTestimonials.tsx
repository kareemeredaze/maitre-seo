"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

const testimonials = [
  {
    text: "MaitreSEO est devenu notre partenaire exclusif en netlinking. Nos clients gagnent en moyenne 40 positions. La qualité des backlinks est sans équivalent : de vrais sites éditoriaux, aucun PBN. Une extension invisible de notre équipe.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Marie Lefèvre",
    role: "Directrice, Agence SEO Pulse",
  },
  {
    text: "En tant qu’indépendant, j’ai besoin d’un prestataire fiable, sans micromanagement. MaitreSEO livre du trafic réel. Mes clients constatent des résultats en 3 à 6 semaines, sans que j’aie à gérer l’outreach.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Antoine Mercier",
    role: "Consultant SEO indépendant",
  },
  {
    text: "La transparence des métriques et la sélection des domaines nous permettent de revendre le service avec une marge sereine. Notre taux de satisfaction client a fortement progressé grâce à la qualité des livrables.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Camille Dubois",
    role: "Responsable SEO, Agence Digitale Neocom",
  },
  {
    text: "La sélection des domaines est chirurgicale. Exactement ce qu’il faut pour un netlinking white-hat efficace, présentable en comité de direction.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Pierre Moreau",
    role: "Co-fondateur, Agence SEO Rankify",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(0, 2);

export default function ClientTestimonials() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-brand/30 text-brand text-sm py-1 px-4 rounded-lg">
              Témoignages
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mt-5 text-center">
            Ils nous font confiance
          </h2>
          <p className="text-center mt-4 text-text-secondary">
            Agences SEO, consultants indépendants — découvrez
            pourquoi les professionnels du référencement nous choisissent comme partenaire technique.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
