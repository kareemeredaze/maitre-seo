"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Comment garantissez-vous la pérennité des liens ?",
    answer:
      "Nous offrons une garantie contractuelle d’un an. En cas de suppression ou de chute du site, nous remplaçons le lien gratuitement ou procédons au remboursement intégral. Notre sélection rigoureuse des éditeurs réduit ce risque à moins de 1 %.",
  },
  {
    question: "Le service est-il réellement en marque blanche ? Mes clients sauront-ils que vous intervenez ?",
    answer:
      "Non. Notre communication est entièrement orientée vers vous. Les rapports peuvent être générés sans notre logo, et nous n’entrons jamais en contact avec vos clients finaux. Vous restez le seul interlocuteur.",
  },
  {
    question: "Quelle est la différence entre une insertion et un guest post ?",
    answer:
      "Le guest post est un article neuf, créé sur mesure, générant sa propre visibilité. L’insertion (Niche Edit) place votre lien dans un article déjà indexé. L’insertion transfère plus rapidement l’autorité, tandis que le guest post apporte une pertinence sémantique et un trafic direct accrus.",
  },
  {
    question: "Traitez-vous les niches à risque (CBD, casino, crypto) ?",
    answer:
      "Oui, via des réseaux dédiés, mais les coûts sont majorés en raison de la rareté et des exigences qualitatives des éditeurs. Contactez-nous pour évaluer la faisabilité.",
  },
  {
    question: "Puis-je fournir mes propres textes ?",
    answer:
      "Oui. Si vous disposez d’une équipe rédactionnelle interne, nous gérons uniquement l’outreach et la publication. Nos rédacteurs experts SEO sont inclus dans le tarif standard des guest posts.",
  },
  {
    question: "Comment intégrez-vous l’E-E-A-T dans votre sélection ?",
    answer:
      "Nous privilégions les sites avec des auteurs identifiés, des pages « À propos » détaillées et des contenus validés par des experts. Pour les secteurs YMYL (santé, finance), nous vérifions la crédibilité du site hôte pour un signal de confiance optimal.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-4">
          Questions Fréquentes
        </h2>
        <p className="text-text-secondary text-center mb-16">
          Réponses aux interrogations des agences et consultants SEO.
        </p>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border-subtle">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-brand shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-text-tertiary shrink-0" />
                )}
              </button>
              <div
                className={`faq-content ${openIndex === i ? "open" : ""}`}
              >
                <div>
                  <p className="text-sm text-text-secondary leading-relaxed pb-5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
