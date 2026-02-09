# Maitre SEO - Architecture

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Navigateur)                    │
│  Next.js App Router + React 19 + Tailwind CSS v4         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│                  Next.js Server (Node.js)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │  Pages    │  │   API    │  │     Middleware        │   │
│  │ (SSR/SSG) │  │  Routes  │  │ (Auth + Protection)  │   │
│  └──────────┘  └──────────┘  └──────────────────────┘   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│                     Supabase                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │   Auth   │  │ PostgreSQL│  │   Row Level Security │   │
│  │ (Email)  │  │ (5 tables)│  │   (Policies + RLS)   │   │
│  └──────────┘  └──────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Stack Technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI | React | 19.2.3 |
| Language | TypeScript | 5.x (strict) |
| Styling | Tailwind CSS | v4 |
| Animations | framer-motion | 12.x |
| 3D | Three.js | via DottedSurface |
| Backend | Supabase | PostgreSQL + Auth |
| Auth | @supabase/ssr | Cookie-based SSR |

## Structure des Dossiers

```
maitre-seo/
├── public/                     # Assets statiques
├── supabase/
│   └── schema.sql              # Schéma BDD complet
├── src/
│   ├── app/                    # App Router (pages + API)
│   │   ├── layout.tsx          # Layout racine (font, metadata globale)
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── globals.css         # Tokens design + keyframes
│   │   ├── sitemap.ts          # Sitemap dynamique
│   │   ├── robots.ts           # Robots.txt
│   │   ├── opengraph-image.tsx # Image OG racine
│   │   ├── pricing/            # Page tarifs
│   │   ├── contact/            # Page contact
│   │   ├── login/              # Connexion
│   │   ├── signup/             # Inscription
│   │   ├── reset-password/     # Réinitialisation MDP
│   │   ├── update-password/    # Nouveau MDP
│   │   ├── auth/               # Routes auth (callback, signout)
│   │   ├── dashboard/          # Espace client (protégé)
│   │   └── api/                # API Routes
│   │       ├── campaigns/      # CRUD campagnes
│   │       ├── invoices/       # Factures
│   │       ├── activity/       # Journal d'activité
│   │       ├── profile/        # Profil utilisateur
│   │       └── security/       # Changement MDP
│   ├── components/             # Composants React
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── ... (11 sections)
│   │   ├── BackToTop.tsx       # Bouton retour en haut
│   │   └── ui/                 # Composants UI réutilisables
│   ├── lib/
│   │   ├── utils.ts            # Utilitaire cn()
│   │   └── supabase/           # Clients Supabase
│   │       ├── client.ts       # Client navigateur
│   │       ├── server.ts       # Client serveur (cookies)
│   │       ├── middleware.ts   # Logique middleware auth
│   │       └── types.ts        # Types TypeScript générés
│   └── middleware.ts           # Middleware Next.js
├── CLAUDE.md                   # Instructions projet
├── FEATURE.md                  # Liste fonctionnalités
├── PLAN.md                     # Plan de travail
├── BRANDING.md                 # Guide de marque
├── ARCHITECTURE.md             # Ce fichier
├── DATABASE_SCHEMA.md          # Documentation BDD
└── API_SPECIFICATIONS.md       # Spécifications API
```

## Flux d'Authentification

```
1. Utilisateur → /login (ou /signup)
2. Formulaire → supabase.auth.signInWithPassword()
3. Supabase → Retourne session (JWT)
4. @supabase/ssr → Stocke session dans cookies httpOnly
5. Middleware → Vérifie session sur chaque requête /dashboard
6. Si pas de session → Redirect /login
7. Si session valide → Accès autorisé

Inscription:
1. /signup → supabase.auth.signUp()
2. Email de confirmation envoyé
3. Clic lien → /auth/callback (échange code → session)
4. Trigger BDD → Auto-création profil dans public.users
5. Redirect → /dashboard

Réinitialisation MDP:
1. /reset-password → supabase.auth.resetPasswordForEmail()
2. Email avec lien envoyé
3. Clic lien → /update-password
4. Nouveau MDP → supabase.auth.updateUser()
```

## Flux de Données (Dashboard)

```
Dashboard (Client Component)
  │
  ├── useFetch("/api/campaigns")     → GET /api/campaigns
  ├── useFetch("/api/invoices")      → GET /api/invoices
  ├── useFetch("/api/activity")      → GET /api/activity
  ├── useFetch("/api/profile")       → GET /api/profile
  │
  └── Chaque API Route :
        1. createClient() (serveur, lit cookies)
        2. supabase.auth.getUser() → Vérifie auth
        3. supabase.from("table").select() → Query avec RLS
        4. Retourne JSON
```

## Sécurité

### Row Level Security (RLS)
Toutes les tables ont RLS activé. Chaque utilisateur ne peut accéder qu'à ses propres données :

| Table | Politique |
|-------|-----------|
| `users` | SELECT/UPDATE où `id = auth.uid()` |
| `campaigns` | SELECT où `user_id = auth.uid()` |
| `backlinks` | SELECT où `campaign_id` appartient au user |
| `invoices` | SELECT où `user_id = auth.uid()` |
| `activity_log` | SELECT où `user_id = auth.uid()` |

### Protection des Routes
- **Middleware Next.js** : intercepte `/dashboard/*` et `/login`
- **API Routes** : chaque route vérifie `supabase.auth.getUser()`
- **Pages auth** : `noindex` dans les métadonnées

### Variables d'Environnement
| Variable | Exposition | Usage |
|----------|-----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Serveur | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Serveur | Clé publique (RLS activé) |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur uniquement | Accès admin (bypass RLS) |

## SEO

### Métadonnées
- Title template : `%s | Maitre SEO`
- Métadonnées complètes sur chaque page publique
- `noindex` sur pages auth et dashboard

### Structured Data (JSON-LD)
- **Organization** : informations entreprise
- **FAQPage** : FAQ accueil + FAQ tarifs
- **Service + OfferCatalog** : services et offres

### Assets SEO
- `sitemap.ts` : génération dynamique
- `robots.ts` : exclut `/dashboard`, `/login`, `/api/`
- `opengraph-image.tsx` : images OG Edge Runtime (1200×630)

## Performance

### Optimisations Appliquées
- **Lazy loading Three.js** : `dynamic(() => import(...), { ssr: false })`
- **Server Components** : layouts et pages statiques
- **Font optimisé** : `next/font/google` (Space Mono, subset latin)
- **Rendering déterministe** : pas de `Math.random()` côté serveur
- **Tailwind v4** : CSS minimal, purge automatique
