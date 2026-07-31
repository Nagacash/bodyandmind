export type PageId = 'home' | 'flow' | 'form' | 'recovery' | 'pricing' | 'about' | 'team' | 'contact' | 'impressum' | 'datenschutz';

export interface NavItem {
  id: PageId;
  label: string;
  path: string;
}

export type PillarType = 'FLOW' | 'FORM' | 'RECOVERY' | 'SUMMER_SPECIAL_A' | 'SUMMER_SPECIAL_B' | 'GENERAL';

export interface BookingData {
  pillar: PillarType;
  selectedOptionName?: string;
  name: string;
  email: string;
  timePreference: 'morning' | 'midday' | 'evening' | 'flexible';
  preferredDays?: string[];
  notes?: string;
  customPackageSummary?: string;
  privacyConsent: boolean;
}

export interface PricingCard {
  id: string;
  pillar: 'FLOW' | 'FORM';
  tier: 'Essential' | 'Professional';
  isPopular?: boolean;
  rhythm: string;
  pricePerSession: number;
  totalSessions: number;
  totalPrice: number;
  details: string;
  features: string[];
}

export interface RecoveryModule {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  isNew?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}
