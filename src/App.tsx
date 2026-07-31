import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PillarType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ErstgespraechModal } from './components/ErstgespraechModal';
import { CookieBanner } from './components/CookieBanner';
import { PageMeta, SiteStructuredData } from './components/PageMeta';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const FlowPage = lazy(() =>
  import('./pages/FlowPage').then((m) => ({ default: m.FlowPage }))
);
const FormPage = lazy(() =>
  import('./pages/FormPage').then((m) => ({ default: m.FormPage }))
);
const RecoveryPage = lazy(() =>
  import('./pages/RecoveryPage').then((m) => ({ default: m.RecoveryPage }))
);
const PricingPage = lazy(() =>
  import('./pages/PricingPage').then((m) => ({ default: m.PricingPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const TeamPage = lazy(() =>
  import('./pages/TeamPage').then((m) => ({ default: m.TeamPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage }))
);

export default function App() {
  // Booking Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedPillar, setPreselectedPillar] = useState<PillarType>('GENERAL');
  const [preselectedOptionName, setPreselectedOptionName] = useState<string>('');
  const [customPackageSummary, setCustomPackageSummary] = useState<string>('');

  // Cookie Settings Modal State
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [cookieSettingsOnly, setCookieSettingsOnly] = useState(false);

  // Check initial cookie banner trigger
  useEffect(() => {
    const consent = localStorage.getItem('bm_cookie_consent');
    if (!consent) {
      setCookieBannerOpen(true);
      setCookieSettingsOnly(false);
    }
  }, []);

  const handleOpenBooking = (
    pillar: PillarType = 'GENERAL',
    optionName: string = '',
    customSummary: string = ''
  ) => {
    setPreselectedPillar(pillar);
    setPreselectedOptionName(optionName);
    setCustomPackageSummary(customSummary);
    setBookingOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageMeta />
      <SiteStructuredData />
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] flex flex-col font-sans selection:bg-accent selection:text-white relative">
        <div className="grain-overlay" aria-hidden="true" />
        {/* Navigation Header */}
        <Header onOpenBooking={() => handleOpenBooking('GENERAL')} />

        {/* Main Page Routes */}
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
            <Route
              path="/"
              element={<HomePage onOpenBooking={handleOpenBooking} />}
            />
            <Route
              path="/flow"
              element={<FlowPage onOpenBooking={handleOpenBooking} />}
            />
            <Route
              path="/form"
              element={<FormPage onOpenBooking={handleOpenBooking} />}
            />
            <Route
              path="/recovery"
              element={<RecoveryPage onOpenBooking={handleOpenBooking} />}
            />
            <Route
              path="/mitgliedschaften"
              element={<PricingPage onOpenBooking={handleOpenBooking} />}
            />
            <Route path="/pricing" element={<Navigate to="/mitgliedschaften" replace />} />
            <Route
              path="/ueber-uns"
              element={<AboutPage onOpenBooking={handleOpenBooking} />}
            />
            <Route path="/about" element={<Navigate to="/ueber-uns" replace />} />
            <Route
              path="/team"
              element={<TeamPage onOpenBooking={handleOpenBooking} />}
            />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
            <Route path="/impressum" element={<LegalPage type="impressum" />} />
            <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer
          onOpenCookieSettings={() => {
            setCookieSettingsOnly(true);
            setCookieBannerOpen(true);
          }}
          onOpenBooking={() => handleOpenBooking('GENERAL')}
        />

        {/* Booking Consultation Modal */}
        <ErstgespraechModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          preselectedPillar={preselectedPillar}
          preselectedOptionName={preselectedOptionName}
          customPackageSummary={customPackageSummary}
        />

        {/* DSGVO Cookie Banner */}
        <CookieBanner
          isOpen={cookieBannerOpen}
          onClose={() => setCookieBannerOpen(false)}
          isSettingsOpenOnly={cookieSettingsOnly}
        />
      </div>
    </BrowserRouter>
  );
}
