import React, { useState } from 'react';
import { Space, BookingAddOnSelection, PaymentMethod } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../i18n/translations';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Building,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface BookingCheckoutModalProps {
  space: Space;
  isOpen: boolean;
  onClose: () => void;
  date: string;
  startHour: number;
  endHour: number;
  guestCount: number;
  selectedAddOns: BookingAddOnSelection[];
  spacePriceTotal: number;
  addonsPriceTotal: number;
  serviceFee: number;
  totalAmount: number;
}

export const BookingCheckoutModal: React.FC<BookingCheckoutModalProps> = ({
  space,
  isOpen,
  onClose,
  date,
  startHour,
  endHour,
  guestCount,
  selectedAddOns,
  spacePriceTotal,
  addonsPriceTotal,
  serviceFee,
  totalAmount,
}) => {
  const { currentUser, createBooking, navigateTo, language, t } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [clientName, setClientName] = useState(currentUser.name || 'Karim Belkacem');
  const [clientPhone, setClientPhone] = useState(currentUser.phone || '+213 554 11 22 33');
  const [clientEmail, setClientEmail] = useState(currentUser.email || 'karim.belkacem@agency.dz');
  const [activityDesc, setActivityDesc] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online_chargily');

  // Online mock payment card details
  const [cardNumber, setCardNumber] = useState('6037 1234 5678 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const hoursCount = Math.max(1, endHour - startHour);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway delay (Chargily / SATIM)
    setTimeout(async () => {
      const newBooking = await createBooking({
        spaceId: space.id,
        spaceTitle: space.title,
        spacePhoto: space.photos[0],
        spaceCommune: space.commune,
        hostId: space.hostId,
        hostName: space.hostName,
        hostPhone: space.hostPhone,
        hostWhatsApp: space.hostWhatsApp,
        clientId: currentUser.id,
        clientName,
        clientEmail,
        clientPhone,
        date,
        startHour,
        endHour,
        hoursCount,
        guestCount,
        activity: activityDesc || 'Réservation d’espace professionnel Makanset',
        addons: selectedAddOns,
        spacePriceTotal,
        addonsPriceTotal,
        serviceFee,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'online_chargily' ? 'paid' : 'pending',
      });

      setConfirmedBookingRef(newBooking.bookingRef);
      setIsProcessing(false);
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D9532B', '#111111', '#1F9D6B'],
        });
      } catch (err) {
        // Safe confetti fallback
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E2DD] relative my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F5F2] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Recap */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                Étape 1 sur 3
              </span>
              <h3 className="text-2xl font-bold text-[#111111] tracking-tight font-display">
                Récapitulatif de votre réservation
              </h3>
            </div>

            {/* Space mini preview */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#F7F5F2] mb-6 border border-[#E5E2DD]">
              <img
                src={space.photos[0]}
                alt={space.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider">
                  {space.commune} · Alger
                </div>
                <h4 className="font-bold text-sm text-[#111111] truncate">{space.title}</h4>
                <div className="mt-2 flex items-center gap-3 text-xs text-[#6B6B6B]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D9532B]" />
                    {date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D9532B]" />
                    {startHour}h00 – {endHour}h00 ({hoursCount}h)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {guestCount} pers.
                  </span>
                </div>
              </div>
            </div>

            {/* Addons Selected */}
            {selectedAddOns.length > 0 && (
              <div className="mb-6">
                <h5 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                  Options & Add-ons sélectionnés ({selectedAddOns.length})
                </h5>
                <div className="space-y-2">
                  {selectedAddOns.map((addon) => (
                    <div
                      key={addon.addonId}
                      className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <span className="font-medium text-[#111111]">
                        {addon.name} (x{addon.quantity})
                      </span>
                      <span className="font-bold text-[#111111] tabular-nums">
                        {formatCurrency(addon.totalPrice, language)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 py-4 border-t border-b border-[#E5E2DD] text-xs text-[#6B6B6B] mb-6">
              <div className="flex justify-between">
                <span>Location espace ({hoursCount}h × {formatCurrency(space.pricing.pricePerHour, language)})</span>
                <span className="font-semibold text-[#111111] tabular-nums">
                  {formatCurrency(spacePriceTotal, language)}
                </span>
              </div>
              {addonsPriceTotal > 0 && (
                <div className="flex justify-between">
                  <span>Total des add-ons</span>
                  <span className="font-semibold text-[#111111] tabular-nums">
                    {formatCurrency(addonsPriceTotal, language)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frais de service plateforme (7%)</span>
                <span className="font-semibold text-[#111111] tabular-nums">
                  {formatCurrency(serviceFee, language)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E5E2DD]">
                <span>Total à régler</span>
                <span className="text-[#D9532B] text-base tabular-nums">
                  {formatCurrency(totalAmount, language)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full h-12 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <span>Continuer vers vos coordonnées</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                Étape 2 sur 3
              </span>
              <h3 className="text-2xl font-bold text-[#111111] tracking-tight font-display">
                Coordonnées & Projet
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1 uppercase tracking-wider">
                  Nom et Prénom
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5E2DD] focus:border-[#111111] text-sm font-medium focus:outline-none"
                  placeholder="Ex: Karim Belkacem"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1 uppercase tracking-wider">
                  Numéro de téléphone (+213)
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5E2DD] focus:border-[#111111] text-sm font-medium focus:outline-none"
                  placeholder="+213 550 00 00 00"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1 uppercase tracking-wider">
                  Adresse email de confirmation
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5E2DD] focus:border-[#111111] text-sm font-medium focus:outline-none"
                  placeholder="votre.email@domaine.dz"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1 uppercase tracking-wider">
                  Précisez votre activité ou événement
                </label>
                <textarea
                  rows={3}
                  value={activityDesc}
                  onChange={(e) => setActivityDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5E2DD] focus:border-[#111111] text-sm font-medium focus:outline-none"
                  placeholder="Ex: Tournage vidéo publicitaire avec 6 personnes et matériel d'éclairage..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 px-6 rounded-full border border-[#E5E2DD] text-xs font-semibold text-[#6B6B6B] hover:text-[#111111]"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Passer au mode de paiement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment Choice */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                Étape 3 sur 3
              </span>
              <h3 className="text-2xl font-bold text-[#111111] tracking-tight font-display">
                Mode de règlement
              </h3>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              {/* Payment Option 1: Chargily Pay / SATIM Edahabia & CIB */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                  paymentMethod === 'online_chargily'
                    ? 'border-[#D9532B] bg-[#D9532B]/5 shadow-xs'
                    : 'border-[#E5E2DD] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'online_chargily'}
                      onChange={() => setPaymentMethod('online_chargily')}
                      className="text-[#D9532B] focus:ring-[#D9532B]"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#111111] flex items-center gap-2">
                        <span>Paiement en ligne sécurisé (Chargily Pay / SATIM)</span>
                      </div>
                      <div className="text-xs text-[#6B6B6B] mt-0.5">
                        Cartes Edahabia & CIB acceptées instantanément
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[10px] font-bold">
                      Edahabia
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 text-[10px] font-bold">
                      CIB
                    </span>
                  </div>
                </div>

                {/* Simulated Card Fields when online is selected */}
                {paymentMethod === 'online_chargily' && (
                  <div className="mt-4 pt-4 border-t border-[#D9532B]/20 space-y-3 animate-in fade-in">
                    <div>
                      <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase mb-1">
                        Numéro de carte Edahabia / CIB (Simulation)
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] bg-white text-xs font-mono font-semibold"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase mb-1">
                          Expiration (MM/AA)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] bg-white text-xs font-mono font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase mb-1">
                          CVV2
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] bg-white text-xs font-mono font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* Payment Option 2: Paiement sur place / Virement BaridiMob */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                  paymentMethod === 'baridimob'
                    ? 'border-[#D9532B] bg-[#D9532B]/5 shadow-xs'
                    : 'border-[#E5E2DD] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'baridimob'}
                    onChange={() => setPaymentMethod('baridimob')}
                    className="text-[#D9532B] focus:ring-[#D9532B]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">
                      Paiement sur place ou virement BaridiMob / CCP
                    </div>
                    <div className="text-xs text-[#6B6B6B] mt-0.5">
                      Confirmation manuelle de la réservation par l’hôte à réception du versement ou sur place
                    </div>
                  </div>
                </div>
              </label>

              {/* Security Trust Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-100">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Transactions protégées par protocole SSL et blocage temporaire du créneau garanti pendant 24h.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-12 px-6 rounded-full border border-[#E5E2DD] text-xs font-semibold text-[#6B6B6B] hover:text-[#111111]"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-[#D9532B] hover:bg-[#C24520] disabled:bg-[#CCCCCC] text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  {isProcessing ? (
                    <span>Traitement sécurisé en cours...</span>
                  ) : (
                    <span>Confirmer la réservation ({formatCurrency(totalAmount, language)})</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Success & Confirmation Ticket */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-extrabold text-[#111111] mb-2 font-display">
              Demande envoyée avec succès !
            </h3>

            <p className="text-xs text-[#6B6B6B] max-w-md mx-auto mb-6">
              Votre demande de réservation a été enregistrée avec succès. Un SMS et un email de confirmation vous ont été expédiés.
            </p>

            {/* Reference Ticket Card */}
            <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#E5E2DD] text-left mb-6 max-w-sm mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Référence réservation</span>
                <span className="font-mono font-bold text-[#D9532B]">{confirmedBookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Espace</span>
                <span className="font-semibold text-[#111111] truncate max-w-[180px]">{space.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Date & Horaires</span>
                <span className="font-semibold text-[#111111]">{date} · {startHour}h-{endHour}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Montant total</span>
                <span className="font-bold text-[#111111] tabular-nums">{formatCurrency(totalAmount, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Statut</span>
                <span className="font-semibold text-amber-600">En attente de confirmation</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('bookings');
                }}
                className="w-full h-12 bg-[#111111] hover:bg-[#D9532B] text-white font-bold rounded-full text-xs transition-colors"
              >
                Voir mes réservations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
