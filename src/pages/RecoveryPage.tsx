import React from 'react';
import { PillarType } from '../types';
import { RECOVERY_MODULES, STUDIO_INFO } from '../data/studioData';
import { Sparkles, Check, Info } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';

interface RecoveryPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const RecoveryPage: React.FC<RecoveryPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="page-section-gap page-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="SÄULE 03"
        title="SÄULE 03 RECOVERY – Regeneration für Körper und Nervensystem."
        description="Wissenschaftlich fundierte Recovery-Anwendungen zur Förderung der tiefen Gewebsregeneration, Stressregulation und Erholung deines vegetativen Nervensystems."
        imageSrc="/images/recovery3.webp"
        imageAlt="Säule 03 RECOVERY - Lounge Suite Hamburg"
        imageLabel="RECOVERY HERO BILD: Lounge Suite Rothenbaum"
        ctaLabel="Recovery Erstgespräch vereinbaren"
        onCtaClick={() => onOpenBooking('RECOVERY', 'Recovery Session')}
      />

      <RevealOnScroll>
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Unser Modul-Angebot</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Gezielte Recovery-Anwendungen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RECOVERY_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-8 glass-panel hover:border-[#3D6B8C]/30 transition-all space-y-6 relative overflow-hidden flex flex-col justify-between"
              >
                {mod.isNew && (
                  <div className="absolute top-4 right-4 bg-[#3D6B8C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> NEU
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-white font-normal uppercase">{mod.title}</h3>
                  <div className="text-xs font-semibold text-[#3D6B8C]">{mod.tagline}</div>
                  <p className="text-xs text-muted leading-relaxed">{mod.description}</p>

                  <div className="pt-3 space-y-1.5">
                    {mod.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted">
                        <Check className="w-3.5 h-3.5 text-[#3D6B8C] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenBooking('RECOVERY', mod.title)}
                    className="w-full bg-[#0F0F0F] border border-[#222222] hover:bg-[#3D6B8C] text-gray-200 hover:text-white py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-[0.98]"
                  >
                    Anwendung Buchen / Anfragen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel className="p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Ablauf</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              In 3 Schritten zu deiner optimalen Regeneration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 'SCHRITT 01', title: 'Basis wählen', desc: 'Starte mit deiner präferierten 1:1 Trainingseinheit (FLOW oder FORM).' },
              { step: 'SCHRITT 02', title: 'Recovery dazu', desc: 'Ergänze dein Training mit modularen Recovery-Anwendungen (+70 € / Session).' },
              { step: 'SCHRITT 03', title: 'Erholt durchstarten', desc: 'Verlasse das Studio voller Energie, mit freiem Kopf und entspanntem Körper.' },
            ].map((s, i) => (
              <div key={i} className="timeline-step p-6 bg-[#0F0F0F]/80 border border-[#222222] space-y-3">
                <div className="font-mono text-xs font-bold text-[#3D6B8C]">{s.step}</div>
                <h3 className="font-display text-lg text-white font-normal uppercase">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#3D6B8C]">
            <Info className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Gesamtes Recovery-Portfolio im Studio
            </h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Unser Studio ist mit moderner Technologie ausgestattet: IHHT-Höhentraining, Atemtraining, Mentales Coaching, Nervensystem-Regulation, Vieva Body-Scans zur Vitalstoffanalyse, pneumatische Beinkompression, individuelle Supplementierungsempfehlungen und Infrarot-Recovery mit Massagesessel-Integration.
          </p>
        </GlassPanel>
      </RevealOnScroll>

      <div className="p-4 glass-panel text-xs text-muted leading-relaxed italic">
        Hinweis: {STUDIO_INFO.hwgRecoveryDisclaimer}
      </div>
    </div>
  );
};
