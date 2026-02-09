# Maitre SEO - Plan de Travail

## État Actuel
Frontend complet + backend Supabase connecté. Phases 2 à 5 terminées. Authentification fonctionnelle, dashboard connecté aux API, base de données configurée avec RLS.

---

## Phase 1 — Contenu & Textes (Externe)
**Durée estimée:** 2-3 jours
**Outil:** Claude Pro (hors projet)

- [ ] Récupérer `TEXTE-SITE.md` depuis `C:\SEO off page\`
- [ ] Réécrire tous les textes (titres, descriptions, CTA, FAQ, pricing)
- [ ] Préparer le markdown final avec les nouveaux textes
- [ ] Remplacer les textes dans le code source
- [ ] Vérifier orthographe et cohérence

---

## Phase 2 — SEO & Métadonnées ✅
**Terminée**

- [x] Ajouter `metadata` complètes sur chaque page (title, description, keywords)
- [x] Créer images OpenGraph (1200×630) pour chaque page
- [x] Configurer `sitemap.ts` (génération dynamique)
- [x] Configurer `robots.ts`
- [x] Ajouter JSON-LD (Organization, FAQPage, Service schemas)
- [x] Lazy loading des composants lourds (Three.js via dynamic import)
- [x] URLs canoniques sur toutes les pages

---

## Phase 3 — Supabase Setup ✅
**Terminée**

### 3.1 Projet Supabase
- [x] Créer projet sur supabase.com
- [x] Configurer variables d'environnement (`.env.local`)
- [x] Installer `@supabase/supabase-js` + `@supabase/ssr`

### 3.2 Schéma Base de Données
- [x] Tables : users, campaigns, backlinks, invoices, activity_log
- [x] Types enum : campaign_status, backlink_status, invoice_status, activity_type
- [x] Index optimisés sur user_id, campaign_id, created_at

### 3.3 Row Level Security
- [x] Chaque user accède uniquement à ses propres données
- [x] Policies SELECT/UPDATE par user_id
- [x] Triggers auto-création profil et auto-update `updated_at`

---

## Phase 4 — Authentification ✅
**Terminée**

- [x] Configurer Supabase Auth (email + password)
- [x] Créer helpers auth (`src/lib/supabase/client.ts`, `server.ts`)
- [x] Middleware Next.js : protection route `/dashboard` → redirect `/login`
- [x] Connecter page Login au vrai auth
- [x] Flow inscription (`/signup`)
- [x] Flow réinitialisation mot de passe (`/reset-password` + `/update-password`)
- [x] Gestion sessions (cookies SSR via @supabase/ssr)
- [x] Callback auth (`/auth/callback`)
- [x] Déconnexion (`/auth/signout`)
- [ ] Google OAuth (optionnel, phase ultérieure)

---

## Phase 5 — Dashboard Backend ✅
**Terminée**

### 5.1 API Routes
- [x] `GET /api/campaigns` — Liste campagnes du user
- [x] `GET /api/campaigns/[id]` — Détail + backlinks
- [x] `GET /api/invoices` — Liste factures
- [x] `GET /api/activity` — Activité récente (limite 20)
- [x] `GET /api/profile` — Profil utilisateur
- [x] `PATCH /api/profile` — Mise à jour profil
- [x] `POST /api/security/password` — Changement mot de passe

### 5.2 Dashboard Connecté
- [x] Remplacer mock data par appels API dans dashboard/page.tsx
- [x] Loading states (skeletons)
- [x] Error handling (bannières d'erreur + réessai)
- [ ] Supabase Realtime pour updates en temps réel (phase ultérieure)

---

## Phase 6 — Formulaires & Email
**Durée estimée:** 1-2 jours

- [ ] Installer `react-hook-form` + `zod`
- [ ] Valider formulaire contact (client-side + server-side)
- [ ] Configurer Resend pour email transactionnel
- [ ] Envoyer email sur soumission formulaire contact
- [ ] Connecter newsletter à Brevo / Mailchimp
- [ ] Emails de confirmation (inscription, réinitialisation MDP)

---

## Phase 7 — Paiement (Stripe)
**Durée estimée:** 2-3 jours

- [ ] Créer compte Stripe + produits (Débutant, Pro, Expert)
- [ ] Installer `stripe` + `@stripe/stripe-js`
- [ ] Checkout Session pour chaque plan
- [ ] Webhooks Stripe → Supabase (création facture, activation campagne)
- [ ] Portail client Stripe (gérer abonnement)
- [ ] Page succès / annulation

---

## Phase 8 — Pages Légales & Blog
**Durée estimée:** 2 jours

- [ ] Créer pages : CGV, Confidentialité, Remboursement
- [ ] Créer système blog (MDX ou Supabase CMS)
- [ ] Pages études de cas individuelles
- [ ] Page À Propos détaillée

---

## Phase 9 — Admin Panel
**Durée estimée:** 3-4 jours

- [ ] Route `/admin` protégée (rôle admin dans Supabase)
- [ ] Dashboard admin : stats globales, revenus, nombre clients
- [ ] CRUD campagnes : créer, modifier, archiver
- [ ] Reporter backlinks livrés (formulaire rapide)
- [ ] Gérer factures : générer, marquer payées
- [ ] Liste clients avec filtres et recherche

---

## Phase 10 — Tests & QA
**Durée estimée:** 2 jours

- [ ] Tests unitaires (vitest) sur utilitaires et hooks
- [ ] Tests E2E (Playwright) : parcours inscription → dashboard
- [ ] Test responsive sur mobiles réels
- [ ] Audit Lighthouse (Performance > 90, Accessibility > 90)
- [ ] Test formulaires (validation, erreurs, succès)
- [ ] Test paiement Stripe en mode test

---

## Phase 11 — GitHub & Versioning
**Durée estimée:** 0.5 jour

- [ ] Initialiser dépôt Git local
- [ ] Créer fichier `.gitignore` (node_modules, .env.local, .next, etc.)
- [ ] Premier commit avec tout le code
- [ ] Créer dépôt GitHub (privé)
- [ ] Configurer remote origin
- [ ] Push du code sur GitHub
- [ ] Configurer branche `main` comme branche par défaut
- [ ] Ajouter fichier `README.md` pour le dépôt

---

## Phase 12 — Déploiement Vercel
**Durée estimée:** 1 jour

### 12.1 Configuration
- [ ] Créer projet Vercel lié au dépôt GitHub
- [ ] Configurer variables d'environnement :
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  STRIPE_SECRET_KEY=
  STRIPE_WEBHOOK_SECRET=
  RESEND_API_KEY=
  ```
