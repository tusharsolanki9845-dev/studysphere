# Free, worldwide deployment guide

This is a free-tier-first setup (provider documentation checked 26 November 2026). Free tiers change and are not a production SLA. Confirm current limits in each provider dashboard before relying on them.

| Part | Service | Why |
|---|---|---|
| App hosting | **Render** free web service | Runs the Node server; HTTPS and a public URL included |
| Database | **Turso** free plan | Keeps user-added notes, PYQs and messages when Render restarts or redeploys |
| Optional uptime monitor | **UptimeRobot** free | Checks the health endpoint; may reduce idle spin-down but does not guarantee uptime |
| CDN, DNS, DDoS shield (optional) | **Cloudflare** free | Faster loads worldwide, free custom-domain DNS |
| Code and CI | **GitHub** free | Hosts the repo and runs the build check on every push |

Why not Vercel Hobby or Render's free Postgres? Vercel's Hobby plan is for non-commercial use only (a problem if you ever turn ads on), and Render's free Postgres database expires, so it is not safe for long-term data.

## 1. Push the code to GitHub
Create an empty repo, then run `git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push -u origin main`. The included `.gitignore` keeps `.env` and `node_modules` out. The GitHub Action in `.github/workflows/ci.yml` then checks that the project builds on every push.

## 2. Create the free database (Turso)
1. Sign up at turso.tech and create a database. Choose the region closest to your users.
2. Copy the database URL (it starts with `libsql://`).
3. Create a database token and copy it.

The app creates its own table on first start. Without these two values the app still works, but it stores data in a local file that Render deletes on restart.

## 3. Deploy on Render
1. Sign up at render.com, choose **New, Blueprint**, and pick your repo. `render.yaml` sets up everything (Singapore region, build and start commands, health check).
2. When prompted, paste `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` and `APP_URL` (the `https://...onrender.com` address Render gives you).
3. After deploy, open `/api/health`. It should show `"storage":"turso"`. If it says `"file"`, the database values are missing or wrong, so check the Render logs.

Render free web services spin down after 15 minutes without inbound traffic and can take about a minute to wake. Render currently includes 750 free instance hours per workspace per calendar month; one continuously active service uses about 720 hours in a 30-day month. The allowance is shared across services in the workspace. A monitor may reduce idle spin-down, but it does not create extra hours, prevent platform restarts, or turn the free tier into production-grade hosting. Render explicitly positions free instances for testing and hobby projects, not production apps. See the [Render free-instance limits](https://render.com/docs/free) before launch.

## 4. Keep it awake
At uptimerobot.com you can add an HTTP monitor for `https://<your-site>/api/health` on the free 5-minute interval. This can reduce idle spin-down, but it consumes the same Render instance-hour allowance. Do not add multiple keep-awake monitors or assume continuous uptime; check the workspace's remaining hours and usage.

## 5. Optional: custom domain and Cloudflare
Add your domain in Render (Settings, Custom Domains), then add the DNS records Render shows. If you proxy through Cloudflare, set `TRUST_CLOUDFLARE=true` in Render so rate limiting sees real visitor addresses.

## Environment variables
| Name | Purpose |
|---|---|
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Free database connection |
| `APP_URL` | Public address, used in `sitemap.xml` and `robots.txt` |
| `TRUST_PROXY_HOPS` | Proxies in front of the app (Render: `1`) |
| `TRUST_CLOUDFLARE` | `true` only when served through Cloudflare |
| `ADS_ENABLED` | `false` unless you add ad scripts |

## Avoid accidental charges

- Render's free web service is limited by shared monthly instance hours, bandwidth, and build-pipeline usage. Review the workspace usage dashboard; exceeding included bandwidth or build usage can lead to charges depending on workspace settings.
- Turso's Free plan currently includes 5 GB storage, 500 million row reads, and 10 million row writes per month. Turso documents that overages can be billed when overages are enabled ([Turso pricing](https://turso.tech/pricing)). Keep overages disabled and do not add a payment method unless you explicitly accept possible charges.
- UptimeRobot's Free plan currently offers 5-minute checks ([interval details](https://help.uptimerobot.com/en/articles/11360876-what-is-a-monitoring-interval-in-uptimerobot)). It is optional and is not a substitute for monitoring provider usage or backups.
- No free-tier provider is a guarantee of permanent free hosting, continuous availability, or durable backups. Export database content regularly before important releases.

## Local development
`npm ci`, then `npm run dev`. With no database values set, data is stored in a local `data/` folder.

## What is built in for global use
- Gzip compression, long-lived caching for hashed assets, and always-fresh service worker files.
- Installable offline-capable PWA, so repeat visitors load instantly even if the server is waking up.
- Bounded in-memory rate limiting with proxy-aware client IP handling; limits are per instance, not shared across multiple server instances.
- `robots.txt` and `sitemap.xml` for search engines.

## Known limits
- The free database holds user-added content only. The built-in school, course and syllabus data ships with the code.
- The interface is English. Translating it is a separate piece of work.
- Study streaks, flashcards, exams and school progress are stored in each visitor's own browser and do not sync across devices.
