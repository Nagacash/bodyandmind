import React, { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../data/studioData';
import { MapPin, Mail, Globe, CheckCircle2, Navigation, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionLabel } from '../components/ui/SectionLabel';
import { GlassPanel } from '../components/ui/GlassPanel';
import { RevealOnScroll } from '../components/ui/RevealOnScroll';
import { hasMarketingConsent } from '../utils/cookieConsent';
import {
  openInquiryViaEmail,
  openInquiryViaWhatsApp,
  type InquiryPayload,
} from '../lib/inquiryContact';

const CONTACT_HERO_IMAGE = '/images/insta3.webp';

export const ContactPage: React.FC = () => {
  const [mapConsent, setMapConsent] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'FLOW',
    timePref: 'flexible',
    message: '',
    privacy: false,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [sentVia, setSentVia] = useState<'email' | 'whatsapp' | null>(null);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (hasMarketingConsent()) {
      setMapConsent(true);
    }
  }, []);

  const handleLoadMap = () => {
    setMapConsent(true);
  };

  const buildPayload = (): InquiryPayload | null => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Bitte Name und E-Mail eingeben.');
      return null;
    }

    if (!formData.privacy) {
      setErrorMsg('Bitte stimme der Datenschutzerklärung zu.');
      return null;
    }

    if (honeypot) {
      return null;
    }

    setErrorMsg('');
    return {
      source: 'contact',
      name: formData.name.trim(),
      email: formData.email.trim(),
      privacyConsent: true,
      interest: formData.interest,
      message: formData.message,
    };
  };

  const handleSend = (channel: 'email' | 'whatsapp') => {
    const payload = buildPayload();
    if (!payload) return;

    if (channel === 'email') {
      openInquiryViaEmail(payload);
    } else {
      openInquiryViaWhatsApp(payload);
    }
    setSentVia(channel);
    setFormSubmitted(true);
  };

  return (
    <div className="page-section-gap page-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <PageHero
        badge="KONTAKT & ANFAHRT"
        title="Lernen wir uns kennen."
        description={STUDIO_INFO.tagline}
        imageSrc={CONTACT_HERO_IMAGE}
        imageAlt="Kontakt – body & mind Hamburg Rothenbaumchaussee"
      />

      <RevealOnScroll>
        <GlassPanel className="p-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <SectionLabel>Der Weg zu deinem Training</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal uppercase">
              In drei Schritten starten
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Anfrage', desc: `Nutze das Formular und sende uns deine Anfrage per E-Mail an ${STUDIO_INFO.email} oder per WhatsApp.` },
              { step: '02', title: 'Erstgespräch', desc: 'Wir treffen uns in Ruhe im Studio Rothenbaumchaussee für eine kostenlose Beratung & Ist-Analyse.' },
              { step: '03', title: 'Durchstarten', desc: 'Start deines maßgeschneiderten Personal Trainings & Recovery-Programms.' },
            ].map((s) => (
              <div key={s.step} className="timeline-step p-6 bg-[#0F0F0F]/80 border border-[#222222] space-y-3">
                <div className="font-mono text-xs font-bold text-accent">SCHRITT {s.step}</div>
                <h3 className="font-display text-lg text-white font-normal uppercase">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </RevealOnScroll>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-8">
          <GlassPanel className="p-5 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-2xl text-white font-normal uppercase">
                Studio Rothenbaum
              </h2>
              <p className="text-xs text-muted">
                Rothenbaumchaussee 156, 20149 Hamburg
              </p>
            </div>

            <div className="space-y-4 text-xs text-muted">
              <div className="flex items-start gap-3 p-3.5 bg-[#0F0F0F] border border-[#222222]">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Adresse</span>
                  <span>{STUDIO_INFO.locationName}, {STUDIO_INFO.cityPostal}</span>
                  <span className="block text-[11px] text-muted mt-1">Zentrale Lage im Stadtteil Rotherbaum, gute ÖPNV- & PKW-Anbindung.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0F0F0F] border border-[#222222]">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Telefon</span>
                  <a href={`tel:${STUDIO_INFO.phoneTel}`} className="text-accent hover:underline">
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0F0F0F] border border-[#222222]">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">E-Mail</span>
                  <a href={`mailto:${STUDIO_INFO.email}`} className="text-accent hover:underline">
                    {STUDIO_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0F0F0F] border border-[#222222]">
                <Globe className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Webseite</span>
                  <span>{STUDIO_INFO.domain}</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-accent text-xs font-semibold">
              <Navigation className="w-4 h-4" />
              <span>Interaktive Karte (DSGVO-konform)</span>
            </div>

            {!mapConsent ? (
              <div className="space-y-3 py-2">
                <p className="text-[11px] text-muted max-w-xs mx-auto">
                  Zum Laden der interaktiven Google Maps Karte ist deine aktive Zustimmung erforderlich. Dabei werden Daten an Google übermittelt.
                </p>
                <button
                  onClick={handleLoadMap}
                  className="px-5 py-2.5 rounded-none bg-accent/20 hover:bg-accent border border-accent text-accent hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-[0.98]"
                >
                  Karte jetzt laden
                </button>
              </div>
            ) : (
              <div className="rounded-none overflow-hidden border border-[#222222] h-48 bg-[#151515]">
                <iframe
                  title="Studio Location Hamburg Rothenbaumchaussee"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://maps.google.com/maps?q=Rothenbaumchaussee%20156%2C%2020149%20Hamburg&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            )}
          </GlassPanel>
        </div>

        <GlassPanel className="lg:col-span-7 p-5 sm:p-8 space-y-6">
          <div>
            <h2 className="font-display text-2xl text-white font-normal uppercase">
              Erstgespräch Anfragen
            </h2>
            <p className="text-xs text-muted mt-1">
              Fülle die Felder aus und wähle E-Mail oder WhatsApp — wir melden uns persönlich bei dir.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center space-y-4 bg-[#0F0F0F] border border-[#222222]">
              <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
              <h3 className="font-display text-xl font-normal text-white uppercase">
                Vielen Dank, {formData.name}!
              </h3>
              <p className="text-xs text-muted">
                {sentVia === 'whatsapp'
                  ? 'WhatsApp sollte sich geöffnet haben — sende die Nachricht ab, damit wir sie erhalten.'
                  : 'Dein E-Mail-Programm sollte sich geöffnet haben — sende die Nachricht ab, damit wir sie erhalten.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend('email');
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dein Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="deine@email.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Interesse
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                >
                  <option value="FLOW">Säule 01: FLOW (Boxen & Kickboxen)</option>
                  <option value="FORM">Säule 02: FORM (Kraft & Athletik)</option>
                  <option value="RECOVERY">Säule 03: Recovery (IHHT & Atemtraining)</option>
                  <option value="SUMMER_SPECIAL">Summer Special Sommer-Aktion</option>
                  <option value="GENERAL">Ganzheitliches Erstgespräch</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Nachricht / Anliegen (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Deine Ziele, Fragen oder Wunschzeiten..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="mt-1 rounded-none border-[#222222] bg-[#0F0F0F] text-accent"
                  />
                  <span className="text-xs text-muted">
                    Ich stimme der Datenverarbeitung gemäß der Datenschutzerklärung zu.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-none">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] bg-accent hover:bg-accent-hover text-white py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Per E-Mail senden</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSend('whatsapp')}
                  className="flex-1 min-h-[44px] bg-[#151515] hover:bg-[#1a1a1a] border border-[#222222] hover:border-accent/50 text-white py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span>Per WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </GlassPanel>
      </section>
    </div>
  );
};
