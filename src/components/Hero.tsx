"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Link, Search, Globe, BarChart3, Shield, FileText, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const DottedSurface = dynamic(
  () =>
    import("@/components/ui/dotted-surface").then((mod) => mod.DottedSurface),
  { ssr: false }
);
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { FloatingIconsHeroSection } from "@/components/ui/floating-icons-hero-section";

const words = ["par", "pour"];

const seoIcons = [
  { icon: <Link className="w-5 h-5 text-brand/70" />, x: 8, y: 20 },
  { icon: <Search className="w-5 h-5 text-accent-cyan/70" />, x: 88, y: 15 },
  { icon: <Globe className="w-5 h-5 text-brand/60" />, x: 12, y: 70 },
  { icon: <BarChart3 className="w-5 h-5 text-accent-cyan/60" />, x: 92, y: 65 },
  { icon: <Shield className="w-5 h-5 text-brand/50" />, x: 5, y: 45 },
  { icon: <FileText className="w-5 h-5 text-accent-cyan/50" />, x: 95, y: 40 },
  { icon: <TrendingUp className="w-5 h-5 text-brand/60" />, x: 15, y: 90 },
  { icon: <Zap className="w-5 h-5 text-accent-cyan/60" />, x: 85, y: 85 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      {/* 3D Dotted Surface background */}
      <DottedSurface />

      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,255,157,0.06) 0%, transparent 60%)",
        }}
      />

      <FloatingIconsHeroSection icons={seoIcons} className="relative z-10 max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-bg-card/80 backdrop-blur-sm border border-border-subtle rounded-full px-4 py-1.5 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-brand text-sm font-medium">
              Partenaire en netlinking pour agences et experts SEO
            </span>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Le netlinking conçu{" "}
            <span className="inline-flex items-baseline overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  className="text-brand inline-block"
                  initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            des experts SEO.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Ne sacrifiez plus votre marge ni votre temps à l&apos;outreach.
            Devenez votre propre &laquo;&nbsp;usine à liens&nbsp;&raquo; sans en assumer la gestion
            opérationnelle. Infrastructure en marque blanche, trafic organique
            authentique et rapports prêts à transmettre à vos clients.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="0.75rem"
              containerClassName="h-12"
              className="bg-brand/20 border-brand/30 text-text-primary hover:bg-brand/30 transition-colors gap-2"
              duration={3000}
            >
              Réserver un entretien stratégique
              <ArrowRight className="w-4 h-4" />
            </MovingBorderButton>

            <MovingBorderButton
              as="a"
              href="#"
              borderRadius="0.75rem"
              containerClassName="h-12"
              className="bg-bg-card/80 border-border-subtle text-text-primary hover:bg-bg-card-hover transition-colors"
              borderClassName="bg-[radial-gradient(#a6aab5_40%,transparent_60%)]"
              duration={4000}
            >
              Découvrir nos protocoles de sécurité
            </MovingBorderButton>
          </motion.div>
        </div>
      </FloatingIconsHeroSection>
    </section>
  );
}
