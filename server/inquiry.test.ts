import { describe, expect, test } from 'bun:test';
import type { Server } from 'node:http';
import { INQUIRY_LIMITS, validateInquiryPayload } from '../shared/inquiry.ts';
import { createApp, getAllowedOrigins } from '../server/app.ts';

const validContact = {
  source: 'contact' as const,
  name: 'Alex Smith',
  email: 'alex@example.com',
  privacyConsent: true,
};

function startTestServer(options?: Parameters<typeof createApp>[0]) {
  const app = createApp({
    isProd: false,
    sendInquiry: async () => {},
    ...options,
  });
  const server = app.listen(0);
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  return {
    server: server as Server,
    baseUrl,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

describe('validateInquiryPayload', () => {
  test('accepts valid contact payload', () => {
    const result = validateInquiryPayload(validContact);
    expect(result).toEqual(validContact);
  });

  test('rejects missing privacy consent', () => {
    expect(validateInquiryPayload({ ...validContact, privacyConsent: false })).toBeNull();
  });

  test('rejects invalid email', () => {
    expect(validateInquiryPayload({ ...validContact, email: 'not-an-email' })).toBeNull();
  });

  test('rejects oversized name', () => {
    expect(
      validateInquiryPayload({
        ...validContact,
        name: 'a'.repeat(INQUIRY_LIMITS.name + 1),
      })
    ).toBeNull();
  });

  test('rejects oversized message', () => {
    expect(
      validateInquiryPayload({
        ...validContact,
        message: 'a'.repeat(INQUIRY_LIMITS.longText + 1),
      })
    ).toBeNull();
  });

  test('rejects invalid time preference', () => {
    expect(
      validateInquiryPayload({
        source: 'booking',
        name: 'Alex',
        email: 'alex@example.com',
        privacyConsent: true,
        timePreference: 'midnight',
      })
    ).toBeNull();
  });
});

describe('getAllowedOrigins', () => {
  test('includes dev origins outside production', () => {
    const origins = getAllowedOrigins(false);
    expect(origins).toContain('http://localhost:3000');
    expect(origins).toContain('https://bodyandmindbynatalie.de');
  });

  test('merges ALLOWED_ORIGINS with defaults', () => {
    const previous = process.env.ALLOWED_ORIGINS;
    process.env.ALLOWED_ORIGINS = 'https://staging.example.com';
    try {
      const origins = getAllowedOrigins(true);
      expect(origins).toContain('https://bodyandmindbynatalie.de');
      expect(origins).toContain('https://staging.example.com');
    } finally {
      if (previous === undefined) delete process.env.ALLOWED_ORIGINS;
      else process.env.ALLOWED_ORIGINS = previous;
    }
  });
});

describe('POST /api/inquiry', () => {
  test('rejects disallowed cross-origin requests', async () => {
    const { baseUrl, close } = startTestServer();
    try {
      const response = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://evil.example',
        },
        body: JSON.stringify(validContact),
      });

      expect(response.status).toBe(403);
    } finally {
      await close();
    }
  });

  test('rejects honeypot submissions', async () => {
    const { baseUrl, close } = startTestServer();
    try {
      const response = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'http://localhost:3000',
        },
        body: JSON.stringify({ ...validContact, _gotcha: 'bot-filled-this' }),
      });

      expect(response.status).toBe(400);
    } finally {
      await close();
    }
  });

  test('returns 429 after rate limit exceeded', async () => {
    const { baseUrl, close } = startTestServer({ rateLimitMax: 2 });
    try {
      const headers = {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
      };

      const first = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers,
        body: JSON.stringify(validContact),
      });
      const second = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...validContact, email: 'alex2@example.com' }),
      });
      const third = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...validContact, email: 'alex3@example.com' }),
      });

      expect(first.status).toBe(200);
      expect(second.status).toBe(200);
      expect(third.status).toBe(429);
    } finally {
      await close();
    }
  });
});
