import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_INFO, NAV_ITEMS } from '../data/studioData';
import { MapPin, Mail, Instagram, MessageCircle, Info } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenCookieSettings: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCookieSettings,
  onOpenBooking,
}) => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-[#A0A0A0] pt-16 pb-12 font-body relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <Logo className="h-10 sm:h-11" />
              </Link>
              <p className="text-[10px] tracking-[0.25em] text-accent uppercase font-body font-medium">
                Premium Personal Training Hamburg
              </p>
            </div>

            <p className="text-sm text-muted max-w-sm leading-relaxed font-body">
              Ein privates Studio für Bewegung, Regeneration und innere Balance an der Rothenbaumchaussee.
            </p>

            <div className="space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>{STUDIO_INFO.locationName}, {STUDIO_INFO.cityPostal}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-accent transition-colors">
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/nataliezimmermann_ger/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass-panel flex items-center justify-center text-[#A0A0A0] hover:text-accent hover:border-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Anfrage zu body & mind Hamburg')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass-panel flex items-center justify-center text-[#A0A0A0] hover:text-accent hover:border-accent transition-all"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-body">
              <li>
                <Link to="/" className="hover:text-accent transition-colors py-1 block">
                  Startseite
                </Link>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link to={item.path} className="hover:text-accent transition-colors py-1 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-white transition-colors border-b border-accent/40 pb-0.5 cursor-pointer"
              >
                <span>Erstgespräch anfragen</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-muted font-body">
              <li>
                <Link to="/impressum" id="footer-impressum-button" className="hover:text-white transition-colors block">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" id="footer-datenschutz-button" className="hover:text-white transition-colors block">
                  Datenschutz
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenCookieSettings}
                  id="footer-cookie-settings-button"
                  className="hover:text-white transition-colors text-xs text-[#777] hover:underline cursor-pointer"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-4 glass-panel text-xs text-muted leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block mb-0.5">Hinweis zu Recovery-Anwendungen (HWG):</span>
              {STUDIO_INFO.hwgRecoveryDisclaimer}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted pt-4 gap-3 sm:gap-2 border-t border-white/10 text-center sm:text-left">
            <div className="order-2 sm:order-1">{STUDIO_INFO.copyright}</div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-1 sm:order-2">
              <a
                href="https://nagacodex.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#777] hover:text-accent transition-colors"
              >
                Designed by Naga Codex
              </a>
              <span className="hidden sm:inline text-[#333]" aria-hidden="true">
                ·
              </span>
              <div className="text-muted font-medium">{STUDIO_INFO.pAngvTaxNote}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
