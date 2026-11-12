import React, { useState } from 'react';
import { Space } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../i18n/translations';
import { ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react';

interface SpaceCardProps {
  space: Space;
  className?: string;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, className = '' }) => {
  const { navigateTo, language, t } = useApp();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % space.photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + space.photos.length) % space.photos.length);
  };

  return (
    <div
      onClick={() => navigateTo('space-detail', space.id)}
      className={`group cursor-pointer flex flex-col transition-all duration-200 ${className}`}
    >
      {/* Photo Container 4:3 */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F5F2] mb-3 select-none">
        <img
          src={space.photos[activePhotoIdx] || space.photos[0]}
          alt={space.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Carousel Navigation Arrows on Hover (Desktop) */}
        {space.photos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label={language === 'en' ? 'Previous photo' : 'Photo précédente'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label={language === 'en' ? 'Next photo' : 'Photo suivante'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10">
              {space.photos.slice(0, 5).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activePhotoIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Space Card Metadata */}
      <div className="flex flex-col gap-1">
        {/* Row 1: Title (user content preserved) */}
        <h3 className="font-semibold text-[15px] text-[#111111] tracking-tight leading-snug line-clamp-1 group-hover:text-[#D9532B] transition-colors">
          {space.title}
        </h3>

        {/* Row 2: Location · Capacity */}
        <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D9532B]" />
            {space.commune}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {space.capacity} {language === 'en' ? 'guests max' : 'pers max'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{space.surface} m²</span>
        </div>

        {/* Row 3: Price in DZD */}
        <div className="mt-1 flex items-baseline gap-1 text-[#111111]">
          <span className="text-xs text-[#6B6B6B]">{t.fromPrice}</span>
          <span className="font-bold text-base text-[#111111] tabular-nums">
            {formatCurrency(space.pricing.pricePerHour, language)}
          </span>
          <span className="text-xs text-[#6B6B6B]">{language === 'en' ? '/hr' : '/heure'}</span>
        </div>
      </div>
    </div>
  );
};
