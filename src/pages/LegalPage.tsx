import React from 'react';
import { STUDIO_INFO } from '../data/studioData';
import { FileText, ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  type: 'impressum' | 'datenschutz';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  return (
    <div className="page-shell max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-body space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 border-b border-[#222222] pb-6">
        <FileText className="w-8 h-8 text-accent" />
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-accent">
            Rechtliche Informationen
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white uppercase font-normal">
            {type === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
          </h1>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-[#151515] border border-[#222222] space-y-6 text-sm text-muted leading-relaxed">
        {type === 'impressum' ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                <strong className="text-accent">body & mind by Natalie Zimmermann</strong><br />
                Rothenbaumchaussee 156<br />
                20149 Hamburg<br />
                Deutschland
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">Kontakt</h2>
              <p>
                Telefon: {STUDIO_INFO.phoneDisplay}<br />
                E-Mail: {STUDIO_INFO.email}<br />
                Webseite: {STUDIO_INFO.domain}
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">Inhaberin & Verantwortlich für den Inhalt</h2>
              <p>Natalie Zimmermann</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">Preisangabenverordnung (PAngV)</h2>
              <p className="text-xs text-muted italic">
                {STUDIO_INFO.pAngvTaxNote}
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">Verbraucherstreitbeilegung</h2>
              <p className="text-xs text-muted">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-xs sm:text-sm">
            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">1. Datenschutz auf einen Blick</h2>
              <p>
                Der Schutz deiner persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir dich über die Erhebung und Verarbeitung personenbezogener Daten bei der Nutzung unserer Webseite bodyandmindbynatalie.de im Einklang mit der EU-Datenschutz-Grundverordnung (DSGVO).
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">2. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich im Sinne der DSGVO ist Natalie Zimmermann, {STUDIO_INFO.locationName}, {STUDIO_INFO.cityPostal}. Telefon: {STUDIO_INFO.phoneDisplay}. E-Mail: {STUDIO_INFO.email}.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">3. Datenerfassung auf unserer Webseite</h2>
              <p>
                <strong>Erstgespräch & Kontakt:</strong> Wenn du uns über das Formular (E-Mail oder WhatsApp), per E-Mail oder WhatsApp Anfragen zukommen lässt, verarbeiten wir deine Angaben (Name, E-Mail-Adresse, Terminpräferenzen) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen (Art. 6 Abs. 1 lit. b DSGVO). Beim Versand per E-Mail oder WhatsApp gelten zusätzlich die Datenschutzbestimmungen deines E-Mail-Anbieters bzw. von WhatsApp/Meta.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">4. Schriftarten & Einbindungen (DSGVO-Konform)</h2>
              <p>
                Sämtliche Schriftarten (Playfair Display & Montserrat) sind lokal auf unserem Server eingebunden. Es erfolgen keine Verbindungen zu Google Fonts CDNs oder externen Servern beim Seitenaufruf.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">5. Kartendienste (Google Maps)</h2>
              <p>
                Interaktive Karten werden nicht automatisch geladen. Eine Verbindung zu Google Maps wird erst nach deiner aktiven Einwilligung im Kartenbereich aufgebaut.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-white uppercase mb-2">6. Hinweis zu Recovery-Anwendungen</h2>
              <p className="italic text-muted bg-[#0F0F0F] p-4 rounded-xl border border-[#222222]">
                {STUDIO_INFO.hwgRecoveryDisclaimer}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
