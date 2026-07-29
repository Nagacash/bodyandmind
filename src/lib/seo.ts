import { STUDIO_INFO } from '../data/studioData';

/** Canonical production origin — update when domain goes live */
export const SITE_URL = `https://${STUDIO_INFO.domain}`;

/** Default Open Graph / social share preview image */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/beach1.webp`;
export const DEFAULT_OG_IMAGE_ALT =
  'Premium Personal Training Hamburg – body & mind by Natalie Zimmermann';
export const DEFAULT_OG_IMAGE_WIDTH = '1920';
export const DEFAULT_OG_IMAGE_HEIGHT = '1280';

export interface PageSeo {
  title: string;
  description: string;
  /** Direct answer for GEO — shown in meta and used for answer-first checks */
  answerLead?: string;
}

export const ROUTE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Premium Personal Training Hamburg | body & mind by Natalie Zimmermann',
    description:
      'Privates Premium Studio für 1:1 Personal Training, Boxen, Krafttraining und Recovery an der Rothenbaumchaussee in Hamburg-Rotherbaum.',
    answerLead:
      'body & mind ist ein privates Premium-Personal-Training-Studio in Hamburg-Rotherbaum (Rothenbaumchaussee 156) für 1:1 Training, Stressabbau und Recovery — diskret, ohne Gruppenkurse.',
  },
  '/flow': {
    title: 'FLOW – Boxen & Kickboxen Personal Training Hamburg | body & mind',
    description:
      'Private Box- und Kickbox-Einheiten in Hamburg als mentales Ventil: Stressabbau, Fokus und Energie im 1:1 Setting ohne Leistungsdruck.',
    answerLead:
      'FLOW ist die Box- und Kickbox-Säule von body & mind: privates 1:1 Training in Hamburg zur Stressreduktion, mentalen Klarheit und Energiefreisetzung.',
  },
  '/form': {
    title: 'FORM – Kraft & Athletik Personal Training Hamburg | body & mind',
    description:
      'Gezieltes Kraft-, Functional- und Athletiktraining in Hamburg: Stärke, Stabilität und Leistungsfähigkeit im privaten 1:1 Coaching.',
    answerLead:
      'FORM ist das Kraft- und Athletiktraining bei body & mind in Hamburg — individuelles 1:1 Coaching für Muskelaufbau, Haltung und funktionelle Leistungsfähigkeit.',
  },
  '/recovery': {
    title: 'RECOVERY – Regeneration & Stressregulation Hamburg | body & mind',
    description:
      'Recovery-Module wie IHHT, Atemtraining und Infrarot im Premium Studio Hamburg zur Regeneration von Körper und Nervensystem.',
    answerLead:
      'RECOVERY bei body & mind ergänzt dein Training mit modularen Regenerations-Anwendungen (u. a. IHHT, Atemtraining, Infrarot) in Hamburg — für Erholung und Nervensystem-Regulation.',
  },
  '/mitgliedschaften': {
    title: 'Mitgliedschaften & Preise Personal Training Hamburg | body & mind',
    description:
      'Transparente Pakete für Premium Personal Training in Hamburg: klare Preise, 1:1 Betreuung, optionale Recovery-Module — ohne versteckte Kosten.',
    answerLead:
      'Die Mitgliedschaften bei body & mind sind transparent strukturierte 1:1 Personal-Training-Pakete in Hamburg mit optionalen Recovery-Ergänzungen — Preise inkl. MwSt.',
  },
  '/ueber-uns': {
    title: 'Über uns – Natalie Zimmermann Personal Training Hamburg | body & mind',
    description:
      'body & mind by Natalie Zimmermann: Premium Personal Training an der Rothenbaumchaussee — persönlich, diskret und ganzheitlich.',
    answerLead:
      'body & mind ist das Premium-Studio von Natalie Zimmermann in Hamburg-Rotherbaum — persönliche 1:1 Betreuung für Training, Recovery und Stressregulation.',
  },
  '/kontakt': {
    title: 'Kontakt & Erstgespräch Hamburg | body & mind by Natalie Zimmermann',
    description:
      'Kontaktiere body & mind in Hamburg-Rotherbaum für ein unverbindliches Erstgespräch. Rothenbaumchaussee 156, 20149 Hamburg.',
    answerLead:
      'Du erreichst body & mind per Kontaktformular oder E-Mail (info@nataliezimmermann.de) für ein Erstgespräch im Studio an der Rothenbaumchaussee 156 in Hamburg.',
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
