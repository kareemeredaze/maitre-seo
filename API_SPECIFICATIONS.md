# Maitre SEO - Spécifications API

## Vue d'Ensemble

Toutes les API routes sont des Next.js Route Handlers situés dans `src/app/api/`.
Chaque route utilise l'authentification Supabase via cookies SSR.

### Authentification
Toutes les routes (sauf auth) requièrent une session active :
```
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
if (!user) → 401 Unauthorized
```

### Format de Réponse
- **Succès :** JSON avec les données directement
- **Erreur :** `{ "error": "message" }` avec code HTTP approprié

---

## Routes d'Authentification

### `GET /auth/callback`
Échange un code d'authentification contre une session.

| Paramètre | Source | Description |
|-----------|--------|-------------|
| `code` | Query string | Code d'authentification Supabase |
| `next` | Query string | URL de redirection (défaut: `/dashboard`) |

**Réponses :**
- `302` → Redirect vers `next` (succès)
- `302` → Redirect vers `/login?error=...` (échec)

### `POST /auth/signout`
Déconnecte l'utilisateur et supprime la session.

**Réponses :**
- `302` → Redirect vers `/login`

---

## Campagnes

### `GET /api/campaigns`
Liste toutes les campagnes de l'utilisateur authentifié.

**Headers :** Cookie de session requis

**Réponse (200) :**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Campagne SEO Q1",
    "status": "active",
    "start_date": "2025-01-15",
    "end_date": "2025-06-15",
    "target_links": 50,
    "delivered_links": 23,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-03-20T14:30:00Z"
  }
]
```

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `500` | Erreur serveur Supabase |

**Tri :** `created_at` décroissant

---

### `GET /api/campaigns/[id]`
Détail d'une campagne avec ses backlinks.

**Paramètres :**
| Paramètre | Source | Description |
|-----------|--------|-------------|
| `id` | URL path | UUID de la campagne |

**Réponse (200) :**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Campagne SEO Q1",
  "status": "active",
  "start_date": "2025-01-15",
  "end_date": "2025-06-15",
  "target_links": 50,
  "delivered_links": 23,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-03-20T14:30:00Z",
  "backlinks": [
    {
      "id": "uuid",
      "campaign_id": "uuid",
      "url": "https://example.com/article",
      "anchor_text": "consultant SEO",
      "target_url": "https://client.com",
      "dr": 45,
      "status": "live",
      "live_date": "2025-02-10",
      "created_at": "2025-02-01T09:00:00Z"
    }
  ]
}
```

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `404` | Campagne introuvable ou n'appartient pas à l'utilisateur |

**Sécurité :** Vérifie `user_id = auth.uid()` pour s'assurer que la campagne appartient à l'utilisateur.
**Tri backlinks :** `created_at` décroissant

---

## Factures

### `GET /api/invoices`
Liste toutes les factures de l'utilisateur authentifié.

**Réponse (200) :**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "number": "FAC-2025-001",
    "amount": 1500.00,
    "status": "paid",
    "due_date": "2025-02-28",
    "pdf_url": null,
    "created_at": "2025-02-01T10:00:00Z"
  }
]
```

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `500` | Erreur serveur Supabase |

**Tri :** `created_at` décroissant

---

## Activité

### `GET /api/activity`
Journal d'activité récente de l'utilisateur (20 dernières entrées).

**Réponse (200) :**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "type": "backlink",
    "message": "Nouveau backlink livré pour Campagne SEO Q1",
    "created_at": "2025-03-20T14:30:00Z"
  }
]
```

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `500` | Erreur serveur Supabase |

**Limite :** 20 entrées maximum
**Tri :** `created_at` décroissant

---

## Profil

### `GET /api/profile`
Récupère le profil de l'utilisateur authentifié.

**Réponse (200) :**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "company": "Agence SEO Pro",
  "company_website": "https://agence-seo-pro.fr",
  "company_sector": "Marketing Digital",
  "phone": "+33 6 12 34 56 78",
  "avatar_url": null,
  "created_at": "2025-01-10T08:00:00Z",
  "updated_at": "2025-03-15T11:00:00Z"
}
```

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `500` | Erreur serveur (profil introuvable) |

---

### `PATCH /api/profile`
Met à jour le profil de l'utilisateur authentifié.

**Body (JSON) :**
```json
{
  "full_name": "Jean Dupont",
  "company": "Agence SEO Pro",
  "company_website": "https://agence-seo-pro.fr",
  "company_sector": "Marketing Digital",
  "phone": "+33 6 12 34 56 78"
}
```

**Champs autorisés :**
| Champ | Type | Description |
|-------|------|-------------|
| `full_name` | string | Nom complet |
| `company` | string | Nom de l'entreprise |
| `company_website` | string | Site web de l'entreprise |
| `company_sector` | string | Secteur d'activité |
| `phone` | string | Numéro de téléphone |

> Seuls les champs listés ci-dessus sont acceptés. Tout autre champ est ignoré (whitelist).

**Réponse (200) :** Profil mis à jour (même format que GET)

**Erreurs :**
| Code | Description |
|------|-------------|
| `401` | Utilisateur non authentifié |
| `500` | Erreur lors de la mise à jour |

---

## Sécurité

### `POST /api/security/password`
Change le mot de passe de l'utilisateur authentifié.

**Body (JSON) :**
```json
{
  "password": "NouveauMotDePasse123"
}
```

**Validation :**
- `password` requis
- Minimum 8 caractères

**Réponse (200) :**
```json
{
  "success": true
}
```

**Erreurs :**
| Code | Message | Description |
|------|---------|-------------|
| `400` | Le mot de passe doit contenir au moins 8 caractères. | Validation échouée |
| `401` | Unauthorized | Utilisateur non authentifié |
| `500` | (message Supabase) | Erreur lors du changement |

---

## Résumé des Endpoints

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `GET` | `/auth/callback` | Échange code → session | Non |
| `POST` | `/auth/signout` | Déconnexion | Oui |
| `GET` | `/api/campaigns` | Liste campagnes | Oui |
| `GET` | `/api/campaigns/[id]` | Détail campagne + backlinks | Oui |
| `GET` | `/api/invoices` | Liste factures | Oui |
| `GET` | `/api/activity` | Activité récente (20 max) | Oui |
| `GET` | `/api/profile` | Profil utilisateur | Oui |
| `PATCH` | `/api/profile` | Mise à jour profil | Oui |
| `POST` | `/api/security/password` | Changement mot de passe | Oui |
