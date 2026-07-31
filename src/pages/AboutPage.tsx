import React from 'react';
import { BRAND_VALUES, STUDIO_INFO } from '../data/studioData';
import { PillarType } from '../types';
import { Clock, Compass, Users, ExternalLink } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

const ABOUT_HERO_IMAGE = '/images/sab8.webp';
const NATALIE_MINDSET_IMAGE = '/team/Natalie.webp';

interface AboutPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="page-section-gap page-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="PHILOSOPHIE & INHABERIN"
        title="ÜBER BODY & MIND – Mehr als Training. Ein persönlicher Weg."
        description="In einer Welt voller Hektik und Anonymität schaffen wir an der Rothenbaumchaussee einen Ort der persönlichen Betreuung, Diskretion und nachhaltigen Transformation."
        imageSrc={ABOUT_HERO_IMAGE}
        imageAlt="Über body & mind – Natalie Zimmermann"
      />

      <RevealOnScroll>
        <GlassPanel brandTrioTop className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-brand-plum/20">
          <div className="lg:col-span-5 space-y-3">
            <ImagePlaceholder
              src={NATALIE_MINDSET_IMAGE}
              alt="Natalie Zimmermann – Gründerin von body & mind"
              aspectRatio="3/4"
              objectFit="cover"
              showBadge={false}
            />
            <p className="text-xs font-semibold uppercase tracking-wider text-accent text-center">
              Natalie Zimmermann · Gründerin
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <SectionLabel>Unser Mindset & Gründerin</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Privates Studio-Setting statt Massenfitness
            </h2>
            <p className="text-sm text-muted leading-relaxed font-light">
              Massenstudios setzen auf Anonymität und ständige Wechsel. Bei body & mind betrittst du ein ruhiges, intimes Refugium. Hier gibt es keine Ablenkung, keine Zuschauer und keine Warteschlangen an Geräten.
            </p>
            <blockquote className="border-l-2 border-brand-red/50 pl-5 sm:pl-6 space-y-3">
              <p className="text-sm text-muted leading-relaxed font-light italic">
                &ldquo;Mit body & mind habe ich den Ort geschaffen, den ich mir selbst immer gewünscht habe: Ein Refugium der Ruhe, Qualität und maßgeschneiderten Begleitung mitten in Hamburg Rothenbaum.&rdquo;
              </p>
              <footer className="font-display text-sm text-brand-plum uppercase tracking-wider not-italic">
                – Natalie Zimmermann
              </footer>
            </blockquote>
            <a
              href={STUDIO_INFO.nataliePersonalSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Philosophie & mehr auf bodyandmindbynatalie.de</span>
            </a>
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Für wen wir da sind</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Maßgeschneidert für deinen Lebensstil
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#222222] border border-[#222222]">
            {[
              { title: 'Zeiteffizient', desc: 'Maximale Wirkung in minimaler Zeit. Perfekt strukturiert für vielbeschäftigte Terminkalender und Führungskräfte.', icon: Clock },
              { title: 'Ganzheitlich', desc: 'Gezielte Symbiose aus Kraft, Bewegung, mentalem Stressabbau und physiologischer Recovery.', icon: Compass },
              { title: 'Persönlich', desc: 'Enge Betreuung, tiefes Vertrauen und lückenlose Anpassung an deine Tagesform.', icon: Users },
            ].map((item) => (
              <div key={item.title} className="flex-1 p-6 sm:p-8 space-y-3">
                <item.icon className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg text-white font-normal uppercase">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Unsere Werte</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Woran wir uns messen lassen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {BRAND_VALUES.map((val, i) => (
              <div key={i} className="p-8 glass-panel space-y-3 hover:border-accent/30 transition-all">
                <div className="text-xs font-mono font-bold text-accent">0{i + 1}</div>
                <h3 className="font-display text-xl text-white font-normal uppercase">{val.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel accent brandTrioTop className="p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-4">
            <SectionLabel>Gründerin & Vision</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Natalie Zimmermann
            </h2>
            <p className="text-sm text-muted leading-relaxed font-light">
              &ldquo;Mit body & mind habe ich den Ort geschaffen, den ich mir selbst immer gewünscht habe: Ein Refugium der Ruhe, Qualität und maßgeschneiderten Begleitung mitten in Hamburg Rothenbaum. Ich freue mich darauf, dich persönlich kennenzulernen.&rdquo;
            </p>
          </div>
          <PrimaryButton onClick={() => onOpenBooking('GENERAL')} showArrow>
            Erstgespräch vereinbaren
          </PrimaryButton>
        </GlassPanel>
      </RevealOnScroll>
    </div>
  );
};
