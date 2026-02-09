import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PricingHero from "@/components/PricingHero";
import PricingCards from "@/components/PricingCards";
import PricingTable from "@/components/PricingTable";
import PricingFAQ from "@/components/PricingFAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tarifs — Modèles tarifaires flexibles pour agences",
  description:
    "Structure de coûts claire pour définir vos marges. Tarifs publics à partir de 125 € par lien. Remises dégressives pour les agences partenaires.",
  keywords: [
    "tarifs netlinking",
    "prix backlinks",
    "guest post prix",
    "forfait agence SEO",
    "link building tarif",
  ],
  alternates: {
    canonical: "https://maitre-seo.fr/pricing",
  },
  openGraph: {
    title: "Tarifs Maitre SEO — À partir de 125 € / lien",
    description:
      "Structure de coûts claire pour définir vos marges. 3 offres : Débutant (125 €), Pro (175 €), Expert (250 €).",
    url: "https://maitre-seo.fr/pricing",
  },
};

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la différence entre les offres Débutant, Pro et Expert ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chaque offre correspond à un niveau de Domain Rating (DR) : Débutant (DR 20+), Pro (DR 30+) et Expert (DR 40+). Les offres Pro et Expert incluent la priorité dans la sélection des éditeurs, un suivi renforcé et le reporting en marque blanche.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des tarifs dégressifs pour les agences ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les agences partenaires bénéficient de tarifs dégressifs selon le volume mensuel et d'options de facturation récurrente.",
      },
    },
    {
      "@type": "Question",
      name: "Les liens sont-ils permanents ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Nous offrons une garantie contractuelle d'un an. En cas de suppression, nous remplaçons le lien gratuitement ou procédons au remboursement intégral.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je revendre le service sous ma propre marque ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. Notre communication est entièrement orientée vers vous. Les rapports sont générés sans notre logo, et nous n'entrons jamais en contact avec vos clients finaux.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingFaqJsonLd),
        }}
      />
      <Navbar />
      <main className="pt-24">
        <PricingHero />

        {/* Pricing Cards */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <PricingCards />
          </div>
        </section>

        {/* Comparison Table */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <PricingTable />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-12">
          <PricingFAQ />
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
