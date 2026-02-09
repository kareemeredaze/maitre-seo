# Maitre SEO

Landing page + espace client pour **Maitre SEO**, agence de netlinking en marque blanche pour agences et consultants SEO.

## Stack Technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 16** | Framework (App Router, Turbopack) |
| **React 19** | UI Components |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styling (@theme inline) |
| **framer-motion** | Animations |
| **Three.js** | Particules 3D (Hero, CTA) |
| **Supabase** | Auth + PostgreSQL + RLS |
| **Vercel** | Hébergement |

## Fonctionnalités

### Pages Publiques
- Landing page avec 11 sections animées
- Page Tarifs (3 offres + tableau comparatif)
- Page Contact
- SEO complet (sitemap, robots, OG images, JSON-LD)

### Authentification
- Inscription / Connexion / Réinitialisation mot de passe
- Protection routes via middleware
- Sessions cookie-based (SSR)

### Espace Client (Dashboard)
- Vue d'ensemble avec KPIs
- Suivi des campagnes + backlinks
- Facturation
- Gestion du profil et sécurité

## Installation

```bash
# Cloner le repository
git clone https://github.com/<username>/maitre-seo.git
cd maitre-seo

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'Environnement

Créer un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Structure du Projet

```
src/
  app/              # Pages et API routes (App Router)
  components/       # Composants React
  lib/              # Utilitaires et clients Supabase
supabase/
  schema.sql        # Schéma base de données
```

## Documentation

| Fichier | Description |
|---------|-------------|
| [PLAN.md](PLAN.md) | Plan de travail et roadmap |
| [FEATURE.md](FEATURE.md) | Liste des fonctionnalités |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture technique |
| [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) | Schéma base de données |
| [API_SPECIFICATIONS.md](API_SPECIFICATIONS.md) | Spécifications API |
| [BRANDING.md](BRANDING.md) | Guide de marque |

## Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Servir le build production
npm run lint     # Linter ESLint
```

## Déploiement

Le projet est configuré pour Vercel :
1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Deploy automatique sur chaque push

## Licence

Projet privé - Tous droits réservés.
