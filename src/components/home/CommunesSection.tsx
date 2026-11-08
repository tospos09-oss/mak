import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNE_LIST } from '../../data/mockData';
import { AlgiersCommune } from '../../types';
import { MapPin, ArrowRight } from 'lucide-react';

export const CommunesSection: React.FC = () => {
  const { navigateTo, setFilters } = useApp();

  const handleCommuneClick = (commune: AlgiersCommune) => {
    setFilters((prev) => ({ ...prev, commune, activity: 'all' }));
    navigateTo('browse');
  };

  const featuredCommunes: { name: AlgiersCommune; tag: string; count: number }[] = [
    { name: 'Alger-Centre', tag: 'Didouche, Audin & Front de mer', count: 18 },
    { name: 'Hydra', tag: 'Paradou & Val d’Hydra', count: 14 },
    { name: 'El Biar', tag: 'Hauteurs & Vue Baie d’Alger', count: 9 },
    { name: 'Kouba', tag: 'Villas & Patios Mauresques', count: 11 },
    { name: 'Bab Ezzouar', tag: 'Pôle d’Affaires & Aéroport', count: 8 },
    { name: 'Dely Ibrahim', tag: 'Bois des Cars & Ateliers', count: 7 },
    { name: 'Cheraga', tag: 'Bouchaoui & Espaces Nature', count: 6 },
    { name: 'Staoueli', tag: 'Club des Pins & Bord de mer', count: 5 },
  ];

  return (
    <section className="py-20 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2">
              Territoire & Localisation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              Explorez par commune d'Alger
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, commune: 'all' }));
              navigateTo('browse');
            }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#D9532B] transition-colors"
          >
            <span>Toutes les communes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Communes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCommunes.map((comm) => (
            <div
              key={comm.name}
              onClick={() => handleCommuneClick(comm.name)}
              className="bg-white p-6 rounded-2xl border border-[#E5E2DD] hover:border-[#111111] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F5F2] group-hover:bg-[#D9532B]/10 flex items-center justify-center transition-colors">
                    <MapPin className="w-4 h-4 text-[#D9532B]" />
                  </div>
                  <span className="text-xs font-semibold text-[#6B6B6B]">
                    {comm.count} lieux
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111] group-hover:text-[#D9532B] transition-colors">
                  {comm.name}
                </h3>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  {comm.tag}
                </p>
              </div>

              <div className="mt-5 flex items-center text-xs font-semibold text-[#111111] group-hover:text-[#D9532B] transition-colors">
                <span>Découvrir</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
