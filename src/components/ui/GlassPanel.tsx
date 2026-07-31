import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  /** Thin cyan / red / plum line along the top (logo colors) */
  brandTrioTop?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  accent = false,
  brandTrioTop = false,
}) => (
  <div
    className={`glass-panel rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${
      accent ? 'border-accent/40' : ''
    } ${brandTrioTop ? 'brand-trio-top overflow-hidden' : ''} ${className}`}
  >
    {children}
  </div>
);
