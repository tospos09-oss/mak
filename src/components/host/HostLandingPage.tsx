import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Camera,
  TrendingUp,
} from 'lucide-react';

interface SpaceTypeEstimate {
  id: string;
  name: string;
  nameEn: string;
  defaultPrice: number;
  description: string;
  descriptionEn: string;
  popularCommune: string;
  popularCommuneEn: string;
}

const SPACE_TYPES: SpaceTypeEstimate[] = [
  {
    id: 'studio',
    name: 'Studio photo & vidéo',
    nameEn: 'Photo & Video Studio',
    defaultPrice: 5500,
    description: 'Cycloramas, flashs professionnels & lumière du jour',
    descriptionEn: 'Cycloramas, pro strobes & natural light',
    popularCommune: 'Hydra & Didouche Mourad',
    popularCommuneEn: 'Hydra & Didouche Mourad',
  },
  {
    id: 'rooftop',
    name: 'Rooftop & Terrasse vue mer',
    nameEn: 'Rooftop & Sea-view Terrace',
    defaultPrice: 9500,
    description: 'Cocktails d’entreprise, tournages & lancements VIP',
    descriptionEn: 'Corporate cocktails, filming & VIP product launches',
    popularCommune: 'El Biar & Alger-Centre',
    popularCommuneEn: 'El Biar & Algiers Center',
  },
  {
    id: 'reunion',
    name: 'Salle de réunion & Conseil',
    nameEn: 'Meeting & Boardroom',
    defaultPrice: 4200,
    description: 'Visioconférence, ateliers stratégiques & comités',
    descriptionEn: 'Video conferencing, strategy workshops & board sessions',
    popularCommune: 'Bab Ezzouar & Hydra',
    popularCommuneEn: 'Bab Ezzouar & Hydra',
  },
  {
    id: 'villa',
    name: 'Villa & Jardin d’exception',
    nameEn: 'Villa & Private Garden',
    defaultPrice: 16000,
    description: 'Séminaires au vert, réceptions & productions cinématographiques',
    descriptionEn: 'Offsite seminars, corporate receptions & film productions',
    popularCommune: 'Dely Ibrahim & Chéraga',
    popularCommuneEn: 'Dely Ibrahim & Cheraga',
  },
  {
    id: 'loft',
    name: 'Loft créatif & Patio d’artiste',
    nameEn: 'Creative Loft & Artist Patio',
    defaultPrice: 6500,
    description: 'Workshops design, pop-up stores & vernissages',
    descriptionEn: 'Design workshops, pop-up showrooms & exhibitions',
    popularCommune: 'Télemly & Casbah',
    popularCommuneEn: 'Telemly & Casbah',
  },
];

const HOST_FAQS_FR = [
  {
    q: 'Combien coûte la publication de mon espace ?',
    a: 'La publication de votre annonce sur Makanset est 100% gratuite. Vous ne payez aucun abonnement ni aucun frais d’inscription. Makanset prélève uniquement une commission transparente de 15% lors des réservations confirmées.',
  },
  {
    q: 'Comment suis-je protégé contre les dégradations et annulations ?',
    a: 'Tous les locataires sont vérifiés via leur numéro algérien et leur pièce d’identité. Vous pouvez fixer une caution remboursable et choisir une politique d’annulation (flexible, modérée ou stricte). Un contrat numérique d’occupation temporaire est généré automatiquement.',
  },
  {
    q: 'Dois-je être présent sur place pendant la réservation ?',
    a: 'C’est entièrement à votre convenance. Vous pouvez accueillir vos hôtes en personne ou bien installer une boîte à clés sécurisée / serrure connectée pour leur donner accès en toute autonomie.',
  },
  {
    q: 'Comment et quand mes revenus me sont-ils versés ?',
    a: 'Dès que la réservation se termine avec succès, vos gains sont transférés vers votre compte bancaire (RIB algérien), votre compte BaridiMob ou votre portefeuille Chargily Pay sous 24 à 48 heures.',
  },
  {
    q: 'Puis-je choisir qui peut réserver mon lieu et à quelles dates ?',
    a: 'Absolument. Vous gardez le contrôle total sur votre calendrier. Vous pouvez définir des plages de disponibilité, un nombre minimum d’heures et examiner chaque projet avant de l’accepter.',
  },
  {
    q: 'Comment se déroule la vérification physique de mon lieu ?',
    a: 'Après la création de votre annonce, un membre de l’équipe Makanset Alger vous contacte pour organiser une visite rapide de 15 minutes ou une vérification par visioconférence afin d’attester de la qualité du lieu.',
  },
];

