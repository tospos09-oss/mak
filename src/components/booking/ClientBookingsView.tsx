import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import { formatCurrency } from '../../i18n/translations';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const ClientBookingsView: React.FC = () => {
  const { clientBookings, cancelBooking, addReview, navigateTo, language, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  
  // Review modal state
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const nowStr = new Date().toISOString().split('T')[0];

  const filteredBookings = clientBookings.filter((b) => {
    if (activeTab === 'upcoming') {
      return (b.status === 'confirmed' || b.status === 'pending') && b.date >= nowStr;
    }
    if (activeTab === 'completed') {
      return b.status === 'completed' || b.date < nowStr;
    }
    if (activeTab === 'cancelled') {
      return b.status === 'cancelled' || b.status === 'rejected';
    }
    return true;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBooking) return;

    addReview({
      spaceId: reviewBooking.spaceId,
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientAvatar: currentUser.avatar,
      rating,
      comment: reviewText,
      activity: reviewBooking.activity,
    });

    setReviewBooking(null);
    setReviewText('');
  };

  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'en' ? 'Confirmed' : 'Confirmée'}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            {language === 'en' ? 'Pending host confirmation' : "En attente de l'hôte"}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
            <XCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Declined' : 'Refusée'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Cancelled' : 'Annulée'}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'en' ? 'Completed' : 'Terminée'}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] py-10 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight font-display">
              {language === 'en' ? 'My Bookings' : 'Mes Réservations'}
            </h1>
            <p className="text-xs text-[#6B6B6B] mt-1">
              {language === 'en'
                ? 'Manage your past and upcoming booking requests in Algiers.'
                : 'Gérez vos demandes de réservation passées et à venir à Alger.'}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#E5E2DD] shadow-xs self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {language === 'en' ? `All (${clientBookings.length})` : `Toutes (${clientBookings.length})`}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === 'upcoming' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {language === 'en' ? 'Upcoming' : 'À venir'}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === 'completed' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {language === 'en' ? 'Past' : 'Passées'}
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeTab === 'cancelled' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {language === 'en' ? 'Cancelled' : 'Annulées'}
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E2DD] shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#F7F5F2] flex items-center justify-center mx-auto mb-4 text-[#D9532B]">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
              {language === 'en' ? 'No bookings found in this tab' : 'Aucune réservation dans cet onglet'}
            </h3>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto mb-6">
              {language === 'en'
                ? 'Find the ideal space for your next meeting, shoot, or event in Algiers.'
                : "Trouvez l'espace idéal pour votre prochaine réunion, shooting ou événement à Alger."}
            </p>
            <button
              onClick={() => navigateTo('browse')}
              className="px-6 py-2.5 rounded-full bg-[#D9532B] hover:bg-[#C24520] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {language === 'en' ? 'Browse spaces' : 'Explorer les lieux'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5E2DD] shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  
                  {/* Photo */}
                  <img
                    src={b.spacePhoto}
                    alt={b.spaceTitle}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-36 h-28 rounded-2xl object-cover shrink-0 cursor-pointer"
                    onClick={() => navigateTo('space-detail', b.spaceId)}
                  />

                  {/* Booking Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="text-xs font-mono font-bold text-[#D9532B]">
                        {language === 'en' ? 'Ref:' : 'Réf:'} {b.bookingRef}
                      </div>
                      {getStatusBadge(b.status)}
                    </div>

                    <h3
                      onClick={() => navigateTo('space-detail', b.spaceId)}
                      className="text-base font-bold text-[#111111] hover:text-[#D9532B] transition-colors cursor-pointer truncate"
                    >
                      {b.spaceTitle}
                    </h3>

                    {/* Meta items */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B6B6B] mt-2">
                      <span className="flex items-center gap-1 font-semibold text-[#111111]">
                        <Calendar className="w-3.5 h-3.5 text-[#D9532B]" />
                        {b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        {b.startHour}h00 – {b.endHour}h00 ({b.hoursCount}h)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        {b.spaceCommune}
                      </span>
                    </div>

                    {/* Addons preview if any */}
                    {b.addons.length > 0 && (
                      <div className="text-xs text-[#6B6B6B] mt-2">
                        <strong>{language === 'en' ? 'Included Add-ons: ' : 'Options incluses : '}</strong>{' '}
                        {b.addons.map((a) => `${a.name} (x${a.quantity})`).join(', ')}
                      </div>
                    )}

                    {/* Price and actions bar */}
                    <div className="mt-4 pt-4 border-t border-[#E5E2DD] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-[#6B6B6B]">Total : </span>
                        <span className="text-sm font-extrabold text-[#111111] tabular-nums">
                          {formatCurrency(b.totalAmount, language)}
                        </span>
                        <span className="text-[11px] text-[#6B6B6B] ml-2">
                          ({b.paymentMethod === 'online_chargily'
                            ? (language === 'en' ? 'Paid online CIB/Edahabia' : 'Payé en ligne CIB/Edahabia')
                            : (language === 'en' ? 'On-site / BaridiMob' : 'Règlement sur place/BaridiMob')})
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {/* Leave review if completed and not reviewed */}
                        {(b.status === 'completed' || b.status === 'confirmed') && !b.hasReviewed && (
                          <button
                            onClick={() => setReviewBooking(b)}
                            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#111111] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#D9532B]" />
                            <span>{language === 'en' ? 'Leave a review' : 'Laisser un commentaire'}</span>
                          </button>
                        )}

                        {/* Cancel booking if pending or confirmed */}
                        {(b.status === 'pending' || b.status === 'confirmed') && (
                          <button
                            onClick={() => setCancelModalId(b.id)}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            {language === 'en' ? 'Cancel' : 'Annuler'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        {reviewBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5E2DD]">
              <h3 className="text-xl font-bold text-[#111111] mb-2 font-display">
                {language === 'en' ? 'Share your review' : 'Partager votre retour'}
              </h3>
              <p className="text-xs text-[#6B6B6B] mb-5">
                {language === 'en'
                  ? `For "${reviewBooking.spaceTitle}" on ${reviewBooking.date}.`
                  : `Pour "${reviewBooking.spaceTitle}" le ${reviewBooking.date}.`}
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1 uppercase tracking-wider">
                    {language === 'en' ? 'Your review of the space' : 'Votre commentaire sur le lieu'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E5E2DD] text-xs font-medium focus:outline-none focus:border-[#111111]"
                    placeholder={
                      language === 'en'
                        ? 'Bright space, well equipped, wonderful host...'
                        : 'Espace lumineux, équipements conformes, matériel au top...'
                    }
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setReviewBooking(null)}
                    className="flex-1 py-2.5 rounded-full border border-[#E5E2DD] text-xs font-semibold text-[#6B6B6B] cursor-pointer"
                  >
                    {language === 'en' ? 'Close' : 'Fermer'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#D9532B] hover:bg-[#C24520] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    {language === 'en' ? 'Submit review' : 'Envoyer le commentaire'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inline Cancel Confirmation Modal */}
        {cancelModalId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E2DD] text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] mb-2 font-display">
                {language === 'en' ? 'Cancel this booking?' : 'Annuler cette réservation ?'}
              </h3>
              <p className="text-xs text-[#6B6B6B] mb-5">
                {language === 'en'
                  ? 'Are you sure you want to cancel? This will release your time slot.'
                  : 'Êtes-vous sûr de vouloir annuler ? Votre créneau sera libéré.'}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCancelModalId(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#E5E2DD] text-xs font-semibold text-[#6B6B6B] cursor-pointer"
                >
                  {language === 'en' ? 'Keep booking' : 'Garder la réservation'}
                </button>
                <button
                  onClick={() => {
                    cancelBooking(cancelModalId);
                    setCancelModalId(null);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {language === 'en' ? 'Yes, Cancel' : 'Oui, Annuler'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