- [ ] Configurer domaine personnalisé (DNS A/CNAME)
- [ ] SSL automatique via Vercel

### 12.2 Lancement
- [ ] Deploy production
- [ ] Tester toutes les routes en production
- [ ] Vérifier webhooks Stripe en production
- [ ] Configurer monitoring (Sentry)
- [ ] Configurer analytics (GA4 ou Plausible)

---

## Phase 13 — Post-Lancement
**Continu**

- [ ] Monitoring erreurs (Sentry)
- [ ] Suivi analytics
- [ ] A/B testing landing page
- [ ] Ajout fonctionnalités selon retours clients
- [ ] Optimisation continue (Core Web Vitals)

---

## Résumé des Dépendances Externes

| Service | Usage | Priorité |
|---------|-------|----------|
| **Supabase** | Auth + BDD + Realtime | ✅ Configuré |
| **GitHub** | Versioning + Dépôt | Critique |
| **Vercel** | Hébergement + CI/CD | Critique |
| **Stripe** | Paiements | Haute |
| **Resend** | Emails transactionnels | Haute |
| **Brevo/Mailchimp** | Newsletter | Moyenne |
| **Sentry** | Monitoring erreurs | Moyenne |
| **GA4/Plausible** | Analytics | Moyenne |

## Packages à Installer (par phase)
```bash
# Phase 3 - Supabase ✅
npm install @supabase/supabase-js @supabase/ssr

# Phase 6 - Formulaires
npm install react-hook-form zod @hookform/resolvers

# Phase 7 - Stripe
npm install stripe @stripe/stripe-js

# Phase 8 - Blog MDX (si choisi)
npm install @next/mdx @mdx-js/loader

# Phase 10 - Tests
npm install -D vitest @testing-library/react playwright
```