const HOST_FAQS_EN = [
  {
    q: 'How much does it cost to list my space?',
    a: 'Listing your space on Makanset is 100% free. There are no subscriptions, setup fees, or hidden costs. Makanset only retains a transparent 15% service fee on completed, confirmed bookings.',
  },
  {
    q: 'How am I protected against damages and cancellations?',
    a: 'All guests are verified through their Algerian phone number and ID. You can set a refundable security deposit and select your cancellation policy (flexible, moderate, or strict). A digital rental contract is automatically issued.',
  },
  {
    q: 'Do I need to be present during the booking?',
    a: 'It is entirely up to you. You can welcome guests in person, designate a team member, or install a secure key lockbox or smart lock for self check-in.',
  },
  {
    q: 'How and when are my earnings paid out?',
    a: 'As soon as the booking is successfully completed, your payout is sent directly to your Algerian bank account (RIB), your BaridiMob account, or your Chargily Pay wallet within 24 to 48 hours.',
  },
  {
    q: 'Can I choose who books my space and on which dates?',
    a: 'Absolutely. You retain 100% control over your calendar. You can set available time slots, require a minimum booking duration, and review each request prior to accepting.',
  },
  {
    q: 'How does the physical verification of my space work?',
    a: 'Once your listing is created, a member of the Makanset Algiers team reaches out to schedule a quick 15-minute on-site visit or video walkthrough to verify amenities and grant verified host status.',
  },
];

