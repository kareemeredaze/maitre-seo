# Maitre SEO - Schéma Base de Données

## Vue d'Ensemble

Base de données PostgreSQL hébergée sur **Supabase**.
Projet : `https://yjmggmfmomzgockicseo.supabase.co`
Fichier source : `supabase/schema.sql`

## Diagramme des Relations

```
auth.users (Supabase Auth)
    │
    │ trigger: on_auth_user_created
    ▼
┌──────────┐
│  users   │ (profil étendu)
│──────────│
│ id (PK)  │──────────────────────────────────────┐
│ email    │                                       │
│ full_name│                                       │
│ company  │                                       │
└──────────┘                                       │
    │                                              │
    ├──────────────┐              ┌────────────────┤
    ▼              ▼              ▼                 ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│campaigns │ │ invoices │ │activity  │ │              │
│──────────│ │──────────│ │_log      │ │              │
│ id (PK)  │ │ id (PK)  │ │──────────│ │              │
│ user_id  │ │ user_id  │ │ id (PK)  │ │              │
│ name     │ │ number   │ │ user_id  │ │              │
│ status   │ │ amount   │ │ type     │ │              │
└──────────┘ │ status   │ │ message  │ │              │
    │        └──────────┘ └──────────┘ │              │
    │                                   │              │
    ▼                                   │              │
┌──────────┐                           │              │
│backlinks │                           │              │
│──────────│                           │              │
│ id (PK)  │                           │              │
│campaign_id│                          │              │
│ url      │                           │              │
│ dr       │                           │              │
│ status   │                           │              │
└──────────┘                           │              │
```

## Types Enum

### `campaign_status`
| Valeur | Description |
|--------|-------------|
| `draft` | Campagne en préparation |
| `active` | Campagne en cours |
| `paused` | Campagne suspendue |
| `completed` | Campagne terminée |

### `backlink_status`
| Valeur | Description |
|--------|-------------|
| `pending` | Backlink en attente de publication |
| `live` | Backlink publié et actif |
| `removed` | Backlink supprimé |
| `replaced` | Backlink remplacé |

### `invoice_status`
| Valeur | Description |
|--------|-------------|
| `pending` | Facture en attente de paiement |
| `paid` | Facture payée |
| `overdue` | Facture en retard |

### `activity_type`
| Valeur | Description |
|--------|-------------|
| `backlink` | Activité liée aux backlinks |
| `campaign` | Activité liée aux campagnes |
| `invoice` | Activité liée à la facturation |
| `auth` | Activité d'authentification |
| `profile` | Modification du profil |

---

## Tables

### `users`
Profil utilisateur étendu, lié à `auth.users` de Supabase.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | `uuid` | PK, FK → auth.users(id), ON DELETE CASCADE | Identifiant unique |
| `email` | `text` | NOT NULL | Adresse email |
| `full_name` | `text` | nullable | Nom complet |
| `company` | `text` | nullable | Nom de l'entreprise |
| `company_website` | `text` | nullable | Site web de l'entreprise |
| `company_sector` | `text` | nullable | Secteur d'activité |
| `phone` | `text` | nullable | Numéro de téléphone |
| `avatar_url` | `text` | nullable | URL de l'avatar |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Date de création |
| `updated_at` | `timestamptz` | NOT NULL, DEFAULT now() | Dernière mise à jour |

### `campaigns`
Campagnes de netlinking.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| `user_id` | `uuid` | NOT NULL, FK → users(id), ON DELETE CASCADE | Propriétaire |
| `name` | `text` | NOT NULL | Nom de la campagne |
| `status` | `campaign_status` | NOT NULL, DEFAULT 'draft' | Statut actuel |
| `start_date` | `date` | nullable | Date de début |
| `end_date` | `date` | nullable | Date de fin |
| `target_links` | `integer` | NOT NULL, DEFAULT 0 | Objectif de liens |
| `delivered_links` | `integer` | NOT NULL, DEFAULT 0 | Liens livrés |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Date de création |
| `updated_at` | `timestamptz` | NOT NULL, DEFAULT now() | Dernière mise à jour |

### `backlinks`
Backlinks individuels associés à une campagne.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| `campaign_id` | `uuid` | NOT NULL, FK → campaigns(id), ON DELETE CASCADE | Campagne parente |
| `url` | `text` | NOT NULL | URL du backlink |
| `anchor_text` | `text` | NOT NULL | Texte d'ancrage |
| `target_url` | `text` | NOT NULL | URL cible |
| `dr` | `integer` | NOT NULL, DEFAULT 0 | Domain Rating |
| `status` | `backlink_status` | NOT NULL, DEFAULT 'pending' | Statut du lien |
| `live_date` | `date` | nullable | Date de mise en ligne |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Date de création |

### `invoices`
Factures client.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| `user_id` | `uuid` | NOT NULL, FK → users(id), ON DELETE CASCADE | Client |
| `number` | `text` | NOT NULL, UNIQUE | Numéro de facture |
| `amount` | `numeric(10,2)` | NOT NULL | Montant en euros |
| `status` | `invoice_status` | NOT NULL, DEFAULT 'pending' | Statut de paiement |
| `due_date` | `date` | NOT NULL | Date d'échéance |
| `pdf_url` | `text` | nullable | URL du PDF |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Date de création |

### `activity_log`
Journal d'activité pour le dashboard.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| `user_id` | `uuid` | NOT NULL, FK → users(id), ON DELETE CASCADE | Utilisateur |
| `type` | `activity_type` | NOT NULL | Type d'activité |
| `message` | `text` | NOT NULL | Description de l'activité |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Date de l'événement |

---

## Index

| Nom | Table | Colonne(s) | Description |
|-----|-------|------------|-------------|
| `idx_campaigns_user_id` | campaigns | user_id | Recherche campagnes par utilisateur |
| `idx_backlinks_campaign_id` | backlinks | campaign_id | Recherche backlinks par campagne |
| `idx_invoices_user_id` | invoices | user_id | Recherche factures par utilisateur |
| `idx_activity_log_user_id` | activity_log | user_id | Recherche activité par utilisateur |
| `idx_activity_log_created_at` | activity_log | created_at DESC | Tri chronologique décroissant |

---

## Row Level Security (RLS)

Toutes les tables ont RLS activé. Politiques :

| Table | Politique | Opération | Condition |
|-------|-----------|-----------|-----------|
| `users` | Users can view own profile | SELECT | `auth.uid() = id` |
| `users` | Users can update own profile | UPDATE | `auth.uid() = id` |
| `campaigns` | Users can view own campaigns | SELECT | `auth.uid() = user_id` |
| `backlinks` | Users can view own backlinks | SELECT | `campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid())` |
| `invoices` | Users can view own invoices | SELECT | `auth.uid() = user_id` |
| `activity_log` | Users can view own activity | SELECT | `auth.uid() = user_id` |

---

## Triggers

### `on_auth_user_created`
- **Table :** `auth.users`
- **Événement :** AFTER INSERT
- **Fonction :** `handle_new_user()`
- **Action :** Crée automatiquement un profil dans `public.users` avec `id`, `email` et `full_name` (depuis `raw_user_meta_data`)

### `update_users_updated_at`
- **Table :** `users`
- **Événement :** BEFORE UPDATE
- **Fonction :** `update_updated_at()`
- **Action :** Met à jour `updated_at` à `now()`

### `update_campaigns_updated_at`
- **Table :** `campaigns`
- **Événement :** BEFORE UPDATE
- **Fonction :** `update_updated_at()`
- **Action :** Met à jour `updated_at` à `now()`
