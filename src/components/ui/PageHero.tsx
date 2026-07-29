import React from 'react';
import { SectionLabel } from './SectionLabel';
import { PrimaryButton } from './PrimaryButton';
import { ImagePlaceholder } from '../ImagePlaceholder';

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageLabel?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  imageLabel,
  ctaLabel,
  onCtaClick,
}) => (
  <section className="space-y-6 sm:space-y-10 max-w-6xl">
    {/* Image first — clean, no text on image */}
    <ImagePlaceholder
      src={imageSrc}
      alt={imageAlt}
      label={imageLabel}
      aspectRatio="auto"
      showBadge={!!imageLabel}
      priority
      className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
    />

    <div className="max-w-3xl space-y-4 sm:space-y-6 text-left">
      <SectionLabel>{badge}</SectionLabel>

      <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight leading-[1.15] text-balance">
        {title}
      </h1>

      <p className="text-base sm:text-lg text-muted font-light leading-relaxed max-w-[65ch]">
        {description}
      </p>

      {ctaLabel && onCtaClick && (
        <PrimaryButton onClick={onCtaClick} showArrow>
          {ctaLabel}
        </PrimaryButton>
      )}
    </div>
  </section>
);
