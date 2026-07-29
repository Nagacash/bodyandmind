import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | '3/4' | 'auto';
  showBadge?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  label = 'BILD-PLATZHALTER',
  className = '',
  aspectRatio = '16/9',
  showBadge = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    '3/4': 'aspect-[3/4]',
    'auto': '',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden rounded-none bg-[#151515] border border-[#222222] group ${aspectClass} ${className}`}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
            loaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform' }}
        />
      )}

      {(!loaded || error) && (
        <div className="absolute inset-0 bg-[#1A1A1A] shimmer-loader flex flex-col items-center justify-center p-4 text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-[#8E7B62]/60" />
          <span className="text-xs text-muted font-mono">{alt}</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent pointer-events-none" />

      {showBadge && (
        <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="glass-panel px-2.5 py-1 rounded-none text-[10px] font-mono tracking-wider flex items-center gap-1.5 text-[#8E7B62]">
            <Camera className="w-3 h-3" />
            <span>{label}</span>
          </div>
        </div>
      )}
    </div>
  );
};
