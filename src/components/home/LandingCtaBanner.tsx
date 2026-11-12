import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, PlusCircle, Compass } from 'lucide-react';

export const LandingCtaBanner: React.FC = () => {
  const { navigateTo, t } = useApp();

  return (
    <section className="relative py-28 sm:py-32 text-white overflow-hidden">
      {/* Background Image: Clearly visible photo of exceptional venue */}
      <img
        src="/src/assets/images/villa_event_garden_1794061916036.jpg"
        alt="Espaces d'exception à Alger"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      />
      {/* Soft gradient to keep image bright and visible while ensuring text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-xs font-bold text-[#D9532B] uppercase tracking-widest mb-3">
          {t.ctaSubtitle}
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-5 text-balance max-w-3xl">
          {t.ctaTitle}
        </h2>

        <p className="text-sm sm:text-base text-[#D0CCC6] max-w-2xl mb-10 leading-relaxed font-normal">
          {t.ctaDesc}
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('browse')}
            className="w-full sm:w-auto px-8 py-4 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-103 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{t.ctaBrowseBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('host')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-md hover:scale-103 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>{t.ctaPublishBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
