import React, { useState, useEffect } from 'react';
import { BookingData, PillarType } from '../types';
import {
  openInquiryViaEmail,
  openInquiryViaWhatsApp,
  type InquiryPayload,
} from '../lib/inquiryContact';
import { X, CheckCircle2, ShieldCheck, Clock, Calendar, Mail, MessageCircle } from 'lucide-react';

interface ErstgespraechModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPillar?: PillarType;
  preselectedOptionName?: string;
  customPackageSummary?: string;
}

export const ErstgespraechModal: React.FC<ErstgespraechModalProps> = ({
  isOpen,
  onClose,
  preselectedPillar = 'GENERAL',
  preselectedOptionName,
  customPackageSummary,
}) => {
  const [formData, setFormData] = useState<BookingData>({
    pillar: preselectedPillar,
    selectedOptionName: preselectedOptionName || '',
    name: '',
    email: '',
    timePreference: 'flexible',
    preferredDays: [],
    notes: '',
    customPackageSummary: customPackageSummary || '',
    privacyConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [sentVia, setSentVia] = useState<'email' | 'whatsapp' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        pillar: preselectedPillar,
        selectedOptionName: preselectedOptionName || prev.selectedOptionName,
        customPackageSummary: customPackageSummary || prev.customPackageSummary,
      }));
      setSubmitted(false);
      setSentVia(null);
      setErrorMessage('');
      setHoneypot('');
    }
  }, [isOpen, preselectedPillar, preselectedOptionName, customPackageSummary]);

  if (!isOpen) return null;

  const buildPayload = (): InquiryPayload | null => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Bitte fülle alle Pflichtfelder (Name & E-Mail) aus.');
      return null;
    }

    if (!formData.privacyConsent) {
      setErrorMessage('Bitte bestätige die Datenschutzerklärung.');
      return null;
    }

    if (honeypot) {
      return null;
    }

    setErrorMessage('');
    return {
      source: 'booking',
      name: formData.name.trim(),
      email: formData.email.trim(),
      privacyConsent: true,
      pillar: formData.pillar,
      selectedOptionName: formData.selectedOptionName,
      timePreference: formData.timePreference,
      preferredDays: formData.preferredDays,
      notes: formData.notes,
      customPackageSummary: formData.customPackageSummary,
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
    setSubmitted(true);
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const current = prev.preferredDays || [];
      const updated = current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day];
      return { ...prev, preferredDays: updated };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-body">
      <div className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[90dvh] flex flex-col bg-[#0F0F0F] border border-[#222222] sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-8">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-4 p-4 sm:p-6 border-b border-[#222222] bg-[#151515] shrink-0">
          <div className="min-w-0 pr-2">
            <h2 className="font-display text-xl sm:text-2xl font-normal text-white uppercase leading-tight">
              Erstgespräch vereinbaren
            </h2>
            <p className="text-xs text-accent mt-1 font-body">
              Kostenlos, unverbindlich & in Ruhe an der Rothenbaumchaussee
            </p>
          </div>
          <button
            onClick={onClose}
            className="touch-target shrink-0 flex items-center justify-center text-gray-400 hover:text-white rounded-none hover:bg-white/10 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="overflow-y-auto flex-1 overscroll-contain p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-accent/15 border border-accent rounded-none flex items-center justify-center mx-auto text-accent">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white font-normal uppercase">
                Vielen Dank, {formData.name}!
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                {sentVia === 'whatsapp'
                  ? 'WhatsApp sollte sich geöffnet haben — sende die Nachricht ab, damit wir deine Anfrage erhalten.'
                  : 'Dein E-Mail-Programm sollte sich geöffnet haben — sende die Nachricht ab, damit wir deine Anfrage erhalten.'}
              </p>
            </div>

            <div className="p-4 rounded-none bg-[#151515] border border-[#222222] text-xs text-muted max-w-md mx-auto text-left space-y-1">
              <div className="font-semibold text-accent">Zusammenfassung deiner Anfrage:</div>
              <div>• E-Mail: {formData.email}</div>
              <div>• Schwerpunkt: {formData.selectedOptionName || formData.pillar}</div>
              <div>• Wunschzeit: {formData.timePreference}</div>
              {formData.customPackageSummary && (
                <div>• Gewähltes Paket: {formData.customPackageSummary}</div>
              )}
            </div>

            <button
              onClick={onClose}
              className="bg-accent text-white px-8 py-3 rounded-none font-bold uppercase tracking-wider text-xs hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Schließen
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend('email');
            }}
            className="overflow-y-auto flex-1 overscroll-contain p-4 sm:p-8 space-y-6"
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
            {/* Context Badge if preselected */}
            {(formData.selectedOptionName || formData.customPackageSummary) && (
              <div className="p-3.5 rounded-none bg-accent/10 border border-accent/30 text-xs text-[#B8D4E8] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-accent block mb-0.5">Ausgewählte Option:</span>
                  <span>{formData.customPackageSummary || formData.selectedOptionName}</span>
                </div>
              </div>
            )}

            {/* Pillar Selection if generic */}
            {!formData.selectedOptionName && !formData.customPackageSummary && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                  Interessensschwerpunkt
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'FLOW', label: 'FLOW (Boxen)' },
                    { id: 'FORM', label: 'FORM (Kraft)' },
                    { id: 'RECOVERY', label: 'Recovery' },
                    { id: 'GENERAL', label: 'Ganzheitlich' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, pillar: p.id as PillarType })}
                      className={`min-h-[44px] py-2.5 px-3 rounded-none text-xs font-medium border transition-all text-center ${
                        formData.pillar === p.id
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-[#151515] border-[#222222] text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inputs: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Dein Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  E-Mail Adresse *
                </label>
                <input
                  type="email"
                  required
                  placeholder="deine@email.de"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Time Preferences */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Bevorzugte Tageszeit</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'morning', label: 'Morgens (7-11 Uhr)' },
                  { id: 'midday', label: 'Mittags (11-15 Uhr)' },
                  { id: 'evening', label: 'Abends (15-20 Uhr)' },
                  { id: 'flexible', label: 'Flexibel' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        timePreference: t.id as BookingData['timePreference'],
                      })
                    }
                    className={`min-h-[44px] py-2.5 px-2.5 rounded-none text-xs font-medium border transition-all text-center ${
                      formData.timePreference === t.id
                        ? 'bg-accent/20 border-accent text-accent'
                        : 'bg-[#151515] border-[#222222] text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>Wunschtage (optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day) => {
                  const selected = (formData.preferredDays || []).includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`min-h-[44px] px-3 py-2.5 rounded-none text-xs font-medium border transition-all ${
                        selected
                          ? 'bg-accent text-white border-accent font-bold'
                          : 'bg-[#151515] border-[#222222] text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes / Goals */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Anliegen oder Zielsetzung (optional)
              </label>
              <textarea
                rows={2}
                placeholder="z.B. Stressabbau, Haltung, Vorbereitung auf Sommer, etc."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 rounded-none border-[#222222] bg-[#151515] text-accent focus:ring-accent"
                />
                <span className="text-xs text-muted leading-relaxed">
                  Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme gemäß der{' '}
                  <span className="text-accent underline">Datenschutzerklärung</span> zu.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-none bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent-hover text-white py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>Per E-Mail senden</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSend('whatsapp')}
                  className="flex-1 bg-[#151515] hover:bg-[#1a1a1a] border border-[#222222] hover:border-accent/50 text-white py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <span>Per WhatsApp</span>
                </button>
              </div>
              <div className="text-center text-[11px] text-muted flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Geschützter Rahmen & absolute Diskretion</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
