import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { injectRouteHtmlMeta } from './html-meta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface CreateAppOptions {
  isProd?: boolean;
}

export function createApp(options: CreateAppOptions = {}) {
  const isProd = options.isProd ?? process.env.NODE_ENV === 'production';
  const app = express();

  if (isProd) {
    app.set('trust proxy', 1);
  }

  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  if (isProd) {
    const distPath = path.resolve(__dirname, '../dist');
    const indexPath = path.join(distPath, 'index.html');
    const indexTemplate = fs.readFileSync(indexPath, 'utf8');

    app.use(
      express.static(distPath, {
        index: false,
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (/\.(woff2|webp|svg|jpg|png)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
          }
        },
      })
    );
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.type('html').send(injectRouteHtmlMeta(indexTemplate, req.path));
    });
  }

  return app;
}
