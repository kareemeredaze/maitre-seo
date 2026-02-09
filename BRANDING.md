# Maitre SEO - Guide de Marque

## Identité de Marque
- **Nom:** MaîtreSEO
- **Positionnement:** Agence de link building white-label premium pour agences SEO
- **Ton:** Technique, professionnel, confiant, data-driven
- **Langue:** Français (FR)

## Logo
- Format texte : **Maître** (vert brand) + **SEO** (blanc)
- Police : Space Mono Bold
- Pas de logo graphique actuellement (prévoir un favicon + logo SVG)

## Palette de Couleurs

### Couleurs Principales
| Token | Hex | Usage |
|-------|-----|-------|
| `brand` | `#00ff9d` | CTA, liens, accents positifs, logo |
| `brand-hover` | `#00e68d` | Hover states boutons |
| `accent-cyan` | `#00f0ff` | Badges, graphiques secondaires, accents |

### Fond et Surfaces
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#0a0a0a` | Fond de page |
| `bg-card` | `#111111` | Cartes, sections surélevées |
| `bg-card-hover` | `#1a1a1a` | Hover sur cartes |

### Texte
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#ffffff` | Titres, texte principal |
| `text-secondary` | `#cccccc` | Descriptions, paragraphes |
| `text-tertiary` | `#888888` | Labels, texte désactivé |

### Bordures
| Token | Valeur | Usage |
|-------|--------|-------|
| `border-subtle` | `rgba(255,255,255,0.08)` | Séparateurs légers |
| `border-medium` | `rgba(255,255,255,0.15)` | Bordures de boutons |

## Typographie
- **Police principale :** Space Mono (Google Fonts)
- **Poids :** 400 (regular), 700 (bold)
- **Type :** Monospace
- **Fallback :** `ui-monospace, monospace`

### Tailles
| Élément | Classe |
|---------|--------|
| H1 Hero | `text-5xl sm:text-6xl font-bold` |
| H2 Section | `text-3xl sm:text-4xl font-bold` |
| H3 Carte | `text-lg font-bold` ou `text-base font-semibold` |
| Body | `text-sm` ou `text-base` |
| Caption | `text-xs` |
| Badge | `text-sm` |

## Composants UI

### Cartes
- Background : `bg-bg-card`
- Bordure : `border border-border-subtle`
- Radius : `rounded-2xl`
- Hover : `hover:border-white/10 transition-colors`

### Boutons
| Type | Classes |
|------|---------|
| Primary | `bg-brand text-bg-base font-semibold rounded-md hover:bg-brand-hover` |
| Outline | `border border-border-medium text-text-primary rounded-md hover:bg-white/5` |

### Badges
- `border border-accent-cyan/30 text-accent-cyan text-sm py-1 px-4 rounded-lg`

### Formulaires
- Input : `bg-bg-base border border-accent-cyan/20 rounded-lg text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50`

## Animations
- **Entrée au scroll :** framer-motion `useInView` + opacity/y transition
- **Compteurs :** requestAnimationFrame avec ease-out cubic
- **Cercles SVG :** stroke-dashoffset transition
- **Ondes :** CSS keyframe `wave-move` (translation horizontale)
- **Ripple :** CSS keyframe `ripple-ring` (scale + opacity)
- **Particules :** Three.js DottedSurface (Hero + CTA)
- **Trust banner :** CSS keyframe `scroll-x` (défilement infini)

## Icônes
- Bibliothèque : **lucide-react**
- Style : `strokeWidth={1.5}` par défaut
- Couleur : hérite de la couleur du parent ou `text-brand` / `text-accent-cyan`

## Responsive
- Mobile-first design
- Breakpoints : `sm:640px`, `md:768px`, `lg:1024px`
- Max-width conteneur : `max-w-5xl` (sections) / `max-w-6xl` (navbar) / `max-w-7xl` (footer)
