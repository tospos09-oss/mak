import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../i18n/translations';
import { SpaceCard } from '../home/SpaceCard';
import { COMMUNE_LIST, CATEGORY_METADATA } from '../../data/mockData';
import { ActivityCategory, AlgiersCommune } from '../../types';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Users,
  Calendar,
  X,
  ChevronDown,
} from 'lucide-react';

export const SearchResults: React.FC = () => {
  const { filteredSpaces, filters, setFilters, resetFilters, language } = useApp();
  const t = translations[language];

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc'>('recommended');

  const getActivityLabel = (key: ActivityCategory, defaultLabel: string) => {
    if (language !== 'en') return defaultLabel;
    switch (key) {
      case 'reunion': return t.actMeeting;
      case 'conference': return t.actConference;
      case 'formation': return t.actWorkshop;
      case 'shooting': return t.actPhoto;
      case 'evenement': return t.actEvent;
      case 'tournage': return t.actFilming;
      case 'coworking': return t.actCoworking;
      case 'podcast': return t.actPodcast;
      default: return defaultLabel;
    }
  };

  // Sorting
  const sortedSpaces = [...filteredSpaces].sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricing.pricePerHour - b.pricing.pricePerHour;
    if (sortBy === 'price_desc') return b.pricing.pricePerHour - a.pricing.pricePerHour;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handleActivityChange = (act: ActivityCategory | 'all') => {
    setFilters((prev) => ({ ...prev, activity: act }));
  };

  const handleCommuneChange = (comm: AlgiersCommune | 'all') => {
    setFilters((prev) => ({ ...prev, commune: comm }));
  };

  const activityEntries = Object.entries(CATEGORY_METADATA) as [
    ActivityCategory,
    { label: string; count: number; description: string }
  ][];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Filter & Control Strip */}
      <div className="sticky top-18 z-30 bg-white border-b border-[#E5E2DD] px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Quick Filter Selectors (Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            
            {/* Activity selector */}
            <div className="relative shrink-0">
              <select
                value={filters.activity}
                onChange={(e) => handleActivityChange(e.target.value as any)}
                aria-label={t.searchWhat}
                className="h-10 px-3.5 pr-8 rounded-full border border-[#E5E2DD] bg-[#F7F5F2] hover:bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9532B] appearance-none cursor-pointer"
              >
                <option value="all">{t.allActivities}</option>
                {activityEntries.map(([k, v]) => (
                  <option key={k} value={k}>
                    {getActivityLabel(k, v.label)}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Commune selector */}
            <div className="relative shrink-0">
              <select
                value={filters.commune}
                onChange={(e) => handleCommuneChange(e.target.value as any)}
                aria-label={t.searchWhere}
                className="h-10 px-3.5 pr-8 rounded-full border border-[#E5E2DD] bg-[#F7F5F2] hover:bg-white text-xs font-semibold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9532B] appearance-none cursor-pointer"
              >
                <option value="all">{t.allCommunes}</option>
                {COMMUNE_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Date input */}
            <div className="relative shrink-0 hidden sm:flex items-center h-10 px-3 rounded-full border border-[#E5E2DD] bg-[#F7F5F2] hover:bg-white text-xs font-semibold text-[#111111]">
              <Calendar className="w-3.5 h-3.5 text-[#6B6B6B] mr-2" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                className="bg-transparent focus:outline-none text-xs font-semibold cursor-pointer"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Guests count */}
            <div className="relative shrink-0 hidden md:flex items-center h-10 px-3.5 rounded-full border border-[#E5E2DD] bg-[#F7F5F2] hover:bg-white text-xs font-semibold text-[#111111] gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span>{filters.guests} {language === 'en' ? 'guests' : 'pers.'}</span>
            </div>

            {/* Reset filter button if active */}
            {(filters.activity !== 'all' || filters.commune !== 'all' || filters.date || filters.guests > 1) && (
              <button
                onClick={resetFilters}
                className="h-10 px-3 rounded-full text-xs font-semibold text-[#D9532B] hover:bg-[#D9532B]/10 flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Reset' : 'Réinitialiser'}</span>
              </button>
            )}
          </div>

          {/* Right: Sort and Mobile Filter */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={language === 'en' ? 'Sort results' : 'Trier les résultats'}
                className="h-10 px-3.5 pr-8 rounded-full border border-[#E5E2DD] bg-white text-xs font-semibold text-[#111111] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="recommended">{language === 'en' ? 'Recommended' : 'Recommandés'}</option>
                <option value="price_asc">{language === 'en' ? 'Price: Low to High' : 'Prix croissant'}</option>
                <option value="price_desc">{language === 'en' ? 'Price: High to Low' : 'Prix décroissant'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Sheet Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="sm:hidden h-10 px-3.5 rounded-full border border-[#E5E2DD] bg-[#F7F5F2] flex items-center gap-1.5 text-xs font-semibold text-[#111111] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Filters' : 'Filtres'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Responsive Grid of Spaces */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Count and Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-[#6B6B6B]">
            <span className="font-bold text-[#111111]">{sortedSpaces.length}</span>{' '}
            {language === 'en' ? 'spaces available in Algiers' : 'espaces disponibles à Alger'}
            {filters.commune !== 'all' && <span> · {filters.commune}</span>}
            {filters.activity !== 'all' && <span> · {getActivityLabel(filters.activity, CATEGORY_METADATA[filters.activity]?.label || '')}</span>}
          </div>
        </div>

        {/* View Mode Layouts */}
        {sortedSpaces.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#F7F5F2] flex items-center justify-center mx-auto mb-4 text-[#D9532B]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
              {language === 'en' ? 'No spaces match these criteria' : 'Aucun espace ne correspond à ces critères'}
            </h3>
            <p className="text-xs text-[#6B6B6B] mb-6">
              {language === 'en'
                ? 'Try broadening your search by choosing all districts or another activity type.'
                : "Essayez d'élargir votre recherche en sélectionnant toutes les communes ou une autre catégorie d'activité."}
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#D9532B] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {language === 'en' ? 'View all spaces' : 'Voir tous les espaces'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DD] mb-5">
              <span className="text-base font-bold text-[#111111] font-display">
                {language === 'en' ? 'Search Filters' : 'Filtres de recherche'}
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Activity selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Activity' : 'Activité'}
              </label>
              <select
                value={filters.activity}
                onChange={(e) => handleActivityChange(e.target.value as any)}
                aria-label={language === 'en' ? 'Filter by activity' : 'Filtrer par activité'}
                className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-sm font-semibold"
              >
                <option value="all">{t.allActivities}</option>
                {activityEntries.map(([k, v]) => (
                  <option key={k} value={k}>
                    {getActivityLabel(k, v.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Commune selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Algiers District' : "Commune d'Alger"}
              </label>
              <select
                value={filters.commune}
                onChange={(e) => handleCommuneChange(e.target.value as any)}
                aria-label={language === 'en' ? 'Filter by district' : 'Filtrer par commune'}
                className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-sm font-semibold"
              >
                <option value="all">{t.allCommunes}</option>
                {COMMUNE_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Date selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Desired Date' : 'Date souhaitée'}
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-sm font-semibold cursor-pointer"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#111111] mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Number of guests' : 'Nombre de personnes'}
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={filters.guests}
                onChange={(e) => setFilters((prev) => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-sm font-semibold"
              />
            </div>

            {/* Apply and Reset */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#E5E2DD]">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-semibold text-[#6B6B6B] hover:text-[#111111]"
              >
                {language === 'en' ? 'Reset' : 'Réinitialiser'}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#D9532B] text-white rounded-full text-xs font-bold shadow-md cursor-pointer"
              >
                {language === 'en' ? `Apply (${sortedSpaces.length})` : `Appliquer (${sortedSpaces.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
