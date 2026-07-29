import React from 'react';
import { PillarType } from '../types';
import { Dumbbell, Activity, Scale } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { CtaBanner } from '../components/ui/CtaBanner';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

const FORM_MIDDLE_IMAGE = '/images2/10.jpg';

interface FormPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const FormPage: React.FC<FormPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="page-section-gap page-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="SÄULE 02"
        title="SÄULE 02 FORM – Stärke, Stabilität und Leistungsfähigkeit."
        description="Gezieltes Performance Coaching, funktionelles Krafttraining und Athletiktraining, exakt abgestimmt auf deine persönliche Ausgangslage und deinen Terminplan."
        imageSrc="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop"
        imageAlt="FORM - Kraft & Athletik Training"
        imageLabel="FORM HERO BILD: Kraft & Performance"
        ctaLabel="FORM Erstgespräch vereinbaren"
        onCtaClick={() => onOpenBooking('FORM', 'FORM 1:1 Session')}
      />

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Drei Schwerpunkte</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Das Fundament von FORM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Stärke', desc: 'Funktioneller Muskel- und Kraftaufbau zur dauerhaften Steigerung deines Grundumsatzes und deiner körperlichen Präsenz.', icon: Dumbbell },
              { num: '02', title: 'Stabilität', desc: 'Gezieltes Rumpf- und Gelenktraining für eine aufrechte Haltung und Schmerzfreiheit im Sitz- oder Stehalltag.', icon: Scale },
              { num: '03', title: 'Leistungsfähigkeit', desc: 'Ganzheitliche Athletik zur Verbesserung von Ausdauer, Beweglichkeit und körperlichen Belastungsreserven.', icon: Activity },
            ].map((item) => (
              <div key={item.num} className="p-8 glass-panel space-y-4 hover:border-[#3D6B8C]/30 transition-all">
                <div className="flex items-center justify-between text-[#3D6B8C]">
                  <item.icon className="w-6 h-6" />
                  <span className="font-mono text-xs font-bold">{item.num}</span>
                </div>
                <h3 className="font-display text-xl text-white font-normal uppercase">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              src={FORM_MIDDLE_IMAGE}
              alt="FORM Training – Krafttraining mit Kettlebells im Studio"
              aspectRatio="3/4"
              showBadge={false}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Deine Vorteile mit FORM
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Kraftaufbau & Toning', desc: 'Gezielte Definition der Muskulatur ohne Überlastung.' },
                { title: 'Aufrechte Haltung', desc: 'Effektiver Ausgleich von Bürohaltung und Schulterverspannungen.' },
                { title: 'Gelenkgesundheit', desc: 'Schonendes Training zur Stabilisierung von Knie, Hüfte und Wirbelsäule.' },
                { title: 'Funktionelle Bewegung', desc: 'Bewegungsabläufe, die dir im Alltag direkt zugutekommen.' },
                { title: '1:1 Betreuung', desc: 'Kontinuierliche Korrektur der Ausführung für maximale Sicherheit.' },
                { title: 'Individuelle Steuerung', desc: 'Trainingssteuerung basierend auf deiner tagesaktuellen Verfassung.' },
              ].map((benefit, i) => (
                <div key={i} className="benefit-strip py-3">
                  <h4 className="text-xs font-bold text-white mb-0.5">{benefit.title}</h4>
                  <p className="text-[11px] text-muted">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Bausteine</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Vier Säulen des Kraftcoaching
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Athletic Training', desc: 'Steigert die Schnellkraft, Koordination und Dynamik. Verbindet Kraft mit athletischer Beweglichkeit.' },
              { title: 'Functional Training', desc: 'Nutzt freie Gewichte, Kabelzüge und das eigene Körpergewicht für natürliche, vielgelenkige Übungen.' },
              { title: 'Strength Training', desc: 'Gezielte Hypertrophie und Maximalkraftsteigerung mit progressiver Belastungssteuerung.' },
              { title: 'Mobility Training', desc: 'Gezielte Erweiterung des schmerzfreien Bewegungsausmaßes aller Hauptgelenke.' },
            ].map((m) => (
              <div key={m.title} className="p-6 glass-panel space-y-2 hover:border-[#3D6B8C]/30 transition-all">
                <h3 className="font-display text-lg text-[#3D6B8C] font-normal uppercase">{m.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <CtaBanner
          title="Bereit, stärker zu werden?"
          description="Lass uns im unverbindlichen Erstgespräch deine Ausgangslage und Ziele definieren."
          buttonLabel="Erstgespräch anfragen"
          onClick={() => onOpenBooking('FORM', 'FORM Erstgespräch')}
        />
      </RevealOnScroll>
    </div>
  );
};
