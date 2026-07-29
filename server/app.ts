import express from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from '../src/lib/seo.ts';
import type { InquiryPayload } from '../shared/inquiry.ts';
import { validateInquiryPayload } from '../shared/inquiry.ts';
import { sendInquiryEmail } from './email.js';
import { injectRouteHtmlMeta } from './html-meta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

export interface CreateAppOptions {
  isProd?: boolean;
  rateLimitMax?: number;
  sendInquiry?: (payload: InquiryPayload) => Promise<void>;
}

function getProductionOrigins(): string[] {
  return [SITE_URL, SITE_URL.replace('https://', 'https://www.')];
}

export function getAllowedOrigins(isProd: boolean): string[] {
  const productionOrigins = getProductionOrigins();
  const base = isProd ? productionOrigins : [...productionOrigins, ...DEV_ORIGINS];

  if (!process.env.ALLOWED_ORIGINS) {
    return base;
  }

  const extra = process.env.ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [...new Set([...base, ...extra])];
}

export function createApp(options: CreateAppOptions = {}) {
  const isProd = options.isProd ?? process.env.NODE_ENV === 'production';
  const sendInquiry = options.sendInquiry ?? sendInquiryEmail;
  const allowedOrigins = getAllowedOrigins(isProd);
  const app = express();

  if (isProd) {
    app.set('trust proxy', 1);
  }

  app.use(express.json({ limit: '32kb' }));

  app.use('/api', (req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      if (origin && !allowedOrigins.includes(origin)) {
        res.sendStatus(403);
        return;
      }
      res.sendStatus(204);
      return;
    }

    if (origin && !allowedOrigins.includes(origin)) {
      res.status(403).json({ error: 'Anfrage konnte nicht gesendet werden.' });
      return;
    }

    next();
  });

  const inquiryRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: options.rateLimitMax ?? 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Zu viele Anfragen. Bitte versuche es in einigen Minuten erneut.' },
  });

  app.post('/api/inquiry', inquiryRateLimit, async (req, res) => {
    if (req.body?._gotcha) {
      res.status(400).json({ error: 'Anfrage konnte nicht gesendet werden.' });
      return;
    }

    const payload = validateInquiryPayload(req.body);
    if (!payload) {
      res.status(400).json({ error: 'Bitte prüfe deine Eingaben und versuche es erneut.' });
      return;
    }

    try {
      await sendInquiry(payload);
      res.json({ ok: true });
    } catch (err) {
      console.error('[inquiry]', err);
      res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen.' });
    }
  });

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
