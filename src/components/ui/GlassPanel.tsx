import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  accent = false,
}) => (
  <div
    className={`glass-panel rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${
      accent ? 'border-[#8E7B62]/40' : ''
    } ${className}`}
  >
    {children}
  </div>
);
