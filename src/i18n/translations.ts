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
  searchWhen: string;
  searchWhenAnytime: string;
  searchGuests: string;
  searchAction: string;
  searchClear: string;
  
  // Navigation
  navExplore: string;
  navHost: string;
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
}

export const translations: Record<LanguageCode, Translations> = {
  fr: {
    brandName: 'Makanset',
    tagline: "Nos Espaces, Votre Vision.",
    slogan: "Trouvez et réservez des lieux uniques à l'heure à Alger",
    heroKicker: 'Événement – Espace extérieur panoramique · HYDRA, ALGER',
    searchWhat: 'Que préparez-vous ?',
    searchWhatPlaceholder: 'Réunion, shooting, conférence...',
    searchWhere: 'Où ?',
    searchWherePlaceholder: "Toutes les communes d'Alger",
    searchWhen: 'Quand ?',
    searchWhenAnytime: 'À tout moment',
    searchGuests: 'Personnes',
    searchAction: 'Rechercher',
    searchClear: 'Effacer les filtres',

    navExplore: 'Parcourir les lieux',
    navHost: 'Devenir hôte',
    navBookings: 'Mes réservations',
    navFavorites: 'Favoris',
    navDashboard: 'Espace Hôte',
    navAdmin: 'Administration',
    navLogin: 'Connexion',
    navSignUp: "S'inscrire",

    actMeeting: 'Réunion',
    actConference: 'Conférence',
    actWorkshop: 'Formation & Atelier',
    actPhoto: 'Shooting photo',
    actEvent: 'Événement privé',
    actFilming: 'Tournage',
    actCoworking: 'Coworking',
    actPodcast: 'Podcast & Audio',
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
  },
  ar: {
    brandName: 'مكانست',
    tagline: 'مساحتنا، رؤيتكم.',
    slogan: 'اعثر على مساحات مميزة بالساعة في الجزائر العاصمة واحجزها بسهولة',
    heroKicker: 'فعاليات – فضاء خارجي بإطلالة بانورامية · حيدرة، الجزائر العاصمة',
    searchWhat: 'ماذا تنوي تنظيمه؟',
    searchWhatPlaceholder: 'اجتماع، جلسة تصوير، مؤتمر...',
    searchWhere: 'أين؟',
    searchWherePlaceholder: 'كل بلديات الجزائر العاصمة',
    searchWhen: 'متى؟',
    searchWhenAnytime: 'في أي وقت',
    searchGuests: 'الأفراد',
    searchAction: 'بحث',
    searchClear: 'إلغاء التصفيات',

    navExplore: 'استكشف الأماكن',
    navHost: 'كن مضيفاً',
    navBookings: 'حجوزاتي',
    navFavorites: 'المفضلة',
    navDashboard: 'لوحة تحكم المضيف',
    navAdmin: 'الإدارة',
    navLogin: 'دخول',
    navSignUp: 'تسجيل',

    actMeeting: 'اجتماع عمل',
    actConference: 'مؤتمر',
    actWorkshop: 'ورشة عمل وتدريب',
    actPhoto: 'جلسة تصوير فوتوغرافي',
    actEvent: 'مناسبة خاصة',
    actFilming: 'تصوير فيديو وإنتاج',
    actCoworking: 'عمل مشترك',
    actPodcast: 'بودكاست واستوديو صوت',
    allActivities: 'جميع الأنشطة',

    fromPrice: 'ابتداءً من',
    perHour: 'دج / ساعة',
    perDay: 'دج / يوم',
    capacityMax: 'السعة',
    surfaceArea: 'المساحة',
    minHoursNotice: 'أدنى مدة للحجز',
    amenitiesTitle: 'التجهيزات والخدمات المتوفرة',
    addonsTitle: 'الخيارات والخدمات الإضافية',
    addonsSubtitle: 'خصّص تجربتك وفق متطلباتك الدقيقة',
    rulesTitle: 'القواعد الداخلية للمكان',
    cancellationTitle: 'شروط الإلغاء',
    reviewsTitle: 'تقييمات المستأجرين',
    hostTitle: 'عن المضيف',
    responseRate: 'نسبة الاستجابة',
    responseTime: 'متوسط وقت الرد',
    contactWhatsApp: 'تواصل عبر واتساب',
    callHost: 'اتصال هاتفي بالمضيف',
    requestToBook: 'طلب الحجز الآن',
    verifiedSpace: 'فضاء معتمد من مكانست',

    pricingDetails: 'تفاصيل التسعير',
    spaceRental: 'إيجار المساحة',
    addonsTotal: 'الخدمات الإضافية',
    serviceFee: 'رسوم الخدمة (7%)',
    totalPrice: 'المجموع الإجمالي',
    selectTimeSlot: 'اختر الفترة الزمنية',
    startTime: 'وقت البدء',
    endTime: 'وقت الانتهاء',
    dateLabel: 'التاريخ',
    guestsLabel: 'عدد الحاضرين',

    checkoutTitle: 'تأكيد وحجز الفضاء',
    stepDetails: '1. التوقيت والخيارات',
    stepContact: '2. معلومات الاتصال',
    stepPayment: '3. طريقة الدفع',
    stepConfirm: '4. التأكيد النهائي',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف (+213)',
    emailAddress: 'البريد الإلكتروني',
    activityDescription: 'اشرح تفاصيل نشاطك',
    activityPlaceholder: 'مثال: جلسة تصوير منتجات مع 4 أشخاص ومعدات خفيفة...',
    paymentOnlineTitle: 'الدفع الإلكتروني الآمن (Chargily / الذهبية / CIB)',
    paymentOnlineDesc: 'قبول فوري ومباشر لبطاقات الذهبية و CIB',
    paymentOnSiteTitle: 'الدفع في المكان أو عبر بريدي موب / CCP',
    paymentOnSiteDesc: 'تسديد المبلغ عند الوصول أو إرسال وصل التحويل',
    paymentBaridiMobDesc: 'تحويل مباشر عبر تطبيق بريدي موب مع تأكيد سريع',
    cardNumber: 'رقم بطاقة الذهبية أو CIB',
    cardExpiry: 'تاريخ انتهاء الصلاحية',
    cardCvv: 'الرمز السري CVV',
    confirmBookingBtn: 'تأكيد إرسال طلب الحجز',
    bookingSuccessTitle: 'تم إرسال طلب الحجز بنجاح!',
    bookingSuccessDesc: 'تم استلام طلبك وسيتم تأكيده في غضون 15 دقيقة تقريباً.',
    bookingRefLabel: 'رقم مرجع الحجز',
    viewMyBookings: 'عرض قائمة حجوزاتي',

    dashboardTitle: 'لوحة تحكم صاحب الفضاء',
    tabOverview: 'نظرة عامة',
    tabCalendar: 'التقويم التفاعلي',
    tabBookings: 'الحجوزات',
    tabSpaces: 'مساحاتي',
    tabAddons: 'الخدمات الإضافية',
    tabEarnings: 'المداخيل',
    tabProfile: 'الملف الشخصي',
    pendingRequests: 'طلبات في الانتظار',
    activeBookings: 'حجوزات مؤكدة',
    monthlyRevenue: 'مداخيل الشهر',
    occupancyRate: 'نسبة الإشغال',
    confirmAction: 'تأكيد الحجز',
    rejectAction: 'رفض',
    blockSlotAction: 'حجب الفترة',
    unblockSlotAction: 'إتاحة الفترة',
    addNewSpace: 'إضافة إعلان جديد',
    editPrice: 'تعديل السعر',
    statusPublished: 'منشور ومتاح',
    statusPending: 'في انتظار موافقة الإدارة',
    statusPaused: 'معطل مؤقتاً',

    statusPendingBooking: 'في انتظار التأكيد',
    statusConfirmedBooking: 'مؤكد',
    statusRejectedBooking: 'مرفوض',
    statusCancelledBooking: 'ملغي',
    statusCompletedBooking: 'مكتمل',
  },
  en: {
    brandName: 'Makanset',
    tagline: 'Our Spaces, Your Vision.',
    slogan: 'Discover and book unique hourly spaces across Algiers',
    heroKicker: 'Event – Panoramic Outdoor Terrace · HYDRA, ALGIERS',
    searchWhat: 'What are you planning?',
    searchWhatPlaceholder: 'Meeting, photoshoot, workshop...',
    searchWhere: 'Where?',
    searchWherePlaceholder: 'All Algiers districts',
    searchWhen: 'When?',
    searchWhenAnytime: 'Anytime',
    searchGuests: 'Guests',
    searchAction: 'Search',
    searchClear: 'Clear filters',

    navExplore: 'Browse Spaces',
    navHost: 'List your space',
    navBookings: 'My Bookings',
    navFavorites: 'Favorites',
    navDashboard: 'Host Dashboard',
    navAdmin: 'Admin',
    navLogin: 'Log in',
    navSignUp: 'Sign up',

    actMeeting: 'Meeting',
    actConference: 'Conference',
    actWorkshop: 'Workshop & Class',
    actPhoto: 'Photo Shoot',
    actEvent: 'Private Event',
    actFilming: 'Film & Video Shoot',
    actCoworking: 'Coworking',
    actPodcast: 'Podcast & Audio',
    allActivities: 'All Activities',

    fromPrice: 'From',
    perHour: 'DZD/hr',
    perDay: 'DZD/day',
    capacityMax: 'Capacity',
    surfaceArea: 'Area',
    minHoursNotice: 'Minimum booking',
    amenitiesTitle: 'Amenities & Inclusions',
    addonsTitle: 'Available Add-ons & Equipment',
    addonsSubtitle: 'Customize your session to your exact requirements',
    rulesTitle: 'Space Rules',
    cancellationTitle: 'Cancellation Policy',
    reviewsTitle: 'Guest Reviews',
    hostTitle: 'Meet the Host',
    responseRate: 'Response rate',
    responseTime: 'Response time',
    contactWhatsApp: 'Chat on WhatsApp',
    callHost: 'Call Host',
    requestToBook: 'Request to Book',
    verifiedSpace: 'Makanset Verified Space',

    pricingDetails: 'Price Breakdown',
    spaceRental: 'Space Rental',
    addonsTotal: 'Selected Add-ons',
    serviceFee: 'Service fee (7%)',
    totalPrice: 'Total Price',
    selectTimeSlot: 'Select Time Slot',
    startTime: 'Start time',
    endTime: 'End time',
    dateLabel: 'Date',
    guestsLabel: 'Number of guests',

    checkoutTitle: 'Complete your booking',
    stepDetails: '1. Slot & Add-ons',
    stepContact: '2. Contact Information',
    stepPayment: '3. Payment Method',
    stepConfirm: '4. Confirmation',
    fullName: 'Full Name',
    phoneNumber: 'Phone number (+213)',
    emailAddress: 'Email address',
    activityDescription: 'Describe your activity',
    activityPlaceholder: 'e.g. Commercial video shoot with 6 team members and tripods...',
    paymentOnlineTitle: 'Secure Online Payment (Chargily Pay / SATIM)',
    paymentOnlineDesc: 'Edahabia & CIB national cards accepted with instant receipt',
    paymentOnSiteTitle: 'Pay on arrival or BaridiMob / CCP transfer',
    paymentOnSiteDesc: 'Pay upon check-in or send your transfer receipt',
    paymentBaridiMobDesc: 'Direct transfer via BaridiMob app with fast confirmation',
    cardNumber: 'Edahabia / CIB card number',
    cardExpiry: 'Expiry date (MM/YY)',
    cardCvv: 'CVV security code',
    confirmBookingBtn: 'Confirm & Send Request',
    bookingSuccessTitle: 'Booking Request Sent!',
    bookingSuccessDesc: 'Your request has been received and will be confirmed within ~15 minutes.',
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
  },
};

export const formatCurrency = (amount: number, lang: LanguageCode = 'fr'): string => {
  const formattedNumber = new Intl.NumberFormat('fr-DZ').format(amount);
  if (lang === 'ar') {
    return `${formattedNumber} دج`;
  }
  return `${formattedNumber} DA`;
};
