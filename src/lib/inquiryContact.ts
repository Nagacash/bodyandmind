import type { InquiryPayload } from '../../shared/inquiry';
import { STUDIO_INFO } from '../data/studioData';

export type { InquiryPayload };

const TIME_LABELS: Record<string, string> = {
  morning: 'Morgens (7–11 Uhr)',
  midday: 'Mittags (11–15 Uhr)',
  evening: 'Abends (15–20 Uhr)',
  flexible: 'Flexibel',
};

export function buildInquiryPlainText(payload: InquiryPayload): string {
  const lines: string[] = [
    'Hallo body & mind,',
    '',
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
  ];

  if (payload.source === 'contact') {
    if (payload.interest) lines.push(`Interesse: ${payload.interest}`);
    if (payload.message?.trim()) lines.push('', payload.message.trim());
  } else {
    if (payload.customPackageSummary) lines.push(`Paket: ${payload.customPackageSummary}`);
    else if (payload.selectedOptionName) lines.push(`Option: ${payload.selectedOptionName}`);
    if (payload.pillar) lines.push(`Schwerpunkt: ${payload.pillar}`);
    if (payload.timePreference) {
      lines.push(`Wunschzeit: ${TIME_LABELS[payload.timePreference] ?? payload.timePreference}`);
    }
    if (payload.preferredDays?.length) {
      lines.push(`Wunschtage: ${payload.preferredDays.join(', ')}`);
    }
    if (payload.notes?.trim()) lines.push('', payload.notes.trim());
  }

  lines.push('', '— Gesendet über bodyandmindbynatalie.de');
  return lines.join('\n');
}

function buildSubject(payload: InquiryPayload): string {
  const prefix = payload.source === 'booking' ? 'Erstgespräch' : 'Kontakt';
  return `${prefix}: ${payload.name} – body & mind`;
}

export function buildMailtoInquiryUrl(
  payload: InquiryPayload,
  toEmail = STUDIO_INFO.email
): string {
  const params = new URLSearchParams({
    subject: buildSubject(payload),
    body: buildInquiryPlainText(payload),
  });
  return `mailto:${toEmail}?${params.toString()}`;
}

export function buildWhatsAppInquiryUrl(
  payload: InquiryPayload,
  phoneDigits = STUDIO_INFO.whatsappPhone
): string {
  const text = buildInquiryPlainText(payload);
  const base = phoneDigits?.replace(/\D/g, '')
    ? `https://wa.me/${phoneDigits.replace(/\D/g, '')}`
    : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function openInquiryViaEmail(payload: InquiryPayload): void {
  window.location.href = buildMailtoInquiryUrl(payload);
}

export function openInquiryViaWhatsApp(payload: InquiryPayload): void {
  window.open(buildWhatsAppInquiryUrl(payload), '_blank', 'noopener,noreferrer');
}
