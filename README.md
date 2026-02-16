# Portfolio 2026 - Sylvain CLEMENT

Portfolio professionnel moderne développé avec Next.js 16 et React 19.

## Stack technique

- **Framework** : Next.js 16.1.6 (Turbopack)
- **UI** : React 19.2.3 + TypeScript 5
- **Styling** : Tailwind CSS 4
- **Base de données** : Neon PostgreSQL + Prisma 6
- **Déploiement** : Vercel

## Prérequis

- Node.js 20.x (LTS)
- npm ou yarn
- PostgreSQL (Neon)

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Build production

```bash
npm run build
npm start
```

## Base de données

Synchroniser le schéma Prisma :

```bash
npx prisma db push
npx prisma generate
```

## Architecture

- `/src/app` : Pages App Router
- `/src/components` : Composants réutilisables
- `/src/data` : Données JSON
- `/prisma` : Schéma base de données

## Design System

Palette Electric Carbon :
- Carbon Night : #050a12
- Cyan Atomique : #00F5FF

Typographies :
- Space Grotesk (titres)
- Inter (corps de texte)
- Crimson Pro (labels)

## Sécurité

- Variables d'environnement protégées
- XSS prevention (React interpolation)
- OWASP Top 10 compliance

## Documentation

Documentation technique disponible dans le dossier `/docs` du projet.

## Licence

Tous droits réservés - Sylvain CLEMENT 2026
