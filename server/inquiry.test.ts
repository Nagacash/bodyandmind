import { describe, expect, test } from 'bun:test';
import { INQUIRY_LIMITS, validateInquiryPayload } from '../shared/inquiry.ts';

const validContact = {
  source: 'contact' as const,
  name: 'Alex Smith',
  email: 'alex@example.com',
  privacyConsent: true,
};

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
