"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Fingerprint, TrendingUp, Users } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

/* ═══════════════════════════════════════════════════
   Animated Counter  0 → target
   ═══════════════════════════════════════════════════ */
function useCounter(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/* ═══════════════════════════════════════════════════
   Card 1 — Animated 100% Gauge (White Label)
   ═══════════════════════════════════════════════════ */
function GaugeVisual({ inView }: { inView: boolean }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const count = useCounter(100, inView);

  return (
    <div className="flex items-center justify-center py-6">
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="5"
        />
        {/* Animated progress ring — draws on scroll */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#00ff9d"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={inView ? 0 : circ}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)" }}
        />
        {/* Animated counter */}
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {count}%
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Card 2 — Fingerprint with animated ripple rings
   ═══════════════════════════════════════════════════ */
function FingerprintVisual() {
  return (
    <div className="flex items-center justify-center py-8 relative">
      {/* Three concentric expanding rings */}
      {[42, 58, 76].map((size, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(0,240,255,${0.3 - i * 0.08})`,
            animation: `ripple-ring ${2.2 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Fingerprint icon */}
      <Fingerprint
        className="w-11 h-11 text-text-primary relative z-10"
        strokeWidth={1}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Card 3 — Moving wave (Livraison Express)
   ═══════════════════════════════════════════════════ */
function SpeedVisual() {
  return (
    <div className="py-4 space-y-4">
      {/* Metric row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
          </span>
          <span className="text-xs text-text-secondary">Livraison</span>
        </div>
        <span className="text-sm font-bold text-text-primary">
          72h{" "}
          <span className="text-text-tertiary font-normal text-xs">max</span>
        </span>
      </div>
      {/* Animated wave — moves left continuously */}
      <div className="overflow-hidden">
        <svg
          viewBox="0 0 440 40"
          className="w-[200%] h-8 animate-[wave-move_3s_linear_infinite]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q12,4 24,20 Q36,36 48,20 Q60,4 72,20 Q84,36 96,20 Q108,4 120,20 Q132,36 144,20 Q156,4 168,20 Q180,36 192,20 Q204,4 216,20 Q228,36 240,20 Q252,4 264,20 Q276,36 288,20 Q300,4 312,20 Q324,36 336,20 Q348,4 360,20 Q372,36 384,20 Q396,4 408,20 Q420,36 440,20"
            fill="none"
            stroke="#00ff9d"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Card 4 — Stock chart (Résultats Concrets)
   ═══════════════════════════════════════════════════ */
function ChartVisual() {
  const gradId = React.useId();
  const pts =
    "0,88 12,85 24,82 36,80 44,83 52,76 64,70 72,74 84,66 96,60 104,64 116,56 128,50 136,54 148,46 156,40 168,36 176,40 188,32 196,26 204,30 216,22 228,18 236,21 248,16 256,12 268,14 276,10 288,7 300,4";
  return (
    <div className="pt-2">
      <svg
        viewBox="0 0 300 100"
        className="w-full h-28"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="300"
            y2={y}
            stroke="white"
            strokeOpacity={0.03}
            strokeDasharray="4 4"
          />
        ))}
        <polygon
          points={`${pts} 300,100 0,100`}
          fill={`url(#${gradId})`}
        />
        <polyline
          points={pts}
          fill="none"
          stroke="#00f0ff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="300" cy="4" r="3" fill="#00f0ff">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Card 5 — Partner avatars (Réseau Premium)
   ═══════════════════════════════════════════════════ */
const PARTNERS = [
  { name: "TechMag.fr", dr: "DR 62", color: "#00ff9d" },
  { name: "LeaderPro.fr", dr: "DR 55", color: "#00f0ff" },
  { name: "BusinessDaily", dr: "DR 48", color: "#00ff9d" },
];

function PartnersVisual() {
  return (
    <div className="space-y-3 pt-1">
      {PARTNERS.map((p, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: p.color, color: "#0a0a0a" }}
            >
              {p.name.charAt(0)}
            </div>
            <span className="text-sm text-text-secondary">{p.name}</span>
          </div>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded border"
            style={{ color: p.color, borderColor: `${p.color}30` }}
          >
            {p.dr}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SEO Spinner Grid — métiers SEO
   ═══════════════════════════════════════════════════ */
const SEO_JOBS: {
  variant: "default" | "circle" | "pinwheel" | "circle-filled" | "ellipsis" | "ring" | "bars" | "infinite";
  label: string;
}[] = [
  { variant: "default", label: "Crawl" },
  { variant: "circle", label: "Indexation" },
  { variant: "pinwheel", label: "Scraping" },
  { variant: "circle-filled", label: "Analyse DR" },
  { variant: "ellipsis", label: "Métriques" },
  { variant: "ring", label: "Outreach" },
  { variant: "bars", label: "Monitoring" },
  { variant: "infinite", label: "Link Building" },
];

/* ═══════════════════════════════════════════════════
   Main
   ═══════════════════════════════════════════════════ */
export default function SeoEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      {/* ── Header ── */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block border border-accent-cyan/30 text-accent-cyan text-sm py-1 px-4 rounded-lg mb-5">
          Sécurité et Qualité
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Protocole « zéro risque »{" "}
          <span className="text-brand">pour vos campagnes</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Votre réputation est en jeu. Découvrez comment nous protégeons
          l&apos;autorité de vos clients à chaque étape.
        </p>
      </motion.div>

      {/* ── Row 1 : 3 equal cards ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* 100% White Label */}
        <motion.div
          className="bg-bg-card border border-border-subtle rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GaugeVisual inView={inView} />
          <h3 className="text-lg font-bold text-text-primary">Marque Blanche Native</h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Vos clients ne voient que votre marque. Rapports, emails et
            livrables sont intégralement personnalisables selon votre charte.
          </p>
        </motion.div>

        {/* Empreinte Sécurisée */}
        <motion.div
          className="bg-bg-card border border-border-subtle rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FingerprintVisual />
          <h3 className="text-lg font-bold text-text-primary">
            Sécurité Algorithmique
          </h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Aucun PBN, aucune ferme à liens. Vérification du trafic,
            cohérence thématique et métriques anti-spam contrôlées.
          </p>
        </motion.div>

        {/* Livraison Express */}
        <motion.div
          className="sm:col-span-2 lg:col-span-1 bg-bg-card border border-border-subtle rounded-2xl p-6 hover:border-white/10 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SpeedVisual />
          <h3 className="text-lg font-bold text-text-primary mt-2">
            Agilité Opérationnelle
          </h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            10 liens ce mois-ci, 50 le suivant ? Notre modèle s&apos;adapte
            à la saisonnalité de vos clients, sans engagement.
          </p>
        </motion.div>
      </div>

      {/* ── Row 2 : 2 wider cards ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Résultats Concrets */}
        <motion.div
          className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6 pb-0">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent-cyan" />
              <span className="text-xs text-text-tertiary">
                Trafic organique
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Résultats Mesurables
            </h3>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">
              Des KPIs concrets pour justifier chaque campagne auprès de vos
              clients. Trafic, positions, autorité — tout est documenté.
            </p>
          </div>
          <ChartVisual />
        </motion.div>

        {/* Réseau Premium */}
        <motion.div
          className="bg-bg-card border border-border-subtle rounded-2xl p-6 hover:border-white/10 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-brand" />
            <span className="text-xs text-text-tertiary">Outreach privé</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            Inventaire Privé
          </h3>
          <p className="text-sm text-text-secondary mt-1 mb-4 leading-relaxed">
            Accès à un réseau de sites invisibles sur les plateformes publiques.
            Chaque opportunité est prospectée artisanalement.
          </p>
          <PartnersVisual />
        </motion.div>
      </div>

      {/* ── SEO Spinners Grid ── */}
      <motion.div
        className="max-w-5xl mx-auto mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-center text-sm text-text-tertiary mb-8 uppercase tracking-widest">
          Nos processus en action
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {SEO_JOBS.map((job, i) => (
            <motion.div
              key={job.label}
              className="flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
            >
              <div className="text-brand">
                <Spinner variant={job.variant} size={28} />
              </div>
              <span className="text-[11px] text-text-secondary font-mono text-center leading-tight">
                {job.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
