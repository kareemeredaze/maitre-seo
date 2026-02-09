# Maitre SEO - Versioning & Updates

## Dépôt Git
- **URL :** https://github.com/kareemeredaze/maitre-seo
- **Branche principale :** `main`
- **Deploy auto :** Chaque push sur `main` → Vercel redéploie

## Historique des Versions

### v1.0.0 — Initial Release (2026-02-09)
**Commit :** `cf03751` — Initial commit
- Landing page complète (11 sections animées)
- Pages Pricing + Contact
- SEO complet (sitemap, robots, OG images, JSON-LD)
- Supabase Auth (login, signup, reset-password)
- Dashboard client 5 onglets connecté aux API
- 6 API routes (campaigns, invoices, activity, profile, security)
- Base de données PostgreSQL avec RLS
- Documentation complète
- Configuration Vercel

---

## Convention de Commits

Format : `type: description courte`

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `style` | CSS, design, mise en page |
| `content` | Textes, traductions |
| `docs` | Documentation uniquement |
| `refactor` | Refactoring sans changement fonctionnel |
| `perf` | Optimisation performance |
| `test` | Ajout ou modification de tests |
| `config` | Configuration (Vercel, ESLint, etc.) |
| `deploy` | Déploiement, CI/CD |

### Exemples
```bash
git commit -m "feat: ajout paiement Stripe checkout"
git commit -m "fix: correction redirect après login"
git commit -m "style: responsive navbar mobile"
git commit -m "content: remplacement textes placeholder accueil"
git commit -m "docs: mise à jour PLAN.md phase 6 terminée"
```

---

## Workflow de Mise à Jour Rapide

### Petite modification (texte, style, fix)
```bash
# 1. Modifier les fichiers
# 2. Commit + push
cd "c:\Users\HP PROBOOK\Downloads\maitre-seo"
git add -A
git commit -m "fix: description du changement"
git push
# → Vercel redéploie automatiquement
```

### Nouvelle fonctionnalité (phase complète)
```bash
# 1. Créer une branche
git checkout -b feat/nom-feature

# 2. Développer et commiter
git add -A
git commit -m "feat: description"

# 3. Pousser la branche
git push -u origin feat/nom-feature

# 4. Créer une PR sur GitHub (preview deploy sur Vercel)
# 5. Merger dans main après validation
git checkout main
git merge feat/nom-feature
git push
git branch -d feat/nom-feature
```

---

## Guide de Mise à Jour avec Claude

### Pour optimiser les tokens :
1. **Commencer par** : "Lis CONTEXT.md et PLAN.md"
2. **Être précis** : "Phase 6 : connecte le formulaire contact avec Resend"
3. **Éviter** : "Continue le travail" (trop vague, Claude relit tout)

### Commandes rapides à donner à Claude :
| Commande | Ce que Claude fait |
|----------|-------------------|
| "Push les changements" | `git add -A && git commit && git push` |
| "Quel est l'état du projet ?" | Lit PLAN.md + FEATURE.md |
| "Travaille sur la phase X" | Lit les specs de la phase et commence |
| "Fix le bug [description]" | Cherche et corrige |
| "Update la doc" | Met à jour les .md concernés |

### Après chaque session avec Claude :
- [ ] Vérifier que PLAN.md est à jour (phases cochées)
- [ ] Vérifier que les changements sont commités
- [ ] Vérifier que le push est fait
- [ ] Tester le site en production (URL Vercel)

---

## Checklist Pre-Deploy

Avant chaque push important :

- [ ] `npm run build` passe sans erreur
- [ ] Pas de clés API dans le code (utiliser `.env.local`)
- [ ] `.env.local` est dans `.gitignore`
- [ ] Les nouvelles routes API vérifient l'auth
- [ ] Les nouveaux composants sont responsive
- [ ] PLAN.md et FEATURE.md sont à jour

---

## URLs du Projet

| Service | URL |
|---------|-----|
| **GitHub** | https://github.com/kareemeredaze/maitre-seo |
| **Vercel** | (à configurer) |
| **Supabase** | https://yjmggmfmomzgockicseo.supabase.co |
| **Site Live** | (domaine à configurer sur Vercel) |
