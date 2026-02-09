import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustBanner from "@/components/TrustBanner";
import SeoEcosystem from "@/components/SeoEcosystem";
import WhyUs from "@/components/WhyUs";
import Features from "@/components/Features";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const ClientTestimonials = dynamic(
  () => import("@/components/ClientTestimonials"),
  { ssr: true }
);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maitre SEO",
  url: "https://maitre-seo.fr",
  logo: "https://maitre-seo.fr/opengraph-image",
  description:
    "Infrastructure netlinking en marque blanche pour agences et consultants SEO.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@maitre-seo.fr",
    telephone: "+33123456789",
    contactType: "sales",
    availableLanguage: "French",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  sameAs: [],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment garantissez-vous la pérennité des liens ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous offrons une garantie contractuelle d'un an. En cas de suppression ou de chute du site, nous remplaçons le lien gratuitement ou procédons au remboursement intégral. Notre sélection rigoureuse des éditeurs réduit ce risque à moins de 1 %.",
      },
    },
    {
      "@type": "Question",
      name: "Le service est-il réellement en marque blanche ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Notre communication est entièrement orientée vers vous. Les rapports peuvent être générés sans notre logo, et nous n'entrons jamais en contact avec vos clients finaux. Vous restez le seul interlocuteur.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre une insertion et un guest post ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le guest post est un article neuf, créé sur mesure, générant sa propre visibilité. L'insertion (Niche Edit) place votre lien dans un article déjà indexé. L'insertion transfère plus rapidement l'autorité, tandis que le guest post apporte une pertinence sémantique et un trafic direct accrus.",
      },
    },
    {
      "@type": "Question",
      name: "Traitez-vous les niches à risque (CBD, casino, crypto) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, via des réseaux dédiés, mais les coûts sont majorés en raison de la rareté et des exigences qualitatives des éditeurs. Contactez-nous pour évaluer la faisabilité.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je fournir mes propres textes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Si vous disposez d'une équipe rédactionnelle interne, nous gérons uniquement l'outreach et la publication. Nos rédacteurs experts SEO sont inclus dans le tarif standard des guest posts.",
      },
    },
    {
      "@type": "Question",
      name: "Comment intégrez-vous l'E-E-A-T dans votre sélection ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous privilégions les sites avec des auteurs identifiés, des pages « À propos » détaillées et des contenus validés par des experts. Pour les secteurs YMYL, nous vérifions la crédibilité du site hôte pour un signal de confiance optimal.",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Link Building / Netlinking",
  provider: {
    "@type": "Organization",
    name: "Maitre SEO",
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Offres Netlinking",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Débutant — DR 20+",
        price: "125",
        priceCurrency: "EUR",
        description:
          "Backlinks DR 20+ avec prospection manuelle, thématique pertinente et vérifications qualité.",
      },
      {
        "@type": "Offer",
        name: "Pro — DR 30+",
        price: "175",
        priceCurrency: "EUR",
        description:
          "Backlinks DR 30+ avec priorité éditeurs, suivi renforcé et reporting marque blanche.",
      },
      {
        "@type": "Offer",
        name: "Expert — DR 40+",
        price: "250",
        priceCurrency: "EUR",
        description:
          "Backlinks DR 40+ avec account manager dédié, rapports personnalisés et optimisation post-livraison.",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TrustBanner />
        <SeoEcosystem />
        <WhyUs />
        <Features />
        <CaseStudies />
        <ClientTestimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
