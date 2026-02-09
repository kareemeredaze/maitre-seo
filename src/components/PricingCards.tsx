"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  tier: string;
  price: string;
  drLevel: string;
  deliveryMax: string;
  profile: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Débutant",
    tier: "Offre 1",
    price: "125 €",
    drLevel: "DR 20+",
    deliveryMax: "20 jours max",
    profile: "Lancement de site / niche peu concurrentielle",
    features: [
      "Backlinks DR 20+",
      "Prospection manuelle 100 %",
      "Thématique pertinente",
      "Vérifications qualité approfondies",
      "Sites réels avec trafic",
    ],
  },
  {
    name: "Pro",
    tier: "Offre 2",
    price: "175 €",
    drLevel: "DR 30+",
    deliveryMax: "20 jours max",
    profile: "Croissance / mid-market",
    features: [
      "Backlinks DR 30+",
      "Prospection manuelle 100 %",
      "Thématique pertinente",
      "Vérifications qualité approfondies",
      "Sites réels avec trafic",
      "Priorité sélection éditeurs",
      "Suivi renforcé",
    ],
    popular: true,
  },
  {
    name: "Expert",
    tier: "Offre 3",
    price: "250 €",
    drLevel: "DR 40+",
    deliveryMax: "20 jours max",
    profile: "Stratégie agressive / haut de gamme",
    features: [
      "Backlinks DR 40+",
      "Prospection manuelle 100 %",
      "Thématique pertinente",
      "Vérifications qualité approfondies",
      "Sites réels avec trafic",
      "Priorité sélection éditeurs",
      "Suivi renforcé",
      "Score qualité éditeur propriétaire",
      "Rapports SEO personnalisés",
      "Optimisation post-livraison",
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      className={`bg-bg-card rounded-xl p-6 flex flex-col border transition-colors ${
        plan.popular
          ? "border-brand ring-1 ring-accent-cyan/20 shadow-[0_0_30px_rgba(0,255,157,0.1)]"
          : "border-border-subtle hover:border-accent-cyan/30"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
    >
      {/* DR Badge */}
      <span className="text-[10px] font-medium text-accent-cyan border border-accent-cyan/30 rounded-full px-2.5 py-0.5 self-start mb-3">
        {plan.drLevel}
      </span>

      {plan.popular && (
        <span className="text-xs font-semibold text-bg-base bg-brand px-3 py-1 rounded-full self-start mb-4">
          Populaire
        </span>
      )}

      <div className="mb-1">
        <p className="text-xs text-text-tertiary mb-1">{plan.tier}</p>
        <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
        <p className="text-[11px] text-text-tertiary mt-1">{plan.profile}</p>
      </div>

      <div className="mb-1 mt-4">
        <span className="text-3xl font-bold text-text-primary">
          {plan.price}
        </span>
        <span className="text-sm text-text-tertiary ml-1">/ lien</span>
      </div>

      <p className="text-[11px] text-text-tertiary mb-6">
        Délai max : {plan.deliveryMax}
      </p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-text-secondary"
          >
            <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block text-center text-sm font-semibold py-3 rounded-lg transition-colors ${
          plan.popular
            ? "bg-brand text-bg-base hover:bg-brand-hover"
            : "border border-border-medium text-text-primary hover:bg-bg-card-hover"
        }`}
      >
        {plan.popular ? "Commander" : "Choisir"}
      </a>
    </motion.div>
  );
}

export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <PlanCard key={plan.name} plan={plan} index={i} />
      ))}
    </div>
  );
}
