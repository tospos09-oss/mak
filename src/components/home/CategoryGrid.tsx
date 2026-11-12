import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityCategory } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityCardItem {
  id: ActivityCategory;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  count: number;
  image: string;
}

const ACTIVITIES: ActivityCardItem[] = [
  {
    id: 'shooting',
    name: 'Shooting photo',
    nameEn: 'Photo Shoot',
    tagline: 'Studios cyclorama & décors d’exception',
    taglineEn: 'Cyclorama studios & exceptional decors',
    count: 24,
    image: '/src/assets/images/photo_studio_algiers_1794061914952.jpg',
  },
  {
    id: 'reunion',
    name: 'Réunion & Conseil',
    nameEn: 'Meeting & Boardroom',
    tagline: 'Salles exécutives & visioconférence',
    taglineEn: 'Executive rooms & video conferencing',
    count: 18,
    image: '/src/assets/images/meeting_room_algiers_1794061915913.jpg',
  },
  {
    id: 'evenement',
    name: 'Événement & Rooftop',
    nameEn: 'Event & Rooftop',
    tagline: 'Terrasses vue mer & villas d’Alger',
    taglineEn: 'Sea-view terraces & Algiers villas',
    count: 19,
    image: '/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg',
  },
  {
    id: 'tournage',
    name: 'Tournage & Production',
    nameEn: 'Filming & Production',
    tagline: 'Patios traditionnels & lofts d’artistes',
    taglineEn: 'Traditional courtyards & artists lofts',
    count: 14,
    image: '/src/assets/images/villa_event_garden_1794061916036.jpg',
  },
  {
    id: 'conference',
    name: 'Conférence & Séminaire',
    nameEn: 'Conference & Seminar',
    tagline: 'Auditoriums & grands espaces d’affaires',
    taglineEn: 'Auditoriums & large corporate spaces',
    count: 12,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'formation',
    name: 'Formation & Atelier',
    nameEn: 'Training & Workshop',
    tagline: 'Salles modulables & espaces design thinking',
    taglineEn: 'Modular rooms & design thinking spaces',
    count: 15,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'podcast',
    name: 'Podcast & Studio Son',
    nameEn: 'Podcast & Audio Studio',
    tagline: 'Cabines insonorisées & micros Shure',
    taglineEn: 'Soundproof booths & studio microphones',
    count: 9,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'coworking',
    name: 'Coworking & Bureaux',
    nameEn: 'Coworking & Desks',
    tagline: 'Open spaces & postes nomades fibrés',
    taglineEn: 'Open spaces & dedicated high-speed fiber',
    count: 22,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
  },
];

export const CategoryGrid: React.FC = () => {
  const { navigateTo, setFilters, t, language } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: ActivityCategory) => {
    setFilters((prev) => ({ ...prev, activity: category }));
    navigateTo('browse');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2">
              {t.categoriesSubtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              {t.categoriesTitle}
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label={language === 'en' ? 'Scroll left' : 'Faire défiler vers la gauche'}
              className="w-10 h-10 rounded-full border border-[#E5E2DD] bg-white hover:bg-[#F7F5F2] hover:border-[#D0CCC6] text-[#111111] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label={language === 'en' ? 'Scroll right' : 'Faire défiler vers la droite'}
              className="w-10 h-10 rounded-full border border-[#E5E2DD] bg-white hover:bg-[#F7F5F2] hover:border-[#D0CCC6] text-[#111111] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Single Horizontally Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {ACTIVITIES.map((act) => {
            const displayName = language === 'en' ? act.nameEn : act.name;
            const displayTagline = language === 'en' ? act.taglineEn : act.tagline;
            return (
              <div
                key={act.id}
                onClick={() => handleCategoryClick(act.id)}
                className="group relative w-[230px] sm:w-[260px] md:w-[280px] shrink-0 aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 snap-start"
              >
                {/* Image with subtle zoom on hover */}
                <img
                  src={act.image}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                />

                {/* Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Text metadata overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex flex-col justify-end">
                  <div className="text-[11px] font-semibold text-white/75 uppercase tracking-wider mb-1">
                    {act.count} {t.spacesCountAlgiers}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-[#F7F5F2] transition-colors">
                    {displayName}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 font-normal">
                    {displayTagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
