import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { createApiRouter } from './src/server/routes';
import { catalogStore } from './src/server/store';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer(): Promise<void> {
  await catalogStore.init();

  const app = express();

  // Set TRUST_PROXY_HOPS to match the actual proxy chain (Render = 1, direct hosting = 0).
  // Incorrect proxy trust settings can let clients spoof req.ip or cause all users to share one IP.
  const hops = Number(process.env.TRUST_PROXY_HOPS ?? 1);
  app.set('trust proxy', Number.isInteger(hops) && hops >= 0 ? hops : 1);
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.json({ limit: '100kb' }));

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (isProduction) {
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
  });

  app.use('/api', createApiRouter());
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  const siteUrl = (req: express.Request): string => {
    const candidate = process.env.APP_URL?.trim() || `${req.protocol}://${req.get('host')}`;
    try {
      const parsed = new URL(candidate);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return '';
      return parsed.origin;
    } catch {
      // Never reflect an invalid or hostile Host/APP_URL value into XML or robots.txt.
      return '';
    }
  };

  app.get('/robots.txt', (req, res) => {
    const base = siteUrl(req);
    if (!base) {
      res.status(400).type('text/plain').send('Set a valid APP_URL or send a valid Host header.');
      return;
    }
    res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const base = siteUrl(req);
    if (!base) {
      res.status(400).type('text/plain').send('Set a valid APP_URL or send a valid Host header.');
      return;
    }
    const pages = ['/', '/school', '/courses', '/subjects', '/syllabus', '/notes', '/pyq', '/tools', '/my-study', '/about', '/contact'];
    res
      .type('application/xml')
      .send(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
          .map((p) => `  <url><loc>${base}${p}</loc></url>`)
          .join('\n')}\n</urlset>\n`
      );
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(
      express.static(distDir, {
        index: false,
        maxAge: '1h',
        setHeaders: (res, file) => {
          if (file.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // hashed filenames
          } else if (/(sw\.js|index\.html|manifest\.webmanifest|workbox-.*\.js)$/.test(file)) {
            res.setHeader('Cache-Control', 'no-cache'); // always revalidate so updates reach everyone
          }
        },
      })
    );
    app.get('*', (_req, res) => {
      const indexFile = path.resolve(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(503).send('Application bundle not built yet. Run npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StudySphere server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start StudySphere server:', err);
  process.exit(1);
});
