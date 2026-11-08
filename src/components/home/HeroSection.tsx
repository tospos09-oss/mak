import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNE_LIST, CATEGORY_METADATA } from '../../data/mockData';
import { ActivityCategory, AlgiersCommune } from '../../types';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, filters, setFilters, t } = useApp();

  const [selectedAct, setSelectedAct] = useState<ActivityCategory | 'all'>(filters.activity);
  const [selectedComm, setSelectedComm] = useState<AlgiersCommune | 'all'>(filters.commune);
  const [selectedDate, setSelectedDate] = useState<string>(filters.date || '');
  const [guests, setGuests] = useState<number>(filters.guests || 1);

  const [actDropdownOpen, setActDropdownOpen] = useState(false);
  const [communeDropdownOpen, setCommuneDropdownOpen] = useState(false);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      activity: selectedAct,
      commune: selectedComm,
      date: selectedDate,
      guests,
    }));
    navigateTo('browse');
  };

  const activityEntries = Object.entries(CATEGORY_METADATA) as [
    ActivityCategory,
    { label: string; count: number; description: string }
  ][];

  return (
    <section className="relative w-full h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Hero Image */}
      <img
        src="/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg"
        alt="Rooftop panoramique moderne sur la baie d'Alger"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      />

      {/* Measured Scrim for Media Overlays ensuring WCAG AA contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

      {/* Hero Center Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-20 sm:pt-24 pb-12">
        {/* H1 Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 text-balance drop-shadow-sm font-display">
          {t.tagline}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mb-10 font-normal leading-relaxed">
          {t.slogan}
        </p>

        {/* Floating Search Pill Bar */}
        <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl border border-black/10 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DD] text-left"
          >
            {/* Field 1: Que préparez-vous ? (Activité) */}
            <div className="relative flex-1 px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-0.5">
                {t.searchWhat}
              </label>
              <button
                type="button"
                onClick={() => {
                  setActDropdownOpen(!actDropdownOpen);
                  setCommuneDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#D9532B] transition-colors"
              >
                <span className="truncate">
                  {selectedAct === 'all'
                    ? t.allActivities
                    : CATEGORY_METADATA[selectedAct]?.label || t.searchWhatPlaceholder}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] shrink-0 ml-1" />
              </button>

              {/* Dropdown Activity */}
              {actDropdownOpen && (
                <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-xl border border-[#E5E2DD] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-bold text-[#6B6B6B] px-3 py-1.5 uppercase tracking-wider">
                    Catégories d'activités
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAct('all');
                      setActDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                      selectedAct === 'all' ? 'bg-[#F7F5F2] text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    Toutes les activités
                  </button>
                  {activityEntries.map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedAct(key);
                        setActDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between ${
                        selectedAct === key ? 'bg-[#F7F5F2] text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span>{val.label}</span>
                      <span className="text-[10px] text-[#6B6B6B] font-normal">{val.count} lieux</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 2: Où ? (Commune d'Alger) */}
            <div className="relative flex-1 px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-0.5">
                {t.searchWhere}
              </label>
              <button
                type="button"
                onClick={() => {
                  setCommuneDropdownOpen(!communeDropdownOpen);
                  setActDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#D9532B] transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#D9532B] shrink-0" />
                  <span className="truncate">
                    {selectedComm === 'all' ? "Toutes les communes d'Alger" : selectedComm}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] shrink-0 ml-1" />
              </button>

              {/* Dropdown Communes */}
              {communeDropdownOpen && (
                <div className="absolute left-0 top-full mt-3 w-72 max-h-64 overflow-y-auto bg-white rounded-2xl shadow-xl border border-[#E5E2DD] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-bold text-[#6B6B6B] px-3 py-1.5 uppercase tracking-wider">
                    Communes & Quartiers
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedComm('all');
                      setCommuneDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                      selectedComm === 'all' ? 'bg-[#F7F5F2] text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    Toutes les communes
                  </button>
                  {COMMUNE_LIST.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSelectedComm(c);
                        setCommuneDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                        selectedComm === c ? 'bg-[#F7F5F2] text-[#D9532B] font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 3: Quand ? (Date) */}
            <div className="flex-1 px-4 py-2 sm:py-1">
              <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-0.5">
                {t.searchWhen}
              </label>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6B6B6B] shrink-0" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-[#111111] bg-transparent focus:outline-none cursor-pointer"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Field 4: Personnes + CTA Search */}
            <div className="flex items-center justify-between gap-3 px-3 py-2 sm:py-1">
              <div className="pl-1">
                <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-0.5">
                  {t.searchGuests}
                </label>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#6B6B6B] shrink-0" />
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-xs sm:text-sm font-semibold text-[#111111] bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Accent Search Button */}
              <button
                type="submit"
                className="h-11 px-5 sm:px-6 bg-[#D9532B] hover:bg-[#C24520] text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-bold tracking-tight">{t.searchAction}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick activity badges under search */}
        <div className="hidden sm:flex items-center justify-center gap-2 mt-6 flex-wrap">
          {activityEntries.slice(0, 5).map(([key, val]) => (
            <button
              key={key}
              onClick={() => {
                setFilters((prev) => ({ ...prev, activity: key }));
                navigateTo('browse');
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium border border-white/20 transition-all hover:scale-105"
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        type="button"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
        aria-label="Défiler vers les espaces"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
          Explorer
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-white/90" />
      </button>
    </section>
  );
};
