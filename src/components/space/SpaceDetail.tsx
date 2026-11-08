import React, { useState } from 'react';
import { Space, BookingAddOnSelection } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../i18n/translations';
import { PhotoGalleryModal } from './PhotoGalleryModal';
import { AvailabilityCalendarReadOnly } from './AvailabilityCalendarReadOnly';
import { BookingCheckoutModal } from '../booking/BookingCheckoutModal';
import { LeafletMap } from '../search/LeafletMap';
import {
  Share2,
  Users,
  Maximize2,
  Clock,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Calendar,
  Sparkles,
  Info,
  MapPin,
} from 'lucide-react';

interface SpaceDetailProps {
  spaceId: string;
}

export const SpaceDetail: React.FC<SpaceDetailProps> = ({ spaceId }) => {
  const { getSpaceById, bookings, navigateTo, language } = useApp();
  const space = getSpaceById(spaceId);

  // Gallery modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryInitialIdx, setGalleryInitialIdx] = useState(0);

  // Booking selection state
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [startHour, setStartHour] = useState<number>(9);
  const [endHour, setEndHour] = useState<number>(13);
  const [guestsCount, setGuestsCount] = useState<number>(() => Math.min(10, space?.capacity || 10));

  // Add-ons selected state
  const [selectedAddons, setSelectedAddons] = useState<{ [addonId: string]: number }>({});

  // Checkout modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!space) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Espace introuvable</h2>
        <button
          onClick={() => navigateTo('browse')}
          className="px-6 py-2 bg-[#111111] text-white rounded-full text-sm font-semibold"
        >
          Retour aux espaces
        </button>
      </div>
    );
  }

  const hoursCount = Math.max(1, endHour - startHour);
  const isWeekend = (() => {
    if (!bookingDate) return false;
    const day = new Date(bookingDate).getDay();
    return day === 5 || day === 6; // Vendredi ou Samedi en Algérie
  })();

  const hourlyRate = (isWeekend && space.pricing.weekendRatePerHour)
    ? space.pricing.weekendRatePerHour
    : space.pricing.pricePerHour;

  const spacePriceTotal = hoursCount >= 8 && space.pricing.dayPrice
    ? space.pricing.dayPrice
    : hoursCount * hourlyRate;

  // Add-ons calculation
  const computedAddonsList: BookingAddOnSelection[] = (space.addons || [])
    .filter((a) => (selectedAddons[a.id] || 0) > 0)
    .map((addon) => {
      const qty = selectedAddons[addon.id] || 0;
      let total = 0;
      if (addon.pricingType === 'person') {
        total = addon.price * guestsCount * qty;
      } else if (addon.pricingType === 'flat') {
        total = addon.price * qty;
      } else {
        total = addon.price * qty;
      }
      return {
        addonId: addon.id,
        name: addon.name,
        quantity: qty,
        unitPrice: addon.price,
        pricingType: addon.pricingType,
        totalPrice: total,
      };
    });

  const addonsPriceTotal = computedAddonsList.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const serviceFee = Math.round((spacePriceTotal + addonsPriceTotal) * 0.07);
  const totalAmount = spacePriceTotal + addonsPriceTotal + serviceFee;

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: 1 };
    });
  };

  const handleUpdateAddonQty = (addonId: string, delta: number, maxQty: number) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      const next = Math.max(0, Math.min(maxQty, current + delta));
      if (next === 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: next };
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const openGalleryAt = (idx: number) => {
    setGalleryInitialIdx(idx);
    setGalleryOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#E5E2DD]">
        <button
          onClick={() => navigateTo('browse')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B6B6B] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux résultats</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E2DD] text-xs font-semibold text-[#111111] hover:bg-[#F7F5F2] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareCopied ? 'Lien copié !' : 'Partager'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Title & Location Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-2">
            <span>{space.commune}</span>
            <span aria-hidden="true">·</span>
            <span>Alger, Algérie</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D9532B] flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Espace vérifié Makanset
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight font-display mb-3">
            {space.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#111111]">
            <span className="text-[#6B6B6B] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D9532B]" />
              {space.address}
            </span>
          </div>
        </div>

        {/* Mosaic Photo Gallery (1 Large Left + 4 Grid Right) */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[320px] sm:h-[440px] lg:h-[500px]">
            {/* Primary Main Photo (takes 2 cols) */}
            <div
              onClick={() => openGalleryAt(0)}
              className="md:col-span-2 h-full cursor-pointer overflow-hidden relative group"
            >
              <img
                src={space.photos[0]}
                alt={space.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Sub-grid of 4 photos (takes 2 cols) */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
              {space.photos.slice(1, 5).map((photo, i) => (
                <div
                  key={i}
                  onClick={() => openGalleryAt(i + 1)}
                  className="h-full cursor-pointer overflow-hidden relative group"
                >
                  <img
                    src={photo}
                    alt={`${space.title} angle ${i + 2}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* "Afficher toutes les photos" Button */}
          <button
            onClick={() => openGalleryAt(0)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 hover:bg-white text-[#111111] text-xs font-bold rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Afficher les {space.photos.length} photos</span>
          </button>
        </div>

        {/* 2-Column Split: Details Left (7 cols) + Sticky Purchase Module Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details & Amenities & Add-ons */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Quick Specs Strip */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F7F5F2] border border-[#E5E2DD] text-center">
              <div>
                <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block mb-1">
                  Capacité
                </span>
                <span className="text-base font-bold text-[#111111] font-display">
                  {space.capacity} personnes
                </span>
              </div>
              <div className="border-x border-[#E5E2DD]">
                <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block mb-1">
                  Surface
                </span>
                <span className="text-base font-bold text-[#111111] font-display">
                  {space.surface} m²
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider block mb-1">
                  Min. réservation
                </span>
                <span className="text-base font-bold text-[#111111] font-display">
                  {space.pricing.minHours} heures
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-[#111111] tracking-tight font-display mb-4">
                À propos de ce lieu
              </h2>
              <p className="text-sm sm:text-base text-[#333333] leading-relaxed whitespace-pre-line font-normal">
                {space.description}
              </p>
            </div>

            {/* Amenities & Equipments */}
            <div>
              <h2 className="text-xl font-bold text-[#111111] tracking-tight font-display mb-4">
                Équipements & services inclus
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {space.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-[#111111]"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons & Equipment Available */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                  Personnalisation
                </span>
                <h2 className="text-xl font-bold text-[#111111] tracking-tight font-display">
                  Options & Add-ons disponibles
                </h2>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Sélectionnez les services et équipements complémentaires souhaités pour votre événement.
                </p>
              </div>

              <div className="space-y-4">
                {space.addons.map((addon) => {
                  const qty = selectedAddons[addon.id] || 0;
                  const isChecked = qty > 0;

                  return (
                    <div
                      key={addon.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isChecked
                          ? 'border-[#D9532B] bg-[#D9532B]/5 shadow-xs'
                          : 'border-[#E5E2DD] bg-white hover:bg-[#F7F5F2]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleAddon(addon.id)}
                            className="mt-1 w-4 h-4 text-[#D9532B] rounded focus:ring-[#D9532B] cursor-pointer"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-[#111111]">{addon.name}</h4>
                            <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">
                              {addon.description}
                            </p>
                            <div className="mt-2 text-xs font-bold text-[#111111] tabular-nums">
                              {formatCurrency(addon.price, language)}{' '}
                              <span className="font-normal text-[#6B6B6B]">
                                {addon.pricingType === 'person' && 'par personne'}
                                {addon.pricingType === 'unit' && 'par unité / heure'}
                                {addon.pricingType === 'flat' && 'forfait'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stepper if checked and not flat fee with maxQuantity > 1 */}
                        {isChecked && addon.maxQuantity > 1 && addon.pricingType !== 'person' && (
                          <div className="flex items-center gap-2 bg-white rounded-full border border-[#E5E2DD] px-2 py-1 shadow-xs shrink-0">
                            <button
                              onClick={() => handleUpdateAddonQty(addon.id, -1, addon.maxQuantity)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 text-[#111111]"
                              aria-label="Diminuer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{qty}</span>
                            <button
                              onClick={() => handleUpdateAddonQty(addon.id, 1, addon.maxQuantity)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 text-[#111111]"
                              aria-label="Augmenter"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Read-Only Availability Calendar */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                  Disponibilités
                </span>
                <h2 className="text-xl font-bold text-[#111111] tracking-tight font-display">
                  Calendrier des créneaux
                </h2>
              </div>
              <AvailabilityCalendarReadOnly
                space={space}
                bookings={bookings}
                selectedDate={bookingDate}
                onSelectDate={(newDate) => setBookingDate(newDate)}
              />
            </div>

            {/* Emplacement & Carte Interactive à Alger */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold text-[#D9532B] uppercase tracking-wider">
                  Emplacement & Quartier
                </span>
                <h2 className="text-xl font-bold text-[#111111] tracking-tight font-display">
                  Localisation à {space.commune}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D9532B]" />
                  <span>{space.address}</span>
                </div>
              </div>
              <div className="h-80 w-full rounded-3xl overflow-hidden border border-[#E5E2DD] shadow-md">
                <LeafletMap spaces={[space]} selectedSpaceId={space.id} zoom={15} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#6B6B6B]">
                <span>Quartier : <strong>{space.commune}</strong>, Alger</span>
                <span className="text-[11px] text-[#888888]">Coordonnées GPS précises vérifiées</span>
              </div>
            </div>

            {/* Space Rules & Cancellation Policy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E5E2DD]">
              <div>
                <h3 className="text-base font-bold text-[#111111] mb-3 font-display">
                  Règlement intérieur
                </h3>
                <ul className="space-y-2 text-xs text-[#6B6B6B]">
                  {space.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D9532B] font-bold">·</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#111111] mb-3 font-display">
                  Politique d’annulation
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  {space.cancellationPolicy === 'flexible' &&
                    'Annulation flexible : Remboursement intégral jusqu’à 24 heures avant le début de votre créneau horaire.'}
                  {space.cancellationPolicy === 'moderate' &&
                    'Annulation modérée : Remboursement intégral jusqu’à 48 heures avant l’événement, 50% au-delà.'}
                  {space.cancellationPolicy === 'strict' &&
                    'Annulation stricte : Remboursement de 50% jusqu’à 7 jours avant l’événement.'}
                </p>
                {space.pricing.securityDeposit && (
                  <div className="mt-3 text-xs text-[#111111] font-semibold">
                    Caution requise : {formatCurrency(space.pricing.securityDeposit, language)} (restituée après état des lieux).
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Module (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#E5E2DD]">
              
              {/* Header: Price */}
              <div className="flex items-baseline justify-between pb-5 border-b border-[#E5E2DD] mb-5">
                <div>
                  <span className="text-2xl font-extrabold text-[#111111] font-display tabular-nums">
                    {formatCurrency(hourlyRate, language)}
                  </span>
                  <span className="text-xs text-[#6B6B6B] font-medium ml-1">/ heure</span>
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Min. {space.pricing.minHours} heures
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-4 mb-6">
                
                {/* Date Input */}
                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1">
                    Date de réservation
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E5E2DD] bg-[#F7F5F2] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D9532B] cursor-pointer"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Hours Range: Start / End */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1">
                      Heure de début
                    </label>
                    <select
                      value={startHour}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setStartHour(val);
                        if (endHour <= val) setEndHour(val + space.pricing.minHours);
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] bg-[#F7F5F2] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: 14 }).map((_, i) => {
                        const h = 8 + i;
                        return (
                          <option key={h} value={h}>
                            {h}:00
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1">
                      Heure de fin
                    </label>
                    <select
                      value={endHour}
                      onChange={(e) => setEndHour(parseInt(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl border border-[#E5E2DD] bg-[#F7F5F2] text-xs font-semibold text-[#111111] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: 15 }).map((_, i) => {
                        const h = 9 + i;
                        if (h <= startHour) return null;
                        return (
                          <option key={h} value={h}>
                            {h}:00 ({h - startHour}h)
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Number of guests */}
                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1">
                    Nombre d'invités / participants
                  </label>
                  <div className="flex items-center justify-between h-11 px-3.5 rounded-xl border border-[#E5E2DD] bg-[#F7F5F2]">
                    <span className="text-xs font-semibold text-[#111111]">
                      {guestsCount} personnes
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#111111] shadow-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuestsCount((prev) => Math.min(space.capacity, prev + 1))}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#111111] shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="space-y-2.5 py-4 border-t border-b border-[#E5E2DD] text-xs text-[#6B6B6B] mb-6">
                <div className="flex justify-between">
                  <span>
                    Location ({hoursCount}h × {formatCurrency(hourlyRate, language)})
                  </span>
                  <span className="font-semibold text-[#111111] tabular-nums">
                    {formatCurrency(spacePriceTotal, language)}
                  </span>
                </div>

                {addonsPriceTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Options & Add-ons ({computedAddonsList.length})</span>
                    <span className="font-semibold text-[#111111] tabular-nums">
                      {formatCurrency(addonsPriceTotal, language)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frais de service Makanset (7%)</span>
                  <span className="font-semibold text-[#111111] tabular-nums">
                    {formatCurrency(serviceFee, language)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#111111] pt-3 border-t border-[#E5E2DD]">
                  <span>Total estimé</span>
                  <span className="text-lg text-[#D9532B] tabular-nums">
                    {formatCurrency(totalAmount, language)}
                  </span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full h-12 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98"
              >
                <span>Demander à réserver</span>
              </button>

              <p className="text-[11px] text-[#888888] text-center mt-3">
                Aucun débit immédiat avant confirmation de votre demande.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Buy Bar on Mobile (< 15% viewport height cap) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E2DD] px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-xs text-[#6B6B6B]">Total pour {hoursCount}h</div>
          <div className="text-base font-extrabold text-[#D9532B] tabular-nums font-display">
            {formatCurrency(totalAmount, language)}
          </div>
        </div>

        <button
          onClick={() => setCheckoutModalOpen(true)}
          className="h-11 px-6 bg-[#D9532B] text-white font-bold rounded-full text-xs shadow-md active:scale-95"
        >
          Réserver
        </button>
      </div>

      {/* Photo Lightbox Modal */}
      <PhotoGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        photos={space.photos}
        initialIdx={galleryInitialIdx}
        spaceTitle={space.title}
      />

      {/* Multi-Step Checkout Modal */}
      <BookingCheckoutModal
        space={space}
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        date={bookingDate}
        startHour={startHour}
        endHour={endHour}
        guestCount={guestsCount}
        selectedAddOns={computedAddonsList}
        spacePriceTotal={spacePriceTotal}
        addonsPriceTotal={addonsPriceTotal}
        serviceFee={serviceFee}
        totalAmount={totalAmount}
      />
    </div>
  );
};
