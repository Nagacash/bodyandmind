export interface InquiryPayload {
  source: 'contact' | 'booking';
  name: string;
  email: string;
  privacyConsent: boolean;
  interest?: string;
  message?: string;
  pillar?: string;
  selectedOptionName?: string;
  timePreference?: string;
  preferredDays?: string[];
  notes?: string;
  customPackageSummary?: string;
}

export const INQUIRY_LIMITS = {
  name: 100,
  email: 254,
  shortText: 200,
  longText: 2000,
  preferredDays: 7,
  dayLabel: 10,
} as const;

const VALID_TIME_PREFERENCES = new Set(['morning', 'midday', 'evening', 'flexible']);

function trimToMax(value: string, max: number): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function optionalTrimmed(value: unknown, max: number): string | undefined | null {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') return null;
  return trimToMax(value, max);
}

export function validateInquiryPayload(body: unknown): InquiryPayload | null {
  if (!body || typeof body !== 'object') return null;

  const data = body as Record<string, unknown>;
  const name = typeof data.name === 'string' ? trimToMax(data.name, INQUIRY_LIMITS.name) : null;
  const email = typeof data.email === 'string' ? trimToMax(data.email, INQUIRY_LIMITS.email) : null;
  const source = data.source === 'contact' || data.source === 'booking' ? data.source : null;
  const privacyConsent = data.privacyConsent === true;

  if (!name || !email || !source || !privacyConsent) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  const interest = optionalTrimmed(data.interest, INQUIRY_LIMITS.shortText);
  if (interest === null) return null;
  const message = optionalTrimmed(data.message, INQUIRY_LIMITS.longText);
  if (message === null) return null;
  const pillar = optionalTrimmed(data.pillar, INQUIRY_LIMITS.shortText);
  if (pillar === null) return null;
  const selectedOptionName = optionalTrimmed(data.selectedOptionName, INQUIRY_LIMITS.shortText);
  if (selectedOptionName === null) return null;
  const notes = optionalTrimmed(data.notes, INQUIRY_LIMITS.longText);
  if (notes === null) return null;
  const customPackageSummary = optionalTrimmed(
    data.customPackageSummary,
    INQUIRY_LIMITS.shortText
  );
  if (customPackageSummary === null) return null;

  const timePreference =
    data.timePreference === undefined || data.timePreference === null || data.timePreference === ''
      ? undefined
      : typeof data.timePreference === 'string' && VALID_TIME_PREFERENCES.has(data.timePreference)
        ? data.timePreference
        : null;
  if (timePreference === null) return null;

  let preferredDays: string[] | undefined;
  if (data.preferredDays !== undefined && data.preferredDays !== null) {
    if (!Array.isArray(data.preferredDays)) return null;
    preferredDays = data.preferredDays
      .filter((day): day is string => typeof day === 'string')
      .map((day) => day.trim())
      .filter((day) => day.length > 0 && day.length <= INQUIRY_LIMITS.dayLabel)
      .slice(0, INQUIRY_LIMITS.preferredDays);
    if (data.preferredDays.length > 0 && preferredDays.length === 0) return null;
  }

  return {
    source,
    name,
    email,
    privacyConsent,
    interest,
    message,
    pillar,
    selectedOptionName,
    timePreference,
    preferredDays: preferredDays?.length ? preferredDays : undefined,
    notes,
    customPackageSummary,
  };
}
