"use client";

import { ArrowRight } from "lucide-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import dynamic from "next/dynamic";

const DottedSurface = dynamic(
  () =>
    import("@/components/ui/dotted-surface").then((mod) => mod.DottedSurface),
  { ssr: false }
);

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* 3D Dotted Surface — same particle effect as Hero */}
      <DottedSurface />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,255,157,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Prêt à développer votre agence sans embaucher ?
        </h2>
        <p className="text-text-secondary mb-10">
          Transformez votre back-office netlinking en atout stratégique.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MovingBorderButton
            as="a"
            href="#contact"
            borderRadius="0.75rem"
            containerClassName="h-12"
            className="bg-brand/20 border-brand/30 text-text-primary hover:bg-brand/30 transition-colors gap-2"
            duration={3000}
          >
            Discuter de nos partenariats agences
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
            Découvrir nos protocoles
          </MovingBorderButton>
        </div>
      </div>
    </section>
  );
}
