import { NavItem, PricingCard, RecoveryModule, Testimonial } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'flow', label: 'FLOW', path: '/flow' },
  { id: 'form', label: 'FORM', path: '/form' },
  { id: 'recovery', label: 'Recovery', path: '/recovery' },
  { id: 'pricing', label: 'Mitgliedschaften', path: '/mitgliedschaften' },
  { id: 'about', label: 'Über uns', path: '/ueber-uns' },
  { id: 'team', label: 'Team', path: '/team' },
  { id: 'contact', label: 'Kontakt', path: '/kontakt' },
];

export const STUDIO_INFO = {
  brandName: 'body & mind by Natalie Zimmermann',
  tagline: 'Premium Privattraining: Boxen, Kickboxen, Kraft & Recovery in Hamburg',
  locationName: 'Rothenbaumchaussee 156',
  cityPostal: '20149 Hamburg',
  district: 'Rotherbaum',
  email: 'info@nataliezimmermann.de',
  domain: 'bodyandmindbynatalie.de',
  copyright: '© 2026 body & mind Rothenbaumchaussee 156 - 20149 Hamburg',
  pAngvTaxNote: 'Alle Preise verstehen sich inkl. gesetzlicher Mehrwertsteuer.',
  hwgRecoveryDisclaimer:
    'Recovery-Anwendungen (IHHT, Atemtraining, Nervensystem-Regulation u. a.) dienen der Regeneration und dem Wohlbefinden und stellen keine medizinische Heilbehandlung dar. Sie ersetzen keine ärztliche Diagnose oder Therapie.',
};

export const SUMMER_SPECIAL = {
  title: 'Summer Special (Neukunden-Aktion)',
  period: '09.07. – 19.08.2026',
  badge: 'Exklusives Sommerangebot',
  options: [
    {
      id: 'SUMMER_SPECIAL_A',
      name: 'Option A: 3x Personal Training (FLOW / FORM)',
      price: 333,
      originalPrice: 390,
      description: '3 individuelle 1:1 Personal Training Einheiten nach Wahl (Boxing/Kickboxing oder Stärke/Athletik).',
      savings: 'Du sparst 57 €',
    },
    {
      id: 'SUMMER_SPECIAL_B',
      name: 'Option B: 3x PT + 3x Recovery',
      price: 500,
      originalPrice: null,
      description: '3x Personal Training kombiniert mit 3x gezielten Recovery-Modulen (z.B. IHHT, Infrarot oder Atemtraining).',
      savings: 'Maximale Synergie aus Training & Erholung',
    },
  ],
};

export const PRICING_CARDS: PricingCard[] = [
  {
    id: 'flow-essential',
    pillar: 'FLOW',
    tier: 'Essential',
    rhythm: '4 Wochen (1x / Woche)',
    pricePerSession: 130,
    totalSessions: 4,
    totalPrice: 520,
    details: '4 Sessions gesamt = 520 €',
    features: [
      '1x wöchentlich 1:1 FLOW Session',
      'Box- & Kickbox-Technik als mentales Ventil',
      'Fokus & Stressabbau im geschützten Raum',
      'Persönlicher Fortschritts-Check',
    ],
  },
  {
    id: 'flow-professional',
    pillar: 'FLOW',
    tier: 'Professional',
    isPopular: true,
    rhythm: '8 Wochen (2x / Woche)',
    pricePerSession: 120,
    totalSessions: 16,
    totalPrice: 1920,
    details: '16 Sessions gesamt = 1.920 €',
    features: [
      '2x wöchentlich intensive 1:1 FLOW Einheiten',
      'Nachhaltiger Stressabbau & mentale Klarheit',
      'Intensives Technik- & Ausdauertraining',
      'Optimierte Frequenz für spürbare Resilienz',
      'Flexibles Umterminieren inklusive',
    ],
  },
  {
    id: 'form-essential',
    pillar: 'FORM',
    tier: 'Essential',
    rhythm: '4 Wochen (1x / Woche)',
    pricePerSession: 140,
    totalSessions: 4,
    totalPrice: 560,
    details: '4 Sessions gesamt = 560 € (inkl. individueller Trainingsplanung)',
    features: [
      '1x wöchentlich 1:1 FORM Session',
      'Inklusive maßgeschneiderter Trainingsplanung',
      'Haltungskorrektur & funktioneller Kraftaufbau',
      'Anpassung an deinen körperlichen Ist-Zustand',
    ],
  },
  {
    id: 'form-professional',
    pillar: 'FORM',
    tier: 'Professional',
    isPopular: true,
    rhythm: '8 Wochen (2x / Woche)',
    pricePerSession: 130,
    totalSessions: 16,
    totalPrice: 2080,
    details: '16 Sessions gesamt = 2.080 € (inkl. individueller Trainingsplanung)',
    features: [
      '2x wöchentlich gezieltes 1:1 FORM Coaching',
      'Ganzheitliches Athletik- & Stabilitätstraining',
      'Detaillierte Bewegungsanalyse & Fortschrittssteuerung',
      'Schonendes Gelenk- & Mobilitätstraining',
      'Priorisierte Terminvergabe',
    ],
  },
];

