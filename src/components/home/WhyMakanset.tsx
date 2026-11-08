import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Clock } from 'lucide-react';

interface ReasonItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  image: string;
  imageCaption: string;
}

const REASONS: ReasonItem[] = [
  {
    id: 'choice',
    number: '01',
    title: 'Un large choix de lieux d’exception à Alger',
    description: 'Des studios cyclorama à Hydra aux rooftops panoramiques d’El-Biar, en passant par les lofts de Didouche Mourad. Chaque espace est vérifié physiquement par nos équipes pour garantir des standards élevés de confort et de matériel.',
    icon: ShieldCheck,
    image: '/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg',
    imageCaption: 'Rooftop panoramique · EL BIAR, ALGER',
  },
  {
    id: 'service',
    number: '02',
    title: 'Une équipe dédiée & conciergerie réactive à Alger',
    description: 'Une question sur les accès, le stationnement ou les équipements ? Nos conseillers Makanset vous accompagnent pas à pas pour assurer la réussite de votre événement. Réponse moyenne en moins de 15 minutes.',
    icon: MessageCircle,
    image: '/src/assets/images/meeting_room_algiers_1794061915913.jpg',
    imageCaption: 'Salle de conseil exécutive · ALGER-CENTRE',
  },
  {
    id: 'pricing',
    number: '03',
    title: 'Des tarifs transparents en Dinars Algériens',
    description: 'Aucune mauvaise surprise : le tarif horaire, le minimum d’heures et les options choisies (café, micros, flashs) sont calculés au dinar près en temps réel. Paiement en ligne Chargily / SATIM ou règlement sur place.',
    icon: Clock,
    image: '/src/assets/images/villa_event_garden_1794061916036.jpg',
    imageCaption: 'Patio & jardin de réception · KOUBA, ALGER',
  },
];

export const WhyMakanset: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentReason = REASONS[activeIdx];

  return (
    <section className="py-24 bg-white border-t border-[#E5E2DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2">
            La promesse Makanset
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
            Une nouvelle manière de réserver vos espaces
          </h2>
        </div>

        {/* 2-Column Split: 3 Numbered Arguments Left + Dynamic High-Res Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Numbered list with click / active selector */}
          <div className="lg:col-span-6 space-y-6">
            {REASONS.map((item, index) => {
              const isActive = index === activeIdx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#F7F5F2] border-[#E5E2DD] shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`text-2xl sm:text-3xl font-extrabold font-display transition-colors ${
                        isActive ? 'text-[#D9532B]' : 'text-[#CCCCCC]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Media Frame with Caption */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-[#F7F5F2]">
              <img
                src={currentReason.image}
                alt={currentReason.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              {/* Caption and Indicator */}
              <div className="absolute bottom-6 inset-x-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] font-semibold text-white/75 uppercase tracking-wider mb-1">
                    Espace d'Algérie
                  </div>
                  <div className="text-sm font-bold text-white">
                    {currentReason.imageCaption}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-mono font-bold border border-white/20">
                  0{activeIdx + 1} / 03
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
