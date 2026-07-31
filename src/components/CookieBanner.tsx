import React, { useState, useEffect } from 'react';
import { CookiePreferences } from '../types';
import { Shield, Settings, X, Check } from 'lucide-react';

interface CookieBannerProps {
  isOpen: boolean;
  onClose: () => void;
  isSettingsOpenOnly?: boolean;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  isOpen,
  onClose,
  isSettingsOpenOnly = false,
}) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const [showDetails, setShowDetails] = useState(isSettingsOpenOnly);

  useEffect(() => {
    const saved = localStorage.getItem('bm_cookie_consent');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        // ignore fallback
      }
    }
    setShowDetails(isSettingsOpenOnly);
  }, [isOpen, isSettingsOpenOnly]);

  if (!isOpen) return null;

  const handleAcceptAll = () => {
    const updated = { essential: true, analytics: true, marketing: true };
    setPreferences(updated);
    localStorage.setItem('bm_cookie_consent', JSON.stringify(updated));
    onClose();
  };

  const handleAcceptEssential = () => {
    const updated = { essential: true, analytics: false, marketing: false };
    setPreferences(updated);
    localStorage.setItem('bm_cookie_consent', JSON.stringify(updated));
    onClose();
  };

  const handleSaveCustom = () => {
    localStorage.setItem('bm_cookie_consent', JSON.stringify(preferences));
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 bg-[#0F0F0F]/95 backdrop-blur-xl border-t border-[#222222] shadow-2xl animate-in slide-in-from-bottom duration-300 font-body">
      <div className="max-w-5xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  Privatsphäre & Datenschutz (DSGVO)
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Wir nutzen essentielle Technologien zur Bereitstellung unserer Webseite. Nicht-essenzielle Tracking- oder Analyse-Cookies werden erst nach deiner ausdrücklichen Einwilligung geladen.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-3.5 py-2 rounded-none border border-[#222222] text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Einstellungen
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 rounded-none border border-accent/40 text-xs font-semibold text-accent hover:bg-accent/10 transition-all"
              >
                Nur Essenzielle
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-none bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
              <h3 className="text-base font-display font-normal text-white uppercase flex items-center gap-2">
                <Settings className="w-4 h-4 text-accent" />
                <span>Cookie-Einstellungen anpassen</span>
              </h3>
              {!isSettingsOpenOnly && (
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-xs text-muted hover:text-white"
                >
                  Zurück
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#151515] border border-[#222222] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Essentiell</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-none">
                    Immer Aktiv
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Erforderlich für Grundfunktionen der Webseite (Navigation, Formular-Übermittlung, Cookie-Präferenz).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151515] border border-[#222222] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Analyse & Performance</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="rounded-none border-[#222222] bg-[#151515] text-accent focus:ring-accent"
                  />
                </div>
                <p className="text-xs text-muted">
                  Hilft uns, die Nutzung der Webseite anonymisiert zu verstehen und zu optimieren.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151515] border border-[#222222] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Externe Medien (Maps)</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="rounded-none border-[#222222] bg-[#151515] text-accent focus:ring-accent"
                  />
                </div>
                <p className="text-xs text-muted">
                  Ermöglicht das Laden externer Karteninhalte (Google Maps) erst nach Freigabe.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={handleSaveCustom}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Auswahl speichern</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