export const RECOVERY_MODULES: RecoveryModule[] = [
  {
    id: 'compression',
    title: 'Recovery & Compression',
    tagline: 'Gezielte Entlastung für müde Muskeln',
    description: 'Pneumatische Beinkompression fördert die Durchblutung und beschleunigt den Abtransport von Stoffwechselzwischenprodukten. Perfekt nach intensiven Einheiten.',
    benefits: ['Entspannung der Beine', 'Förderung der Regeneration', 'Spürbare Leichtigkeit'],
  },
  {
    id: 'ihht',
    title: 'IHHT-Höhentraining',
    tagline: 'Regeneration für Energie & Wohlbefinden',
    description: 'Intervall-Hypoxie-Hyperoxie-Training nutzt kontrollierten Wechsel von Sauerstoffgehalten zur Unterstützung der natürlichen Selbsterneuerungsprozesse deines Körpers.',
    benefits: ['Unterstützt die Regeneration', 'Fördert tiefes Wohlbefinden', 'Sanfte Tiefenentspannung'],
  },
  {
    id: 'breath',
    title: 'Atem & Entspannung',
    tagline: 'Nervensystem-Regulation & mentale Balance',
    description: 'Gezieltes Atemtraining reguliert das vegetative Nervensystem, senkt das Stresslevel und bringt deinen Geist in einen klaren, ruhigen Fokus.',
    benefits: ['Senkung des Sympathikus-Tonus', 'Innere Ruhe auf Knopfdruck', 'Verbesserter Schlaf'],
  },
  {
    id: 'infrared',
    title: 'Infrarot-Recovery',
    tagline: 'Tiefenwärme & ergonomische Regeneration',
    description: 'Verbindung von wohltuendem Infrarot-Rotlicht mit integrierter Massagesessel-Behandlung zur Lösung tief sitzender Muskelverspannungen.',
    benefits: ['Tiefenwärme für Gelenke & Muskeln', 'Entlastung der Wirbelsäule', 'Sanfter Stressabbau'],
    isNew: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Die Diskretion und Qualität im Studio Rothenbaumchaussee sind einzigartig in Hamburg. FLOW ist für mich der effektivste Weg, nach einem vollen Arbeitstag den Kopf frei zu bekommen.',
    author: 'M. S.',
    role: 'Managing Partner & Unternehmer',
    location: 'Hamburg Rothenbaum',
  },
  {
    quote: 'Kein Vergleichen, kein Lärm, sondern echte 1:1 Betreuung. Durch die Kombination aus FORM und Recovery habe ich meine Rückenschmerzen gelöst und fühle mich deutlich energiegeladener.',
    author: 'Dr. C. W.',
    role: 'Fachärztin & Gründerin',
    location: 'Hamburg',
  },
  {
    quote: 'Natalie und ihr Team arbeiten extrem professionell. Die Verbindung aus effektivem Boxing und anschließender IHHT-Recovery ist mein wöchentliches Anker-Ritual.',
    author: 'T. H.',
    role: 'Vorstand & Investor',
    location: 'Hamburg Alster',
  },
];

export const CORE_PILLARS = [
  {
    id: 'flow',
    number: '01',
    name: 'FLOW',
    tagline: 'Bewegung als mentales Ventil',
    summary: 'Boxen und Kickboxen für Fokus, Energiefreisetzung und nachhaltigen Stressabbau im privaten Setting.',
    linkText: 'Mehr zu FLOW',
  },
  {
    id: 'form',
    number: '02',
    name: 'FORM',
    tagline: 'Stärke, Stabilität und Leistung',
    summary: 'Individuelles Performance-Coaching, Athletiktraining und Haltungskorrektur abgestimmt auf deine Ausgangslage.',
    linkText: 'Mehr zu FORM',
  },
  {
    id: 'recovery',
    number: '03',
    name: 'RECOVERY',
    tagline: 'Regeneration für Körper & Geist',
    summary: 'Wissenschaftlich fundierte Recovery-Module (IHHT, Atemtraining, Beinkompression & Infrarot) für tiefes Wohlbefinden.',
    linkText: 'Mehr zu Recovery',
  },
];

export const BRAND_VALUES = [
  {
    title: 'Vertrauen',
    desc: 'Ehrlichkeit, absolute Transparenz bei Preisen und Abläufen sowie ein fundierter, ehrlicher Coaching-Ansatz.',
  },
  {
    title: 'Geborgenheit',
    desc: 'Ein geschützter, intimer Raum ohne Zuschauer oder störende Blicke – dein persönliches Refugium.',
  },
  {
    title: 'Ruhe',
    desc: 'Ein bewusster Gegenpol zum hektischen Alltag. Hier stehst du mit deiner Regeneration im Mittelpunkt.',
  },
  {
    title: 'Premium',
    desc: 'Höchster Qualitätsanspruch in jedem Detail: von der Ausstattung bis zur maßgeschneiderten Betreuung.',
  },
];
