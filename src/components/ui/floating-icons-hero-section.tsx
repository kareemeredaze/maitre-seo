"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Floating Icon ---

interface FloatingIconProps {
  icon: React.ReactNode;
  initialX: number;
  initialY: number;
  className?: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  springConfig?: SpringOptions;
}

function FloatingIcon({
  icon,
  initialX,
  initialY,
  className,
  mouseX,
  mouseY,
  containerRef,
  springConfig = { damping: 40, stiffness: 100, mass: 2 },
}: FloatingIconProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const repelDistance = 120;
  const repelStrength = 60;

  const springX = useSpring(
    useTransform(() => {
      const mx = mouseX.get();
      const my = mouseY.get();
      if (!containerRef.current || (mx === 0 && my === 0)) return pos.x;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = mx - rect.left;
      const relY = my - rect.top;
      const dx = pos.x - relX;
      const dy = pos.y - relY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < repelDistance && dist > 0) {
        const force = (1 - dist / repelDistance) * repelStrength;
        return pos.x + (dx / dist) * force;
      }
      return pos.x;
    }),
    springConfig
  );

  const springY = useSpring(
    useTransform(() => {
      const mx = mouseX.get();
      const my = mouseY.get();
      if (!containerRef.current || (mx === 0 && my === 0)) return pos.y;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = mx - rect.left;
      const relY = my - rect.top;
      const dx = pos.x - relX;
      const dy = pos.y - relY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < repelDistance && dist > 0) {
        const force = (1 - dist / repelDistance) * repelStrength;
        return pos.y + (dy / dist) * force;
      }
      return pos.y;
    }),
    springConfig
  );

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPos({
        x: (initialX / 100) * width,
        y: (initialY / 100) * height,
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [initialX, initialY, containerRef]);

  return (
    <motion.div
      className={cn(
        "absolute flex items-center justify-center rounded-xl border border-accent-cyan/15 bg-bg-card/60 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,157,0.06)] p-3 transition-colors hover:border-accent-cyan/30",
        className
      )}
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      {icon}
    </motion.div>
  );
}

// --- Main Component ---

interface FloatingIconsHeroSectionProps {
  icons: { icon: React.ReactNode; x: number; y: number }[];
  children: React.ReactNode;
  className?: string;
}

const FloatingIconsHeroSection = forwardRef<
  HTMLDivElement,
  FloatingIconsHeroSectionProps
>(({ icons, children, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full", className)}
    >
      {/* Floating Icons Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {icons.map((item, i) => (
          <FloatingIcon
            key={i}
            icon={item.icon}
            initialX={item.x}
            initialY={item.y}
            mouseX={mouseX}
            mouseY={mouseY}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

FloatingIconsHeroSection.displayName = "FloatingIconsHeroSection";

export { FloatingIconsHeroSection };
