export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'natalie',
    name: 'Natalie Zimmermann',
    role: 'Gründerin · Box-Weltmeisterin · Speakerin · Mental Coach',
    bio: 'Box-Weltmeisterin, Speakerin und Mental Coach. Zudem Influencerin, Profiboxerin, Personal Trainerin und Physiotherapeutin. Spezialisiert auf manuelle Therapie und Betreuung von Elite-Athleten. Faszien-Expertin und Lu-Jong-Yoga-Instruktorin. Mentalcoach mit Schwerpunkt Wingwave. Leidenschaftliche Kampfkünstlerin seit 22 Jahren.',
    imageSrc: '/team/Natalie.webp',
  },
  {
    id: 'jerry',
    name: 'Jerry',
    role: 'Personal Trainer · Box- & Kickbox-Coach',
    bio: 'Bachelor of Arts in Fitnesökonomie. Zertifizierter Trainer (B- und A-Lizenz), Ernährungsberater und Athletiktrainer (B-Lizenz). Bietet EMS-Training an. Ehemaliger semi-professioneller Fußballspieler, heute Fußballtrainer sowie Box- und Kickbox-Coach.',
    imageSrc: '/team/Jerry.webp',
  },
  {
    id: 'juri',
    name: 'Juri',
    role: 'Personal Trainer · Ernährungswissenschaft',
    bio: 'Ernährungswissenschaftler (B.Sc.), M.Sc. in Ernährung und Sport. Dozent an der Macromedia University. Über zehn Jahre Erfahrung als Personal Trainer mit zusätzlicher Qualifikation als Functional Trainer. Sportlicher Hintergrund in Karate, Fußball, Kunstturnen, Kickboxen, Boxen, Muay Thai, Grappling, BJJ und MMA.',
    imageSrc: '/team/Juri.webp',
  },
  {
    id: 'erhan',
    name: 'Erhan',
    role: 'Personal Trainer',
    bio: 'Erhan ergänzt das Team mit fundiertem 1:1-Coaching im privaten Studio-Setting. Schwerpunkt auf technisch sauberem Training, individueller Betreuung und nachhaltiger Progression — abgestimmt auf deine Ziele in FLOW, FORM und Recovery.',
    imageSrc: '/team/Erhan.webp',
  },
];