export const HostLandingPage: React.FC = () => {
  const { openPublishModal, language } = useApp();

  // Calculator State
  const [selectedSpaceTypeId, setSelectedSpaceTypeId] = useState<string>('studio');
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(20);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const currentSpaceType =
    SPACE_TYPES.find((s) => s.id === selectedSpaceTypeId) || SPACE_TYPES[0];

  const estimatedEarnings = currentSpaceType.defaultPrice * hoursPerMonth;

  const hostFaqList = language === 'en' ? HOST_FAQS_EN : HOST_FAQS_FR;

  return (
    <div className="w-full bg-white text-[#111111]">
      {/* 1. HERO SECTION (Immersive Dark Photography with Peerspace-style Earnings Calculator) */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Background photo */}
        <img
          src="/src/assets/images/villa_event_garden_1794061916036.jpg"
          alt="Espace d'exception à Alger"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold mb-6 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#D9532B]" />
                <span>{language === 'en' ? 'Join Makanset hosts in Algiers' : 'Rejoignez les hôtes Makanset à Alger'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display mb-6 leading-tight text-balance">
                {language === 'en' ? 'Earn money by sharing your space' : "Gagnez de l'argent en partageant votre espace"}
              </h1>

              <p className="text-base sm:text-lg text-white/85 max-w-xl mb-8 leading-relaxed font-normal">
                {language === 'en'
                  ? 'Monetize your photo studios, lofts, villas, rooftops, or meeting rooms during unoccupied hours. You freely set your hourly rates, availability, and house rules.'
                  : 'Rentabilisez vos studios photo, lofts, villas, rooftops ou salles de réunion lors de vos heures inoccupées. Vous fixez librement vos tarifs horaires, vos disponibilités et vos règles.'}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-white/90">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D9532B] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">{language === 'en' ? '100% Free listing' : 'Publication 100% gratuite'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D9532B] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">{language === 'en' ? 'Guaranteed payout in Dinars' : 'Paiement garanti en Dinars'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D9532B] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">{language === 'en' ? 'Full calendar control' : 'Contrôle total des dates'}</span>
                </div>
              </div>
            </div>

            {/* Right: Peerspace-Style Interactive Earnings Calculator Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Section explicative : +25% de revenu avec la location à l'heure */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/40 shadow-2xl text-left">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D9532B] to-[#C24520] text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                    <TrendingUp className="w-5 h-5 mb-0.5" />
                    <span className="text-[10px] font-black leading-none">+25%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-[#111111] font-display">
                        {language === 'en' ? 'Hourly rentals: +25% more revenue' : "La location à l'heure : +25% de revenu"}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-[#D9532B]/10 text-[#D9532B] text-[10px] font-extrabold uppercase tracking-wide">
                        {language === 'en' ? 'Higher Yield' : 'Rendement supérieur'}
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {language === 'en' ? (
                        <>Hourly rental generates on average <strong className="text-[#111111] font-bold">25% more revenue than traditional full-day bookings</strong>. By dividing your schedule into sessions (morning, afternoon, or evening), you maximize your space without locking it all day.</>
                      ) : (
                        <>La location par heure permet de générer en moyenne <strong className="text-[#111111] font-bold">25% de revenus en plus qu'une location classique à la journée</strong>. En découpant votre planning en plusieurs créneaux (matin, après-midi ou soirée), vous valorisez vos mètres carrés de façon optimale sans immobiliser inutilement votre lieu.</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Comparatif direct */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-[#E5E2DD] text-[11px]">
                  <div className="bg-[#F7F5F2] rounded-xl p-2.5 text-center border border-[#E5E2DD]">
                    <span className="block text-[#777777] text-[10px] uppercase font-semibold">
                      {language === 'en' ? 'Full-day rental' : 'Location par journée'}
                    </span>
                    <span className="font-bold text-[#444444]">
                      {language === 'en' ? '1 locked flat fee' : '1 seul forfait bloqué'}
                    </span>
                  </div>
                  <div className="bg-[#D9532B]/10 border border-[#D9532B]/20 rounded-xl p-2.5 text-center">
                    <span className="block text-[#D9532B] text-[10px] uppercase font-bold">
                      {language === 'en' ? 'Hourly rental' : 'Location par heure'}
                    </span>
                    <span className="font-bold text-[#D9532B]">
                      {language === 'en' ? '+25% observed earnings' : '+25% de gains constatés'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Le simulateur interactif */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 text-left">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                    {language === 'en' ? 'Earnings Calculator' : 'Simulateur de revenus'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#6B6B6B] bg-[#F7F5F2] px-2.5 py-1 rounded-full border border-[#E5E2DD]">
                    {language === 'en' ? 'Algiers & Wilaya' : 'Alger & Wilaya'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-display mb-4">
                  {language === 'en' ? 'Estimate your monthly earnings' : 'Estimez vos gains mensuels'}
                </h3>

                {/* Field 1: Space Type Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Space type' : "Type d'espace"}
                  </label>
                  <select
                    value={selectedSpaceTypeId}
                    onChange={(e) => setSelectedSpaceTypeId(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-[#E5E2DD] bg-[#F7F5F2] text-xs sm:text-sm font-semibold text-[#111111] focus:outline-none focus:border-[#D9532B] transition-colors cursor-pointer"
                  >
                    {SPACE_TYPES.map((st) => (
                      <option key={st.id} value={st.id}>
                        {language === 'en' ? st.nameEn : st.name} (~{st.defaultPrice.toLocaleString()} {language === 'en' ? 'DZD/hr' : 'DA/h'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 2: Hours Rented Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                      {language === 'en' ? 'Hours rented per month' : 'Heures louées par mois'}
                    </label>
                    <span className="text-sm font-extrabold text-[#D9532B]">
                      {hoursPerMonth} {language === 'en' ? 'hours' : 'heures'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="60"
                    step="2"
                    value={hoursPerMonth}
                    onChange={(e) => setHoursPerMonth(parseInt(e.target.value))}
                    className="w-full accent-[#D9532B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#888888] font-medium mt-1">
                    <span>{language === 'en' ? '4 hrs (1 event)' : '4 h (1 événement)'}</span>
                    <span>{language === 'en' ? '20 hrs (~5 bookings)' : '20 h (~5 réservations)'}</span>
                    <span>{language === 'en' ? '60 hrs (frequent)' : '60 h (régulier)'}</span>
                  </div>
                </div>

                {/* Calculated Result Display */}
                <div className="bg-[#F7F5F2] rounded-2xl p-5 border border-[#E5E2DD] mb-6 text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D9532B]/10 text-[#D9532B] text-[10px] font-bold mb-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>{language === 'en' ? '+25% earnings boost included vs daily rent' : '+25% de gains inclus vs location journée'}</span>
                  </div>
                  <div className="text-xs text-[#6B6B6B] font-medium mb-1">
                    {language === 'en' ? 'Estimated Potential Revenue' : 'Revenu potentiel estimé'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#111111] font-display">
                    {estimatedEarnings.toLocaleString(language === 'en' ? 'en-US' : 'fr-FR')}{' '}
                    <span className="text-lg font-bold text-[#D9532B]">{language === 'en' ? 'DZD' : 'DA'}</span>
                    <span className="text-xs font-normal text-[#6B6B6B]"> {language === 'en' ? '/ month' : '/ mois'}</span>
                  </div>
                  <div className="text-[11px] text-[#888888] mt-2">
                    {language === 'en' ? 'Based on an average rate of ' : 'Basé sur un tarif moyen de '}
                    <span className="font-semibold text-[#111111]">
                      {currentSpaceType.defaultPrice.toLocaleString(language === 'en' ? 'en-US' : 'fr-FR')} {language === 'en' ? 'DZD/hr' : 'DA/h'}
                    </span>{' '}
                    {language === 'en' ? 'in Algiers' : 'à Alger'}
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={openPublishModal}
                  className="w-full py-4 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Create my listing for free' : 'Créer mon annonce gratuitement'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center mt-3">
                  <span className="text-[11px] text-[#6B6B6B]">
                    {language === 'en' ? 'No commitment · 5-minute listing' : 'Sans engagement · Publication en 5 minutes'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION: COMMENT ÇA MARCHE EN 3 ÉTAPES (BLANC) */}
      <section className="py-24 bg-white border-t border-[#E5E2DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
              {language === 'en' ? 'Host Process' : 'Processus Hôte'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              {language === 'en' ? 'How does it work for hosts?' : 'Comment ça marche pour les propriétaires ?'}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-2">
              {language === 'en'
                ? 'From listing your space to your first payout, everything is streamlined for simplicity.'
                : 'De la mise en ligne à votre premier virement, tout a été pensé pour vous simplifier la vie.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#F7F5F2] rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9532B]/10 text-[#D9532B] flex items-center justify-center font-bold">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-[#D0CCC6] font-display">
                    01
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
                  {language === 'en' ? 'Create your listing for free' : 'Créez votre annonce gratuitement'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {language === 'en'
                    ? 'Take a few photos with your phone, indicate your location in Algiers, guest capacity, and hourly rate. Takes just 5 minutes.'
                    : 'Prenez quelques photos avec votre téléphone, indiquez votre adresse à Alger, votre capacité maximale et votre tarif à l’heure. La publication prend 5 minutes.'}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7F5F2] rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9532B]/10 text-[#D9532B] flex items-center justify-center font-bold">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-[#D0CCC6] font-display">
                    02
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
                  {language === 'en' ? 'Review & accept booking requests' : 'Recevez & filtrez les demandes'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {language === 'en'
                    ? 'Connect directly with verified businesses, photographers, and creators across Algiers. Review each profile and only accept requests you approve.'
                    : 'Échangez en direct avec des entreprises, photographes et créateurs algérois. Vous consultez leur profil et n’acceptez que les réservations qui vous conviennent.'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7F5F2] rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9532B]/10 text-[#D9532B] flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-[#D0CCC6] font-display">
                    03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
                  {language === 'en' ? 'Host & collect your earnings' : 'Accueillez & encaissez vos gains'}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {language === 'en'
                    ? 'Welcome your guests or set up self check-in. Once the booking completes, payouts are transferred directly to your bank account or BaridiMob.'
                    : 'Accueillez vos invités ou organisez un accès autonome. Une fois la session terminée, votre virement est envoyé directement sans aucune démarche supplémentaire.'}
                </p>
              </div>
            </div>
          </div>

          {/* Centered CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={openPublishModal}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>{language === 'en' ? 'List my space now' : 'Publier mon espace maintenant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SECTION: TÉMOIGNAGES HÔTES (BEIGE) */}
      <section className="py-24 bg-[#F7F5F2] border-t border-[#E5E2DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
              {language === 'en' ? 'Host Feedback' : "Retours d'expérience"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              {language === 'en' ? 'What venue hosts say on Makanset' : 'Ce que disent les propriétaires sur Makanset'}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-2">
              {language === 'en'
                ? 'Discover how Algiers space owners are monetizing their square footage.'
                : "Découvrez comment des propriétaires d'Alger valorisent leurs mètres carrés."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {language === 'en' ? '+185,000 DZD / month' : '+185 000 DA / mois'}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">{language === 'en' ? 'Host for 1 year' : 'Hôte depuis 1 an'}</span>
                </div>
                {/* Host quote preserved in original language as written */}
                <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic mb-6">
                  "Mon studio photo à Hydra n’était occupé que 3 jours par semaine pour mes propres clients. En publiant les créneaux libres sur Makanset, j’accueille des agences et des créateurs sans aucun tracas de paiement."
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DD]">
                <div className="font-bold text-sm text-[#111111]">Mehdi B.</div>
                <div className="text-xs text-[#6B6B6B]">
                  {language === 'en' ? 'Cyclorama Studio · Val d’Hydra' : 'Studio Cyclorama · Val d’Hydra'}
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {language === 'en' ? '+240,000 DZD / month' : '+240 000 DA / mois'}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">{language === 'en' ? 'Host for 8 months' : 'Hôte depuis 8 mois'}</span>
                </div>
                {/* Host quote preserved in original language as written */}
                <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic mb-6">
                  "Nous avons un rooftop avec vue panoramique sur la baie. Nous l’ouvrons uniquement en soirée pour des réunions de direction et cocktails d’entreprises calmes. La sélection des locataires est irréprochable."
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DD]">
                <div className="font-bold text-sm text-[#111111]">Lamia & Karim K.</div>
                <div className="text-xs text-[#6B6B6B]">
                  {language === 'en' ? 'Panoramic Rooftop · El Biar' : 'Rooftop Panoramique · El Biar'}
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {language === 'en' ? '+110,000 DZD / month' : '+110 000 DA / mois'}
                  </span>
                  <span className="text-xs text-[#6B6B6B]">{language === 'en' ? 'Host for 6 months' : 'Hôte depuis 6 mois'}</span>
                </div>
                {/* Host quote preserved in original language as written */}
                <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic mb-6">
                  "Notre salle de formation à Bab Ezzouar était vide le samedi et le dimanche. Makanset nous permet d’amortir notre loyer commercial en la mettant à disposition de formateurs indépendants."
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DD]">
                <div className="font-bold text-sm text-[#111111]">Sofiane M.</div>
                <div className="text-xs text-[#6B6B6B]">
                  {language === 'en' ? 'Boardroom & Training · Bab Ezzouar' : 'Salle de Conseil · Bab Ezzouar'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: FAQ HÔTES (BLANC) */}
      <section className="py-24 bg-white border-t border-[#E5E2DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider mb-2 block">
              {language === 'en' ? 'Host FAQ' : 'FAQ Propriétaires'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
              {language === 'en' ? 'Questions About Hosting' : "Vos questions sur l'accueil"}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-2">
              {language === 'en'
                ? 'Everything you need to know to get started with confidence on Makanset.'
                : 'Toutes les réponses pour démarrer en toute confiance sur Makanset.'}
            </p>
          </div>

          <div className="space-y-3">
            {hostFaqList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F5F2] rounded-2xl border border-[#E5E2DD] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EFECE6] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#111111]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6B6B6B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D9532B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E5E2DD] pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="relative py-28 sm:py-32 text-white overflow-hidden">
        <img
          src="/src/assets/images/hero_algiers_rooftop_venue_1794061899722.jpg"
          alt="Espace d'exception à Alger"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="text-xs font-bold text-[#D9532B] uppercase tracking-widest mb-3">
            {language === 'en' ? 'Ready to get started?' : 'Prêt à vous lancer ?'}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-5 text-balance max-w-2xl">
            {language === 'en'
              ? 'Start monetizing your space this week'
              : 'Commencez à rentabiliser votre lieu dès cette semaine'}
          </h2>

          <p className="text-sm sm:text-base text-[#D0CCC6] max-w-xl mb-10 leading-relaxed font-normal">
            {language === 'en'
              ? 'Join dozens of venue hosts across Algiers. Create your listing in minutes and begin receiving qualified booking inquiries.'
              : 'Rejoignez des dizaines de propriétaires à Alger. Créez votre annonce en quelques minutes et commencez à recevoir des réservations qualifiées.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={openPublishModal}
              className="w-full sm:w-auto px-9 py-4 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-103 transition-all cursor-pointer"
            >
              <span>{language === 'en' ? 'List my space for free' : 'Publier mon espace gratuitement'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/213550442109"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-md hover:scale-103 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{language === 'en' ? 'Speak with Host Support' : 'Parler à l’équipe hôtes'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
