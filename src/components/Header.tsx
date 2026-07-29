'use client';

import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../data/studioData';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isHeroOverlay = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = isHeroOverlay
    ? 'bg-transparent py-5'
    : isScrolled
    ? 'glass-panel border-b border-white/10 py-3 shadow-2xl'
    : 'bg-[#0F0F0F]/80 backdrop-blur-md border-b border-[#222222] py-4';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerClasses}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-block group focus:outline-none shrink-0"
              id="header-logo-button"
            >
              <Logo className="h-8 sm:h-10 opacity-95 group-hover:opacity-100 transition-opacity" />
            </Link>

            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  id={`nav-item-${item.id}`}
                  className={({ isActive }) =>
                    `px-3 py-2 text-xs uppercase tracking-widest font-medium transition-all relative ${
                      isActive
                        ? 'text-[#8E7B62]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8E7B62]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={onOpenBooking}
                id="header-cta-button"
                className="bg-[#8E7B62] hover:bg-[#A08C71] text-[#0F0F0F] px-5 py-2.5 rounded-none text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer active:scale-[0.98]"
              >
                <span>Erstgespräch vereinbaren</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={onOpenBooking}
                className="bg-[#8E7B62] text-[#0F0F0F] px-3 py-1.5 rounded-none text-[11px] font-bold tracking-wider uppercase active:scale-[0.98]"
              >
                Erstgespräch
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="p-2 rounded-none text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 glass-panel bg-[#0F0F0F]/95 flex flex-col justify-between p-6 md:hidden"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="inline-block">
                <Logo className="h-8" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col space-y-2">
              {[{ id: 'home', label: 'Startseite', path: '/' }, ...NAV_ITEMS.map(i => ({ id: i.id, label: i.label, path: i.path }))].map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-left py-3 px-4 text-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-[#8E7B62]/15 text-[#8E7B62]'
                          : 'text-gray-200 hover:bg-white/5'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#8E7B62] text-[#0F0F0F] py-3.5 rounded-none font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Erstgespräch vereinbaren</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E7B62]" />
              <span>Privates Studio in Hamburg Rothenbaum</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
