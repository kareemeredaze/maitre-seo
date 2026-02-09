"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="text-center px-6 pb-12">
      <motion.div
        className="inline-block border border-accent-cyan/30 text-accent-cyan text-sm py-1 px-4 rounded-lg mb-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Tarifs
      </motion.div>
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-text-primary mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Modèles tarifaires flexibles
      </motion.h1>
      <motion.p
        className="text-text-secondary max-w-xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        Une structure de coûts claire pour définir vos marges. Remises dégressives pour les agences partenaires.
      </motion.p>
    </section>
  );
}
