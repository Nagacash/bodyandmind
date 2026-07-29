import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-9 sm:h-10' }) => (
  <img
    src="/logo/logo.svg"
    alt="body & mind by Natalie Zimmermann"
    width={120}
    height={36}
    className={`w-auto object-contain object-left ${className}`}
  />
);
