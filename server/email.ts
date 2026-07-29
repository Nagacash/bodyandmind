import { Resend } from 'resend';
import type { InquiryPayload } from '../shared/inquiry.ts';

const TIME_LABELS: Record<string, string> = {
  morning: 'Morgens (7–11 Uhr)',
  midday: 'Mittags (11–15 Uhr)',
  evening: 'Abends (15–20 Uhr)',
  flexible: 'Flexibel',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(payload: InquiryPayload): string {
  const rows: Array<[string, string]> = [
    ['Quelle', payload.source === 'booking' ? 'Erstgespräch-Modal' : 'Kontaktseite'],
    ['Name', payload.name],
    ['E-Mail', payload.email],
  ];

  if (payload.source === 'contact') {
    if (payload.interest) rows.push(['Interesse', payload.interest]);
    if (payload.message?.trim()) rows.push(['Nachricht', payload.message.trim()]);
  } else {
    if (payload.customPackageSummary) rows.push(['Paket', payload.customPackageSummary]);
    else if (payload.selectedOptionName) rows.push(['Option', payload.selectedOptionName]);
    if (payload.pillar) rows.push(['Schwerpunkt', payload.pillar]);
    if (payload.timePreference) {
      rows.push(['Wunschzeit', TIME_LABELS[payload.timePreference] ?? payload.timePreference]);
    }
    if (payload.preferredDays?.length) rows.push(['Wunschtage', payload.preferredDays.join(', ')]);
    if (payload.notes?.trim()) rows.push(['Anliegen', payload.notes.trim()]);
  }

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;width:140px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html><html><body style="font-family:Montserrat,Arial,sans-serif;background:#f5f5f5;padding:24px;"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;padding:24px;"><h1 style="font-size:18px;margin:0 0 16px;color:#111;">Neue Anfrage – body &amp; mind</h1><table style="width:100%;border-collapse:collapse;">${body}</table></div></body></html>`;
}

function buildSubject(payload: InquiryPayload): string {
  const prefix = payload.source === 'booking' ? 'Erstgespräch' : 'Kontakt';
  return `${prefix}: ${payload.name} – body & mind`;
}

export async function sendInquiryEmail(payload: InquiryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL ?? 'info@nataliezimmermann.de';

  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
  if (!from) throw new Error('RESEND_FROM_EMAIL is not configured');

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: buildSubject(payload),
    html: buildEmailHtml(payload),
  });

  if (error) {
    throw new Error(error.message);
  }
}
