"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  Eye,
  ShieldCheck,
  Search,
  FileText,
  Zap,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const features = [
  {
    icon: Users,
    title: "Expertise « Pair-à-Pair »",
    description:
      "Nous maîtrisons votre langage (DR, E-E-A-T, SGE, toxicité) et comprenons vos briefs stratégiques dès la première lecture.",
  },
  {
    icon: Eye,
    title: "Marque Blanche Native",
    description:
      "Rapports, emails et livrables intégralement personnalisables. Vous conservez le contrôle absolu de la relation client.",
  },
  {
    icon: ShieldCheck,
    title: "Sites Authentiques, Trafic Réel",
    description:
      "Aucun PBN, aucune ferme à liens. La sécurité algorithmique de vos clients est notre priorité absolue.",
  },
  {
    icon: Search,
    title: "Outreach Manuel et Sélectif",
    description:
      "Chaque opportunité est prospectée artisanalement, avec validation de la pertinence éditoriale pour des placements inaccessibles ailleurs.",
  },
  {
    icon: FileText,
    title: "Reporting « Prêt pour le Client »",
    description:
      "Tableaux de bord exhaustifs (URLs, métriques, captures). Un simple transfert à votre client suffit.",
  },
  {
    icon: Zap,
    title: "Agilité à la Demande",
    description:
      "Modèle « pay-as-you-go » qui s’adapte à la saisonnalité de vos clients et à vos urgences, sans engagement.",
  },
];

type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-text-primary tracking-wide text-balance sm:text-4xl">
            Votre Équipe{" "}
            <span className="text-brand">Élargie</span>
          </h2>
          <p className="text-text-secondary mt-4 text-sm tracking-wide text-balance">
            Pourquoi les leaders du SEO nous choisissent comme partenaire
            technique pour le netlinking de leurs clients.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed divide-border-subtle border border-dashed border-border-subtle rounded-xl overflow-hidden sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}
