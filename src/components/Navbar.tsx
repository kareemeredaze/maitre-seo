"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Globe,
  Layers,
  Package,
  Newspaper,
  GitBranch,
  Search,
  FileText,
  Star,
  Users,
  HelpCircle,
  Shield,
  RotateCcw,
} from "lucide-react";

/* ── Types ── */
type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
};
type NavLink = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

/* ── Data ── */
const SERVICES: NavItem[] = [
  { title: "Guest Posts", href: "#", icon: Globe, desc: "Contenus exclusifs sur sites à forte autorité" },
  { title: "Insertions de Liens", href: "#", icon: Layers, desc: "Liens contextuels dans articles indexés" },
  { title: "Forfaits Agences", href: "#", icon: Package, desc: "Offres scalables pour vos clients" },
  { title: "Liens HARO", href: "#", icon: Newspaper, desc: "Backlinks via presse haute autorité" },
  { title: "Liens Tiered", href: "#", icon: GitBranch, desc: "Stratégie multi-niveaux maîtrisée" },
  { title: "Audit SEO", href: "#", icon: Search, desc: "Analyse du profil de liens existant" },
];

const RESSOURCES: NavItem[] = [
  { title: "Blog", href: "#", icon: FileText, desc: "Analyses et guides pour experts SEO" },
  { title: "Études de Cas", href: "#", icon: Star, desc: "Résultats mesurables pour nos partenaires" },
  { title: "À Propos", href: "#", icon: Users, desc: "Des experts SEO, pour des experts SEO" },
];

const RESSOURCES_SIDE: NavLink[] = [
  { title: "FAQ", href: "#", icon: HelpCircle },
  { title: "CGV", href: "#", icon: Shield },
  { title: "Confidentialité", href: "#", icon: RotateCcw },
];

/* ── useScroll hook ── */
function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  const handler = useCallback(
    () => setScrolled(window.scrollY > threshold),
    [threshold]
  );
  useEffect(() => {
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [handler]);
  return scrolled;
}

/* ── Dropdown item card ── */
function DropItem({ item }: { item: NavItem }) {
  return (
    <a
      href={item.href}
      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-white/5 transition-colors"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-bg-base">
        <item.icon className="h-4 w-4 text-brand" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{item.title}</p>
        <p className="text-xs text-text-tertiary">{item.desc}</p>
      </div>
    </a>
  );
}

/* ── Desktop dropdown wrapper ── */
function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-white/5"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2"
          >
            <div className="rounded-xl border border-border-subtle bg-bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animated hamburger SVG (from header-3 MenuToggleIcon) ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 transition-transform duration-300 ease-in-out ${open ? "-rotate-45" : ""}`}
    >
      <path
        className="transition-all duration-300 ease-in-out"
        style={{
          strokeDasharray: open ? "20 300" : "12 63",
          strokeDashoffset: open ? "-32.42px" : "0",
        }}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Main Navbar
   ═══════════════════════════════════════════════════ */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScroll(10);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border-subtle bg-bg-base/80 backdrop-blur-lg"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo + Desktop nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold">
            <span className="text-brand">Maître</span>
            <span className="text-text-primary">SEO</span>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-1">
            <NavDropdown label="Services">
              <div className="grid w-[480px] grid-cols-2 gap-1 p-2">
                {SERVICES.map((item) => (
                  <DropItem key={item.title} item={item} />
                ))}
              </div>
              <div className="border-t border-border-subtle px-4 py-3">
                <p className="text-xs text-text-tertiary">
                  Besoin d&apos;un devis ?{" "}
                  <Link
                    href="/contact"
                    className="text-brand font-medium hover:underline"
                  >
                    Contactez-nous
                  </Link>
                </p>
              </div>
            </NavDropdown>

            <NavDropdown label="Ressources">
              <div className="grid w-[480px] grid-cols-2">
                <div className="p-2 border-r border-border-subtle">
                  {RESSOURCES.map((item) => (
                    <DropItem key={item.title} item={item} />
                  ))}
                </div>
                <div className="p-3 space-y-1">
                  {RESSOURCES_SIDE.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md p-2 hover:bg-white/5 transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </NavDropdown>

            <Link
              href="/pricing"
              className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-white/5"
            >
              Tarifs
            </Link>
          </div>
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/dashboard"
            className="border border-border-medium text-text-primary text-sm px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
          >
            Espace Client
          </Link>
          <Link
            href="/contact"
            className="bg-brand text-bg-base text-sm font-semibold px-4 py-2 rounded-md hover:bg-brand-hover transition-colors"
          >
            Nous Contacter
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 border border-border-medium rounded-md"
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-bg-base/95 backdrop-blur-lg border-t border-border-subtle md:hidden overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 flex flex-col gap-6 min-h-full"
            >
              {/* Services */}
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
                  Services
                </p>
                <div className="space-y-1">
                  {SERVICES.map((item) => (
                    <DropItem key={item.title} item={item} />
                  ))}
                </div>
              </div>

              {/* Ressources */}
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
                  Ressources
                </p>
                <div className="space-y-1">
                  {RESSOURCES.map((item) => (
                    <DropItem key={item.title} item={item} />
                  ))}
                  {RESSOURCES_SIDE.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-bg-base">
                        <item.icon className="h-4 w-4 text-brand" />
                      </div>
                      <div className="flex items-center h-10">
                        <p className="text-sm font-medium text-text-primary">
                          {item.title}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tarifs link */}
              <Link
                href="/pricing"
                onClick={closeMobile}
                className="text-sm font-medium text-text-primary hover:text-brand transition-colors py-2"
              >
                Tarifs →
              </Link>

              {/* CTA buttons */}
              <div className="mt-auto flex flex-col gap-2 pb-6">
                <Link
                  href="/dashboard"
                  onClick={closeMobile}
                  className="w-full text-center border border-border-medium text-text-primary text-sm px-4 py-2.5 rounded-md hover:bg-white/5 transition-colors"
                >
                  Espace Client
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="w-full text-center bg-brand text-bg-base text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-brand-hover transition-colors"
                >
                  Nous Contacter
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
