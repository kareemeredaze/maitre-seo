"use client";

import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

const plans = ["Débutant", "Pro", "Expert"];

const rows = [
  { feature: "DR minimum", values: ["20+", "30+", "40+"] },
  { feature: "Délai max", values: ["20 jours", "20 jours", "20 jours"] },
  { feature: "DR vérifié (Ahrefs)", values: [true, true, true] },
  { feature: "Prospection manuelle", values: [true, true, true] },
  { feature: "Sites avec trafic réel", values: [true, true, true] },
  { feature: "Vérifications qualité", values: [true, true, true] },
  { feature: "Priorité éditeurs", values: [false, true, true] },
  { feature: "Suivi renforcé", values: [false, true, true] },
  { feature: "Score qualité propriétaire", values: [false, false, true] },
  { feature: "Rapports SEO personnalisés", values: [false, false, true] },
  { feature: "Reporting marque blanche", values: [false, true, true] },
  { feature: "Support dédié (Account Manager)", values: [false, false, true] },
  { feature: "Garantie remplacement 1 an", values: [true, true, true] },
];

export default function PricingTable() {
  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-2xl font-bold text-text-primary text-center mb-10">
        Comparer les Offres
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left text-sm font-medium text-text-tertiary py-4 pr-4">
                Fonctionnalité
              </th>
              {plans.map((plan, i) => (
                <motion.th
                  key={plan}
                  className="text-center text-sm font-medium text-text-primary py-4 px-4"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                >
                  {plan}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <motion.tr
                key={row.feature}
                className="border-b border-border-subtle"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 + rowIdx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <td className="text-sm text-text-secondary py-4 pr-4">
                  {row.feature}
                </td>
                {row.values.map((val, i) => (
                  <td key={i} className="text-center py-4 px-4">
                    {typeof val === "boolean" ? (
                      val ? (
                        <Check className="w-4 h-4 text-brand mx-auto" />
                      ) : (
                        <Minus className="w-4 h-4 text-text-tertiary mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-text-primary font-medium">
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
