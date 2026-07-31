import React, { useState } from 'react';
import { PRICING_CARDS, STUDIO_INFO } from '../data/studioData';
import { PillarType } from '../types';
import { Check, Sparkles, ArrowRight, Calculator, PlusCircle } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { FaqStructuredData } from '../components/PageMeta';
import { getRouteSeo } from '../lib/seo';

const PRICING_HERO_IMAGE = '/images/beach1.webp';

const PRICING_FAQ = [
  {
    question: 'Was kostet Personal Training bei body & mind in Hamburg?',
    answer:
      'Die Pakete starten ab 520 € für 4 FLOW-Sessions (Essential) bzw. 560 € für 4 FORM-Sessions. Professional-Pakete mit 2x wöchentlichem Training liegen bei 1.920 € (FLOW) bzw. 2.240 € (FORM) für 8 Wochen. Alle Preise inkl. MwSt.',
  },
  {
    question: 'Gibt es Gruppenkurse oder nur 1:1 Training?',
    answer:
      'body & mind bietet ausschließlich privates 1:1 Personal Training im Studio an der Rothenbaumchaussee 156 in Hamburg-Rotherbaum — diskret und ohne Gruppenkurse.',
  },
  {
    question: 'Kann ich Recovery-Sessions zu meinem Paket hinzufügen?',
    answer:
      'Ja. Recovery-Module (z. B. IHHT, Atemtraining, Infrarot) können modular für 70 € pro zusätzlicher Session ergänzt werden.',
  },
  {
    question: 'Wo befindet sich das Studio?',
    answer:
      'Das Studio liegt an der Rothenbaumchaussee 156, 20149 Hamburg (Stadtteil Rotherbaum) mit guter ÖPNV- und PKW-Anbindung.',
  },
];

