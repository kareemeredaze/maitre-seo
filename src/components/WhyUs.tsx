"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  User,
  CheckCircle,
  Link2,
  TrendingUp,
  Calendar,
  Globe,
  FileText,
  Clock,
} from "lucide-react";

/* ── Timeline steps ──────────────────────────────── */
const TIMELINE = [
  { label: "Audit", done: true },
  { label: "Prospection", done: true },
  { label: "Rédaction", done: true },
  { label: "Publication", done: true },
  { label: "Vérification", done: false },
];

/* ── KPIs ─────────────────────────────────────────── */
const KPIS = [
  { label: "Satisfaction", target: 94, suffix: "%" },
  { label: "Qualité", target: 97, suffix: "%" },
  { label: "Réactivité", target: 98, suffix: "%" },
  { label: "Risque", target: 0, suffix: "" },
];

/* ── Campaign details ────────────────────────────── */
const DETAILS = [
  { icon: Link2, label: "Backlinks livrés", value: "18 / 25" },
  { icon: Globe, label: "Sites uniques", value: "18" },
  { icon: TrendingUp, label: "DR moyen", value: "34.2" },
  { icon: Calendar, label: "Début campagne", value: "12 Jan 2026" },
  { icon: Clock, label: "Livraison estimée", value: "15 Fév 2026" },
  { icon: FileText, label: "Rapports envoyés", value: "3" },
];

/* ── Animated counter ────────────────────────────── */
function AnimatedCounter({
  target,
  suffix,
  active,
  delay,
}: {
  target: number;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setValue(target);
          clearInterval(interval);
        } else {
          setValue(Math.round(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [active, target, delay]);

  return (
    <span className="text-xl font-bold text-text-primary tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ── Component ────────────────────────────────────── */
export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block border border-accent-cyan/30 text-accent-cyan text-sm py-1 px-4 rounded-lg mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Transparence
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Suivi Client en <span className="text-brand">Temps Réel</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Chaque campagne est suivie en direct. Vous voyez exactement où en
            sont vos backlinks à tout moment.
          </p>
        </motion.div>

        {/* Tracking card */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-[rgba(17,17,17,0.7)] border border-accent-cyan/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.05)]">
            {/* Client info + status */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">
                    Michael S.
                  </p>
                  <p className="text-xs text-text-tertiary">
                    Campagne Netlinking — E-Commerce Mode
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand font-medium bg-brand/10 border border-brand/20 rounded-full px-2.5 py-0.5">
                  En cours
                </span>
                <span className="text-xs text-text-tertiary">
                  72% complété
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-1.5 rounded-full bg-bg-card overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "72%" } : {}}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-3 left-3 right-3 h-[2px] bg-border-subtle" />
                <motion.div
                  className="absolute top-3 left-3 h-[2px] bg-brand"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "75%" } : {}}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                />

                {TIMELINE.map((step, i) => (
                  <motion.div
                    key={step.label}
                    className="relative z-10 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.12,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.done
                          ? "bg-brand"
                          : "bg-bg-card border-2 border-border-medium"
                      }`}
                    >
                      {step.done && (
                        <CheckCircle className="w-3.5 h-3.5 text-bg-base" />
                      )}
                      {!step.done && (
                        <div className="w-2 h-2 rounded-full bg-text-tertiary" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] mt-2 font-medium ${
                        step.done ? "text-text-primary" : "text-text-tertiary"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Campaign details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {DETAILS.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  className="flex items-center gap-2.5 bg-bg-card border border-border-subtle rounded-lg p-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                >
                  <detail.icon className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-text-tertiary truncate">
                      {detail.label}
                    </p>
                    <p className="text-xs font-bold text-text-primary">
                      {detail.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* KPIs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {KPIS.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  className="bg-bg-card border border-border-subtle rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                >
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">
                    {kpi.label}
                  </p>
                  <AnimatedCounter
                    target={kpi.target}
                    suffix={kpi.suffix}
                    active={isInView}
                    delay={1000 + i * 200}
                  />
                  <div className="mt-2">
                    <CheckCircle className="w-4 h-4 text-brand mx-auto" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
