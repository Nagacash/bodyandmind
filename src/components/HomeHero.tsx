'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';
import { StaggerContainer, StaggerItem } from './ui/RevealOnScroll';

const HERO_IMAGE = '/images/beach2.webp';

interface HomeHeroProps {
  onOpenBooking: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenBooking }) => (
  <section>
    {/* Image only — no text overlay */}
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#151515]">
      <img
        src={HERO_IMAGE}
        alt="Premium Personal Training Hamburg"
        referrerPolicy="no-referrer"
        className="w-full h-full min-h-[100dvh] object-cover object-center"
      />
      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
    </div>

    {/* Content below the image */}
    <div className="bg-[#0F0F0F] py-16 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel text-xs font-semibold tracking-[0.3em] text-[#8E7B62] uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rothenbaumchaussee 156 • Hamburg</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-normal text-white tracking-tight leading-[1.05] uppercase">
              PREMIUM PERSONAL
              <br />
              TRAINING HAMBURG
            </h1>
          </StaggerItem>

          <StaggerItem>
            <h2 className="font-display text-xl sm:text-2xl text-[#8E7B62] font-normal italic">
              Trainiere deinen Körper. Stärke deinen Geist.
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed font-body">
              Persönliches Coaching für Körper und Geist – privat und diskret, an der Rothenbaumchaussee in Hamburg.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <PrimaryButton
                onClick={onOpenBooking}
                id="hero-primary-cta"
                showArrow
                className="w-full sm:w-auto"
              >
                Erstgespräch vereinbaren
              </PrimaryButton>
              <Link
                to="/mitgliedschaften"
                className="w-full sm:w-auto px-7 py-3.5 rounded-none border border-[#222222] text-xs font-bold tracking-[0.2em] uppercase text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-all text-center inline-flex items-center justify-center active:scale-[0.98]"
              >
                Mitgliedschaften ansehen
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted border-t border-[#222222] max-w-xl mx-auto uppercase tracking-wider font-body">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#8E7B62]" /> Absolute Diskretion
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#8E7B62]" /> 1:1 Betreuung
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#8E7B62]" /> Transparente Preise
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  </section>
);
