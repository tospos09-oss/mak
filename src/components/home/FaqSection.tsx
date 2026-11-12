import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST_FR: FaqItem[] = [
  {
    question: "Comment fonctionne la réservation à l'heure sur Makanset ?",
    answer: "Vous choisissez votre date et vos horaires précis (par exemple de 9h à 13h). Le total de la location et des éventuelles options (café, matériel) est calculé automatiquement. Vous envoyez votre demande en un clic, et notre équipe ou le système confirme votre réservation sous 15 minutes en moyenne.",
  },
  {
    question: "Quels sont les modes de paiement acceptés en Algérie ?",
    answer: "Makanset propose deux options de règlement : le paiement en ligne sécurisé par carte CIB et Edahabia via la passerelle Chargily Pay / SATIM, ou le paiement direct sur place / par virement BaridiMob / CCP avec confirmation manuelle.",
  },
  {
    question: "Comment puis-je publier mon propre espace à Alger ?",
    answer: "Il vous suffit de cliquer sur « Publier un espace » dans la barre de navigation. Renseignez la localisation (commune d'Alger), les photos, vos tarifs par heure et vos règles. La publication est gratuite, sans engagement, et notre équipe vous contacte sous 24h pour la validation physique.",
  },
  {
    question: "Puis-je visiter un lieu avant de confirmer ma réservation ?",
    answer: "Oui, pour les événements d'envergure ou les tournages complexes nécessitant un repérage technique, un créneau de visite préalable de 15 à 30 minutes peut être organisé avec notre équipe.",
  },
  {
    question: "Quelle est la politique d'annulation ?",
    answer: "Chaque espace dispose d'une politique claire (flexible, modérée ou stricte). Dans le cas d'une politique flexible, vous pouvez annuler sans aucun frais jusqu'à 24h avant le début de votre créneau horaire.",
  },
  {
    question: "Les prix affichés comprennent-ils toutes les taxes et frais ?",
    answer: "Oui, la tarification est 100% transparente en Dinars Algériens (DA). Les frais de service de la plateforme (7%) sont détaillés de manière limpide avant toute validation, sans aucun coût caché.",
  },
];

const FAQ_LIST_EN: FaqItem[] = [
  {
    question: "How does hourly booking work on Makanset?",
    answer: "You select your exact date and hours (e.g., 9:00 AM to 1:00 PM). The space rental and any selected add-ons (coffee, equipment) are calculated automatically. Submit your booking request in one click, and it is typically confirmed within 15 minutes.",
  },
  {
    question: "Which payment methods are accepted in Algeria?",
    answer: "Makanset provides two secure payment options: instant online payment via CIB and Edahabia cards through the Chargily Pay / SATIM gateway, or direct on-site payment / BaridiMob / CCP bank transfer with swift manual confirmation.",
  },
  {
    question: "How can I list my own space in Algiers?",
    answer: "Simply click on 'List a Space' in the navigation header. Provide your district in Algiers, upload photos, set your hourly rates, and specify house rules. Listing is 100% free with no commitment, and our team contacts you within 24 hours for physical verification.",
  },
  {
    question: "Can I scout a venue before confirming my booking?",
    answer: "Yes, for large corporate productions or complex filming shoots requiring a technical walkthrough, a 15-to-30-minute advance scouting visit can be arranged with our local team.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Each space features a clear cancellation policy (flexible, moderate, or strict). Under a flexible policy, you can cancel free of charge up to 24 hours before your booking start time.",
  },
  {
    question: "Do displayed rates include all fees and taxes?",
    answer: "Yes, pricing is 100% transparent in Algerian Dinars (DZD). The platform service fee (7%) is clearly itemized before checkout with zero hidden surprises.",
  },
];

export const FaqSection: React.FC = () => {
  const { t, language } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqList = language === 'en' ? FAQ_LIST_EN : FAQ_LIST_FR;

  return (
    <section className="py-24 bg-white border-t border-[#E5E2DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
            {t.faqSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
            {t.faqTitle}
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2">
            {t.faqDesc}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F7F5F2] rounded-2xl border border-[#E5E2DD] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EFECE6] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#111111]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B6B6B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D9532B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E5E2DD] pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
