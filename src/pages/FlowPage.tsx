import React from 'react';
import { PillarType } from '../types';
import { Flame, Target, Zap } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { CtaBanner } from '../components/ui/CtaBanner';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';

interface FlowPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const FlowPage: React.FC<FlowPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="space-y-28 pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="SÄULE 01"
        title="SÄULE 01 FLOW – Bewegung als mentales Ventil."
        description="Boxen und Kickboxen im privaten 1:1 Setting als kraftvolles Werkzeug für Fokus, Energiefreisetzung und nachhaltigen Stressabbau – ohne Leistungsdruck oder Ringkämpfe."
        imageSrc="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop"
        imageAlt="FLOW - Boxen & Pratzentraining Hamburg"
        imageLabel="FLOW HERO BILD: Boxen & Pratzentraining"
        ctaLabel="FLOW Erstgespräch vereinbaren"
        onCtaClick={() => onOpenBooking('FLOW', 'FLOW 1:1 Session')}
      />

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Die Wirkungsweise</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Drei Säulen des FLOW-Prinzips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Stress abbauen', desc: 'Gezielte Schläge gegen Pratzen lassen angestauten Alltagsdruck und mentale Belastung augenblicklich weichen.', icon: Flame },
              { num: '02', title: 'Energie freisetzen', desc: 'Dynamische Bewegungsabläufe kurbeln das Herz-Kreislauf-System an und bringen frische Vitalität in deinen Körper.', icon: Zap },
              { num: '03', title: 'Fokus & Präsenz', desc: 'Kombinationen erfordern 100% Aufmerksamkeit im Hier und Jetzt. Gedanken an Arbeit verschwinden augenblicklich.', icon: Target },
            ].map((item) => (
              <div key={item.num} className="p-8 glass-panel space-y-4 hover:border-[#8E7B62]/30 transition-all">
                <div className="flex items-center justify-between text-[#8E7B62]">
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
        <GlassPanel className="p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Was FLOW bei dir bewirkt
            </h2>
            <p className="text-xs text-muted">Im geschützten Rahmen unseres Studios an der Rothenbaumchaussee.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Effektiver Stressabbau', desc: 'Ventil für mentale Anspannung nach langen Arbeitstagen.' },
              { title: 'Mentale Klarheit', desc: 'Schärft den Fokus und bringt nachhaltige Ruhe in den Geist.' },
              { title: 'Gesteigerte Resilienz', desc: 'Erhöht die Widerstandskraft gegen tägliche Stressfaktoren.' },
              { title: 'Innere Zuversicht', desc: 'Stärkt die Wahrnehmung der eigenen physischen Präsenz.' },
              { title: 'Koordination & Reaktivität', desc: 'Fördert das Zusammenspiel von Auge, Hand und Körperhaltung.' },
              { title: 'Geschützter Rahmen', desc: 'Keine Zuschauer, keine Vergleiche, absolute Vertraulichkeit.' },
            ].map((benefit, i) => (
              <div key={i} className="benefit-strip py-3">
                <h4 className="text-xs font-bold text-white mb-0.5">{benefit.title}</h4>
                <p className="text-[11px] text-muted">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Unsere Methoden</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Präzision & Bewegung
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Boxing (Klassisches Boxen)',
                desc: 'Fokus auf saubere Schlagtechnik, Beinarbeit und Distanzgefühl. Durch die gezielte Arbeit an Pratzen lernst du, deine Kraft genau auf den Punkt zu bringen und gleichzeitig deinen Kopf vollständig frei zu machen.',
                items: ['Pratzentraining mit persönlichem Coach', 'Verbesserung der Körperstabilität', 'Schlagkombinationen zur mentalen Schärfung'],
              },
              {
                title: 'Kickboxing (Dynamischer Ganzkörper)',
                desc: 'Erweitert das klassische Boxen um dynamische Kicks. Bindet Rumpf, Hüfte und Beine intensiv ein und sorgt für ein hochwirksames Ganzkörpertraining mit maximalem Kalorienumsatz und Bewegungsvielfalt.',
                items: ['Ganzheitliche Aktivierung der großen Muskelgruppen', 'Förderung der Flexibilität & Hüftmobilität', 'Abwechslungsreicher Bewegungsfluss'],
              },
            ].map((method) => (
              <div key={method.title} className="p-8 glass-panel space-y-4 hover:border-[#8E7B62]/30 transition-all">
                <h3 className="font-display text-2xl text-white font-normal uppercase">{method.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{method.desc}</p>
                <ul className="text-xs text-muted space-y-1.5 pt-2">
                  {method.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <CtaBanner
          title="Bereit, Druck rauszulassen?"
          description="Vereinbare jetzt dein persönliches Erstgespräch im Studio Rothenbaumchaussee."
          buttonLabel="Erstgespräch anfragen"
          onClick={() => onOpenBooking('FLOW', 'FLOW Erstgespräch')}
        />
      </RevealOnScroll>
    </div>
  );
};
