import { LanguageCode } from '../types';

export interface Translations {
  brandName: string;
  tagline: string;
  slogan: string;
  heroKicker: string;
  searchWhat: string;
  searchWhatPlaceholder: string;
  searchWhere: string;
  searchWherePlaceholder: string;
  allCommunes: string;
  searchWhen: string;
  searchWhenAnytime: string;
  searchGuests: string;
  searchAction: string;
  searchClear: string;
  
  // Trust Badges
  trustVerified: string;
  trustFlexible: string;
  trustPricing: string;
  explorePrompt: string;

  // Navigation
  navExplore: string;
  navHost: string;
  navPublishSpace: string;
  navBookings: string;
  navFavorites: string;
  navDashboard: string;
  navAdmin: string;
  navLogin: string;
  navSignUp: string;

  // Activities
  actMeeting: string;
  actConference: string;
  actWorkshop: string;
  actPhoto: string;
  actEvent: string;
  actFilming: string;
  actCoworking: string;
  actPodcast: string;
  allActivities: string;

  // Space cards & details
  fromPrice: string;
  perHour: string;
  perDay: string;
  capacityMax: string;
  surfaceArea: string;
  minHoursNotice: string;
  amenitiesTitle: string;
  addonsTitle: string;
  addonsSubtitle: string;
  rulesTitle: string;
  cancellationTitle: string;
  reviewsTitle: string;
  hostTitle: string;
  responseRate: string;
  responseTime: string;
  contactWhatsApp: string;
  callHost: string;
  requestToBook: string;
  verifiedSpace: string;

  // Booking calculations
  pricingDetails: string;
  spaceRental: string;
  addonsTotal: string;
  serviceFee: string;
  totalPrice: string;
  selectTimeSlot: string;
  startTime: string;
  endTime: string;
  dateLabel: string;
  guestsLabel: string;
  
  // Checkout & Payment
  checkoutTitle: string;
  stepDetails: string;
  stepContact: string;
  stepPayment: string;
  stepConfirm: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  activityDescription: string;
  activityPlaceholder: string;
  paymentOnlineTitle: string;
  paymentOnlineDesc: string;
  paymentOnSiteTitle: string;
  paymentOnSiteDesc: string;
  paymentBaridiMobDesc: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  confirmBookingBtn: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;
  bookingRefLabel: string;
  viewMyBookings: string;

  // Host Dashboard
  dashboardTitle: string;
  tabOverview: string;
  tabCalendar: string;
  tabBookings: string;
  tabSpaces: string;
  tabAddons: string;
  tabEarnings: string;
  tabProfile: string;
  pendingRequests: string;
  activeBookings: string;
  monthlyRevenue: string;
  occupancyRate: string;
  confirmAction: string;
  rejectAction: string;
  blockSlotAction: string;
  unblockSlotAction: string;
  addNewSpace: string;
  editPrice: string;
  statusPublished: string;
  statusPending: string;
  statusPaused: string;

  // Status
  statusPendingBooking: string;
  statusConfirmedBooking: string;
  statusRejectedBooking: string;
  statusCancelledBooking: string;
  statusCompletedBooking: string;

  // Landing Page Sections
  categoriesSubtitle: string;
  categoriesTitle: string;
  spacesCountAlgiers: string;

  featuredSubtitle: string;
  featuredTitle: string;
  tabAllPlaces: string;
  tabRooftops: string;
  tabStudios: string;
  tabMeetingRooms: string;
  viewAllSpacesCount: string;

  howItWorksSubtitle: string;
  howItWorksTitle: string;
  howItWorksDesc: string;
  forRenters: string;
  forOwners: string;
  findSpaceNow: string;
  publishMySpace: string;

  testimonialsSubtitle: string;
  testimonialsTitle: string;
  testimonialsDesc: string;

  faqSubtitle: string;
  faqTitle: string;
  faqDesc: string;

  ctaSubtitle: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBrowseBtn: string;
  ctaPublishBtn: string;

  // Footer
  footerDesc: string;
  footerExploreTitle: string;
  footerHostTitle: string;
  footerDistrictsTitle: string;
  footerRights: string;
  termsBooking: string;
  termsPrivacy: string;

  // Auth Modal
  authLoginSubtitle: string;
  authSignupSubtitle: string;
  authLoginTab: string;
  authSignupTab: string;
  authForgotPass: string;
  authLoginBtn: string;
  authSignupBtn: string;
  authSuccessLogin: string;
  authSuccessSignup: string;
}

