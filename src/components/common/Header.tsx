import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import {
  Calendar,
  Globe,
  Menu,
  X,
  Compass,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    language,
    setLanguage,
    t,
    currentUser,
  } = useApp();

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection:
  // When activePage === 'home':
  // Initial (at top): transparent (background-color: none)
  // Directly when scrolling starts (> 15px): background-color = #ffffff
  useEffect(() => {
    if (activePage !== 'home') {
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

  // Determine if header should be transparent
  const isTransparent = activePage === 'home' && !isScrolled;

  return (
    <header
      className={`z-40 w-full transition-all duration-300 ${
        activePage === 'home'
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
            onClick={() => navigateTo('bookings')}
            className={`whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              isTransparent
                ? 'text-white/85 hover:text-white'
                : activePage === 'bookings'
                ? 'text-[#D9532B] font-semibold'
                : 'text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.navBookings}</span>
          </button>
        </nav>

        {/* Zone 3: Actions Client (Langue, Notifications, Profil) */}
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
              aria-label="Sélectionner la langue"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase font-semibold">{language}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-[#111111] rounded-2xl shadow-xl border border-[#E5E2DD] p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                    language === 'fr' ? 'bg-[#D9532B]/10 text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                    language === 'ar' ? 'bg-[#D9532B]/10 text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  العربية (الجزائر)
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

          {/* User Client Profile pill */}
          <button
            onClick={() => navigateTo('bookings')}
            className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border transition-all cursor-pointer ${
              isTransparent
                ? 'border-white/30 hover:border-white bg-white/10 text-white'
                : 'border-[#E5E2DD] hover:border-[#111111] text-[#111111]'
            }`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/50"
            />
            <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:inline">
              {currentUser.name}
            </span>
          </button>

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
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-[#F7F5F2] text-[#111111] flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#D9532B]" />
            <span>{t.navExplore}</span>
          </button>
          <button
            onClick={() => {
              navigateTo('bookings');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-[#F7F5F2] text-[#111111] flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#D9532B]" />
            <span>{t.navBookings}</span>
          </button>
        </div>
      )}
    </header>
  );
};
