import { CookiePreferences } from '../types';

const CONSENT_KEY = 'bm_cookie_consent';

export function getCookieConsent(): CookiePreferences | null {
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as CookiePreferences;
  } catch {
    return null;
  }
}

export function hasMarketingConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.marketing === true;
}
