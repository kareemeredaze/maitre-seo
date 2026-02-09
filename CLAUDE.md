# Maitre SEO - Project Instructions

## Project Overview
Landing page + client dashboard for **Maitre SEO**, a French white-label link building agency. The site showcases services, pricing, case studies, and provides a client portal for campaign tracking.

## Tech Stack
- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@theme inline` syntax)
- **Animations:** framer-motion v12, CSS keyframes
- **3D/Particles:** Three.js (DottedSurface component, lazy-loaded)
- **Icons:** lucide-react
- **Font:** Space Mono (Google Fonts, monospace)
- **Utilities:** clsx + tailwind-merge via `cn()` helper
- **Backend:** Supabase (Auth + PostgreSQL + RLS + SSR)
- **Auth:** @supabase/ssr (cookie-based server-side auth)

## Project Structure
```
src/
  app/
    layout.tsx              # Root layout, font config, metadata
    page.tsx                # Homepage (11 sections + JSON-LD)
    globals.css             # Theme tokens, keyframes
    sitemap.ts              # Dynamic sitemap
    robots.ts               # Robots.txt config
    opengraph-image.tsx     # Root OG image (1200x630)
    pricing/
      page.tsx              # Pricing page + JSON-LD
      opengraph-image.tsx   # Pricing OG image
    contact/
      page.tsx              # Contact form
      opengraph-image.tsx   # Contact OG image
    login/
      page.tsx              # Login (Supabase Auth)
      layout.tsx            # noindex metadata
    signup/
      page.tsx              # Inscription
      layout.tsx            # noindex metadata
    reset-password/
      page.tsx              # Demande réinitialisation MDP
      layout.tsx            # noindex metadata
    update-password/
      page.tsx              # Nouveau mot de passe (après lien email)
    auth/
      callback/route.ts     # Échange code auth → session
      signout/route.ts      # Déconnexion
    dashboard/
      page.tsx              # Espace client 5 onglets (API connecté)
      layout.tsx            # noindex metadata
    api/
      campaigns/route.ts        # GET liste campagnes
      campaigns/[id]/route.ts   # GET détail + backlinks
      invoices/route.ts         # GET liste factures
      activity/route.ts         # GET activité récente
      profile/route.ts          # GET + PATCH profil
      security/password/route.ts # POST changement MDP
  components/
    Navbar.tsx              # Sticky navbar, 3 dropdown tabs
    Hero.tsx                # Hero avec shader background
    Services.tsx            # Grille de services
    TrustBanner.tsx         # Défilement infini logos/badges
    SeoEcosystem.tsx        # Process bento grid + spinners
    WhyUs.tsx               # Dashboard client preview
    Features.tsx            # 6-card feature grid
    CaseStudies.tsx         # Chart cards avec SVG curves
    ClientTestimonials.tsx  # Colonnes défilantes
    FAQ.tsx                 # Accordéon animé
    CTA.tsx                 # Call-to-action + particules
    Footer.tsx              # 4 colonnes + newsletter
    BackToTop.tsx           # Bouton flottant retour en haut
    PricingHero.tsx
    PricingCards.tsx
    PricingTable.tsx
    PricingFAQ.tsx
    ui/                     # Composants UI réutilisables
      spinner.tsx
      grid-feature-cards.tsx
      dotted-surface.tsx
      animated-shader-hero.tsx
      moving-border.tsx
      testimonials-columns.tsx
  lib/
    utils.ts                # cn() utility
    supabase/
      client.ts             # Client navigateur (createBrowserClient)
      server.ts             # Client serveur (createServerClient + cookies)
      middleware.ts          # Rafraîchissement session + protection routes
      types.ts               # Types Database (5 tables + enums)
  middleware.ts              # Next.js middleware (matcher dashboard + login)
```

## Design Tokens (globals.css @theme inline)
```
--color-brand: #00ff9d          (vert primaire)
--color-brand-hover: #00e68d
--color-accent-cyan: #00f0ff    (cyan secondaire)
--color-bg-base: #0a0a0a        (fond quasi-noir)
--color-bg-card: #111111         (fond cartes)
--color-bg-card-hover: #1a1a1a
--color-text-primary: #ffffff
--color-text-secondary: #cccccc
--color-text-tertiary: #888888
--color-border-subtle: rgba(255,255,255,0.08)
--color-border-medium: rgba(255,255,255,0.15)
```

## Key Patterns
- **Client Components:** Tous les composants animés utilisent `"use client"`
- **Server Components:** Layout, pages metadata restent en Server Components
- **Scroll animations:** `useInView` de framer-motion déclenché au scroll
- **AnimatedCounter:** `useState` + `useEffect` + `requestAnimationFrame`
- **SVG charts:** SVG inline avec `strokeDasharray`/`strokeDashoffset`
- **Responsive:** Mobile-first avec `sm:`, `md:`, `lg:` breakpoints
- **Auth:** Cookie-based SSR auth via @supabase/ssr
- **API Routes:** Toutes les routes vérifient `supabase.auth.getUser()` et renvoient 401 si non authentifié
- **Lazy loading:** Three.js chargé via `dynamic(() => import(...), { ssr: false })`
- **Deterministic rendering:** Pas de `Math.random()` côté serveur (utiliser hash déterministe)

## Supabase
- **Projet:** https://yjmggmfmomzgockicseo.supabase.co
- **Tables:** users, campaigns, backlinks, invoices, activity_log
- **RLS:** Activé sur toutes les tables (chaque user voit ses données uniquement)
- **Triggers:** Auto-création profil à l'inscription, auto-update `updated_at`
- **Schéma:** `supabase/schema.sql`

## Development
```bash
npm run dev    # Serveur dev (localhost:3000)
npm run build  # Build production
npm run start  # Servir le build production
```

## État Actuel
- ✅ Phase 1 — Contenu (externe, en cours)
- ✅ Phase 2 — SEO & Métadonnées (sitemap, robots, OG images, JSON-LD, lazy loading)
- ✅ Phase 3 — Supabase Setup (schéma, RLS, triggers, helpers client/serveur)
- ✅ Phase 4 — Authentification (login, signup, reset-password, middleware, callback)
- ✅ Phase 5 — Dashboard Backend (6 API routes, dashboard connecté, loading states)
- ⬜ Phase 6+ — Formulaires, Stripe, Pages légales, Admin, Tests, Déploiement
