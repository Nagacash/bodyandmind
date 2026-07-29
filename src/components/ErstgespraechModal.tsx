import React, { useState, useEffect } from 'react';
import { BookingData, PillarType } from '../types';
import { STUDIO_INFO } from '../data/studioData';
import { X, CheckCircle2, ShieldCheck, Clock, Calendar, Send } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        pillar: preselectedPillar,
        selectedOptionName: preselectedOptionName || prev.selectedOptionName,
        customPackageSummary: customPackageSummary || prev.customPackageSummary,
      }));
      setSubmitted(false);
      setErrorMessage('');
    }
  }, [isOpen, preselectedPillar, preselectedOptionName, customPackageSummary]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Bitte fülle alle Pflichtfelder (Name & E-Mail) aus.');
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMessage('Bitte bestätige die Datenschutzerklärung.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-body">
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#222222] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222222] bg-[#151515]">
          <div>
            <h2 className="font-display text-2xl font-normal text-white uppercase">
              Erstgespräch vereinbaren
            </h2>
            <p className="text-xs text-[#8E7B62] mt-1 font-body">
              Kostenlos, unverbindlich & in Ruhe an der Rothenbaumchaussee
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-none hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-[#8E7B62]/15 border border-[#8E7B62] rounded-none flex items-center justify-center mx-auto text-[#8E7B62]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white font-normal uppercase">
                Vielen Dank, {formData.name}!
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Deine Anfrage für ein Erstgespräch ist erfolgreich eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei dir.
              </p>
            </div>

            <div className="p-4 rounded-none bg-[#151515] border border-[#222222] text-xs text-muted max-w-md mx-auto text-left space-y-1">
              <div className="font-semibold text-[#8E7B62]">Zusammenfassung deiner Anfrage:</div>
              <div>• E-Mail: {formData.email}</div>
              <div>• Schwerpunkt: {formData.selectedOptionName || formData.pillar}</div>
              <div>• Wunschzeit: {formData.timePreference}</div>
              {formData.customPackageSummary && (
                <div>• Gewähltes Paket: {formData.customPackageSummary}</div>
              )}
            </div>

            <button
              onClick={onClose}
              className="bg-[#8E7B62] text-[#0F0F0F] px-8 py-3 rounded-none font-bold uppercase tracking-wider text-xs hover:bg-[#A08C71] transition-colors cursor-pointer"
            >
              Schließen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Context Badge if preselected */}
            {(formData.selectedOptionName || formData.customPackageSummary) && (
              <div className="p-3.5 rounded-none bg-[#8E7B62]/10 border border-[#8E7B62]/30 text-xs text-[#E5D5C0] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#8E7B62] block mb-0.5">Ausgewählte Option:</span>
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
                      className={`py-2 px-3 rounded-none text-xs font-medium border transition-all text-center ${
                        formData.pillar === p.id
                          ? 'bg-[#8E7B62]/20 border-[#8E7B62] text-[#8E7B62]'
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
                  className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8E7B62] transition-colors"
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
                  className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8E7B62] transition-colors"
                />
              </div>
            </div>

            {/* Time Preferences */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8E7B62]" />
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
                    className={`py-2 px-2.5 rounded-none text-xs font-medium border transition-all text-center ${
                      formData.timePreference === t.id
                        ? 'bg-[#8E7B62]/20 border-[#8E7B62] text-[#8E7B62]'
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
                <Calendar className="w-3.5 h-3.5 text-[#8E7B62]" />
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
                      className={`px-3 py-1.5 rounded-none text-xs font-medium border transition-all ${
                        selected
                          ? 'bg-[#8E7B62] text-[#0F0F0F] border-[#8E7B62] font-bold'
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
                className="w-full bg-[#151515] border border-[#222222] rounded-none px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8E7B62] transition-colors resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="mt-1 rounded-none border-[#222222] bg-[#151515] text-[#8E7B62] focus:ring-[#8E7B62]"
                />
                <span className="text-xs text-muted leading-relaxed">
                  Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme gemäß der{' '}
                  <span className="text-[#8E7B62] underline">Datenschutzerklärung</span> zu.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-none bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8E7B62] hover:bg-[#A08C71] text-[#0F0F0F] py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span>Wird gesendet...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Erstgespräch verbindlich anfragen</span>
                  </>
                )}
              </button>
              <div className="text-center mt-3 text-[11px] text-muted flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8E7B62]" />
                <span>Geschützter Rahmen & absolute Diskretion</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
