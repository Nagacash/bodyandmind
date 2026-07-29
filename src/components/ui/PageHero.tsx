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
  <section className="space-y-10 max-w-6xl">
    {/* Image first — clean, no text on image */}
    <ImagePlaceholder
      src={imageSrc}
      alt={imageAlt}
      label={imageLabel}
      aspectRatio="21/9"
      showBadge={!!imageLabel}
    />

    <div className="max-w-3xl space-y-6 text-left">
      <SectionLabel>{badge}</SectionLabel>

      <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight leading-[1.1]">
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
