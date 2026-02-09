"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Calendar, TrendingUp, DollarSign } from "lucide-react";

/* ── Case data ────────────────────────────────────── */
const cases = [
  {
    title: "E-Commerce Mode",
    links: 30,
    duration: "5 mois",
    growth: { value: 600, prefix: "+", suffix: "%" },
    icon: TrendingUp,
    growthLabel: "Augmentation trafic",
  },
  {
    title: "Site Santé & Bien-être",
    links: 250,
    duration: "12 mois",
    growth: { value: 107, prefix: "+", suffix: "%" },
    icon: TrendingUp,
    growthLabel: "Augmentation trafic",
    revenue: "21 383 € / mois",
  },
  {
    title: "E-Commerce Décoration",
    links: 53,
    duration: "12 mois",
    growth: { value: 209, prefix: "+", suffix: "%" },
    icon: DollarSign,
    growthLabel: "Augmentation CA",
  },
  {
    title: "Blog Voyage & Outdoor",
    links: 85,
    duration: "12 mois",
    growth: { value: 284, prefix: "+", suffix: "%" },
    icon: TrendingUp,
    growthLabel: "Augmentation trafic",
  },
];

/* ── SVG curve paths (ascending bezier) ──────────── */
const CURVES = [
  "M 10 160 C 40 155, 60 140, 90 120 S 140 60, 180 40 S 240 25, 290 15",
  "M 10 160 C 50 150, 70 130, 110 100 S 160 70, 200 55 S 260 40, 290 30",
  "M 10 160 C 30 158, 80 145, 120 110 S 170 65, 220 45 S 270 20, 290 12",
  "M 10 160 C 45 155, 75 135, 100 115 S 150 75, 200 50 S 250 30, 290 18",
];

/* ── Animated counter ────────────────────────────── */
function Counter({
  target,
  prefix,
  suffix,
  active,
  delay,
}: {
  target: number;
  prefix: string;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 50;
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
    <span className="text-2xl font-bold text-text-primary tabular-nums">
      {prefix}
      {value.toLocaleString("fr-FR")}
      {suffix && <span className="text-brand ml-0.5">{suffix}</span>}
    </span>
  );
}

/* ── Chart card ──────────────────────────────────── */
function ChartCard({
  caseData,
  curveD,
  index,
  isInView,
}: {
  caseData: (typeof cases)[0];
  curveD: string;
  index: number;
  isInView: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(400);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <motion.div
      className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-accent-cyan/20 transition-colors"
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
    >
      {/* SVG chart */}
      <div className="p-5 pb-3">
        <svg viewBox="0 0 300 170" className="w-full h-auto">
          {/* Grid lines */}
          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="10"
              y1={y}
              x2="290"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          {[70, 130, 190, 250].map((x) => (
            <line
              key={x}
              x1={x}
              y1="10"
              x2={x}
              y2="160"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}

          {/* Gradient fill under curve */}
          <defs>
            <linearGradient
              id={`grad-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <path
            d={`${curveD} L 290 170 L 10 170 Z`}
            fill={`url(#grad-${index})`}
            opacity={isInView ? 1 : 0}
            style={{ transition: "opacity 1s ease-in-out 0.5s" }}
          />

          {/* Animated curve line */}
          <path
            ref={pathRef}
            d={curveD}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isInView ? 0 : pathLength,
              transition: `stroke-dashoffset 2s ease-in-out ${0.3 + index * 0.15}s`,
            }}
          />
        </svg>

        {/* Counter */}
        <div className="flex items-center justify-between mt-2">
          <Counter
            target={caseData.growth.value}
            prefix={caseData.growth.prefix}
            suffix={caseData.growth.suffix}
            active={isInView}
            delay={500 + index * 200}
          />
          <span className="text-xs text-text-tertiary">
            {caseData.growthLabel}
          </span>
        </div>
      </div>

      {/* Info card below chart */}
      <div className="border-t border-border-subtle px-5 py-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">
          {caseData.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-xs text-text-secondary">
              {caseData.links} liens
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-xs text-text-secondary">
              {caseData.duration}
            </span>
          </div>
          {caseData.revenue && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-brand" />
              <span className="text-xs text-brand font-medium">
                {caseData.revenue}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Component ────────────────────────────────────── */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Études de Cas Récentes
          </h2>
          <p className="text-text-secondary">
            Des résultats mesurables pour nos clients.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <ChartCard
              key={i}
              caseData={c}
              curveD={CURVES[i]}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
