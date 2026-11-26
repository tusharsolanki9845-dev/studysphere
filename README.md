# StudySphere

StudySphere is an independent, free-to-access academic learning platform built with React, TypeScript, Vite, and an Express API. It provides curriculum browsing, subject notes, practice-paper blueprints, study tools, and an installable offline-capable PWA.

## Requirements

- Node.js 22 or newer
- npm

## Run locally

```bash
npm ci
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:3000`. No Gemini API key or paid AI API is required by the current codebase. Without Turso credentials, the server uses a local JSON file under `data/` for development.

## Verification

```bash
npm run lint
npm test
npm run build
```

The GitHub Actions workflow runs these checks for pushes to `main` and pull requests.

## Deployment

See [DEPLOY.md](DEPLOY.md) for the free-tier-first Render and Turso setup. Free infrastructure has sleep, quota, and data-durability limits; this configuration is suitable for a prototype or low-traffic pilot, not a production availability guarantee. Confirm provider limits and disable paid overages before connecting billing details.

## Content and copyright

- Link to official academic sources instead of assuming publicly accessible files may be republished.
- Public note contributions must use CC BY-SA 4.0 or CC BY 4.0 and be submitted by a rights holder or an authorised contributor.
- Do not upload copied textbook extracts, scans, restricted exam papers, or material without redistribution permission.
- See the in-app Copyright Policy and `CONTENT_PROVENANCE.md`. A policy and checkbox reduce risk but cannot guarantee immunity from copyright claims; retain source and permission records.

## Environment variables

See [.env.example](.env.example). Keep secrets out of Git and never expose database tokens in frontend code.
