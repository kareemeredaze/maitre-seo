# Maitre SEO - Contexte pour Claude

## Objectif
Ce fichier permet à Claude de reprendre le travail rapidement sans gaspiller de tokens à redécouvrir le projet.

## Projet en un Mot
Site web + espace client pour **Maitre SEO**, agence de netlinking white-label française.

## Stack (ne pas redemander)
- Next.js 16.1.6 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (`@theme inline`)
- Supabase (Auth + PostgreSQL + RLS)
- Déployé sur Vercel depuis GitHub

## Comptes Connectés
- **GitHub:** github.com/kareemeredaze/maitre-seo (public, branche `main`)
- **Supabase:** yjmggmfmomzgockicseo.supabase.co
- **Vercel:** À connecter au repo GitHub

## Fichiers Clés à Lire en Premier
| Fichier | Quand le lire |
|---------|---------------|
| `PLAN.md` | Pour savoir quoi faire ensuite |
| `FEATURE.md` | Pour voir ce qui est fait / manquant |
| `CLAUDE.md` | Pour la structure complète du projet |
| `ARCHITECTURE.md` | Pour comprendre l'architecture |
| `API_SPECIFICATIONS.md` | Pour travailler sur les API |
| `DATABASE_SCHEMA.md` | Pour travailler sur la BDD |
| `BRANDING.md` | Pour le design / couleurs / fonts |
| `VERSIONING.md` | Pour les conventions de commit et deploy |

## Phases Terminées
- ✅ Phase 2 — SEO & Métadonnées
- ✅ Phase 3 — Supabase Setup
- ✅ Phase 4 — Authentification
- ✅ Phase 5 — Dashboard Backend
- ✅ Phase 11 — GitHub (repo créé + push)

## Prochaines Phases
- ⬜ Phase 1 — Contenu & Textes (remplacement placeholders)
- ⬜ Phase 6 — Formulaires & Email (react-hook-form, zod, Resend)
- ⬜ Phase 7 — Stripe (paiements)
- ⬜ Phase 8 — Pages légales & Blog
- ⬜ Phase 9 — Admin Panel
- ⬜ Phase 10 — Tests & QA
- ⬜ Phase 12 — Déploiement Vercel (config)

## Conventions Importantes
- **Langue du code :** Anglais (noms de variables, composants)
- **Langue du contenu :** Français (textes affichés, metadata)
- **Langue des docs :** Français
- **CSS :** Tailwind v4 tokens (`bg-brand`, `text-text-secondary`, etc.)
- **Auth :** Cookie-based SSR via @supabase/ssr, pas de localStorage
- **API :** Toutes les routes vérifient `supabase.auth.getUser()` → 401 si non auth
- **Three.js :** Toujours lazy-loaded avec `dynamic(() => import(...), { ssr: false })`
- **Pas de Math.random()** côté serveur (hydration mismatch)

## Erreurs Connues (déjà corrigées, ne pas réintroduire)
1. `Math.random()` dans un Server Component → utiliser hash déterministe
2. `useSearchParams()` sans `<Suspense>` → toujours wrapper
3. TypeScript spread sur type Supabase → cast `as Record<string, unknown>`
4. Port 3000 bloqué → `taskkill //F //IM node.exe` + supprimer `.next/dev/lock`

## Commandes Rapides
```bash
# Dev
npm run dev

# Build test
npm run build

# Git push (après modifications)
git add -A && git commit -m "message" && git push

# GitHub CLI (portable)
& 'C:\Users\HP PROBOOK\Downloads\gh-cli\bin\gh.exe' <commande>
```

## Comment Utiliser ce Fichier
Au début de chaque session, Claude devrait :
1. Lire `CONTEXT.md` (ce fichier) pour le contexte rapide
2. Lire `PLAN.md` si on travaille sur une nouvelle phase
3. Ne PAS relire tous les fichiers source sauf si nécessaire
4. Demander "Sur quelle phase on travaille aujourd'hui ?" si pas précisé
