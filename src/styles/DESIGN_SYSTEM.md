# SILENT SYSTEM - Design System

**Version**: 1.0.0  
**Date**: 19 Février 2026  
**Projet**: Portfolio 2026

---

## 🎨 PHILOSOPHIE

Le **Silent System** est un design system minimaliste axé sur :
- **Sobriété visuelle** : Fond noir, accents cyan neon
- **Profondeur** : Effets 3D subtils, ombres portées
- **Fluidité** : Animations douces, transitions naturelles
- **Lisibilité** : Contraste élevé, typographie claire

---

## 📐 DESIGN TOKENS

Tous les tokens sont centralisés dans `src/styles/design-tokens.css`

### Couleurs

```css
--color-primary: #00ffff;           /* Cyan neon principal */
--color-primary-glow: rgba(0, 255, 255, 0.5);
--color-primary-dim: rgba(0, 255, 255, 0.2);

--color-bg-dark: #0a0a0a;           /* Fond principal */
--color-bg-card: rgba(20, 20, 20, 0.6);
--color-bg-card-hover: rgba(30, 30, 30, 0.8);

--color-text-primary: #ededed;      /* Texte principal */
--color-text-secondary: #a0a0a0;    /* Texte secondaire */
--color-text-muted: #666666;        /* Texte désactivé */
```

### Espacements

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
```

### Typographie

```css
--font-sans: 'Geist Sans', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Courier New', monospace;

--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */
```

---

## 🧩 COMPOSANTS RÉUTILISABLES

### Card 3D

**Fichier**: `src/components/Card3D.tsx` (à créer)

```tsx
<div className="card-3d">
  {/* Contenu */}
</div>
```

**Styles**:
```css
.card-3d {
  background: var(--color-bg-card);
  border: var(--border-width-thin) solid var(--color-primary-dim);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  transform-style: preserve-3d;
}

.card-3d:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-neon);
  background: var(--color-bg-card-hover);
}
```

### Neon Button

**Fichier**: `src/components/NeonButton.tsx` (à créer)

```tsx
<button className="neon-button">
  {children}
</button>
```

**Styles**:
```css
.neon-button {
  background: transparent;
  border: var(--border-width-medium) solid var(--color-primary);
  color: var(--color-primary);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-md);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.neon-button:hover {
  background: var(--color-primary-dim);
  box-shadow: var(--shadow-neon);
  transform: translateY(-2px);
}
```

### Badge Status

**Fichier**: `src/components/Badge.tsx` (à créer)

```tsx
<span className="badge badge-success">ACTIVE</span>
<span className="badge badge-warning">PENDING</span>
<span className="badge badge-error">CRITICAL</span>
```

**Styles**:
```css
.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}

.badge-success {
  background: rgba(0, 255, 0, 0.2);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.badge-warning {
  background: rgba(255, 165, 0, 0.2);
  color: var(--color-warning);
  border: 1px solid var(--color-warning);
}

.badge-error {
  background: rgba(255, 0, 0, 0.2);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}
```

---

## 🎭 ANIMATIONS

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn var(--animation-duration-base) ease-out;
}
```

### Neon Pulse

```css
@keyframes neonPulse {
  0%, 100% {
    box-shadow: 0 0 10px var(--color-primary-glow);
  }
  50% {
    box-shadow: var(--shadow-neon-strong);
  }
}

.neon-pulse {
  animation: neonPulse 2s ease-in-out infinite;
}
```

### Glitch Effect

```css
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
}

.glitch {
  animation: glitch 0.3s ease-in-out;
}
```

---

## 📱 RESPONSIVE

### Breakpoints

```css
/* Mobile first */
.container {
  padding: var(--space-md);
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--space-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-xl);
  }
}
```

---

## ♿ ACCESSIBILITÉ

### Contraste

- Ratio minimum: **4.5:1** pour texte normal
- Ratio minimum: **3:1** pour texte large (18px+)
- Cyan (#00ffff) sur noir (#0a0a0a): **15.3:1** ✅

### Focus States

```css
.interactive:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 USAGE

### Import dans globals.css

```css
@import './styles/design-tokens.css';
```

### Utilisation dans composants

```tsx
// Avec Tailwind
<div className="bg-[var(--color-bg-card)] border-[var(--color-primary)]">

// Avec CSS modules
.card {
  background: var(--color-bg-card);
  border-color: var(--color-primary);
}
```

---

## 📝 CONVENTIONS

### Nommage

- **Tokens**: `--category-property-variant`
- **Classes**: `kebab-case`
- **Composants**: `PascalCase`

### Organisation fichiers

```
src/
├── styles/
│   ├── design-tokens.css
│   └── animations.css
├── components/
│   ├── Card3D.tsx
│   ├── NeonButton.tsx
│   └── Badge.tsx
```

---

**Prochaines étapes**:
1. Créer composants réutilisables (Card3D, NeonButton, Badge)
2. Migrer styles inline vers tokens CSS
3. Documenter nouveaux composants
