# StudySphere full audit — 26 November 2026

## Scope

Reviewed the uploaded `studysphere-deploy.zip` source tree, server routes and storage layer, frontend contribution flows, privacy/copyright text, package metadata, CI workflow, and Render/Turso deployment configuration. Work was performed on a separate local Git branch named `audit/studysphere-full-review`; the uploaded archive was not overwritten.

## Changes made

- Made note, PYQ, and contact writes asynchronous and durable: the API now waits for the Turso write before acknowledging success.
- Serialized store mutations to prevent concurrent submissions from overwriting one another; capacity checks now run inside the same serialized operation.
- Switched newly generated record IDs to full UUIDs.
- Bounded in-memory rate-limit buckets and documented that limits are per server instance.
- Added production security headers and JSON 404 responses for unknown API endpoints.
- Validated the public origin before reflecting it into `robots.txt` and `sitemap.xml`.
- Removed the undefined `Open Academic` contribution licence; public note uploads now offer CC BY-SA 4.0 or CC BY 4.0, while the bundled-content label remains reserved for bundled material.
- Prevented copying question text into End Semester / Carry Over entries; those entries can link to an official source, while entered questions are restricted to original practice blueprints.
- Corrected privacy/copyright disclosures, replaced the AI Studio boilerplate README, clarified free-tier deployment limitations, and added a content-provenance checklist.
- Added store persistence tests and wired them into CI and the Render build command.

## Verification

- TypeScript/TSX syntax transpilation: **55 files checked, 0 syntax errors**.
- Package metadata and lockfile root consistency: **passed**.
- `git diff --check`: **passed**.
- Store behavior harness: **passed** — 24 concurrent local writes persisted; a simulated remote database write failure was rejected without mutating in-memory state.
- `npm ci`: **blocked** because the package registry could not be reached (`EAI_AGAIN`).
- Consequently `npm test`, `npm run lint`, and `npm run build` could not run end-to-end in this environment (`tsx`, Vite, and Vite type declarations were unavailable after the failed install). Run all three after dependencies install successfully.

## Launch blockers / manual review required

1. **Public uploads are published immediately.** The app has no moderation queue or admin approval dashboard. The copyright checkbox is a contributor attestation, not a moderation system. Do not promote unrestricted public uploads until submissions are held for review or a trusted admin approval flow is added.
2. **Bundled content provenance is not recorded per item.** Many bundled notes are labelled `Original StudySphere`, but the archive does not contain item-level creator/source/permission evidence. Review the actual content and record provenance before public launch. The label itself does not prove ownership.
3. **Contact submissions contain personal data.** There is no automatic retention/deletion policy, admin inbox, or email notification. The operator must inspect the configured database directly and define a retention process.
4. **Free hosting is not a production SLA.** Render's free web service sleeps and has shared usage limits; the free tier is intended for testing/hobby projects. Confirm all provider billing/overage settings before adding payment details.
5. **Remote GitHub repository was not identified.** This archive had no Git remote and no exact StudySphere repository URL was provided. Changes remain in the local branch/copy; no GitHub branch or PR was created.

## Release boundary

No merge, GitHub push, public release, or deployment was performed. Those actions remain subject to the owner's explicit approval.
