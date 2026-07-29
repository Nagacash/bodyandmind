import React from 'react';
import { PillarType } from '../types';
import { SUMMER_SPECIAL, TESTIMONIALS } from '../data/studioData';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HomeHero } from '../components/HomeHero';
import { PillarsSection } from '../components/PillarsSection';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { SectionLabel } from '../components/ui/SectionLabel';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';

const FOUNDER_IMAGE = '/images/sab2.webp';

interface HomePageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  return (
    <div className="font-body">
      <HomeHero onOpenBooking={() => onOpenBooking('GENERAL')} />

      <div className="space-y-28 sm:space-y-32 pb-20">
        {/* Intro Section */}
        <RevealOnScroll>
          <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <SectionLabel>Privates Studio Coaching</SectionLabel>
            <h2 className="font-display text-2xl sm:text-4xl text-white font-normal uppercase leading-tight max-w-[65ch]">
              Ein privater Raum für Menschen, die mehr wollen – mehr Stärke, mehr Energie, mehr Balance.
            </h2>
            <p className="text-base text-muted font-body leading-relaxed max-w-[65ch]">
              Kein Massenstudio. Keine Anonymität. Nur du, dein Ziel und ein Team, das dich wirklich kennt.
            </p>
          </section>
        </RevealOnScroll>

        {/* Summer Special */}
        <RevealOnScroll>
          <section className="max-w-6xl mx-auto px-4 sm:px-6">
            <GlassPanel accent className="relative p-8 sm:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#8E7B62] text-[#0F0F0F] text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{SUMMER_SPECIAL.badge}</span>
              </div>

              <div className="max-w-3xl space-y-6">
                <div className="space-y-2">
                  <SectionLabel>Neukunden-Aktion ({SUMMER_SPECIAL.period})</SectionLabel>
                  <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
                    {SUMMER_SPECIAL.title}
                  </h2>
                  <p className="text-sm text-muted">
                    Sichere dir zum Sommerstart unser exklusives Kennenlern-Paket im geschützten Setting an der Rothenbaumchaussee.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {SUMMER_SPECIAL.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-6 bg-[#0F0F0F]/80 border border-[#222222] hover:border-[#8E7B62] transition-all space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <h3 className="font-display text-lg text-white font-normal uppercase">
                          {opt.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl font-bold text-[#8E7B62] tabular-nums">
                            {opt.price} €
                          </span>
                          {opt.originalPrice && (
                            <span className="text-sm text-[#666] line-through tabular-nums">
                              {opt.originalPrice} €
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted leading-relaxed">{opt.description}</p>
                      </div>
                      <button
                        onClick={() => onOpenBooking(opt.id as PillarType, opt.name)}
                        className="w-full bg-[#1A1A1A] hover:bg-[#8E7B62] text-white hover:text-[#0F0F0F] py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-[#222222] active:scale-[0.98]"
                      >
                        <span>Sommer-Aktion anfragen</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </section>
        </RevealOnScroll>

        {/* 3 Pillars */}
        <PillarsSection />

        {/* About Teaser */}
        <RevealOnScroll>
          <section className="max-w-6xl mx-auto px-4 sm:px-6">
            <GlassPanel className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 items-center gap-8">
              <div className="md:col-span-5">
                <ImagePlaceholder
                  src={FOUNDER_IMAGE}
                  alt="Natalie Zimmermann - Founder & Personal Trainer"
                  aspectRatio="4/3"
                  showBadge={false}
                />
              </div>

              <div className="md:col-span-7 space-y-6">
                <div className="space-y-3">
                  <SectionLabel>Gründerin & Head Coach</SectionLabel>
                  <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
                    Mehr als Training. Ein persönlicher Weg.
                  </h2>
                  <p className="text-sm text-muted leading-relaxed font-body">
                    Wir begleiten Führungskräfte und anspruchsvolle Persönlichkeiten mit absoluter Hingabe. Bei uns steht deine individuelle Belastungsfähigkeit und Regeneration im Vordergrund.
                  </p>
                </div>

                <PrimaryButton href="/ueber-uns">MEHR ÜBER UNS</PrimaryButton>
              </div>
            </GlassPanel>
          </section>
        </RevealOnScroll>

        {/* Testimonials */}
        <RevealOnScroll>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl space-y-2">
              <SectionLabel>Stimmen unserer Klienten</SectionLabel>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
                Echte Erfahrungen im geschützten Raum
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 glass-panel space-y-4 flex flex-col justify-between hover:border-[#8E7B62]/30 transition-all"
                >
                  <p className="text-xs sm:text-sm text-muted italic leading-relaxed font-body">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/10 space-y-0.5">
                    <div className="text-xs font-bold text-white uppercase">{item.author}</div>
                    <div className="text-[11px] text-[#8E7B62]">{item.role}</div>
                    <div className="text-[10px] text-muted">{item.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* CTA Banner */}
        <RevealOnScroll>
          <section className="max-w-5xl mx-auto px-4 sm:px-6">
            <GlassPanel accent className="p-10 sm:p-14 text-center space-y-8">
              <div className="space-y-3 max-w-2xl mx-auto">
                <h2 className="font-display text-3xl sm:text-4xl text-white font-normal uppercase">
                  Lernen wir uns kennen.
                </h2>
                <p className="text-sm text-muted font-body leading-relaxed">
                  Dein erstes Gespräch ist kostenlos, unverbindlich und in Ruhe an der Rothenbaumchaussee in Hamburg.
                </p>
              </div>

              <PrimaryButton
                onClick={() => onOpenBooking('GENERAL')}
                id="home-cta-banner-button"
                showArrow
              >
                ERSTGESPRÄCH VEREINBAREN
              </PrimaryButton>
            </GlassPanel>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
};
