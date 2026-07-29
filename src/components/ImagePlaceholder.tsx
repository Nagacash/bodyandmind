import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, X, Expand } from 'lucide-react';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | '3/4' | 'auto';
  showBadge?: boolean;
  /** Click to open full-size lightbox. Default true. */
  expandable?: boolean;
  /** How the image fills the frame. Use contain for fully visible portraits. */
  objectFit?: 'cover' | 'contain';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  label = 'BILD-PLATZHALTER',
  className = '',
  aspectRatio = '16/9',
  showBadge = true,
  expandable = true,
  objectFit = 'cover',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    '3/4': 'aspect-[3/4]',
    'auto': '',
  }[aspectRatio];

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen]);

  const openLightbox = () => {
    if (!expandable || error) return;
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 0 : undefined}
        onClick={openLightbox}
        onKeyDown={(e) => {
          if (expandable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openLightbox();
          }
        }}
        aria-label={expandable ? `${alt} – Vollbild anzeigen` : undefined}
        className={`relative overflow-hidden rounded-none bg-[#151515] border border-[#222222] group ${aspectClass} ${className} ${
          expandable ? 'cursor-zoom-in' : ''
        }`}
      >
        {!error && (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-[1.02] ${
            loaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform' }}
        />
        )}

        {(!loaded || error) && (
          <div className="absolute inset-0 bg-[#1A1A1A] shimmer-loader flex flex-col items-center justify-center p-4 text-center space-y-2">
            <ImageIcon className="w-8 h-8 text-[#3D6B8C]/60" />
            <span className="text-xs text-muted font-mono">{alt}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent pointer-events-none" />

        {expandable && loaded && !error && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-panel px-2.5 py-1.5 rounded-none text-[10px] font-mono tracking-wider flex items-center gap-1.5 text-white">
              <Expand className="w-3 h-3" />
              <span>Vollbild</span>
            </div>
          </div>
        )}

        {showBadge && (
          <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-panel px-2.5 py-1 rounded-none text-[10px] font-mono tracking-wider flex items-center gap-1.5 text-[#3D6B8C]">
              <Camera className="w-3 h-3" />
              <span>{label}</span>
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[101] min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            aria-label="Vollbild schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
