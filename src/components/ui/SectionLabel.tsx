import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <span className="flex items-end gap-[3px] shrink-0 self-center" aria-hidden="true">
      <span className="w-[3px] h-2.5 rounded-sm bg-brand-cyan/90" />
      <span className="w-[3px] h-3 rounded-sm bg-brand-red/90" />
      <span className="w-[3px] h-2.5 rounded-sm bg-brand-plum/90" />
    </span>
    <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{children}</div>
  </div>
);
