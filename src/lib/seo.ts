import { STUDIO_INFO } from '../data/studioData';

/** Canonical production origin — update when domain goes live */
export const SITE_URL = `https://${STUDIO_INFO.domain}`;

/** Default Open Graph / social share preview image */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/beach1.webp`;
export const DEFAULT_OG_IMAGE_ALT =
  'Premium Privattraining Hamburg – Boxen, Kickboxen & Recovery | body & mind';
export const DEFAULT_OG_IMAGE_WIDTH = '1920';
export const DEFAULT_OG_IMAGE_HEIGHT = '1280';

/** Priority search terms for discoverability (used in meta + structured data) */
export const SEO_KEYWORDS = [
  'Boxen Hamburg',
  'Kickboxen Hamburg',
  'Privattraining Hamburg',
  'Personal Training Hamburg',
  'Box Privattraining',
  'Premium Personal Training',
  'Recovery Hamburg',
  'Erholung Training',
  'Premium Studio Hamburg',
] as const;

export interface PageSeo {
  title: string;
  description: string;
  /** Direct answer for GEO — shown in meta and used for answer-first checks */
  answerLead?: string;
  keywords?: string;
}

export const ROUTE_SEO: Record<string, PageSeo> = {
  '/': {
    title:
      'Premium Privattraining Hamburg – Boxen, Kickboxen & Recovery | body & mind',
    description:
      'Box-Weltmeisterin Natalie Zimmermann in Hamburg: Privattraining, Mental Coaching, Boxen, Kickboxen, Kraft & Recovery — körperliche Stärke und mentale Resilienz an der Rothenbaumchaussee.',
    answerLead: STUDIO_INFO.tagline,
    keywords:
      'Privattraining Hamburg, Boxen Hamburg, Kickboxen Hamburg, Premium Personal Training, Recovery Hamburg, Erholung',
  },
  '/flow': {
    title:
      'Boxen & Kickboxen Privattraining Hamburg | FLOW – body & mind',
    description:
      'Box Privattraining & Kickboxen in Hamburg: 1:1 Boxen und Kickboxen für Stressabbau, Fokus und Energie – premium, privat, ohne Ringkampf-Druck.',
    answerLead:
      'FLOW ist Box- und Kickbox-Privattraining bei body & mind in Hamburg: privates 1:1 Boxen und Kickboxen zur Stressreduktion, mentalen Klarheit und Energiefreisetzung – premium und diskret.',
    keywords:
      'Boxen Hamburg, Kickboxen Hamburg, Box Privattraining, Privattraining Boxen, Premium Boxen Hamburg',
  },
  '/form': {
    title:
      'Kraft & Athletik Privattraining Hamburg | FORM – body & mind',
    description:
      'Premium Privattraining für Kraft, Stabilität und Leistungsfähigkeit in Hamburg: Functional Training und Athletik im privaten 1:1 Setting.',
    answerLead:
      'FORM ist Premium-Privattraining für Kraft und Athletik bei body & mind in Hamburg — individuelles 1:1 Coaching für Muskelaufbau, Haltung und funktionelle Leistungsfähigkeit.',
    keywords:
      'Privattraining Hamburg, Krafttraining Hamburg, Premium Personal Training, Athletiktraining Hamburg',
  },
  '/recovery': {
    title:
      'Recovery & Erholung Hamburg – Premium Regeneration | body & mind',
    description:
      'Premium Recovery und Erholung in Hamburg: IHHT, Atemtraining, Infrarot und Massagesessel zur Regeneration von Körper und Nervensystem.',
    answerLead:
      'RECOVERY bei body & mind steht für Premium-Erholung in Hamburg: modulare Regenerations-Anwendungen (u. a. IHHT, Atemtraining, Infrarot) für tiefe Erholung und Nervensystem-Regulation.',
    keywords:
      'Recovery Hamburg, Erholung Training, Premium Recovery, Regeneration Hamburg, Stressregulation',
  },
  '/mitgliedschaften': {
    title:
      'Premium Privattraining Preise Hamburg | Mitgliedschaften – body & mind',
    description:
      'Transparente Pakete für Premium Privattraining in Hamburg: Boxen, Kickboxen, Kraft und optionale Recovery-Module für Erholung – Preise inkl. MwSt.',
    answerLead:
      'Die Mitgliedschaften bei body & mind sind Premium-Privattraining-Pakete in Hamburg mit Boxen, Kickboxen oder Krafttraining und optionaler Recovery-Erholung — Preise inkl. MwSt.',
    keywords:
      'Privattraining Preise Hamburg, Premium Personal Training Pakete, Recovery Module Hamburg',
  },
  '/ueber-uns': {
    title:
      'Über uns – Premium Privattraining Hamburg | body & mind',
    description:
      'body & mind by Natalie Zimmermann: Premium Privattraining, Boxen, Kickboxen und Recovery an der Rothenbaumchaussee – persönlich und diskret.',
    answerLead:
      'body & mind ist das Premium-Studio von Natalie Zimmermann in Hamburg-Rotherbaum — Privattraining, Boxen, Kickboxen, Recovery und Erholung in persönlicher 1:1 Betreuung.',
    keywords:
      'Premium Studio Hamburg, Privattraining Rothenbaum, Natalie Zimmermann Personal Training',
  },
  '/team': {
    title: 'Team – Trainer & Coaches Hamburg | body & mind',
    description:
      'Das Team von body & mind: Natalie Zimmermann, Jerry, Juri und Erhan — Personal Training, Boxen, Ernährung und Recovery in Hamburg Rothenbaum.',
    answerLead:
      'Das Team bei body & mind in Hamburg umfasst Natalie Zimmermann sowie Jerry, Juri und Erhan — qualifizierte Trainer und Coaches für Premium-Privattraining, Boxen und ganzheitliche Betreuung.',
    keywords:
      'Personal Trainer Team Hamburg, Natalie Zimmermann Team, Privattraining Coaches Hamburg',
  },
  '/kontakt': {
    title:
      'Kontakt – Privattraining & Erstgespräch Hamburg | body & mind',
    description:
      'Erstgespräch mit Natalie Zimmermann in Hamburg-Rotherbaum. Rothenbaumchaussee 156, 20149 Hamburg · 040 / 53790578 · info@nataliezimmermann.de',
    answerLead:
      'Kontaktiere body & mind per E-Mail, Telefon oder WhatsApp — Erstgespräch im Studio Rothenbaumchaussee 156, 20149 Hamburg.',
    keywords:
      'Privattraining Hamburg Kontakt, Boxen Hamburg anfragen, Recovery Hamburg Termin',
  },
  '/impressum': {
    title: 'Impressum | body & mind by Natalie Zimmermann',
    description: 'Impressum und Anbieterkennzeichnung von body & mind by Natalie Zimmermann, Hamburg.',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | body & mind by Natalie Zimmermann',
    description: 'Datenschutzerklärung der Webseite bodyandmindbynatalie.de gemäß DSGVO.',
  },
};

export const SITEMAP_PATHS = [
  '/',
  '/flow',
  '/form',
  '/recovery',
  '/mitgliedschaften',
  '/ueber-uns',
  '/team',
  '/kontakt',
  '/impressum',
  '/datenschutz',
] as const;

export function getRouteSeo(pathname: string): PageSeo {
  return ROUTE_SEO[pathname] ?? ROUTE_SEO['/'];
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}` || SITE_URL;
}
