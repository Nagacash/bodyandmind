import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '' }) => (
  <div
    className={`text-xs font-bold uppercase tracking-[0.3em] text-accent ${className}`}
  >
    {children}
  </div>
);
