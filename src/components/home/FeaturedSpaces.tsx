import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SpaceCard } from './SpaceCard';
import { ActivityCategory } from '../../types';
import { ArrowRight } from 'lucide-react';

export const FeaturedSpaces: React.FC = () => {
  const { spaces, navigateTo, setFilters } = useApp();
  const [activeTab, setActiveTab] = useState<ActivityCategory | 'all'>('all');

  const filtered = activeTab === 'all'
    ? spaces.slice(0, 6)
    : spaces.filter((s) => s.primaryCategory === activeTab || s.allowedActivities.includes(activeTab)).slice(0, 6);

  return (
    <section className="py-20 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Segmented Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2">
              Sélection d'exception
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              Espaces populaires à Alger
            </h2>
          </div>

          {/* Functional interactive tabs (buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#6B6B6B] hover:text-[#111111] border border-[#E5E2DD]'
              }`}
            >
              Tous les lieux
            </button>
            <button
              onClick={() => setActiveTab('evenement')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeTab === 'evenement'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#6B6B6B] hover:text-[#111111] border border-[#E5E2DD]'
              }`}
            >
              Rooftops & Patios
            </button>
            <button
              onClick={() => setActiveTab('shooting')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeTab === 'shooting'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#6B6B6B] hover:text-[#111111] border border-[#E5E2DD]'
              }`}
            >
              Studios Photo
            </button>
            <button
              onClick={() => setActiveTab('reunion')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeTab === 'reunion'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white text-[#6B6B6B] hover:text-[#111111] border border-[#E5E2DD]'
              }`}
            >
              Salles de Réunion
            </button>
          </div>
        </div>

        {/* 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, activity: activeTab }));
              navigateTo('browse');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#D9532B] text-white text-sm font-semibold transition-all hover:scale-102 shadow-md"
          >
            <span>Voir tous les {spaces.length} espaces d'Alger</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
