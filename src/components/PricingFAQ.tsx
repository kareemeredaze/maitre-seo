"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Quelle est la différence entre les offres Débutant, Pro et Expert ?",
    answer:
      "Chaque offre correspond à un niveau de Domain Rating (DR) : Débutant (DR 20+), Pro (DR 30+) et Expert (DR 40+). Les offres Pro et Expert incluent la priorité dans la sélection des éditeurs, un suivi renforcé et le reporting en marque blanche. L’offre Expert ajoute un Account Manager dédié, des rapports personnalisés et l’optimisation post-livraison.",
  },
  {
    question: "Proposez-vous des tarifs dégressifs pour les agences ?",
    answer:
      "Oui. Les agences partenaires bénéficient de tarifs dégressifs selon le volume mensuel et d’options de facturation récurrente. Contactez-nous pour obtenir le barème agence.",
  },
  {
    question: "Les liens sont-ils permanents ?",
    answer:
      "Oui. Nous offrons une garantie contractuelle d’un an. En cas de suppression, nous remplaçons le lien gratuitement ou procédons au remboursement intégral.",
  },
  {
    question: "Puis-je revendre le service sous ma propre marque ?",
    answer:
      "Absolument. Notre communication est entièrement orientée vers vous. Les rapports sont générés sans notre logo, et nous n’entrons jamais en contact avec vos clients finaux.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="mt-20 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-2xl font-bold text-text-primary text-center mb-10">
        Questions Fréquentes
      </h3>

      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            className="border-b border-border-subtle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-sm font-medium text-text-primary pr-4 group-hover:text-brand transition-colors">
                {faq.question}
              </span>
              {openIndex === i ? (
                <Minus className="w-5 h-5 text-brand shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-text-tertiary shrink-0 group-hover:text-brand transition-colors" />
              )}
            </button>
            <div className={`faq-content ${openIndex === i ? "open" : ""}`}>
              <div>
                <p className="text-sm text-text-secondary leading-relaxed pb-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
