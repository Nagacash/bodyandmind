import React from 'react';
import { GlassPanel } from './GlassPanel';
import { PrimaryButton } from './PrimaryButton';

interface CtaBannerProps {
  title: string;
  description?: string;
  buttonLabel: string;
  onClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  buttonLabel,
  onClick,
}) => (
  <GlassPanel accent className="p-10 sm:p-14 text-center space-y-6">
    <div className="space-y-3 max-w-2xl mx-auto">
      <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted font-body leading-relaxed">{description}</p>
      )}
    </div>
    <PrimaryButton onClick={onClick}>{buttonLabel}</PrimaryButton>
  </GlassPanel>
);
