import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityCategory } from '../../types';
import { ArrowRight } from 'lucide-react';

interface ActivityCardItem {
  id: ActivityCategory;
  name: string;
  tagline: string;
  count: number;
  image: string;
}

const ACTIVITIES: ActivityCardItem[] = [
  {
    id: 'shooting',
    name: 'Shooting photo',
    tagline: 'Studios cyclorama & décors d’exception',
    count: 24,
    image: '/src/assets/images/photo_studio_algiers_1794061914952.jpg',
  },
  {
    id: 'reunion',
    name: 'Réunion & Conseil',
    tagline: 'Salles exécutives & visioconférence',
    count: 18,
    image: '/src/assets/images/meeting_room_algiers_1794061915913.jpg',
  },
  {
    id: 'evenement',
    name: 'Événement & Rooftop',
    tagline: 'Terrasses vue mer & villas d’Alger',
    count: 19,
    image: '/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg',
  },
  {
    id: 'tournage',
    name: 'Tournage & Production',
    tagline: 'Patios traditionnels & lofts d’artistes',
    count: 14,
    image: '/src/assets/images/villa_event_garden_1794061916036.jpg',
  },
  {
    id: 'conference',
    name: 'Conférence & Séminaire',
    tagline: 'Auditoriums & grands espaces d’affaires',
    count: 12,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'formation',
    name: 'Formation & Atelier',
    tagline: 'Salles modulables & espaces design thinking',
    count: 15,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'podcast',
    name: 'Podcast & Studio Son',
    tagline: 'Cabines insonorisées & micros Shure',
    count: 9,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'coworking',
    name: 'Coworking & Bureaux',
    tagline: 'Open spaces & postes nomades fibrés',
    count: 22,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
  },
];

export const CategoryGrid: React.FC = () => {
  const { navigateTo, setFilters } = useApp();

  const handleCategoryClick = (category: ActivityCategory) => {
    setFilters((prev) => ({ ...prev, activity: category }));
    navigateTo('browse');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2">
              Des espaces sur mesure
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              Louez un lieu unique pour chaque moment
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, activity: 'all' }));
              navigateTo('browse');
            }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#D9532B] transition-colors"
          >
            <span>Parcourir toutes les activités</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Responsive Grid: 4:5 Aspect Ratio Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {ACTIVITIES.map((act) => (
            <div
              key={act.id}
              onClick={() => handleCategoryClick(act.id)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image with subtle zoom on hover */}
              <img
                src={act.image}
                alt={act.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Text metadata overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex flex-col justify-end">
                <div className="text-[11px] font-semibold text-white/75 uppercase tracking-wider mb-1">
                  {act.count} espaces à Alger
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1 group-hover:text-[#F7F5F2] transition-colors">
                  {act.name}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1 font-normal">
                  {act.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
