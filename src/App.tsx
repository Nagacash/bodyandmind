import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PillarType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ErstgespraechModal } from './components/ErstgespraechModal';
import { CookieBanner } from './components/CookieBanner';

import { HomePage } from './pages/HomePage';
import { FlowPage } from './pages/FlowPage';
import { FormPage } from './pages/FormPage';
import { RecoveryPage } from './pages/RecoveryPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

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
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#8E7B62] selection:text-[#0F0F0F] relative">
        <div className="grain-overlay" aria-hidden="true" />
        {/* Navigation Header */}
        <Header onOpenBooking={() => handleOpenBooking('GENERAL')} />

        {/* Main Page Routes */}
        <main className="flex-1">
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
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
            <Route path="/impressum" element={<LegalPage type="impressum" />} />
            <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
