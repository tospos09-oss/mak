import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import {
  Globe,
  Menu,
  X,
  Compass,
  PlusCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    language,
    setLanguage,
    t,
    openAuthModal,
    openPublishModal,
  } = useApp();

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection:
  // When activePage === 'home' or activePage === 'host':
  // Initial (at top): transparent (background-color: none)
  // Directly when scrolling starts (> 15px): background-color = #ffffff
  useEffect(() => {
    if (activePage !== 'home' && activePage !== 'host') {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Determine if header should be transparent (never transparent when mobile menu is open)
  const isTransparent =
    (activePage === 'home' || activePage === 'host') && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`z-40 w-full transition-all duration-300 ${
        activePage === 'home' || activePage === 'host'
          ? isTransparent
            ? 'fixed top-0 inset-x-0 bg-transparent border-b border-transparent'
            : 'fixed top-0 inset-x-0 bg-[#ffffff] border-b border-[#E5E2DD] shadow-sm'
          : 'sticky top-0 bg-[#ffffff] border-b border-[#E5E2DD] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: MAKANSET Brand Logo (Reduced height by 20%) */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => navigateTo('home')}
            className="group flex items-center focus:outline-none cursor-pointer"
            aria-label="Accueil MAKANSET"
          >
            <img
              src={
                isTransparent
                  ? '/assets/aistudio/MAKANSET-1_d1924897.png'
                  : '/assets/aistudio/MAKANSET_d527bc2c.png'
              }
              alt="MAKANSET"
              className="h-[22px] sm:h-[26px] w-auto object-contain transition-all duration-200 group-hover:opacity-90"
            />
          </button>
        </div>

        {/* Zone 2: Navigation Links (Volet Client) */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <button
            onClick={() => navigateTo('browse')}
            className={`whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              isTransparent
                ? 'text-white/85 hover:text-white'
                : activePage === 'browse'
                ? 'text-[#D9532B] font-semibold'
                : 'text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{t.navExplore}</span>
          </button>

          <button
            onClick={() => navigateTo('host')}
            className={`whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              isTransparent
                ? 'text-white/85 hover:text-white'
                : activePage === 'host'
                ? 'text-[#D9532B] font-semibold'
                : 'text-[#6B6B6B] hover:text-[#D9532B]'
            }`}
          >
            <PlusCircle className={`w-4 h-4 ${isTransparent ? 'text-white' : 'text-[#111111]'}`} />
            <span>{t.navPublishSpace}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Langue, Se connecter, S'inscrire) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`p-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/15'
                  : 'text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F5F2]'
              }`}
              aria-label="Select language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold">{language}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-[#111111] rounded-2xl shadow-xl border border-[#E5E2DD] p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                    language === 'fr' ? 'bg-[#D9532B]/10 text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                    language === 'en' ? 'bg-[#D9532B]/10 text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* Boutons Se connecter & S'inscrire */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => openAuthModal('login')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/15'
                  : 'text-[#111111] hover:bg-[#F7F5F2]'
              }`}
            >
              {t.navLogin}
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isTransparent
                  ? 'bg-white text-[#111111] hover:bg-white/90'
                  : 'bg-[#D9532B] hover:bg-[#C24520] text-white'
              }`}
            >
              {t.navSignUp}
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl cursor-pointer ${
              isTransparent
                ? 'text-white hover:bg-white/15'
                : 'text-[#111111] hover:bg-[#F7F5F2]'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E2DD] bg-white text-[#111111] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-4 shadow-xl">
          <button
            onClick={() => {
              navigateTo('browse');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-[#F7F5F2] text-[#111111] flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D9532B]" />
            <span>{t.navExplore}</span>
          </button>
          <button
            onClick={() => {
              navigateTo('host');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-[#F7F5F2] text-[#111111] flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#D9532B]" />
            <span>{t.navPublishSpace}</span>
          </button>
          <div className="pt-2 border-t border-[#E5E2DD] flex gap-2">
            <button
              onClick={() => {
                openAuthModal('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center rounded-xl border border-[#E5E2DD] text-xs font-bold text-[#111111]"
            >
              {t.navLogin}
            </button>
            <button
              onClick={() => {
                openAuthModal('signup');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center rounded-xl bg-[#D9532B] text-white text-xs font-bold shadow-xs"
            >
              {t.navSignUp}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
