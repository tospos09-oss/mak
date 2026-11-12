import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, CalendarCheck, Sparkles, Building2, ShieldCheck, Banknote, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { navigateTo, t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'renter' | 'owner'>('renter');

  const renterStepsFr = [
    {
      step: '01',
      title: 'Trouvez le lieu idéal à Alger',
      description: 'Filtrez par commune (Hydra, Alger-Centre, El Biar...), activité (shooting, réunion, tournage...) et capacité souhaitée.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Réservez à l’heure ou à la journée',
      description: 'Sélectionnez votre date, vos horaires précis et ajoutez des options (café, vidéoprojecteur, éclairage studio, sonorisation).',
      icon: CalendarCheck,
    },
    {
      step: '03',
      title: 'Profitez de votre espace clé en main',
      description: 'Accédez au lieu en toute sérénité. Paiement sécurisé en ligne (Chargily Pay CIB/Edahabia) ou règlement sur place avec confirmation.',
      icon: Sparkles,
    },
  ];

  const renterStepsEn = [
    {
      step: '01',
      title: 'Find the ideal space in Algiers',
      description: 'Filter by district (Hydra, Alger-Centre, El Biar...), activity (photoshoot, meeting, filming...), and guest count.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Book by the hour or by the day',
      description: 'Select your date, exact hours, and choose optional add-ons (coffee service, projector, lighting equipment, sound).',
      icon: CalendarCheck,
    },
    {
      step: '03',
      title: 'Enjoy your turnkey venue',
      description: 'Access the space with peace of mind. Pay securely online (Chargily Pay CIB/Edahabia) or pay on-site upon arrival.',
      icon: Sparkles,
    },
  ];

  const ownerStepsFr = [
    {
      step: '01',
      title: 'Publiez votre annonce gratuitement',
      description: 'Ajoutez les photos de votre espace, vos tarifs par heure en dinars (DA) et vos règles d’accueil en quelques minutes.',
      icon: Building2,
    },
    {
      step: '02',
      title: 'Vérification physique & accompagnement',
      description: 'Notre équipe locale valide la conformité et les équipements de votre lieu pour garantir la confiance de nos locataires.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Encaissez vos revenus en toute liberté',
      description: 'Recevez des demandes qualifiées d’entreprises et de créateurs. Vous gardez la main totale sur votre calendrier.',
      icon: Banknote,
    },
  ];

  const ownerStepsEn = [
    {
      step: '01',
      title: 'List your space for free',
      description: 'Upload photos of your space, set hourly rates in Algerian Dinars (DZD), and publish your house rules in minutes.',
      icon: Building2,
    },
    {
      step: '02',
      title: 'Physical verification & guidance',
      description: 'Our Algiers team confirms the quality and amenities of your venue to ensure trust with verified guests.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Collect earnings on your terms',
      description: 'Receive qualified booking requests from companies and creative professionals while maintaining full control of your schedule.',
      icon: Banknote,
    },
  ];

  const currentSteps = activeTab === 'renter'
    ? (language === 'en' ? renterStepsEn : renterStepsFr)
    : (language === 'en' ? ownerStepsEn : ownerStepsFr);

  return (
    <section className="py-24 bg-white border-t border-[#E5E2DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
              {t.howItWorksSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-2">
              {t.howItWorksDesc}
            </p>
          </div>

          {/* Toggle Renter / Owner */}
          <div className="inline-flex p-1.5 bg-[#F7F5F2] rounded-full border border-[#E5E2DD] shadow-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('renter')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'renter'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {t.forRenters}
            </button>
            <button
              onClick={() => setActiveTab('owner')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'owner'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {t.forOwners}
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F5F2] rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#D9532B]/10 text-[#D9532B] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-[#D0CCC6] font-display">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for active role */}
        <div className="mt-12 text-center">
          {activeTab === 'renter' ? (
            <button
              onClick={() => navigateTo('browse')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>{t.findSpaceNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('host')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] hover:bg-black text-white font-bold rounded-full text-xs shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>{t.publishMySpace}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
