import type { InquiryPayload } from '../../shared/inquiry';

export type { InquiryPayload };

export async function submitInquiry(
  payload: InquiryPayload,
  honeypot = ''
): Promise<void> {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      _gotcha: honeypot,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? 'Anfrage konnte nicht gesendet werden.');
  }
}
