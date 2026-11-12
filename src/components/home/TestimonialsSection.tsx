import React from 'react';
import { useApp } from '../../context/AppContext';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  roleEn: string;
  activity: string;
  activityEn: string;
  commune: string;
  communeEn: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Trouver un studio cyclorama équipé à Hydra réservable pour seulement 4 heures a révolutionné la production de notre campagne publicitaire. Tout était conforme aux photos.",
    author: "Yasmine T.",
    role: "Directrice Artistique, Agence Média",
    roleEn: "Artistic Director, Media Agency",
    activity: "Shooting Photo & Vidéo",
    activityEn: "Photo & Video Shoot",
    commune: "Hydra, Alger",
    communeEn: "Hydra, Algiers",
  },
  {
    quote: "Nous cherchions une salle de conseil prestigieuse avec vue dégagée pour recevoir nos partenaires internationaux. Le rooftop à El Biar était impeccable et le paiement Chargily immédiat.",
    author: "Sofiane B.",
    role: "CEO Startup Fintech",
    roleEn: "Fintech Startup CEO",
    activity: "Réunion Exécutive",
    activityEn: "Executive Meeting",
    commune: "El Biar, Alger",
    communeEn: "El Biar, Algiers",
  },
  {
    quote: "J'ai organisé un atelier de design pour 18 personnes dans un loft à Alger-Centre. Le calcul transparent du café et du projecteur en direct nous a évité les mauvaises surprises habituelles.",
    author: "Amina L.",
    role: "Formatrice & Consultante",
    roleEn: "Trainer & Consultant",
    activity: "Formation & Workshop",
    activityEn: "Training & Workshop",
    commune: "Alger-Centre",
    communeEn: "Algiers Center",
  },
];

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useApp();

  return (
    <section className="py-24 bg-[#F7F5F2] border-t border-[#E5E2DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
            {t.testimonialsSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
            {t.testimonialsTitle}
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2">
            {t.testimonialsDesc}
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md flex flex-col justify-between hover:border-[#111111]/20 transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D9532B] mb-4 opacity-70" />
                <p className="text-xs sm:text-sm text-[#111111] font-medium leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DD]">
                <div className="font-bold text-sm text-[#111111]">{item.author}</div>
                <div className="text-xs text-[#6B6B6B]">
                  {language === 'en' ? item.roleEn : item.role}
                </div>
                <div className="inline-block mt-2 px-2.5 py-1 rounded-full bg-[#F7F5F2] text-[10px] font-semibold text-[#D9532B] border border-[#E5E2DD]">
                  {language === 'en' ? `${item.activityEn} · ${item.communeEn}` : `${item.activity} · ${item.commune}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