interface PricingPageProps {
  onOpenBooking: (pillar?: PillarType, optionName?: string, customSummary?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
  const { answerLead } = getRouteSeo('/mitgliedschaften');
  const [selectedPillar, setSelectedPillar] = useState<'FLOW' | 'FORM'>('FLOW');
  const [selectedTier, setSelectedTier] = useState<'Essential' | 'Professional'>('Professional');
  const [addRecoverySessions, setAddRecoverySessions] = useState<number>(0);
  const [includeNutrition, setIncludeNutrition] = useState<boolean>(false);

  const baseCard = PRICING_CARDS.find(
    (c) => c.pillar === selectedPillar && c.tier === selectedTier
  ) || PRICING_CARDS[0];

  const recoveryCost = addRecoverySessions * 70;
  const nutritionCost = includeNutrition ? 80 : 0;
  const calculatedTotal = baseCard.totalPrice + recoveryCost + nutritionCost;

  const customSummaryText = `${baseCard.pillar} ${baseCard.tier} (${baseCard.rhythm}) + ${addRecoverySessions}x Recovery + ${includeNutrition ? 'Ernährungsplan' : 'Kein Ernährungsplan'} = Gesamt: ${calculatedTotal} €`;

  return (
    <div className="page-section-gap page-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <div className="space-y-4">
        <PageHero
          badge="MITGLIEDSCHAFTEN & PAKETE"
          title="Transparente Konditionen für höchste Qualität."
          description={answerLead ?? 'Klar strukturierte Pakete ohne versteckte Kosten. Qualität, Diskretion und kontinuierliche Begleitung in jeder Session.'}
          imageSrc={PRICING_HERO_IMAGE}
          imageAlt="Mitgliedschaften – Premium Personal Training Hamburg"
        />
        <p className="text-xs text-accent font-medium px-4 sm:px-0">{STUDIO_INFO.pAngvTaxNote}</p>
      </div>

      <RevealOnScroll>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_CARDS.map((card) => (
            <div
              key={card.id}
              className={`rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between relative transition-all duration-300 ${
                card.isPopular
                  ? 'glass-panel border-2 border-accent shadow-[0_20px_40px_-15px_rgba(61,107,140,0.12)]'
                  : 'glass-panel hover:border-white/20'
              }`}
            >
              {card.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> BELIEBT
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-accent">
                    {card.pillar} • {card.tier}
                  </div>
                  <h3 className="font-display text-xl font-normal text-white uppercase">
                    {card.pillar} {card.tier}
                  </h3>
                  <div className="text-xs text-muted font-medium">{card.rhythm}</div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-normal text-white tabular-nums">
                      {card.pricePerSession} €
                    </span>
                    <span className="text-xs text-muted">/ Session</span>
                  </div>
                  <div className="text-xs font-semibold text-accent mt-1">{card.details}</div>
                </div>

                <ul className="space-y-2.5 pt-2 text-xs text-muted">
                  {card.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() =>
                    onOpenBooking(
                      card.pillar as PillarType,
                      `${card.pillar} ${card.tier}`,
                      `${card.pillar} ${card.tier} (${card.details})`
                    )
                  }
                  className={`w-full py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-[0.98] ${
                    card.isPopular
                      ? 'bg-accent hover:bg-accent-hover text-white'
                      : 'bg-[#0F0F0F] border border-[#222222] hover:bg-accent text-white hover:text-white'
                  }`}
                >
                  Paket anfragen
                </button>
              </div>
            </div>
          ))}
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel className="p-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Flexible Modul-Erweiterungen</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              Erweitere dein Paket individuell
            </h2>
          </div>

          <div className="divide-y divide-[#222222]">
            {[
              { title: '+ Frequency Boost', desc: 'Füge deinem Paket wöchentlich 1 zusätzliche Session hinzu für schnelleren Fortschritt bei reduziertem Session-Tarif.' },
              { title: 'Recovery Upgrade', desc: 'Ergänze modulare Recovery-Anwendungen (IHHT, Atemtraining, Infrarot) für +70 € pro zusätzlicher Session.' },
              { title: 'Ernährungsplan Add-on', desc: 'Optionaler maßgeschneiderter Ernährungsplan zur Unterstützung deiner körperlichen Transformation für 80 € pro Paket-Laufzeit.' },
            ].map((addon) => (
              <div key={addon.title} className="py-6 first:pt-0 last:pb-0 flex items-start gap-4">
                <PlusCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-base font-normal text-white uppercase mb-1">{addon.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <GlassPanel accent brandTrioTop className="p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Interaktiver Paket-Kalkulator
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
                Stelle dein persönliches Paket zusammen
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  1. Säule wählen
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['FLOW', 'FORM'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPillar(p)}
                      className={`min-h-[44px] py-3 px-4 rounded-none text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                        selectedPillar === p
                          ? 'bg-accent text-white'
                          : 'bg-[#0F0F0F] border border-[#222222] text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  2. Frequenz / Laufzeit wählen
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Essential', 'Professional'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTier(t)}
                      className={`min-h-[44px] py-3 px-4 rounded-none text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                        selectedTier === t
                          ? 'bg-accent text-white'
                          : 'bg-[#0F0F0F] border border-[#222222] text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold uppercase tracking-wider text-gray-300">
                    3. Recovery-Sessions (+70 € / Session)
                  </label>
                  <span className="font-mono text-accent font-bold tabular-nums">
                    {addRecoverySessions} Sessions (+{recoveryCost} €)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {[0, 2, 4, 8].map((count) => (
                    <button
                      key={count}
                      onClick={() => setAddRecoverySessions(count)}
                      className={`flex-1 py-2 rounded-none text-xs font-medium border transition-all cursor-pointer active:scale-[0.98] ${
                        addRecoverySessions === count
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-[#0F0F0F] border-[#222222] text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {count === 0 ? 'Keine' : `${count}x`}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 p-3.5 bg-[#0F0F0F] border border-[#222222] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNutrition}
                  onChange={(e) => setIncludeNutrition(e.target.checked)}
                  className="rounded-none border-[#222222] bg-[#151515] text-accent"
                />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Maßgeschneiderter Ernährungsplan (+80 €)</span>
                  <span className="text-muted">Optimiert für Fettabbau, Muskelaufbau oder hormonelle Balance.</span>
                </div>
              </label>
            </div>

            <div className="lg:col-span-5 p-6 glass-panel space-y-6">
              <h3 className="font-display text-xl font-normal text-white uppercase border-b border-white/10 pb-3">
                Deine Paketzusammenstellung
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Basis: {baseCard.pillar} {baseCard.tier}</span>
                  <span className="font-mono font-semibold text-white tabular-nums">{baseCard.totalPrice} €</span>
                </div>
                {addRecoverySessions > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>{addRecoverySessions}x Recovery (+70 €)</span>
                    <span className="font-mono font-semibold text-white tabular-nums">+{recoveryCost} €</span>
                  </div>
                )}
                {includeNutrition && (
                  <div className="flex justify-between text-muted">
                    <span>Ernährungsplan Add-on</span>
                    <span className="font-mono font-semibold text-white tabular-nums">+80 €</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <div className="text-xs text-muted uppercase tracking-widest">Gesamtpreis:</div>
                <div className="font-display text-4xl font-normal text-accent tabular-nums">
                  {calculatedTotal} €
                </div>
                <div className="text-[11px] text-muted">{STUDIO_INFO.pAngvTaxNote}</div>
              </div>

              <button
                onClick={() =>
                  onOpenBooking(
                    selectedPillar as PillarType,
                    `Individuelles Paket: ${selectedPillar} ${selectedTier}`,
                    customSummaryText
                  )
                }
                className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Dieses Wunschpaket anfragen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="max-w-3xl mx-auto space-y-6" aria-labelledby="pricing-faq-heading">
          <SectionLabel>Häufige Fragen</SectionLabel>
          <h2 id="pricing-faq-heading" className="font-display text-2xl text-white font-normal uppercase">
            FAQ zu Mitgliedschaften
          </h2>
          <div className="space-y-4">
            {PRICING_FAQ.map((item) => (
              <details key={item.question} className="glass-panel p-5 group">
                <summary className="font-display text-base text-white cursor-pointer list-none flex justify-between gap-4">
                  {item.question}
                  <span className="text-accent text-xs shrink-0">+</span>
                </summary>
                <p className="text-sm text-muted leading-relaxed mt-3 pt-3 border-t border-[#222222]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <FaqStructuredData items={PRICING_FAQ} />
    </div>
  );
};
