import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CORE_PILLARS } from '../data/studioData';
import { ImagePlaceholder } from './ImagePlaceholder';
import { SectionLabel } from './ui/SectionLabel';
import { RevealOnScroll } from './ui/RevealOnScroll';

const PILLAR_IMAGES: Record<string, string> = {
  flow: '/images/lind3.webp',
  form: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
  recovery: '/images/recovery3.webp',
};

export const PillarsSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <RevealOnScroll>
      <header className="max-w-2xl mb-16 lg:mb-20 space-y-3">
        <SectionLabel>Unser Ganzheitliches System</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal uppercase leading-tight">
          Drei Wege. Ein Ziel.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed max-w-[55ch]">
          Ein starkes, ausgeglichenes Leben – körperlich wie mental.
        </p>
      </header>
    </RevealOnScroll>

    <ol className="space-y-0 divide-y divide-[#222222]">
      {CORE_PILLARS.map((pillar, index) => {
        const imageRight = index % 2 === 1;

        return (
          <RevealOnScroll key={pillar.id} delay={index * 0.08}>
            <li>
              <article
                className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 py-12 lg:py-16 items-center ${
                  imageRight ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className={`${imageRight ? 'lg:[direction:ltr]' : ''}`}>
                  <ImagePlaceholder
                    src={PILLAR_IMAGES[pillar.id]}
                    alt={pillar.name}
                    label={`FOTO PLATZHALTER: ${pillar.name}`}
                    aspectRatio="4/3"
                    showBadge={pillar.id === 'form'}
                    className="transition-all duration-500 group-hover:border-[#8E7B62]/40"
                  />
                </div>

                {/* Content */}
                <div className={`space-y-5 ${imageRight ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display text-5xl sm:text-6xl leading-none text-[#8E7B62]/25 select-none tabular-nums"
                      aria-hidden="true"
                    >
                      {pillar.number}
                    </span>
                    <div className="h-px flex-1 bg-[#222222] group-hover:bg-[#8E7B62]/30 transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-3xl sm:text-4xl text-white font-normal uppercase tracking-tight">
                      {pillar.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#8E7B62] font-body italic">
                      {pillar.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-muted font-body leading-relaxed max-w-[50ch]">
                    {pillar.summary}
                  </p>

                  <Link
                    to={`/${pillar.id}`}
                    className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#8E7B62] hover:text-white transition-colors pt-1 group/link"
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          </RevealOnScroll>
        );
      })}
    </ol>
  </section>
);
