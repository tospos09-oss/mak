import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNE_LIST } from '../../data/mockData';
import { ActivityCategory, AlgiersCommune } from '../../types';
import { X, CheckCircle2, Building, MapPin, DollarSign, Sparkles, Phone, ArrowRight } from 'lucide-react';

export const PublishSpaceModal: React.FC = () => {
  const { isPublishModalOpen, closePublishModal, addSpace, language } = useApp();

  const [title, setTitle] = useState('');
  const [commune, setCommune] = useState<AlgiersCommune>('Hydra');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('shooting');
  const [pricePerHour, setPricePerHour] = useState<number>(6500);
  const [capacity, setCapacity] = useState<number>(25);
  const [surface, setSurface] = useState<number>(120);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('+213 ');
  const [submitted, setSubmitted] = useState(false);

  if (!isPublishModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSpace({
      title: title || (language === 'en' ? 'New Space in Algiers' : 'Nouvel espace à Alger'),
      slug: (title || 'new-space-algiers').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: language === 'en'
        ? `Magnificent space located in ${commune}, ideal for your professional and creative projects in Algiers.`
        : `Magnifique espace situé à ${commune}, idéal pour vos projets professionnels et créatifs à Alger.`,
      commune,
      address: address || `Rue Principale, ${commune}, Alger`,
      coordinates: { lat: 36.75, lng: 3.05 },
      capacity,
      surface,
      primaryCategory: category,
      allowedActivities: [category, 'reunion'],
      pricing: {
        pricePerHour,
        minHours: 2,
        dayPrice: pricePerHour * 8 * 0.85,
      },
      photos: [
        '/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg',
        '/src/assets/images/meeting_room_algiers_1794061915913.jpg',
      ],
      amenities: ['Wi-Fi Haut Débit Fibre', 'Climatisation réversible', 'Parking privé à proximité'],
      rules: ['Respecter le calme du quartier', 'Laisser les lieux en ordre'],
      cancellationPolicy: 'moderate',
      weeklySchedule: {
        0: { isOpen: true, openTime: '08:00', closeTime: '22:00' },
        1: { isOpen: true, openTime: '08:00', closeTime: '22:00' },
        2: { isOpen: true, openTime: '08:00', closeTime: '22:00' },
        3: { isOpen: true, openTime: '08:00', closeTime: '22:00' },
        4: { isOpen: true, openTime: '08:00', closeTime: '23:00' },
        5: { isOpen: true, openTime: '09:00', closeTime: '23:00' },
        6: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      },
      blockedSlots: [],
      addons: [],
      hostId: 'u_new_host',
      hostName: contactName || (language === 'en' ? 'Partner Host' : 'Propriétaire Partenaire'),
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      hostResponseRate: 100,
      hostResponseTime: '< 15 min',
      hostPhone: contactPhone,
      hostWhatsApp: contactPhone,
      status: 'published',
      featured: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closePublishModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5E2DD] relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePublishModal}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F5F2] transition-colors cursor-pointer"
          aria-label={language === 'en' ? 'Close' : 'Fermer'}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#111111] mb-2 font-display">
              {language === 'en' ? 'Space Submitted Successfully!' : 'Espace soumis avec succès !'}
            </h3>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto leading-relaxed">
              {language === 'en'
                ? <>Your space has been recorded. Our Makanset team will contact you at <strong>{contactPhone}</strong> for physical verification and calendar activation.</>
                : <>Votre espace a été enregistré. Notre équipe Makanset prendra contact au <strong>{contactPhone}</strong> pour la vérification physique et l'activation du calendrier.</>}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#D9532B] uppercase tracking-wider">
                {language === 'en' ? 'Hosts in Algiers' : 'Propriétaires à Alger'}
              </span>
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight font-display mt-0.5">
                {language === 'en' ? 'List a space on Makanset' : 'Publier un espace sur Makanset'}
              </h2>
              <p className="text-xs text-[#6B6B6B] mt-1">
                {language === 'en'
                  ? 'Monetize your meeting rooms, studios, lofts, or rooftops by the hour with complete ease.'
                  : 'Monétisez vos salles de réunion, studios, lofts ou rooftops à l’heure en toute simplicité.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Space Name or Title' : "Nom ou Titre de l'espace"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'e.g. Bright Cyclorama Photo Studio' : 'Ex: Studio Photo Cyclorama Lumineux'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Commune & Catégorie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'District in Algiers' : "Commune d'Alger"}
                  </label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value as AlgiersCommune)}
                    className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-xs font-semibold text-[#111111] bg-white focus:outline-none focus:border-[#111111]"
                  >
                    {COMMUNE_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Primary Activity' : 'Activité principale'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                    className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] text-xs font-semibold text-[#111111] bg-white focus:outline-none focus:border-[#111111]"
                  >
                    <option value="shooting">{language === 'en' ? 'Photo & Video Studio' : 'Shooting photo & vidéo'}</option>
                    <option value="reunion">{language === 'en' ? 'Meeting & Boardroom' : 'Salle de réunion'}</option>
                    <option value="conference">{language === 'en' ? 'Conference & Seminar' : 'Conférence & Séminaire'}</option>
                    <option value="evenement">{language === 'en' ? 'Event & Rooftop' : 'Événement & Rooftop'}</option>
                    <option value="formation">{language === 'en' ? 'Training & Workshop' : 'Formation & Atelier'}</option>
                    <option value="coworking">{language === 'en' ? 'Coworking Space' : 'Espace Coworking'}</option>
                    <option value="podcast">{language === 'en' ? 'Podcast & Audio Studio' : 'Studio Podcast & Audio'}</option>
                  </select>
                </div>
              </div>

              {/* Surface & Capacité */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Area (m²)' : 'Surface (m²)'}
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="2000"
                    value={surface}
                    onChange={(e) => setSurface(parseInt(e.target.value) || 0)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Max capacity (guests)' : 'Capacité max (pers)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Tarif / Heure */}
              <div>
                <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Desired hourly rate (Algerian Dinars - DZD)' : 'Tarif horaire souhaité (Dinars Algériens - DA)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="500"
                    min="1000"
                    max="200000"
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(parseInt(e.target.value) || 0)}
                    className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-[#E5E2DD] text-xs font-bold text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B6B6B]">
                    {language === 'en' ? 'DZD / hr' : 'DA / h'}
                  </span>
                </div>
              </div>

              {/* Contact Propriétaire */}
              <div className="pt-2 border-t border-[#E5E2DD] space-y-3">
                <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider block">
                  {language === 'en' ? 'Your Contact Details' : 'Vos coordonnées'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'Your full name' : 'Votre nom & prénom'}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+213 550 12 34 56"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-12 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer mt-4"
              >
                <span>{language === 'en' ? 'Submit my listing request' : 'Envoyer ma demande de publication'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