export const translations: Record<LanguageCode, Translations> = {
  fr: {
    brandName: 'Makanset',
    tagline: 'Nos Espaces, Votre Vision.',
    slogan: "Trouvez et réservez des lieux uniques à l'heure à Alger",
    heroKicker: 'Événement – Espace extérieur panoramique · HYDRA, ALGER',
    searchWhat: 'Que préparez-vous ?',
    searchWhatPlaceholder: 'Réunion, shooting, conférence...',
    searchWhere: 'Où ?',
    searchWherePlaceholder: "Toutes les communes d'Alger",
    allCommunes: "Toutes les communes d'Alger",
    searchWhen: 'Quand ?',
    searchWhenAnytime: 'À tout moment',
    searchGuests: 'Personnes',
    searchAction: 'Rechercher',
    searchClear: 'Effacer les filtres',

    trustVerified: 'Lieux vérifiés physiquement à Alger',
    trustFlexible: "Réservation à l'heure & à la journée",
    trustPricing: 'Tarifs transparents en Dinars (DA)',
    explorePrompt: 'Explorer',

    navExplore: 'Parcourir les lieux',
    navHost: 'Devenir hôte',
    navPublishSpace: 'Publier un espace',
    navBookings: 'Mes réservations',
    navFavorites: 'Favoris',
    navDashboard: 'Espace Hôte',
    navAdmin: 'Administration',
    navLogin: 'Se connecter',
    navSignUp: "S'inscrire",

    actMeeting: 'Réunion & Conseil',
    actConference: 'Conférence & Séminaire',
    actWorkshop: 'Formation & Atelier',
    actPhoto: 'Shooting photo',
    actEvent: 'Événement & Rooftop',
    actFilming: 'Tournage & Production',
    actCoworking: 'Coworking & Bureaux',
    actPodcast: 'Podcast & Studio Son',
    allActivities: 'Toutes les activités',

    fromPrice: 'À partir de',
    perHour: 'DA/h',
    perDay: 'DA/jour',
    capacityMax: 'Capacité',
    surfaceArea: 'Surface',
    minHoursNotice: 'Min. de réservation',
    amenitiesTitle: 'Équipements & Services inclus',
    addonsTitle: 'Options & Add-ons disponibles',
    addonsSubtitle: 'Personnalisez votre expérience selon vos besoins précis',
    rulesTitle: 'Règlement intérieur',
    cancellationTitle: "Conditions d'annulation",
    reviewsTitle: 'Avis des locataires',
    hostTitle: "À propos de l'hôte",
    responseRate: 'Taux de réponse',
    responseTime: 'Temps de réponse',
    contactWhatsApp: 'Contacter sur WhatsApp',
    callHost: 'Appeler l’hôte',
    requestToBook: 'Demander à réserver',
    verifiedSpace: 'Espace vérifié Makanset',

    pricingDetails: 'Détail de la tarification',
    spaceRental: 'Location de l’espace',
    addonsTotal: 'Options & Add-ons',
    serviceFee: 'Frais de service (7%)',
    totalPrice: 'Prix total',
    selectTimeSlot: 'Choisir le créneau',
    startTime: 'Heure de début',
    endTime: 'Heure de fin',
    dateLabel: 'Date',
    guestsLabel: 'Nombre de participants',

    checkoutTitle: 'Finaliser votre réservation',
    stepDetails: '1. Créneau & Options',
    stepContact: '2. Vos Coordonnées',
    stepPayment: '3. Mode de Paiement',
    stepConfirm: '4. Confirmation',
    fullName: 'Nom complet',
    phoneNumber: 'Numéro de téléphone (+213)',
    emailAddress: 'Adresse email',
    activityDescription: 'Détaillez votre projet',
    activityPlaceholder: 'Ex: Tournage vidéo publicitaire avec 6 personnes et matériel léger...',
    paymentOnlineTitle: 'Paiement en ligne sécurisé (Chargily Pay / SATIM)',
    paymentOnlineDesc: 'Cartes Edahabia & CIB acceptées instantanément',
    paymentOnSiteTitle: 'Paiement sur place ou virement BaridiMob / CCP',
    paymentOnSiteDesc: 'Règlement à l’arrivée ou preuve de virement',
    paymentBaridiMobDesc: 'Virement direct via BaridiMob ou CCP avec confirmation',
    cardNumber: 'Numéro de carte Edahabia ou CIB',
    cardExpiry: 'Date d’expiration (MM/AA)',
    cardCvv: 'Cryptogramme CVV',
    confirmBookingBtn: 'Confirmer la réservation',
    bookingSuccessTitle: 'Demande envoyée avec succès !',
    bookingSuccessDesc: 'Votre demande a été transmise et sera confirmée sous 15 minutes en moyenne.',
    bookingRefLabel: 'Référence de réservation',
    viewMyBookings: 'Voir mes réservations',

    dashboardTitle: 'Tableau de bord Propriétaire',
    tabOverview: 'Aperçu',
    tabCalendar: 'Calendrier interactif',
    tabBookings: 'Réservations',
    tabSpaces: 'Mes espaces',
    tabAddons: 'Add-ons',
    tabEarnings: 'Revenus',
    tabProfile: 'Profil',
    pendingRequests: 'Demandes en attente',
    activeBookings: 'Réservations confirmées',
    monthlyRevenue: 'Revenus du mois',
    occupancyRate: 'Taux d’occupation',
    confirmAction: 'Confirmer',
    rejectAction: 'Refuser',
    blockSlotAction: 'Bloquer le créneau',
    unblockSlotAction: 'Rendre disponible',
    addNewSpace: 'Créer une annonce',
    editPrice: 'Modifier le tarif',
    statusPublished: 'En ligne',
    statusPending: 'En attente d’approbation',
    statusPaused: 'En pause',

    statusPendingBooking: 'En attente de confirmation',
    statusConfirmedBooking: 'Confirmée',
    statusRejectedBooking: 'Refusée',
    statusCancelledBooking: 'Annulée',
    statusCompletedBooking: 'Terminée',

    categoriesSubtitle: 'Des espaces sur mesure',
    categoriesTitle: 'Louez un lieu unique pour chaque moment',
    spacesCountAlgiers: 'espaces à Alger',

    featuredSubtitle: "Sélection d'exception",
    featuredTitle: 'Espaces populaires à Alger',
    tabAllPlaces: 'Tous les lieux',
    tabRooftops: 'Rooftops & Patios',
    tabStudios: 'Studios Photo',
    tabMeetingRooms: 'Salles de Réunion',
    viewAllSpacesCount: "Voir tous les {count} espaces d'Alger",

    howItWorksSubtitle: 'Fonctionnement',
    howItWorksTitle: 'Comment fonctionne Makanset ?',
    howItWorksDesc: 'Une plateforme simple, fluide et pensée sur-mesure pour la location d’espaces à Alger.',
    forRenters: 'Pour les locataires',
    forOwners: 'Pour les propriétaires',
    findSpaceNow: 'Trouver un lieu maintenant',
    publishMySpace: 'Publier mon espace à Alger',

    testimonialsSubtitle: 'Témoignages',
    testimonialsTitle: 'Ils réalisent leurs projets sur Makanset',
    testimonialsDesc: 'Des entreprises, photographes et formateurs nous font confiance à Alger pour leurs événements.',

    faqSubtitle: 'FAQ',
    faqTitle: 'Questions fréquentes',
    faqDesc: 'Tout ce que vous devez savoir pour réserver ou publier un espace sur Makanset.',

    ctaSubtitle: 'Prêt à commencer ?',
    ctaTitle: "Trouvez l'espace idéal ou commencez à rentabiliser votre lieu à Alger",
    ctaDesc: 'Rejoignez dès aujourd’hui des centaines de professionnels, créateurs et propriétaires qui réinventent la réservation de lieux à l’heure en Algérie.',
    ctaBrowseBtn: 'Explorer tous les espaces',
    ctaPublishBtn: 'Publier un espace gratuitement',

    footerDesc: 'La plateforme algéroise de réservation d’espaces d’exception à l’heure et à la journée. Salles de réunion, studios photo, lofts et villas privées à Alger.',
    footerExploreTitle: 'Explorer par activité',
    footerHostTitle: 'Propriétaires & Aide',
    footerDistrictsTitle: "Communes d'Alger",
    footerRights: 'Makanset Algérie. Tous droits réservés. Tarifs affichés en Dinars Algériens (DZD).',
    termsBooking: 'Conditions de réservation',
    termsPrivacy: 'Confidentialité',

    authLoginSubtitle: 'Accédez à vos réservations et vos échanges à Alger',
    authSignupSubtitle: 'Rejoignez la communauté Makanset à Alger',
    authLoginTab: 'Se connecter',
    authSignupTab: "S'inscrire",
    authForgotPass: 'Mot de passe oublié ?',
    authLoginBtn: 'Se connecter',
    authSignupBtn: 'Créer mon compte',
    authSuccessLogin: 'Connexion réussie ! Bienvenue sur Makanset.',
    authSuccessSignup: 'Compte créé avec succès ! Bienvenue sur Makanset.',
  },
  en: {
    brandName: 'Makanset',
    tagline: 'Our Spaces, Your Vision.',
    slogan: 'Find and book unique hourly venues across Algiers',
    heroKicker: 'Event – Panoramic Outdoor Terrace · HYDRA, ALGIERS',
    searchWhat: 'What are you planning?',
    searchWhatPlaceholder: 'Meeting, photo shoot, conference...',
    searchWhere: 'Where?',
    searchWherePlaceholder: 'All Algiers districts',
    allCommunes: 'All Algiers districts',
    searchWhen: 'When?',
    searchWhenAnytime: 'Anytime',
    searchGuests: 'Guests',
    searchAction: 'Search',
    searchClear: 'Clear filters',

    trustVerified: 'Physically verified spaces in Algiers',
    trustFlexible: 'Hourly & full-day bookings',
    trustPricing: 'Transparent pricing in Dinars (DZD)',
    explorePrompt: 'Explore',

    navExplore: 'Browse Spaces',
    navHost: 'List a Space',
    navPublishSpace: 'List a Space',
    navBookings: 'My Bookings',
    navFavorites: 'Favorites',
    navDashboard: 'Host Dashboard',
    navAdmin: 'Administration',
    navLogin: 'Log in',
    navSignUp: 'Sign up',

    actMeeting: 'Meeting & Boardroom',
    actConference: 'Conference & Seminar',
    actWorkshop: 'Training & Workshop',
    actPhoto: 'Photo Shoot',
    actEvent: 'Event & Rooftop',
    actFilming: 'Filming & Production',
    actCoworking: 'Coworking & Desks',
    actPodcast: 'Podcast & Audio Studio',
    allActivities: 'All Activities',

    fromPrice: 'From',
    perHour: 'DZD/hr',
    perDay: 'DZD/day',
    capacityMax: 'Capacity',
    surfaceArea: 'Area',
    minHoursNotice: 'Min. booking duration',
    amenitiesTitle: 'Amenities & Inclusions',
    addonsTitle: 'Available Add-ons & Equipment',
    addonsSubtitle: 'Tailor your session to your exact requirements',
    rulesTitle: 'House Rules',
    cancellationTitle: 'Cancellation Policy',
    reviewsTitle: 'Guest Reviews',
    hostTitle: 'About the Host',
    responseRate: 'Response Rate',
    responseTime: 'Response Time',
    contactWhatsApp: 'Chat on WhatsApp',
    callHost: 'Call Host',
    requestToBook: 'Request to Book',
    verifiedSpace: 'Makanset Verified Space',

    pricingDetails: 'Price Breakdown',
    spaceRental: 'Space Rental',
    addonsTotal: 'Selected Add-ons',
    serviceFee: 'Service Fee (7%)',
    totalPrice: 'Total Price',
    selectTimeSlot: 'Select Time Slot',
    startTime: 'Start Time',
    endTime: 'End Time',
    dateLabel: 'Date',
    guestsLabel: 'Number of Guests',

    checkoutTitle: 'Complete your booking',
    stepDetails: '1. Time Slot & Options',
    stepContact: '2. Contact Information',
    stepPayment: '3. Payment Method',
    stepConfirm: '4. Confirmation',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number (+213)',
    emailAddress: 'Email Address',
    activityDescription: 'Describe your activity',
    activityPlaceholder: 'e.g. Commercial video shoot with 6 team members and tripods...',
    paymentOnlineTitle: 'Secure Online Payment (Chargily Pay / SATIM)',
    paymentOnlineDesc: 'Edahabia & CIB national cards accepted with instant receipt',
    paymentOnSiteTitle: 'Pay on arrival or BaridiMob / CCP transfer',
    paymentOnSiteDesc: 'Pay upon check-in or send your transfer receipt',
    paymentBaridiMobDesc: 'Direct transfer via BaridiMob app with fast confirmation',
    cardNumber: 'Edahabia or CIB Card Number',
    cardExpiry: 'Expiration Date (MM/YY)',
    cardCvv: 'CVV Security Code',
    confirmBookingBtn: 'Confirm & Send Request',
    bookingSuccessTitle: 'Booking Request Sent Successfully!',
    bookingSuccessDesc: 'Your request has been sent and will be confirmed within ~15 minutes.',
    bookingRefLabel: 'Booking Reference',
    viewMyBookings: 'View My Bookings',

    dashboardTitle: 'Host Management Dashboard',
    tabOverview: 'Overview',
    tabCalendar: 'Interactive Calendar',
    tabBookings: 'Bookings',
    tabSpaces: 'My Spaces',
    tabAddons: 'Add-ons',
    tabEarnings: 'Earnings',
    tabProfile: 'Profile',
    pendingRequests: 'Pending Requests',
    activeBookings: 'Confirmed Bookings',
    monthlyRevenue: 'Monthly Revenue',
    occupancyRate: 'Occupancy Rate',
    confirmAction: 'Confirm',
    rejectAction: 'Decline',
    blockSlotAction: 'Block Slot',
    unblockSlotAction: 'Make Available',
    addNewSpace: 'List a New Space',
    editPrice: 'Update Rates',
    statusPublished: 'Active & Listed',
    statusPending: 'Awaiting Admin Review',
    statusPaused: 'Paused',

    statusPendingBooking: 'Pending Confirmation',
    statusConfirmedBooking: 'Confirmed',
    statusRejectedBooking: 'Declined',
    statusCancelledBooking: 'Cancelled',
    statusCompletedBooking: 'Completed',

    categoriesSubtitle: 'Tailored Spaces',
    categoriesTitle: 'Rent a unique space for every moment',
    spacesCountAlgiers: 'spaces in Algiers',

    featuredSubtitle: 'Featured Selection',
    featuredTitle: 'Popular Spaces in Algiers',
    tabAllPlaces: 'All Spaces',
    tabRooftops: 'Rooftops & Patios',
    tabStudios: 'Photo Studios',
    tabMeetingRooms: 'Meeting Rooms',
    viewAllSpacesCount: 'View all {count} spaces in Algiers',

    howItWorksSubtitle: 'How It Works',
    howItWorksTitle: 'How does Makanset work?',
    howItWorksDesc: 'A simple, seamless platform custom-designed for space rentals in Algiers.',
    forRenters: 'For Guests',
    forOwners: 'For Hosts',
    findSpaceNow: 'Find a Space Now',
    publishMySpace: 'List My Space in Algiers',

    testimonialsSubtitle: 'Testimonials',
    testimonialsTitle: 'Bringing ideas to life on Makanset',
    testimonialsDesc: 'Companies, creators, and educators across Algiers trust us for their key events.',

    faqSubtitle: 'FAQ',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Everything you need to know about booking or listing a space on Makanset.',

    ctaSubtitle: 'Ready to start?',
    ctaTitle: 'Find the ideal space or start monetizing your venue in Algiers',
    ctaDesc: 'Join hundreds of professionals, creators, and space owners redefining hourly venue booking across Algeria today.',
    ctaBrowseBtn: 'Browse all spaces',
    ctaPublishBtn: 'List a space for free',

    footerDesc: 'The Algiers platform for reserving exceptional spaces by the hour and by the day. Meeting rooms, photo studios, lofts, and private villas across Algiers.',
    footerExploreTitle: 'Explore by activity',
    footerHostTitle: 'Hosts & Support',
    footerDistrictsTitle: 'Algiers Districts',
    footerRights: 'Makanset Algeria. All rights reserved. Prices shown in Algerian Dinars (DZD).',
    termsBooking: 'Booking Terms',
    termsPrivacy: 'Privacy Policy',

    authLoginSubtitle: 'Access your reservations and messages in Algiers',
    authSignupSubtitle: 'Join the Makanset community in Algiers',
    authLoginTab: 'Log in',
    authSignupTab: 'Sign up',
    authForgotPass: 'Forgot password?',
    authLoginBtn: 'Log in',
    authSignupBtn: 'Create Account',
    authSuccessLogin: 'Login successful! Welcome back to Makanset.',
    authSuccessSignup: 'Account created successfully! Welcome to Makanset.',
  },
};

export const formatCurrency = (amount: number, lang: LanguageCode = 'fr'): string => {
  const formattedNumber = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'fr-DZ').format(amount);
  return `${formattedNumber} ${lang === 'en' ? 'DZD' : 'DA'}`;
};
